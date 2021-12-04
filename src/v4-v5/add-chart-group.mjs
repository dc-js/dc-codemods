export function addChartGroup(chartsCreations, root, j) {
    // If there are charts without explicit chartGroups, add the chartGroup declaration
    const chartCreationsWithoutChartGroup = chartsCreations.filter(
        path => path.node.arguments.length === 1
    );

    if (chartCreationsWithoutChartGroup.size() > 0) {
        root.get().node.program.body.unshift(
            'const chartGroup = new dc.ChartGroup();'
        );
    }

    // Add chartGroup as explicit parameter in chart creation
    chartCreationsWithoutChartGroup.replaceWith(path => {
        const node = path.node;
        node.arguments.push(j.identifier('chartGroup'));
        return node;
    });
}
