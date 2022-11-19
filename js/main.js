        // More info about initialization & config:
        // - https://revealjs.com/initialization/
        // - https://revealjs.com/config/
        Reveal.initialize({
          hash: true,
          controls: true,
          progress: true,
          history: true,
          center: true,

          // Learn about plugins: https://revealjs.com/plugins/
          plugins: [RevealMarkdown, RevealHighlight, RevealNotes],
         // multiplex: {
            // Example values. To generate your own, see the socket.io server instructions.
          //  secret: null, // null so the clients do not have control of the master presentation
          //  id: '1ea875674b17ca76', // id, obtained from socket.io server
          //  url: 'https://reveal-multiplex.glitch.me/' // Location of socket.io server
         // },

          // Don't forget to add the dependencies
          dependencies: [{
              src: 'https://reveal-multiplex.glitch.me/socket.io/socket.io.js',
              async: true
            },
            {
              src: 'https://reveal-multiplex.glitch.me/client.js',
              async: true
            }
          ]
        });


        Reveal.addEventListener('salary', function () {
          console.log('stats called!');
          animatenum(39, '#decimals', 2);
        });
        Reveal.addEventListener('jobs', function () {
          console.log('stats called!');
          animatenum(2849, '#jobs', 0);
        });
        Reveal.addEventListener('guage', function () {
          console.log('guags called!');
          guage();
        });
        Reveal.addEventListener('firmnum', function () {
          console.log('graphs');
          jobgraph();
        });

        Reveal.addEventListener('activity', function () {
          console.log('graphs');
          //activitygraph();
        });

        var animatenum = function (num, obj, dec) {
          var decimal_places = dec;
          var decimal_factor = decimal_places === 0 ? 1 : Math.pow(10, decimal_places);
          $(obj)
            .animateNumber({
                number: num * decimal_factor,

                numberStep: function (now, tween) {
                  var floored_number = Math.floor(now) / decimal_factor,
                    target = $(tween.elem);

                  if (decimal_places > 0) {
                    // force decimal places even if they are 0
                    floored_number = floored_number.toFixed(decimal_places);

                    // replace '.' separator with ','
                    floored_number = floored_number.toString().replace('.', ',');
                  }

                  target.text(floored_number);
                }
              },
              3000
            );
        }

        var guage = function () {
          var gaugeOptions = {

            chart: {
              type: 'solidgauge'
            },

            title: null,

            pane: {
              center: ['50%', '75%'],
              size: '100%',
              startAngle: -90,
              endAngle: 90,
              background: {
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
                [0.1, '#55BF3B']
              ],
              lineWidth: 0,
              minorTickInterval: null,
              tickAmount: 1,
              title: {
                y: 0
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
          var chartSpeed = Highcharts.chart('container-speed', Highcharts.merge(gaugeOptions, {
            yAxis: {
              min: 0,
              max: 70000,
                tickPositioner: function() {
  return [this.min, this.max];
} ,
              title: {
                text: 'Salary'
              }
            },

            credits: {
              enabled: false
            },

            series: [{
              name: '',
              data: [38547],
              dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:25px;color:'
                  + ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">£38,547.00</span></div>',

              },
              tooltip: {
                valueSuffix: ' £'
              }
            }]

          }));

        }
        var jobgraph = function () {
          // Create the chart
          Highcharts.chart('sectorcontainer', {

            chart: {
              type: 'column'
            },
            title: {
              text: 'Firms Creating New Design Jobs 2020'
            },
            subtitle: {
              text: ''
            },
            xAxis: {
              type: 'category'
            },
            yAxis: {
              title: {
                text: 'Total amount of new jobs'
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
                  format: '{point.y:.1f}k'
                }
              }
            },
            credits: {
              enabled: false
            },

            tooltip: {
              headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
              pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
            },

            series: [{
              name: 'Brands',
              colorByPoint: true,
              data: [{
                name: 'Design Firms',
                y: 72.340
              }, {
                name: 'Admin/business Firms',
                y: 73.100
              }, {
                name: 'Legal/ accounting Firms ',
                y: 75.600
              }, {
                name: 'Building/ construction Firms ',
                y: 76.300
              }]
            }]
          });


        };

        var activitygraph = function () {

          Highcharts.chart('activitygraph', {

              chart: {
                type: 'solidgauge',
                marginTop: 50
              },

              title: {
                text: 'Activity',
                style: {
                  fontSize: '24px'
                }
              },

              tooltip: {
                borderWidth: 0,
                backgroundColor: 'none',
                shadow: false,
                style: {
                  fontSize: '16px'
                },
                pointFormat: '{series.name}<br><span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}%</span>',
                positioner: function (labelWidth) {
                  return {
                    x: 200 - labelWidth / 2,
                    y: 180
                  };
                }
              },

              pane: {
                startAngle: 0,
                endAngle: 360,
                background: [{ // Track for Move
                  outerRadius: '112%',
                  innerRadius: '88%',
                  backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0])
                    .setOpacity(0.3)
                    .get(),
                  borderWidth: 0
                }, { // Track for Exercise
                  outerRadius: '87%',
                  innerRadius: '63%',
                  backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[1])
                    .setOpacity(0.3)
                    .get(),
                  borderWidth: 0
                }]
              },

              yAxis: {
                min: 0,
                max: 100,
                lineWidth: 0,
                tickPositions: []
              },

              plotOptions: {
                solidgauge: {
                  dataLabels: {
                    enabled: false
                  },
                  linecap: 'round',
                  stickyTracking: false,
                  rounded: true
                }
              },

              series: [{
                name: 'Move',
                data: [{
                  color: Highcharts.getOptions().colors[0],
                  radius: '112%',
                  innerRadius: '88%',
                  y: 80
                }]
              }, {
                name: 'Exercise',
                data: [{
                  color: Highcharts.getOptions().colors[1],
                  radius: '57%',
                  innerRadius: '63%',
                  y: 65
                }]
              }]
            },

            /**
             * In the chart load callback, add icons on top of the circular shapes
             */
            function callback() {

              // Move icon
              this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8])
                .attr({
                  'stroke': '#303030',
                  'stroke-linecap': 'round',
                  'stroke-linejoin': 'round',
                  'stroke-width': 2,
                  'zIndex': 10
                })
                .translate(190, 26)
                .add(this.series[2].group);

              // Exercise icon
              this.renderer.path(['M', -8, 0, 'L', 8, 0, 'M', 0, -8, 'L', 8, 0, 0, 8,
                  'M', 8, -8, 'L', 16, 0, 8, 8
                ])
                .attr({
                  'stroke': '#ffffff',
                  'stroke-linecap': 'round',
                  'stroke-linejoin': 'round',
                  'stroke-width': 2,
                  'zIndex': 10
                })
                .translate(190, 61)
                .add(this.series[2].group);

              // Stand icon
              this.renderer.path(['M', 0, 8, 'L', 0, -8, 'M', -8, 0, 'L', 0, -8, 8, 0])
                .attr({
                  'stroke': '#303030',
                  'stroke-linecap': 'round',
                  'stroke-linejoin': 'round',
                  'stroke-width': 2,
                  'zIndex': 10
                })
                .translate(190, 96)
                .add(this.series[2].group);
            });

        };
