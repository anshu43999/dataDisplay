<template>
    <div id="pjqflsjfx">
        <my-header></my-header>
        <h3 id="back" @click="goBack">返回</h3>
        <main>
            <!--样式里的l,m,r,t,b分别代表左，中，右，上，下-->
            <div class="l">
                <div class="chart-wrap">
                    <div class="chartBox">
                        <my-map ref="map"></my-map>
                    </div>
                </div>
            </div>

            <div class="r">
                <div class="r-t">
                    <div class="r-t-l">
                        <div class="chart-wrap">
                            <h3>{{this.chartTitle[0]}}</h3>
                            <div class="chartBox">
                                <div class="chart" id="bar"></div>
                            </div>
                        </div>
                    </div>
                    <div class="r-t-r">
                        <div class="chart-wrap">
                            <h3>{{this.chartTitle[1]}}</h3>
                            <div class="chartBox">
                                <div class="chart" id="proportionChart"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="r-b">
                    <div class="chart-wrap">
                        <div class="selectListBox">
                            <ul></ul>
                        </div>
                        <div class="chart" id="detailChart"></div>
                        <div class="chart" id="detailProportionChart"></div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import MyHeader from "../components/Header";
    import MyMap from "../components/Map";

    export default {
        name: "PJQFLSJFX",
        components: {
            MyMap, MyHeader
        },
        data() {
            return {
                scale: 1,
                //需要刷新的图表
                refreshCharts: [],
                //    所有的图标对象
                chartsObj: {},
                //坐标轴颜色
                axisesColor: '#0057ab',
                //标题
                chartTitle: [],
                jqflsjfxSource: [
                    {name: '刑事', value: 1300},
                    {name: '行政(治安)', value: 1500},
                    {name: '交通类', value: 900},
                    {name: '消防救援', value: 900},
                    {name: '群众救助', value: 1400},
                    {name: '应急联动事件(非警情事件)', value: 1100},
                    {name: '群体事件', value: 1500},
                    {name: '纠纷', value: 1400},
                    {name: '灾害事故', value: 800},
                    {name: '举报', value: 850},
                    {name: '投诉监督', value: 700}
                ],
                proportionSource: [
                    {name: '刑事', value: 23.5},
                    {name: '行政(治安)', value: 14},
                    {name: '交通类', value: 13.45},
                    {name: '消防救援', value: 23},
                    {name: '群众救助', value: 12.4},
                    {name: '应急联动事件(非警情事件)', value: 13.2},
                    {name: '群体事件', value: 14.56},
                    {name: '纠纷', value: 45},
                    {name: '灾害事故', value: 43},
                    {name: '举报', value: 15.5},
                    {name: '投诉监督', value: 12}
                ],
                detailSource:   [
                    {name: '危害国家安全', value: 3},
                    {name: '危害公共安全', value: 12},
                    {name: '防火', value: 4},
                    {name: '爆炸', value: 1},
                    {name: '劫持', value: 1},
                    {name: '侵犯人身、民主权利', value: 6},
                    {name: '杀人', value: 7},
                    {name: '伤害', value: 8},
                    {name: '强奸', value: 2},
                    {name: '绑架', value: 2},
                    {name: '抢劫', value: 6},
                    {name: '盗窃', value: 7},
                    {name: '诈骗 ', value: 10},
                    {name: '抢夺 ', value: 13},
                    {name: '妨碍社会管理秩序 ', value: 9},
                    {name: '破坏市场经济秩序 ', value: 11},
                    {name: '破坏金融管理秩序 ', value: 8},
                    {name: '金融诈骗 ', value: 9},
                    {name: '侵犯财产 ', value: 6},
                    {name: '破坏环境资源 ', value: 16},
                    {name: '其他刑事警情 ', value: 15},
                ],
            }
        },
        methods: {
            //获取缩放值
            getScale() {
                this.scale = localStorage.getItem('scale');
            },
            //返回
            goBack() {
                this.$router.go(-1);
            },
            setName() {
                this.chartTitle = ['警情分类数据分析', '警情分类数据占比分析']
            },
            //柱状图
            /*barChart(chartContainer, sourceArr, colorList, xData) {
                let myChart = this.$echarts.init(document.getElementById(chartContainer));
                this.chartsObj[chartContainer] = myChart;
                let option = {
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
                        },
                        data: xData
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
                        data: sourceArr,
                        itemStyle: {
                            color: new this.$echarts.graphic.LinearGradient(
                                //右，下，左，上
                                0, 0, 0, 1, [{
                                    //0%位置的颜色
                                    offset: 0,
                                    color: colorList[0]
                                },
                                    {
                                        //100%位置的颜色
                                        offset: 1,
                                        color: colorList[1]
                                    }
                                ]
                            )
                        },
                        barWidth: 17 * this.scale
                    },
                    tooltip: {}
                };
                myChart.setOption(option);
            },*/
            barChart() {
                let xData = [];
                this.jqflsjfxSource.forEach(value => {
                    xData.push(value.name);
                });
                let sourceArr = this.jqflsjfxSource;
                let myChart = this.$echarts.init(document.getElementById('bar'));
                this.chartsObj['bar'] = myChart;
                let colorList = ['#fcc60a', '#f5834a'];
                let option = {
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
                        },
                        data: xData
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
                        data: sourceArr,
                        itemStyle: {
                            color: new this.$echarts.graphic.LinearGradient(
                                //右，下，左，上
                                0, 0, 0, 1, [{
                                    //0%位置的颜色
                                    offset: 0,
                                    color: colorList[0]
                                },
                                    {
                                        //100%位置的颜色
                                        offset: 1,
                                        color: colorList[1]
                                    }
                                ]
                            )
                        },
                        barWidth: 17 * this.scale
                    },
                    tooltip: {}
                };
                myChart.setOption(option);
            },
            //占比
            percent() {
                let myChart = this.$echarts.init(document.getElementById('proportionChart'));
                this.chartsObj['proportionChart'] = myChart;
                let colorList = ['#ff4860', '#84fff7', '#e3ff7c', '#b137ff', '#387eff', '#ffa4d6', '#a4ffb1', '#cde3ff', '#ec7b15', '#1fa78f', '#8dffd5', '#8e88ff'];
                let xData = [];
                let sourceArr = this.proportionSource;
                sourceArr.forEach(value => {
                    xData.push(value.name);
                });
                let option = {
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
                            showL: true,
                            textStyle: {
                                color: function (value, index) {
                                    return colorList[index];
                                }
                            }
                        },
                        data: xData,
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            show: false
                        },
                        axisTick: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: this.axisesColor
                            }
                        },
                        axisLabel: {
                            show: true,
                            formatter: '{value} %'
                        }
                    },
                    series: {
                        type: 'pictorialBar',
                        barCategoryGap: '-50%',
                        symbol: 'path://M0,10 L10,10 C5.5,10 5.5,5 5,0 C4.5,5 4.5,10 0,10 z',
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    return colorList[params.dataIndex]
                                },
                                opacity: 0.8
                            },
                            emphasis: {
                                opacity: 1
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                formatter: function (params) {
                                    return params.value + '%'
                                }
                            }
                        },
                        data: sourceArr,
                        z: 10
                    },
                    tooltip: {},
                    grid: {
                        top: 90 * this.scale,
                        bottom: 90 * this.scale,
                        left: 140 * this.scale
                    }
                };
                myChart.setOption(option);
            },
            //细类
            detailChart() {
                let myChart = this.$echarts.init(document.getElementById('detailChart'));
                let sourceArr = this.detailSource;
                let yData = [];
                let colorList = ['#0054a2', '#00a0a3'];
                for (let i = 0; i < sourceArr.length; i++) {
                    yData.push(sourceArr[i].name);
                }
                let option = {
                    xAxis: {
                        type: 'value',
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#0c9ca3',
                                type: 'dashed'
                            }
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#0c9ca3',
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: false,
                            fontSize: 12 * this.scale
                        },
                        position: 'top',
                    },
                    yAxis: {
                        type: 'category',
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#0c9ca3',
                                type: 'dashed'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            show: true,
                            fontSize: 12 * this.scale
                        },
                        data: yData
                    },
                    series: {
                        type: 'bar',
                        data: sourceArr,
                        itemStyle: {
                            normal: {
                                color: new this.$echarts.graphic.LinearGradient(
                                    //右，下，左，上
                                    0, 0, 1, 0, [{
                                        //0%位置的颜色
                                        offset: 0,
                                        color: colorList[0]
                                    },
                                        {
                                            //100%位置的颜色
                                            offset: 1,
                                            color: colorList[1]
                                        }
                                    ]
                                )
                            }
                        },
                        label: {
                            normal: {
                                show: true,
                                position: 'right',
                                formatter: function (params) {
                                    return params.value
                                },
                                color: '#0c9ca3'
                            }
                        },
                        barWidth: 17 * this.scale
                    },
                    grid: {
                        top: 70 * this.scale,
                        bottom: 90 * this.scale
                    }
                };
                myChart.setOption(option);
            },
            detailProportionChart(){
                let myChart=this.$echarts.init(document.getElementById('detailProportionChart'));
                let sourceArr=this.detailSource;
                let colorList=['#815179','#66a99f','#fc6262','#8cacc7','#eacf79','#63d3c3','#e9ab50','#b7564f','#d8bcca','#89b8c7','#a4c585','#49bcf3','#8e88ff', '#ff8155','#3ecf6a','#fff497','#c64f47','#81799e','#2f9a94','#9e57b7','#d58a85'];
                sourceArr.forEach((value, index) => {
                    value.itemStyle={
                        normal: {
                            color: colorList[index]
                        }
                    }
                });
                let option={
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b} : {d}%"
                    },
                    series: [{
                        type: 'sunburst',
                        radius: ['45%', '60%'],
                        center: ['50%', '50%'],
                        data: sourceArr,
                        label: {
                            rotate: 'radial',
                        },
                    }]
                };
                myChart.setOption(option);
            },
            renderChart() {
                let myCharts = document.querySelectorAll('.chart');
                myCharts.forEach(value => {
                    this.refreshCharts.push(value.getAttribute('id'))
                });
                let that = this;
                let Index = {
                    init() {
                        this.loadData();
                        Public.chartsResize(that.chartsObj);
                        Public.chartsReDraw(that.chartsObj, null, [], this.refreshCharts)
                    },
                    loadData() {
                        that.barChart();
                        that.percent();
                        that.detailChart();
                        that.detailProportionChart();
                    },
                };
                Index.init();
            }
        },
        mounted() {
            this.getScale();
            this.setName();
            this.renderChart();
        }
    }
