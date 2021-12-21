// dc.renderAll --> chartGroup.renderAll
const chartRegistryFunctions = [
    'filterAll',
    'refocusAll',
    'renderAll',
    'redrawAll',
    'renderlet',
].map(f => [`dc.${f}`, `chartGroup.${f}`]);

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
    ['dc.registerChart', 'chartGroup.register'],
    ['dc.deregisterChart', 'chartGroup.deregister'],
    ['dc.deregisterAllCharts', 'chartGroup.clear'],
    ['dc.units.integers', 'dc.UnitsInteger'],
    ['dc.units.ordinal', 'dc.UnitsOrdinal'],
    ['dc.units.fp.precision', 'dc.UnitWithPrecision'],
];

export const functionMappings = [
    ...chartRegistryFunctions,
    ...utilsFunctions,
    ...miscMappings,
];
