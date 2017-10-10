$(document).ready(function () {
    console.log(dataObtained);

    var pieSeriesFather = [];
    var pieSeriesChild = [];
    var totVendido = 0;

    var calcTotalVendido = function () {
        dataObtained.query1.forEach(function (elementData) {
            if (!elementData.Servicio__c && elementData.Tipo_de_servicio__c) {
                totVendido += elementData.total;
            }
        })
    }

    var separateData = function () {
        dataObtained.query1.forEach(function (elementData) {
            if (!elementData.Servicio__c && elementData.Tipo_de_servicio__c) {
                pieSeriesFather.push({
                    name: elementData.Tipo_de_servicio__c,
                    y: (elementData.total/totVendido*100),
                    drilldown: elementData.Tipo_de_servicio__c
                });
            }
            else if (elementData.Tipo_de_servicio__c) {
                var added = false;
                pieSeriesChild.forEach(function (elementChild) {
                    if (elementChild.name === elementData.Tipo_de_servicio__c) {
                        elementChild.data.push([elementData.Servicio__c, (elementData.total/totVendido*100)]);
                        added = true;
                    }
                })
                if (!added) {
                    pieSeriesChild.push({
                        name: elementData.Tipo_de_servicio__c,
                        id: elementData.Tipo_de_servicio__c,
                        data: [[elementData.Servicio__c, (elementData.total/totVendido*100)]]
                    });
                }
            }
        }, this);
    }
    calcTotalVendido();
    separateData();
    console.log(pieSeriesFather);
    console.log(pieSeriesChild);

    Highcharts.chart('pie-chart-container', {
        chart: {
            type: 'pie'
        },
        title: {
            text: ''
        },
        lang: {
            drillUpText: "Volver a tipo de servicio <"
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
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
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
});
