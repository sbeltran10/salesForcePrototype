var initChart4 = function () {
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

    calcTotalVendido1();
    separateData1();

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

    $(function () {

        $(".drop-pie .dropdown-menu li a").click(function (e) {
            e.preventDefault();
            $(".pie-periodo").html("Período "+$(this).text());
        });

    });
}