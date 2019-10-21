<template>
    <div id="home">
        <my-header></my-header>
        <main>
            <!--样式里的l,m,r,t,b分别代表左，中，右，上，下-->
            <div class="l">
                <div class="l-t">
                    <div class="chart-wrap">
                        <!--                    标题-->
                        <h3>警情统计监测</h3>
                        <!--                    内容-->
                        <div class="chartBox">
                            <!--                        数据-->
                            <ul class="statistics">
                                <li v-for="item in jqtjjcData" :key="item.name">
                                    <p>{{item.name}}</p>
                                    <p>{{item.value}}</p>
                                </li>
                            </ul>
                            <!--                        图表-->
                            <div class="chart" id="jqtjjc"></div>
                        </div>
                    </div>
                </div>
                <div class="l-m">
                    <div class="chart-wrap">
                        <h3>近期警情统计</h3>
                        <div class="chartBox">
                            <!--                        图表-->
                            <div class="chart" id="jqjqtj"></div>
                        </div>
                    </div>
                </div>
                <div class="l-b">
                    <div class="chart-wrap">
                        <h3>警情分类数据分析</h3>
                        <div class="chart" id="jqflsjfx"></div>
                    </div>
                </div>
            </div>

            <div class="m">
                <div class="m-t">
                    <div class="chart-wrap">
                        <h3>警情统计监测</h3>
                        <div class="chart"></div>
                    </div>
                </div>
            </div>

            <div class="r">
                <div class="r-t">
                    <div class="chart-wrap">
                        <h3>警情统计监测</h3>
                        <div class="chart"></div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import MyHeader from "../components/Header";

    export default {
        name: "Test",
        components: {MyHeader},
        data(){
            return {
                axisesColor:'#0057ab',
                scale:1,
                date:7,
                //警情统计监测
                jqtjjcData:[
                    {name: '报警事件总数', value: 18364},
                    {name: '有效警情总数', value: 18364},
                    {name: '处警事件总数', value: 18364},
                    {name: '反馈事件总数', value: 18364},
                ],
                jqtjjcSource: [
                    {name: '处警时间占比', value: 85,radius:'60%'},
                    {name: '有效警情占比', value: 90,radius:'70%'},
                    {name: '反馈事件占比', value: 95,radius:'60%'}
                ],
                //    近期警情统计
                jqjqtjScoure: [
                    [900, 1100, 700, 900, 1000, 600, 500]
                ],
                //    警情分类数据分析
                jqflsjfxSource:[
                    ['刑事', '行政(治安)', '交通类', '消防救援', '群众救助', '应急联动事件(非警情事件)', '群体事件', '纠纷', '灾害事故', '举报', '投诉监督'],
                    [1300, 1500, 900, 900, 1400, 1100, 1500, 1400, 800, 850, 700]
                ],
            }
        },
        methods:{
            //获取缩放比例
            getScale(){
                this.scale=localStorage.getItem('scale');
            },
            //    警情统计监测
            panChart() {
                let myChart = this.$echarts.init(document.getElementById('jqtjjc'));
                let that=this;
                let sourceArr = this.jqtjjcSource;
                let colorSet = [
                    [0.2, '#c23531'],
                    [0.8, '#63869e'],
                    [1, '#91c7ae']
                ];
                let option = {
                    series: (function () {
                        let result = [];
                        sourceArr.forEach(function (item, index) {
                            result.push(
                                // 外围刻度
                                {
                                    type: 'gauge',
                                    radius: item.radius,
                                    center: [index * 30 + 20 + '%', '40%'],
                                    axisLine: {
                                        show: true,
                                        lineStyle: {
                                            color: colorSet,
                                            width: 25*that.scale,
                                            shadowOffsetX: 0,
                                            shadowOffsetY: 0,
                                            opacity: 1
                                        }
                                    },
                                    detail: {
                                        show: 0
                                    }
                                },
                                // 内侧指针、数值显示
                                {
                                    name: item.name,
                                    type: 'gauge',
                                    center: [index * 30 + 20 + '%', '40%'],
                                    radius: item.radius,
                                    axisLine: {
                                        show: true,
                                        lineStyle: {
                                            color: colorSet,
                                            width: 25*that.scale,
                                            shadowOffsetX: 0,
                                            shadowOffsetY: 0,
                                            opacity: 1
                                        }
                                    },
                                    detail: {
                                        show: true,
                                        offsetCenter: [0, '100%'],
                                        textStyle: {
                                            fontSize: 20,
                                        },
                                        formatter: [
                                            '{value}% ' + (item.unit || ''),
                                            '{name|' + item.name + '}'
                                        ].join('\n'),
                                        rich: {
                                            name: {
                                                fontSize: 14*that.scale,
                                                lineHeight: 100*that.scale,
                                            }
                                        }
                                    },
                                    data: [{
                                        value: item.value
                                    }]
                                }
                            );
                        });
                        return result;
                    })()
                };
                myChart.setOption(option);
            },
            //    近期警情统计
            jqjqtjChart() {
                let myChart = this.$echarts.init(document.getElementById('jqjqtj'));
                let that = this;
                let sourceArr=that.jqjqtjScoure;
                let dateArr=[];
                for (let i = 0; i < this.date; i++) {
                    let timestamp = (new Date()).getTime();
                    let day = timestamp - (i - 1) * 24 * 60 * 60 * 1000;
                    let date = new Date(day);
                    dateArr.push(date.getMonth() + 1 + '-' + date.getDate());
                }
                sourceArr.unshift(dateArr);
                console.log(sourceArr);
                let option = {
                    dataset: {
                        source: sourceArr
                    },
                    xAxis: {
                        type: 'category',
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: this.axisesColor
                            }
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: this.axisesColor
                            }
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    series: {
                        type: 'bar',
                        stack: 'chart',
                        seriesLayoutBy: 'row',
                        itemStyle: {
                            color:  new this.$echarts.graphic.LinearGradient(
                                //右，下，左，上
                                0, 0, 0, 1, [{
                                    //0%位置的颜色
                                    offset: 0,
                                    color: '#288cf7'
                                },
                                    {
                                        //100%位置的颜色
                                        offset: 1,
                                        color: '#6653f1'
                                    }
                                ]
                            )
                        },
                        barWidth: 17*that.scale
                    },
                    tooltip: {}
                };
                myChart.setOption(option);
            },
            //    警情分类数据分析
            jqflsjfx() {
                let myChart = this.$echarts.init(document.getElementById('jqflsjfx'));
                let sourceArr = this.jqflsjfxSource;
                let option = {
                    dataset: {
                        source: sourceArr
                    },
                    xAxis: {
                        type: 'category',
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: this.axisesColor
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            rotate: 30,
                            formatter: function (params) {
                                let newParamsName = "";
                                let paramsNameNumber = params.length;
                                let provideNumber = 7;  //一行显示几个字
                                let rowNumber = Math.ceil(paramsNameNumber / provideNumber);
                                if (paramsNameNumber > provideNumber) {
                                    for (let p = 0; p < rowNumber; p++) {
                                        let tempStr = "";
                                        let start = p * provideNumber;
                                        let end = start + provideNumber;
                                        if (p == rowNumber - 1) {
                                            tempStr = params.substring(start, paramsNameNumber);
                                        } else {
                                            tempStr = params.substring(start, end) + "\n";
                                        }
                                        newParamsName += tempStr;
                                    }

                                } else {
                                    newParamsName = params;
                                }
                                return newParamsName
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: this.axisesColor
                            }
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    series: {
                        type: 'bar',
                        stack: 'chart',
                        seriesLayoutBy: 'row',
                        itemStyle: {
                            color:  new this.$echarts.graphic.LinearGradient(
                                //右，下，左，上
                                0, 0, 0, 1, [{
                                    //0%位置的颜色
                                    offset: 0,
                                    color: '#fcc60a'
                                },
                                    {
                                        //100%位置的颜色
                                        offset: 1,
                                        color: '#f5834a'
                                    }
                                ]
                            )
                        },
                        barWidth: 17
                    },
                    tooltip: {}
                };
                myChart.setOption(option);
            },
        },
        mounted() {
            this.getScale();
            this.panChart();
            this.jqjqtjChart();
            this.jqflsjfx();
        }
    }
</script>

<style scoped lang="scss">
    //样式里的l, m, r, t, b分别代表左，中，右，上，下
    //布局
    main {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .l, .m, .r {
            width: 24.96rem;
        }

        .r {
            width: 38.73rem;
        }

        .l > div, .m > div, .r > div {
            width: 100%;
            align-content: space-between;
        }

        .l-t {
            height: 16.1rem;
        }

        .chart-wrap {
            border: .0625rem solid rgba(76, 180, 231, 0.33);
            //标题
            h3 {
                text-align: center;
            }

            //内容
            .chartBox {
                height: 14.83rem;
                margin: 0 auto;
                //数据
                .statistics {
                    width: 100%;
                    height: 2.25rem;
                    display: flex;
                    justify-content: space-between;

                    li {
                        transform: scale(0.64);
                        transform-origin: top;
                        height: 3.69rem;

                        p {
                            color: #00a8ff;
                            text-align: center;

                            &:first-child {
                                margin-bottom: 0.91rem;
                            }
                        }
                    }

                }

                // 图表
                #jqtjjc{
                    width: 100%;
                    height: 11.31rem;
                }

                .chart{
                    width: 100%;
                    height: 100%;
                    background: #ffffff;
                }
            }
        }
    }
</style>