var initChart1 = function () {
    // Calculos para el query 2
    var barSeriesFather = [];
    var barSeriesChild = [];

    var separateData2 = function () {
        dataObtained.query2.forEach(function (elementData) {
            if (elementData.total > 0) {
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
            }
        }, this);
    }
    console.log(barSeriesChild);
    separateData2();

    // BAR CHART
    var createChart = function () {
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
                    text: 'Ingresos Obtenidos por Ventas'
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
    }

    createChart();

    var randominzeValues = function () {
        barSeriesFather.forEach(function (elementFather) {
            var randomVal = Math.floor(Math.random() * (50000000 - 25000000 + 1) + 25000000);
            elementFather.y = randomVal;
            barSeriesChild.forEach(function (elementChild) {
                if (elementChild.id === elementFather.drilldown) {
                    var n = 0;
                    var actualValue = elementFather.y;
                    while (n < elementChild.data.length - 1) {
                        var s = Math.round(Math.random() * ((actualValue - ((elementChild.data.length - n - 1) * 5000000)) + 1));
                        elementChild.data[n][1] = s;
                        actualValue -= s;
                        n += 1;
                    }
                }
            })

        }, this);
    }

    $(function () {

        $(".drop-bar .dropdown-menu li a").click(function (e) {
            e.preventDefault();
            randominzeValues();
            $('#chart-container').highcharts().destroy();
            createChart();
            $(".chart-periodo").html("Período " + $(this).text());
        });

    });

}