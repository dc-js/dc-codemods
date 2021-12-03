export function setupExtensions(j) {
    j.registerMethods({
        findExpressions: function (expr) {
            const parts = expr.split('.');

            let node = { type: 'Identifier', name: parts.shift() };
            while (parts.length > 0) {
                node = {
                    type: 'MemberExpression',
                    object: node,
                    property: { type: 'Identifier', name: parts.shift() },
                };
            }

            return this.find(j.CallExpression, {
                callee: node,
            });
        },

        replaceExpression: function (expr) {
            let isConstructor = false;
            if (expr.match(/^new\s+/)) {
                isConstructor = true;
                expr = expr.replace(/^new\s+/, '');
            }

            const [obj, property] = expr.split('.');
            return this.replaceWith(path => {
                const node = path.node;
                let memberExpression = j.memberExpression(
                    j.identifier(obj),
                    j.identifier(property)
                );

                return isConstructor
                    ? j.newExpression(memberExpression, node.arguments)
                    : j.callExpression(memberExpression, node.arguments);
            });
        },
    });
}
