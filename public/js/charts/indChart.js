var initChart2 = function () {
    // IND GAUGES

    var gaugeOptions = {

        chart: {
            type: 'solidgauge',
        },

        title: null,

        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            stops: [
                [0.1, '#DF5353'],
                [0.5, '#DDDF0D'],
                [0.9, '#55BF3B']
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickAmount: 2,
            title: {
                y: -70
            },
            labels: {
                y: 16
            }
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };

    var actualValueInd = [50];

    // The obj gauge
    var createChart = function () {
        var chartInd1 = Highcharts.chart('ind1-container', Highcharts.merge(gaugeOptions, {
            yAxis: {
                min: 0,
                max: 100,
                title: {
                    text: null
                }
            },

            credits: {
                enabled: false
            },

            series: [{
                name: null,
                data: actualValueInd,
                dataLabels: {
                    format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
                    '<span style="font-size:2em;color:silver">%</span></div>'
                },
                tooltip: {
                    valueSuffix: '%'
                }
            }]

        }));
    }

    createChart();
    // Bring life to the dials
    /*
    setInterval(function () {
        // Speed
        var point,
            newVal,
            inc;
     
        if (chartInd1) {
            point = chartInd1.series[0].points[0];
            inc = Math.round((Math.random() - 0.5) * 100);
            newVal = point.y + inc;
     
            if (newVal < 0 || newVal > 200) {
                newVal = point.y - inc;
            }
     
            point.update(newVal);
        }
     
        // RPM
        if (chartInd2) {
            point = chartInd2.series[0].points[0];
            inc = Math.random() - 0.5;
            newVal = point.y + inc;
     
            if (newVal < 0 || newVal > 5) {
                newVal = point.y - inc;
            }
     
            point.update(newVal);
        }
     
    }*/

    $(function () {

        $(".drop-ind .dropdown-menu li a").click(function (e) {
            e.preventDefault();
            var randomVal = Math.floor(Math.random() * (100 - 0 + 1) + 0);
            actualValueInd = [randomVal];
            $(".ind-periodo").html("Período " + $(this).text());

            $('#ind1-container').highcharts().destroy();
            createChart();
        });

    });
}