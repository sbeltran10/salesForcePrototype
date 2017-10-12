var initChart3 = function () {

    var gerentes = [];
    var dataMeta = [];
    var dataActual = [];
    var i = 0;
    dataObtained.query2.forEach(function (elementData) {
        if (elementData.total > 0 && i < 15) {
            gerentes.push(elementData.Apellidos__c);
            var randomValMeta = Math.floor(Math.random() * (50000000 - 40000000 + 1) + 40000000);
            var randomValActual = Math.floor(Math.random() * (45000000 - 15000000 + 1) + 15000000);
            dataMeta.push(randomValMeta);
            dataActual.push(randomValActual);
            i += 1;
        }
    }, this);

    // LINE CHART
    var createChart = function () {
        Highcharts.chart('line-chart-container', {
            chart: {
                type: 'line'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: gerentes
            },
            yAxis: {
                title: {
                    text: 'Ingresos en Ventas'
                }
            },
            plotOptions: {
                line: {
                    enableMouseTracking: true
                }
            },
            series: [{
                name: 'Meta de Ventas',
                data: dataMeta
            }, {
                name: 'Ventas Actuales',
                data: dataActual
            }]
        });
    }
    createChart();

    var randominzeValues = function(){
        dataMeta = [];
        dataActual = [];
        var j = 0;
        dataObtained.query2.forEach(function (elementData) {
            if (elementData.total > 0 && j < 15) {
                gerentes.push(elementData.Apellidos__c);
                var randomValMeta = Math.floor(Math.random() * (50000000 - 40000000 + 1) + 40000000);
                var randomValActual = Math.floor(Math.random() * (45000000 - 15000000 + 1) + 15000000);
                dataMeta.push(randomValMeta);
                dataActual.push(randomValActual);
                j += 1;
            }
        }, this);
    }

    $(function () {

        $(".drop-line .dropdown-menu li a").click(function (e) {
            e.preventDefault();
            randominzeValues();
            $('#line-chart-container').highcharts().destroy();
            createChart();
            $(".line-periodo").html("Período " + $(this).text());

        });

    });

}