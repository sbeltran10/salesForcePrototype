$(document).ready(function () {
    console.log(dataObtained);

    // Calculos para el query 1
    var pieSeriesFather = [];
    var pieSeriesChild = [];
    var totVendido = 0;
    var calcTotalVendido1 = function () {
        dataObtained.query1.forEach(function (elementData) {
            if (!elementData.Servicio__c && elementData.Tipo_de_servicio__c) {
                totVendido += elementData.total;
            }
        })
    }

    var separateData1 = function () {
        dataObtained.query1.forEach(function (elementData) {
            if (!elementData.Servicio__c && elementData.Tipo_de_servicio__c) {
                pieSeriesFather.push({
                    name: elementData.Tipo_de_servicio__c,
                    y: (elementData.total / totVendido * 100),
                    drilldown: elementData.Tipo_de_servicio__c
                });
            }
            else if (elementData.Tipo_de_servicio__c) {
                var added = false;
                pieSeriesChild.forEach(function (elementChild) {
                    if (elementChild.name === elementData.Tipo_de_servicio__c) {
                        elementChild.data.push([elementData.Servicio__c, (elementData.total / totVendido * 100)]);
                        added = true;
                    }
                })
                if (!added) {
                    pieSeriesChild.push({
                        name: elementData.Tipo_de_servicio__c,
                        id: elementData.Tipo_de_servicio__c,
                        data: [[elementData.Servicio__c, (elementData.total / totVendido * 100)]]
                    });
                }
            }
        }, this);
    }

    // Calculos para el query 2
    var barSeriesFather = [];
    var barSeriesChild = [];

    var separateData2 = function () {
        dataObtained.query2.forEach(function (elementData) {
            if (!elementData.idPadre && elementData.Id) {
                barSeriesFather.push({
                    name: elementData.Apellidos__c,
                    y: elementData.total,
                    drilldown: elementData.Id
                });
                barSeriesChild.push({
                    name: elementData.Apellidos__c,
                    id: elementData.Id,
                    data: []
                });
            }
            else if (elementData.Id) {
                var added = false;
                barSeriesChild.forEach(function (elementChild) {
                    if (elementChild.id === elementData.idPadre) {
                        elementChild.data.push([elementData.Apellidos__c, elementData.total]);
                        added = true;
                    }
                })
            }
        }, this);
    }


    calcTotalVendido1();
    separateData1();
    separateData2();
    console.log(barSeriesChild);
    console.log(pieSeriesFather);
    console.log(pieSeriesChild);

    // PIE CHART

    Highcharts.chart('pie-chart-container', {
        chart: {
            type: 'pie'
        },
        title: {
            text: ''
        },
        lang: {
            drillUpText: "Volver a Tipos de Servicio <"
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.1f}%'
                }
            }
        },

        tooltip: {
            headerFormat: '',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> del total<br/>'
        },
        series: [{
            name: 'Tipo de Servicio',
            colorByPoint: true,
            data: pieSeriesFather
        }],
        drilldown: {
            series: pieSeriesChild
        }
    });

    // BAR CHART

    Highcharts.chart('chart-container', {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        lang: {
            drillUpText: "Volver a Gerentes Comerciales <"
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text: 'Total percent market share'
            }

        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '${point.y}'
                }
            }
        },

        tooltip: {
            headerFormat: '',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>${point.y}</b> en ingresos<br/>'
        },

        series: [{
            name: 'Ingresos por ventas cerradas por Gerente Comercial',
            colorByPoint: true,
            data: barSeriesFather
        }],
        drilldown: {
            series: barSeriesChild

        }
    });

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

    // The speed gauge
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
            data: [50],
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

    // The RPM gauge
    var chartInd2 = Highcharts.chart('ind2-container', Highcharts.merge(gaugeOptions, {
        yAxis: {
            min: 0,
            max: 100,
            title: {
                text: null
            }
        },

        series: [{
            name: null,
            data: [70],
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y:.1f}</span><br/>' +
                '<span style="font-size:2em;color:silver">%</span></div>'
            },
            tooltip: {
                valueSuffix: '%'
            }
        }]

    }));

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
});
