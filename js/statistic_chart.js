var options = {
    series: [{
      data: statisticData.data
    }],
    chart: {
      height: 205,
      type: 'line',
      zoom: {
        enabled: false
      },
      toolbar: {
        show: false,
      },
      events: {
        mounted: function (chartContext, config)  {
              var positionX = config.globals.seriesXvalues;
              var positionY = config.globals.seriesYvalues;
              let offsetX = config.globals.translateYAxisX[0] + 22;
              for (let i = 0; i < positionX[0].length; i++) {
                let top = positionY[0][i] + 20;
                let left = positionX[0][i] + offsetX;
                let htmlTooltip = '<div class="tooltips-line" style="top: '+ top +'px; left: '+ left +'px;"><div class="tooltip-content">' + statisticData.data[i] + 'h</div></div>'
                $(htmlTooltip).appendTo($('.apexcharts-canvas'));
              }
          },
          updated: function (chartContext, config)  {
              var positionX = config.globals.seriesXvalues;
              var positionY = config.globals.seriesYvalues;
              let offsetX = config.globals.translateYAxisX[0] + 22;
              for (let i = 0; i < positionX[0].length; i++) {
                let top = positionY[0][i] + 20;
                let left = positionX[0][i] + offsetX;
                let htmlTooltip = '<div  class="tooltips-line" style="top: '+ top +'px; left: '+ left +'px;"><div class="tooltip-content">' + statisticData.data[i] + 'h</div></div>'
                $(htmlTooltip).appendTo($('.apexcharts-canvas'));
              }
          },
      }
    },
    colors: ["#000000"],
    fontFamily: 'Gilroy, Verdana, Tahoma, sans-serif',
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth',
        width: 2,
    },
    grid: {
        borderColor: '#F5F5F7',
        padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 10
        }, 
    },
    yaxis: {
        labels: {
             formatter: function(val) {
                return val.toFixed(0)
            },
            offsetX: -15
        },
    },
    xaxis: {
        categories: statisticData.labels,
    },
    tooltip: {
        enabled: false,
    },
    markers: {
        size: [4, 4],
        strokeWidth: 0,
    },
};
var chart = new ApexCharts(document.querySelector("#statisticChart"), options);
chart.render();