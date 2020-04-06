const getData = () => {
    // New XMLHttpRequest instance
    const xhr = new XMLHttpRequest();
    const xhr2 = new XMLHttpRequest();
    const xhr3 = new XMLHttpRequest();

    // API URL
    const apiURL2 = "https://indonesia-covid-19.mathdro.id/api";
    const apiURLProv = "https://indonesia-covid-19.mathdro.id/api/provinsi";
    // const apiURL = "https://covid19.mathdro.id/api/countries/ID/confirmed";
    const apiTimeline = "https://indonesia-covid-19.mathdro.id/api/harian";
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Membuka jalur untuk ke API
    xhr.open('GET', apiURL2);

    xhr.onload = () => {
        // Mengambil data dari response.
        const data = JSON.parse(xhr.response);
        
        // Menambahkan data ke HTML dengan id "total_case", "total_recovered", dan "total_death".
        // Data disisipkan ke attribut "data-number" untuk ditampilkan
        document.getElementById("total_case").setAttribute("data-number", data.jumlahKasus);
        document.getElementById("total_recovered").setAttribute("data-number", data.sembuh);
        document.getElementById("total_death").setAttribute("data-number", data.meninggal);
    };

    // Mengirimkan request
    xhr.send();

    // Membuka jalur untuk ke API
    xhr2.open('GET', apiURLProv);

    xhr2.onload = () => {
        // Mengambil data dari response.
        const dataProv = JSON.parse(xhr2.response);
        
        // Menambahkan data ke HTML dengan id "total_case", "total_recovered", dan "total_death".
        // Data disisipkan ke attribut "data-number" untuk ditampilkan
        let datas = dataProv.data;
        let html = '';
        let cats = [];
        let sers = [];
        let vals = [];
        let sem = [];
        let death = [];
        for (let index = 0; index < datas.length; index++) {
            cats.push(datas[index].provinsi);
            vals.push(datas[index].kasusPosi);
            sem.push(datas[index].kasusSemb);
            death.push(datas[index].kasusMeni);
            html += '<div class="col-sm-3 col-md-3">';
            html += '<div class="card text-white bg-danger mb-3" style="width:auto;">';
            html += '<div class="card-header text-center">'+datas[index].provinsi+'</div><div class="card-body">';
            html += '<p class="card-text">Terinfeksi : '+datas[index].kasusPosi+'</p><hr>';
            html += '<p class="card-text">Sembuh : '+datas[index].kasusSemb+'</p><hr>';
            html += '<p class="card-text">Meninggal : '+datas[index].kasusMeni+'</p></div></div></div>';
        }
        document.getElementById("data-prov").innerHTML = html;
        sers.push({name : 'Terinfeksi', data : vals},{name : 'Sembuh' , data : sem}, {name : 'Meniggal' , data : death});
        Highcharts.chart('statprov', {
            colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
            '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
            chart: {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                    stops: [
                        [0, '#2a2a2b'],
                        [1, '#3e3e40']
                    ]
                },
                style: {
                    fontFamily: '\'Unica One\', sans-serif'
                },
                plotBorderColor: '#606063',
                type : 'column',
                labels: {
                    style: {
                        color: '#fff'
                    }
                }
            },
            title: {
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase',
                    fontSize: '20px'
                },
                text: 'Data Virus Corona Indonesia Per Provinsi'
            },
            subtitle: {
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase'
                }
            },
            xAxis: {
                categories: cats,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Rainfall (mm)'
                },
                labels: {
                    style: {
                        color: '#E0E0E3'
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                tickWidth: 1,
                title: {
                    style: {
                        color: '#A0A0A3'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                style: {
                    color: '#F0F0F0'
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                },
                series: {
                    dataLabels: {
                        color: '#F0F0F3',
                        style: {
                            fontSize: '13px'
                        }
                    },
                    marker: {
                        lineColor: '#333'
                    }
                },
                boxplot: {
                    fillColor: '#505053'
                },
                candlestick: {
                    lineColor: 'white'
                },
                errorbar: {
                    color: 'white'
                }
            },
            series: sers,
            legend: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                itemStyle: {
                    color: '#E0E0E3'
                },
                itemHoverStyle: {
                    color: '#FFF'
                },
                itemHiddenStyle: {
                    color: '#606063'
                },
                title: {
                    style: {
                        color: '#C0C0C0'
                    }
                }
            },
            credits: {
                style: {
                    color: '#666'
                }
            },
            labels: {
                style: {
                    color: '#707073'
                }
            },
            drilldown: {
                activeAxisLabelStyle: {
                    color: '#F0F0F3'
                },
                activeDataLabelStyle: {
                    color: '#F0F0F3'
                }
            },
            navigation: {
                buttonOptions: {
                    symbolStroke: '#DDDDDD',
                    theme: {
                        fill: '#505053'
                    }
                }
            },
            // scroll charts
            rangeSelector: {
                buttonTheme: {
                    fill: '#505053',
                    stroke: '#000000',
                    style: {
                        color: '#CCC'
                    },
                    states: {
                        hover: {
                            fill: '#707073',
                            stroke: '#000000',
                            style: {
                                color: 'white'
                            }
                        },
                        select: {
                            fill: '#000003',
                            stroke: '#000000',
                            style: {
                                color: 'white'
                            }
                        }
                    }
                },
                inputBoxBorderColor: '#505053',
                inputStyle: {
                    backgroundColor: '#333',
                    color: 'silver'
                },
                labelStyle: {
                    color: 'silver'
                }
            },
            navigator: {
                handles: {
                    backgroundColor: '#666',
                    borderColor: '#AAA'
                },
                outlineColor: '#CCC',
                maskFill: 'rgba(255,255,255,0.1)',
                series: {
                    color: '#7798BF',
                    lineColor: '#A6C7ED'
                },
                xAxis: {
                    gridLineColor: '#505053'
                }
            },
            scrollbar: {
                barBackgroundColor: '#808083',
                barBorderColor: '#808083',
                buttonArrowColor: '#CCC',
                buttonBackgroundColor: '#606063',
                buttonBorderColor: '#606063',
                rifleColor: '#FFF',
                trackBackgroundColor: '#404043',
                trackBorderColor: '#404043'
            }
        });
    };

    // Mengirimkan request
    xhr2.send();

    // Membuka jalur untuk ke API
    xhr3.open('GET', apiTimeline);

    xhr3.onload = () => {
        // Mengambil data dari response.
        const dataTimeline = JSON.parse(xhr3.response);
        
        // Menambahkan data ke HTML dengan id "total_case", "total_recovered", dan "total_death".
        // Data disisipkan ke attribut "data-number" untuk ditampilkan
        let datas = dataTimeline.data;
        let cats = [];
        let sers = [];
        let vals = [];
        let sem = [];
        let death = [];
        for (let index = 0; index < datas.length; index++) {
            let date = new Date(datas[index].tanggal); 
            cats.push(date.getDate()+'-'+monthNames[date.getMonth()]+'-'+date.getFullYear());
            vals.push(datas[index].jumlahKasusBaruperHari);
            sem.push(datas[index].jumlahPasienSembuh);
            death.push(datas[index].jumlahPasienMeninggal);
        }
        sers.push({name : 'Terinfeksi', data : vals},{name : 'Sembuh' , data : sem}, {name : 'Meniggal' , data : death});
        // console.log(sers);

        

        Highcharts.chart('dataline', {
            colors: ['#2b908f', '#90ee7e', '#f45b5b', '#7798BF', '#aaeeee', '#ff0066',
            '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#aaeeee'],
            chart: {
                backgroundColor: {
                    linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
                    stops: [
                        [0, '#2a2a2b'],
                        [1, '#3e3e40']
                    ]
                },
                style: {
                    fontFamily: '\'Unica One\', sans-serif'
                },
                plotBorderColor: '#606063',
                type : 'column',
                labels: {
                    style: {
                        color: '#fff'
                    }
                }
            },
            title: {
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase',
                    fontSize: '20px'
                },
                text: 'Wabah Virus Corona Indonesia'
            },
            subtitle: {
                style: {
                    color: '#E0E0E3',
                    textTransform: 'uppercase'
                }
            },
            xAxis: {
                categories: cats,
                crosshair: true
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Rainfall (mm)'
                },
                labels: {
                    style: {
                        color: '#E0E0E3'
                    }
                },
                lineColor: '#707073',
                minorGridLineColor: '#505053',
                tickColor: '#707073',
                tickWidth: 1,
                title: {
                    style: {
                        color: '#A0A0A3'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.85)',
                style: {
                    color: '#F0F0F0'
                }
            },
            plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0
                },
                series: {
                    dataLabels: {
                        color: '#F0F0F3',
                        style: {
                            fontSize: '13px'
                        }
                    },
                    marker: {
                        lineColor: '#333'
                    }
                },
                boxplot: {
                    fillColor: '#505053'
                },
                candlestick: {
                    lineColor: 'white'
                },
                errorbar: {
                    color: 'white'
                }
            },
            series: sers,
            legend: {
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                itemStyle: {
                    color: '#E0E0E3'
                },
                itemHoverStyle: {
                    color: '#FFF'
                },
                itemHiddenStyle: {
                    color: '#606063'
                },
                title: {
                    style: {
                        color: '#C0C0C0'
                    }
                }
            },
            credits: {
                style: {
                    color: '#666'
                }
            },
            labels: {
                style: {
                    color: '#707073'
                }
            },
            drilldown: {
                activeAxisLabelStyle: {
                    color: '#F0F0F3'
                },
                activeDataLabelStyle: {
                    color: '#F0F0F3'
                }
            },
            navigation: {
                buttonOptions: {
                    symbolStroke: '#DDDDDD',
                    theme: {
                        fill: '#505053'
                    }
                }
            },
            // scroll charts
            rangeSelector: {
                buttonTheme: {
                    fill: '#505053',
                    stroke: '#000000',
                    style: {
                        color: '#CCC'
                    },
                    states: {
                        hover: {
                            fill: '#707073',
                            stroke: '#000000',
                            style: {
                                color: 'white'
                            }
                        },
                        select: {
                            fill: '#000003',
                            stroke: '#000000',
                            style: {
                                color: 'white'
                            }
                        }
                    }
                },
                inputBoxBorderColor: '#505053',
                inputStyle: {
                    backgroundColor: '#333',
                    color: 'silver'
                },
                labelStyle: {
                    color: 'silver'
                }
            },
            navigator: {
                handles: {
                    backgroundColor: '#666',
                    borderColor: '#AAA'
                },
                outlineColor: '#CCC',
                maskFill: 'rgba(255,255,255,0.1)',
                series: {
                    color: '#7798BF',
                    lineColor: '#A6C7ED'
                },
                xAxis: {
                    gridLineColor: '#505053'
                }
            },
            scrollbar: {
                barBackgroundColor: '#808083',
                barBorderColor: '#808083',
                buttonArrowColor: '#CCC',
                buttonBackgroundColor: '#606063',
                buttonBorderColor: '#606063',
                rifleColor: '#FFF',
                trackBackgroundColor: '#404043',
                trackBorderColor: '#404043'
            }
        });
    };

    // Mengirimkan request
    xhr3.send();

};