</script>

<style scoped lang="scss">
    //样式里的l, m, r, t, b分别代表左，中，右，上，下
    //布局
    #back {
        color: #17fff3;
    }

    main {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .l > div, .m > div, .r > div {
            width: 100%;
            align-content: space-between;
        }

        .chart {
            width: 100%;
            height: 100%;
        }

        .l {
            width: 25.73%;
            height: 42.38rem;

            .chart {
                width: 100%;
                height: 100%;
            }

            .chartBox {
                width: 100%;
                height: 100%;
            }
        }

        .chart-wrap {
            border: .0625rem solid rgba(76, 180, 231, 0.33);
            width: 100%;
            height: 100%;
            //标题
            h3 {
                text-align: center;
            }
        }


        .r {
            width: 72.6%;
            height: 44.36rem;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .r-t {
                width: 100%;
                height: 38.58%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                .chartBox {
                    width: 100%;
                    height: 14.87rem;
                }

                .r-t-l {
                    width: 37.26%;
                    height: 100%;
                }

                .r-t-r {
                    width: 60.52%;
                    height: 100%;
                }
            }

            .r-b {
                width: 100%;
                height: 57.78%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .selectListBox {
                    width: 8.04rem;
                    height: 100%;
                    float: left;

                    ul {
                        width: 100%;
                        height: 21.67rem;
                        background: #17fff3;
                        margin-top: 1.44rem;
                    }
                }

                .chart {
                    width: 21.16rem;
                    height: 100%;
                    float: left;
                    background: aliceblue;
                    margin-left: 1.01rem;
                }
                .chart:nth-child(3){
                    background: antiquewhite;
                    width: 32.77rem;
                    margin-left: 4.11rem;
                }
            }
        }
    }
</style>