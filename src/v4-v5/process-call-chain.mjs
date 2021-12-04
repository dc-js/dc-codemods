import {
    baseDataOptions,
    capDataOptions,
    stackCharts,
    stackDataOptions,
} from './conf/data-options.mjs';
import { chartProps } from './conf/conf-options.mjs';
import { renameMappings } from './conf/rename-mappings.mjs';

export function processCallChain(chartType, callExpressionPath, api) {
    const { jscodeshift, stats, report } = api;
    const j = jscodeshift;

    let origObjectNode;

    // We need to locate this node, so, we replace it with 'book-mark' (which is an invalid identifier name)
    // This way we guarantee not to conflict with any other identifier
    // When done, it will be replace back to original node
    j(callExpressionPath).replaceWith(path => {
        const node = path.node;
        origObjectNode = node.callee.object;
        node.callee.object = j.identifier('book-mark');
        return node;
    });

    const accumulator = { conf: [], data: [], points: [], layers: [] };

    let callExpressionNode;
    let memberExpressionNode;

    while (
        (callExpressionNode = callExpressionPath.node) &&
        (memberExpressionNode = callExpressionNode.callee) &&
        memberExpressionNode.type === 'MemberExpression' &&
        callExpressionNode.type === 'CallExpression' &&
        callExpressionNode.arguments.length >= 1
    ) {
        let fnName = memberExpressionNode.property.name;

        // Check if the function needs renaming
        if (renameMappings[chartType] && renameMappings[chartType][fnName]) {
            fnName = renameMappings[chartType][fnName];
            memberExpressionNode.property.name = fnName;
        }

        // All data related conf options
        if (
            baseDataOptions.includes(fnName) ||
            capDataOptions.includes(fnName)
        ) {
            accumulator.data.push({
                propName: fnName,
                arguments: callExpressionNode.arguments,
            });

            j(callExpressionPath).replaceWith(p => p.node.callee.object);
        }

        if (stackDataOptions.includes(fnName)) {
            let [group, name, valueAccessor] = callExpressionNode.arguments;
            accumulator.layers.push({
                group,
                name,
                valueAccessor,
            });

            j(callExpressionPath).replaceWith(p => p.node.callee.object);
        }

        // Collect all chart conf options and remove the call
        if (
            chartProps[chartType].includes(fnName) &&
            callExpressionNode.arguments.length === 1
        ) {
            accumulator.conf.push({
                propName: fnName,
                argument: callExpressionNode.arguments[0],
            });

            j(callExpressionPath).replaceWith(p => p.node.callee.object);
        }

        // Collect all the points
        if (chartType === 'BubbleOverlay' && fnName === 'point') {
            accumulator.points.push(callExpressionNode.arguments);
            j(callExpressionPath).replaceWith(p => p.node.callee.object);
        }

        callExpressionPath = callExpressionPath.parent.parent;
    }

    // TODO: if only one point, then it is likely in a loop, issue a warning or generate different code
    if (accumulator.points.length > 0) {
        const argNode = j.arrayExpression(
            accumulator.points.map(p => {
                return j.objectExpression([
                    j.property('init', j.identifier('name'), p[0]),
                    j.property('init', j.identifier('x'), p[1]),
                    j.property('init', j.identifier('y'), p[2]),
                ]);
            })
        );
        accumulator.conf.push({
            propName: 'points',
            argument: argNode,
        });
    }

    if (accumulator.conf.length > 0) {
        j(callExpressionPath)
            .find(j.Identifier, {
                name: 'book-mark',
            })
            .replaceWith(firstInChain => {
                const argNode = j.objectExpression(
                    accumulator.conf.map(item =>
                        j.property(
                            'init',
                            j.identifier(item.propName),
                            item.argument
                        )
                    )
                );
                return j.callExpression(
                    j.memberExpression(
                        firstInChain.node,
                        j.identifier('configure')
                    ),
                    [argNode]
                );
            });
    }

    if (accumulator.data.length > 0 || accumulator.layers.length > 0) {
        let adapterClass = 'CFSimpleAdapter';

        if (stackCharts.includes(chartType)) {
            adapterClass = 'CFMultiAdapter';
        } else if (
            accumulator.data.some(i => capDataOptions.includes(i.propName))
        ) {
            adapterClass = 'CFDataCapHelper';
        }

        if (stackCharts.includes(chartType)) {
            let layer0 = {};
            accumulator.data = accumulator.data.flatMap(item => {
                if (item.propName === 'group') {
                    let [group, name, valueAccessor] = item.arguments;
                    layer0.group = group;
                    if (name) {
                        layer0.name = name;
                    }
                    if (valueAccessor) {
                        layer0.valueAccessor = valueAccessor;
                    }
                    return [];
                }
                return [item];
            });
            accumulator.layers.unshift(layer0);
            const layersArg = j.arrayExpression(
                accumulator.layers.map(layer =>
                    j.objectExpression(
                        Object.keys(layer).map(k =>
                            j.property('init', j.identifier(k), layer[k])
                        )
                    )
                )
            );
            accumulator.data.push({
                propName: 'layers',
                arguments: [layersArg],
            });
        } else {
            accumulator.data = accumulator.data.flatMap(item => {
                if (item.propName === 'group' && item.arguments.length > 1) {
                    return [
                        {
                            propName: 'group',
                            arguments: [item.arguments.shift()],
                        },
                        {
                            propName: 'groupName',
                            arguments: [item.arguments.shift()],
                        },
                    ];
                }
                return [item];
            });
        }

        j(callExpressionPath)
            .find(j.Identifier, {
                name: 'book-mark',
            })
            .replaceWith(firstInChain => {
                const argNode = j.objectExpression(
                    accumulator.data.map(item =>
                        j.property(
                            'init',
                            j.identifier(item.propName),
                            item.arguments[0]
                        )
                    )
                );
                return j.callExpression(
                    j.memberExpression(
                        firstInChain.node,
                        j.identifier('dataProvider')
                    ),
                    [
                        j.newExpression(
                            j.memberExpression(
                                j.identifier('dc'),
                                j.identifier(adapterClass)
                            ),
                            [argNode]
                        ),
                    ]
                );
            });
    }

    // rename the name to the original variable name
    j(callExpressionPath)
        .find(j.Identifier, {
            name: 'book-mark',
        })
        .replaceWith(path => {
            return origObjectNode;
        });
}
