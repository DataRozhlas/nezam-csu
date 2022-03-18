Highcharts.setOptions({
    lang: {
      numericSymbols: [' tis.', ' mil.', 'mld.', 'T', 'P', 'E'],
    },
  });

fetch('https://data.irozhlas.cz/nezam-csu/nezam.json')
  .then(response => response.json())
  .then(d => {
    const upd = Object.keys(d).slice(-1)[0].split('-');
    Highcharts.chart('graf_nezam', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Lidé aktuálně hledající práci'
        },
        subtitle: {
            text: `aktuální k ${parseInt(upd[2])}. ${parseInt(upd[1])}. ${upd[0]}`,
            useHTML: true
        },
        credits: {
            href : 'https://www.czso.cz/csu/czso/uchazeci-o-zamestnani-dosazitelni-a-podil-nezamestnanych-osob-podle-obci_090417',
            text : 'Dosažitelní uchazeči o zaměstnání, ČSÚ'
        },
        xAxis: {
            categories: Object.keys(d).map((v) => `${parseInt(v.split('-')[1])}. ${v.split('-')[0]}`)
        },
        yAxis: {
            min: 0,
            title: {
                text: 'počet osob'
            }
        },
        plotOptions: {
            series: {
                stacking: 'normal',
                animation: false,
            }
        },
        tooltip: {
            shared: true,
        },
        series: [{
            name: 'ženy',
            color: '#e41a1c',
            data: Object.values(d).map((v) => v.z)
        }, {
            name: 'muži',
            color: '#377eb8',
            data: Object.values(d).map((v) => v.m)
        }]
    });
  });


