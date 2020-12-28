HTMLWidgets.widget({

  name: 'mynetplot',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(x) {

        am4core.useTheme(am4themes_animated);
// Themes end

        var chart = am4core.create("chartdiv", am4plugins_forceDirected.ForceDirectedTree);

        var networkSeries = chart.series.push(new am4plugins_forceDirected.ForceDirectedSeries());
        networkSeries.dataFields.linkWith = "linkWith";
        networkSeries.dataFields.name = "name";
        networkSeries.dataFields.id = "name";
        networkSeries.dataFields.value = "value";
        networkSeries.dataFields.children = "children";
        networkSeries.dataFields.color = "color";

        networkSeries.nodes.template.label.text = "{name}";
        networkSeries.fontSize = 8;
        networkSeries.linkWithStrength = 0;

        var nodeTemplate = networkSeries.nodes.template;
        nodeTemplate.tooltipText = "{name}";
        nodeTemplate.fillOpacity = 1;
        nodeTemplate.label.hideOversized = true;
        nodeTemplate.label.truncate = true;

        var linkTemplate = networkSeries.links.template;
        linkTemplate.strokeWidth = 1;
        var linkHoverState = linkTemplate.states.create("hover");
        linkHoverState.properties.strokeOpacity = 1;
        linkHoverState.properties.strokeWidth = 2;

        nodeTemplate.events.on("over", function (event) {
            var dataItem = event.target.dataItem;
            dataItem.childLinks.each(function (link) {
                link.isHover = true;
            });
        });

        nodeTemplate.events.on("out", function (event) {
            var dataItem = event.target.dataItem;
            dataItem.childLinks.each(function (link) {
                link.isHover = false;
            });
        });

        networkSeries.manyBodyStrength = -10;
        networkSeries.links.template.distance = 0.5;
        networkSeries.links.template.strength = 1;

        networkSeries.data = x.data;

      chart.exporting.menu = new am4core.ExportMenu();
      chart.exporting.menu.align = "left";
      chart.exporting.menu.verticalAlign = "top";
      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
