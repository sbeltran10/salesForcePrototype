var initChart5 = function () {

    // Calculos para el query 3

    var sideSeriesFather = [
        {
            name: "Prospección",
            y: 30,
        },
        {
            name: "Calificación",
            y: 40,
        },
        {
            name: "Necesita Análisis",
            y: 10,
        },
        {
            name: "Proposición de Valor",
            y: 17,
        },
        {
            name: "Propuesta",
            y: 15,
        },
        {
            name: "Cerrada Ganada",
            y: 20,
        },
        {
            name: "Cerrada Perdida",
            y: 9,
        },
    ];
    var sideSeriesChild = [];

    // SIDE CHART

    var createChart = function () {
        Highcharts.chart('side-chart-container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                categories: ['Prospección', 'Calificación', 'Necesita Análisis', 'Proposición de Valor', 'Propuesta', 'Cerrada Ganada', 'Cerrada Perdida'],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Cantidad de Oportunidades en Estado (millions)',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' millions'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 80,
                floating: true,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'Oportunidades',
                colorByPoint: true,
                data: sideSeriesFather
            }]
        });
    }

    createChart();

    var randominze = function () {
        sideSeriesFather.forEach(function (element) {
            var randomVal = Math.floor(Math.random() * (68 - 6 + 1) + 6);
            element.y = randomVal;
        }, this);
    }

    $(function () {

        $(".drop-side .dropdown-menu li a").click(function (e) {
            e.preventDefault();
            $(".side-periodo").html("Período " + $(this).text());
            randominze();
            $('#side-chart-container').highcharts().destroy();
            createChart();
        });

    });
}