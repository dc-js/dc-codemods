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
].map(f => [`dc.${f.replace(/^./, c => c.toLowerCase())}`, `dc.${f}`]);

// filter = dc.filters.RangedFilter(range) --> filter = new dc.RangedFilter(range)
const filtersConstructors = [
    'RangedFilter',
    'TwoDimensionalFilter',
    'RangedTwoDimensionalFilter',
    'HierarchyFilter',
].map(f => [`dc.filters.${f}`, `dc.${f}`]);

const miscMappings = [
    ['dc.htmlLegend', 'dc.HtmlLegend'],
    ['dc.legend', 'dc.Legend'],
];

export const constructorMapping = [
    ...chartConstrutorsMapping,
    ...filtersConstructors,
    ...miscMappings,
];
