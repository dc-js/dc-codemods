import { chartProps } from './conf/conf-options.mjs';
import { processCallChain } from './process-call-chain.mjs';
import { functionMappings } from './conf/function-mappings.mjs';
import { constructorMappings } from './conf/constructor-mappings.mjs';
import { addChartGroup } from './add-chart-group.mjs';

export function process(root, api, options) {
    const { jscodeshift, stats, report } = api;
    const j = jscodeshift;

    functionMappings.forEach(([orig, replacement]) =>
        root.findMemberChain(orig).replaceMemberChain(replacement)
    );

    constructorMappings.forEach(([orig, replacement]) =>
        root.findExpressions(orig).replaceWithNewExpression(replacement)
    );

    // Add chart group
    // - add declaration and instantiation at the beginning
    // - add chartGroup as the 2nd parameter for chart creation
    // - bailout if custom chart group is in use

    const chartsCreations = root
        .find(j.NewExpression, {
            callee: {
                type: 'MemberExpression',
                object: { type: 'Identifier', name: 'dc' },
            },
        })
        .filter(path => chartProps[path.node.callee.property.name]); // only for charts

    report(`Found ${chartsCreations.size()} charts`);

    addChartGroup(chartsCreations, root, j);

    // Try to find variable names for charts
    const getVarName = entry => {
        // Try, `const/var/let chart = new dc.BarChart('#bar-chart')
        const varDecl = entry.closest(j.VariableDeclarator);
        if (varDecl.size() > 0) {
            return varDecl.nodes()[0].id.name;
        }
        // Try `chart = new dc.BarChart('#bar-chart')`
        const assignment = entry.closest(j.AssignmentExpression);
        if (assignment.size() > 0) {
            return assignment.nodes()[0].left.name;
        }
        return null;
    };

    const charts = chartsCreations.paths().flatMap(path => {
        const varName = getVarName(j(path));
        // Not every chart creation will be associated with a variable (for example sub charts in a composite)
        return varName
            ? [{ varName, type: path.node.callee.property.name }]
            : [];
    });

    report(charts.map(c => `${c.type}: ${c.varName}`).join(', '));

    charts.forEach(chart => {
        root.find(j.CallExpression, {
            callee: {
                type: 'MemberExpression',
                object: {
                    name: chart.varName,
                },
            },
        }).forEach(callExpressionPath =>
            processCallChain(chart, callExpressionPath, api)
        );
    });

    return root.toSource();
}
