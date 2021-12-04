// Mixins
const mixinProps = {};
mixinProps['BaseMixin'] = [
    'commitHandler',
    'controlsUseVisibility',
    'filterPrinter',
    'keyAccessor',
    'label',
    'minHeight',
    'minWidth',
    'renderLabel',
    'renderTitle',
    'title',
    'transitionDelay',
    'transitionDuration',
    'useViewBoxResizing',
];
mixinProps['BubbleMixin'] = [
    'elasticRadius',
    'excludeElasticZero',
    'maxBubbleRelativeSize',
    'minRadiusWithLabel',
    'radiusValueAccessor',
    'sortBubbleSize',
];
mixinProps['ColorMixin'] = ['colorAccessor'];
mixinProps['MarginMixin'] = [...mixinProps['BaseMixin']];
mixinProps['CoordinateGridMixin'] = [
    ...mixinProps['MarginMixin'],
    ...mixinProps['ColorMixin'],
    'brushOn',
    'clipPadding',
    'elasticX',
    'elasticY',
    'mouseZoomable',
    'parentBrushOn',
    'renderHorizontalGridLines',
    'renderVerticalGridLines',
    'round',
    'useRightYAxis',
    'xAxisPadding',
    'xAxisPaddingUnit',
    'xUnits',
    'yAxisPadding',
    'zoomOutRestrict',
    'zoomScale',
];
mixinProps['StackMixin'] = [
    ...mixinProps['CoordinateGridMixin'],
    'evadeDomainFilter',
    'hidableStacks',
];

// Charts
export const chartProps = {};
chartProps['BarChart'] = [
    ...mixinProps['StackMixin'],
    'alwaysUseRounding',
    'centerBar',
];
chartProps['BoxPlot'] = [
    ...mixinProps['CoordinateGridMixin'],
    'boldOutlier',
    'dataOpacity',
    'dataWidthPortion',
    'renderDataPoints',
    'showOutliers',
    'tickFormat',
    'yRangePadding',
];
chartProps['BubbleChart'] = [
    ...mixinProps['CoordinateGridMixin'],
    ...mixinProps['BubbleMixin'],
];
chartProps['BubbleOverlay'] = [
    ...mixinProps['BaseMixin'],
    ...mixinProps['ColorMixin'],
    ...mixinProps['BubbleMixin'],
];
chartProps['CboxMenu'] = [
    ...mixinProps['BaseMixin'],
    'filterDisplayed',
    'multiple',
    'order',
    'promptText',
    'promptValue',
];
chartProps['CompositeChart'] = [
    ...mixinProps['CoordinateGridMixin'],
    'shareColors',
    'shareTitle',
];
chartProps['DataCount'] = [...mixinProps['BaseMixin'], 'formatNumber', 'html'];
chartProps['DataGrid'] = [
    ...mixinProps['BaseMixin'],
    'beginSlice',
    'endSlice',
    'html',
    'htmlSection',
    'order',
    'section',
    'size',
    'sortBy',
];
chartProps['DataTable'] = [
    ...mixinProps['BaseMixin'],
    'beginSlice',
    'columns',
    'endSlice',
    'order',
    'section',
    'showSections',
    'size',
    'sortBy',
];
chartProps['GeoChoroplethChart'] = [
    ...mixinProps['BaseMixin'],
    ...mixinProps['ColorMixin'],
    'geoJsons',
];
chartProps['HeatMap'] = [
    ...mixinProps['MarginMixin'],
    ...mixinProps['ColorMixin'],
    'boxOnClick',
    'colOrdering',
    'cols',
    'colsLabel',
    'rowOrdering',
    'rows',
    'rowsLabel',
    'xAxisOnClick',
    'xBorderRadius',
    'yAxisOnClick',
    'yBorderRadius',
];
chartProps['LineChart'] = [...mixinProps['StackMixin']];
chartProps['NumberDisplay'] = [...mixinProps['BaseMixin'], 'formatNumber'];
chartProps['PieChart'] = [
    ...mixinProps['BaseMixin'],
    ...mixinProps['ColorMixin'],
    'drawPaths',
    'emptyTitle',
    'externalLabels',
    'externalRadiusPadding',
    'innerRadius',
    'minAngleForLabel',
    'radius',
];
chartProps['RowChart'] = [
    ...mixinProps['MarginMixin'],
    ...mixinProps['ColorMixin'],
    'elasticX',
    'fixedBarHeight',
    'gap',
    'labelOffsetX',
    'labelOffsetY',
    'renderTitleLabel',
    'titleLabelOffsetX',
];
chartProps['ScatterPlot'] = [
    ...mixinProps['CoordinateGridMixin'],
    'emptyColor',
    'emptyOpacity',
    'emptySize',
    'excludedColor',
    'excludedOpacity',
    'excludedSize',
    'existenceAccessor',
    'highlightedSize',
    'nonemptyOpacity',
    'symbolSize',
    'useCanvas',
];
chartProps['SelectMenu'] = [
    ...mixinProps['BaseMixin'],
    'filterDisplayed',
    'multiple',
    'numberVisible',
    'order',
    'promptText',
    'promptValue',
];
chartProps['SunburstChart'] = [
    ...mixinProps['BaseMixin'],
    ...mixinProps['ColorMixin'],
    'emptyTitle',
    'externalLabels',
    'innerRadius',
    'minAngleForLabel',
    'radius',
    'ringSizes',
];
chartProps['TextFilterWidget'] = [
    'filterFunctionFactory',
    'normalize',
    'placeHolder',
];

chartProps['SeriesChart'] = [
    ...chartProps['CompositeChart'],
    'chartFunction',
    'seriesAccessor',
    'seriesSort',
    'valueSort',
];
