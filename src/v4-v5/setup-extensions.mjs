export function setupExtensions(j) {
    j.registerMethods({
        findMemberChain: function (expr) {
            const parts = expr.split('.');

            let node = { type: 'Identifier', name: parts.shift() };
            while (parts.length > 0) {
                node = {
                    type: 'MemberExpression',
                    object: node,
                    property: { type: 'Identifier', name: parts.shift() },
                };
            }

            const { object, property } = node;
            return this.find(j.MemberExpression, {
                object,
                property,
            });
        },

        replaceMemberChain: function (expr) {
            const [obj, property] = expr.split('.');
            return this.replaceWith(path => {
                const node = path.node;
                return j.memberExpression(
                    j.identifier(obj),
                    j.identifier(property)
                );
            });
        },

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

        replaceWithNewExpression: function (expr) {
            const [obj, property] = expr.split('.');
            return this.replaceWith(path => {
                const node = path.node;
                let memberExpression = j.memberExpression(
                    j.identifier(obj),
                    j.identifier(property)
                );

                return j.newExpression(memberExpression, node.arguments);
            });
        },
    });
}
