# Not covered changes

## v4-v5

- colors - TODO, converet with best effort, else issue message
- rangeChart - TODO, issue message
- focusChart - TODO, issue message
- StackMixin.title with 2 parameters - TODO, better implementation
- BubbleOverlay.point - TODO, in case of only one point, give message, documentation
- GeoChoroplethChart.overlayGeoJson - TODO, similar to points
- GeoChoroplethChart.removeGeoJson - TODO, issue message
- filter handlers - TODO, issue message
- pluck(x) -> TODO, issue message, convert to function like `d => d.x`
- pluck(x, f) -> TODO, issue message, {@link pluck2 | pluck2(x, f)}
- utils.constant -> TODO, issue message, convert to function like `x => () => x`
- utils.printSingleValue.fformat -> TODO, issue message, {@link Config.floatFormat | config.floatFormat}

- DataCount.dimension -> DataCount.crossfilter
- DataCount.group -> DataCount.groupAll

- Rename before conf
  - DataGrid.group - conf.section
  - DataGrid.htmlGroup - conf.htmlSection
  - DataTable.group - conf.section
  - DataTable.showGroups - conf.showSections
  - PieChart.slicesCap -> conf.cap
  - ScatterPlot.hiddenSize -> conf.emptySize
  - SelectMenu.size -> conf.numberVisible
  - SeriesChart.chart -> conf.chartFunction
