// chart = dc.barChart('#bar') --> chart = new dc.BarChart('#bar')
const chartConstrutorsMapping = [
    'BarChart',
    'BoxPlot',
    'BubbleChart',
    'BubbleOverlay',
    'CboxMenu',
    'CompositeChart',
    'DataCount',
    'DataGrid',
    'DataTable',
    'GeoChoroplethChart',
    'HeatMap',
    'HtmlLegend',
    'Legend',
    'LineChart',
    'NumberDisplay',
    'PieChart',
    'RowChart',
    'ScatterPlot',
    'SelectMenu',
    'SeriesChart',
    'SunburstChart',
    'TextFilterWidget',
].map(f => [`dc.${f.replace(/^./, c => c.toLowerCase())}`, `new dc.${f}`]);

// dc.renderAll --> chartGroup.renderAll
const chartRegistryFunctions = [
    'registerChart',
    'deregisterChart',
    'deregisterAllCharts',
    'filterAll',
    'refocusAll',
    'renderAll',
    'redrawAll',
    'renderlet',
].map(f => [`dc.${f}`, `chartGroup.${f}`]);

// filter = dc.filters.RangedFilter(range) --> filter = new dc.RangedFilter(range)
const filtersConstructors = [
    'RangedFilter',
    'TwoDimensionalFilter',
    'RangedTwoDimensionalFilter',
    'HierarchyFilter',
].map(f => [`dc.filters.${f}`, `new dc.${f}`]);

// dc.utils.isFloat(n) --> dc.isFloat(n)
const utilsFunctions = [
    'add',
    'allChildren',
    'appendOrSelect',
    'arraysEqual',
    'arraysIdentical',
    'clamp',
    'getAncestors',
    'isFloat',
    'isInteger',
    'isNegligible',
    'isNumber',
    'nameToId',
    'printSingleValue',
    'safeNumber',
    'subtract',
    'toHierarchy',
    'uniqueId',
].map(f => [`dc.utils.${f}`, `dc.${f}`]);

const miscMappings = [
    ['dc.hasChart', 'chartGroup.has'],
    ['dc.units.integers', 'new dc.UnitsInteger'],
    ['dc.units.ordinal', 'new dc.UnitsOrdinal'],
    ['dc.units.fp.precision', 'new dc.UnitWithPrecision'],
    ['dc.htmlLegend', 'new dc.HtmlLegend'],
    ['dc.legend', 'new dc.Legend'],
];

export const functionMappings = [
    ...chartConstrutorsMapping,
    ...chartRegistryFunctions,
    ...filtersConstructors,
    ...utilsFunctions,
    ...miscMappings,
];
