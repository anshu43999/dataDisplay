<template>
    <div id="pjqsjfx">
        <my-header></my-header>
        <h3 id="back" @click="goBack">返回</h3>
        <main>
            <!--样式里的l,m,r,t,b分别代表左，中，右，上，下-->
            <div class="l">
                <div class="chart-wrap">
                    <div class="chartBox">
                        <my-map></my-map>
                    </div>
                </div>
            </div>




            <div class="r">
                <div class="r-t">
                    <div class="r-t-l">
                        <div class="chart-wrap">
                            <h3>{{this.chartTitle[0]}}</h3>
                            <div class="chartBox">
                                <div class="chart" id="trendChart"></div>
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
                    <div class="r-b-t">
                        <div class="r-b-t-l-1" v-if="show">
                            <div class="chart-wrap">
                                <h3>{{this.chartTitle[2]}}</h3>
                                <div class="chartBox">
                                    <div class="chart" id="subClassChart1"></div>
                                </div>
                            </div>
                        </div>
                        <div class="r-b-t-r-1" v-if="show">
                            <div class="chart-wrap">
                                <h3>{{this.chartTitle[3]}}</h3>
                                <div class="chartBox">
                                    <div class="chart" id="subClassChart2"></div>
                                </div>
                            </div>
                        </div>

                        <div class="r-b-t-l-2" v-if="!show">
                            <div class="chart-wrap">
                                <h3>{{this.chartTitle[3]}}</h3>
                                <div class="chartBox">
                                    <div class="chart" id="subClassChart5"></div>
                                </div>
                            </div>
                        </div>
                        <div class="r-b-t-m-2" v-if="!show">
                            <div class="chart-wrap">
                                <h3>{{this.chartTitle[3]}}</h3>
                                <div class="chartBox">
                                    <div class="chart" id=""></div>
                                </div>
                            </div>
                        </div>
                        <div class="r-b-t-r-2" v-if="!show">
                            <div class="chart-wrap">
                                <h3>{{this.chartTitle[3]}}</h3>
                                <div class="chartBox">
                                    <div class="chart" id=""></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="r-b-b">
                        <div class="r-b-b-l-1" v-if="show">
                            <div class="chart-wrap">
                                <h3>{{this.chartTitle[4]}}</h3>
                                <div class="chartBox">
                                    <div class="chart" id="subClassChart3"></div>
                                </div>
                            </div>
                        </div>
                        <div class="r-b-b-r-1" v-if="show">
                            <div class="chart-wrap">
                                <h3>{{this.chartTitle[5]}}</h3>
                                <div class="chartBox">
                                    <div class="chart" id="subClassChart4"></div>
                                </div>
                            </div>
                        </div>

                        <div class="r-b-b-l-2" v-if="!show">
                            <div class="chart-wrap">
                                <h3>{{this.chartTitle[3]}}</h3>
                                <div class="chartBox">
                                    <div class="chart" id=""></div>
                                </div>
                            </div>
                        </div>
                        <div class="r-b-b-m-2" v-if="!show">
                            <div class="chart-wrap">
                                <h3>{{this.chartTitle[3]}}</h3>
                                <div class="chartBox">
                                    <div class="chart" id=""></div>
                                </div>
                            </div>
                        </div>
                        <div class="r-b-b-r-2" v-if="!show">
                            <div class="chart-wrap">
                                <h3>{{this.chartTitle[3]}}</h3>
                                <div class="chartBox">
                                    <div class="chart" id=""></div>
                                </div>
                            </div>
                        </div>
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
        name: "PJQSJFX",
        components: {MyHeader,MyMap},
        data() {
            return {
                show:true,
                //图表公用
                refreshCharts: [],
                chartsObj: {},
                axisesColor: '#0057ab',
                //缩放值
                scale: 1,
                //默认获取本周数据
                period: 'week',
                //标题
                chartTitle: [],
                mapData: {name: '报警事件总数', value: 96666},
                //近七日接警类型数据分析
                trendChartSource: [],
                trendChartColor: [],
                //    警情数据占比分析
                proportionSource: [],
                //市
                citySource: ['太原市', '大同市', '朔州市', '忻州市', '吕梁市', '晋中市', '阳泉市', '长治市', '晋城市', '临汾市', '运城市'],
                //细类1
                subClassSource1: [],
                subClassColorList1: [],
                //细类2
                subClassSource2: [],
                subClassColorList2: [],
                //细类3
                subClassSource3: [],
                subClassColorList3: [],
                //细类4
                subClassSource4: [],
                subClassColorList4: [],
                //细类5
                subClassSource5: [],
                subClassColorList5: [],
                //    //细类6
                subClassSource6: [],
                subClassColorList6: [],
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
            //趋势图
            sevensjfx(chartContainer, sourceArr, colorList) {
                let seriesArr = [];
                let dateArr = [];
                let myChart = this.$echarts.init(document.getElementById(chartContainer));
                this.chartsObj[chartContainer] = myChart;
                switch (this.period) {
                    case "week":
                        for (let i = 0; i < 7; i++) {
                            let timestamp = (new Date()).getTime();
                            let day = timestamp - (i - 1) * 24 * 60 * 60 * 1000;
                            let date1 = new Date(day);
                            dateArr.push(date1.getMonth() + 1 + '-' + date1.getDate());
                        }
                        break;
                    case 'lastWeek':
                        let date2 = new Date();
                        date2.setDate(date2.getDate() - (date2.getDay() + 6) % 7);
                        date2.setDate(date2.getDate() - 8);
                        for (let i = 0; i < 7; i++) {
                            date2.setDate(date2.getDate() + 1);
                        }
                        break;
                }
                dateArr.reverse();
                for (let i = 0; i < sourceArr.length; i++) {
                    seriesArr.push({
                        name: sourceArr[i].name,
                        type: "line",
                        showSymbol: false,
                        smooth: true,
                        itemStyle: {
                            normal: {
                                color: colorList[i]
                            }
                        },
                        lineStyle: {
                            width: 3
                        },
                        data: sourceArr[i].value
                    });
                }
                let option = {
                    legend: {
                        textStyle: {
                            fontSize: 12 * this.scale,
                            color: function (params) {
                                return colorList[params.dataIndex]
                            }
                        },
                        itemWidth: 12 * this.scale,
                        itemHeight: 12 * this.scale,
                    },
                    xAxis: {
                        type: 'category',
                        splitLine: {
                            show: false
                        },
                        boundaryGap: false,
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: this.axisesColor
                            }
                        },
                        axisTick: {
                            show: false
                        },
                        data: dateArr
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            show: true,
                            lineStyle: {
                                type: 'dashed',
                                color: '#03eeff'
                            }
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
                    series: seriesArr,
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            lineStyle: {
                                color: '#57617B'
                            }
                        },
                    },
                    grid: {
                        top: 90 * this.scale,
                        bottom: 90 * this.scale,
                        left: 140 * this.scale
                    }
                };
                myChart.setOption(option);
            },
            //占比
            percent() {
                let myChart = this.$echarts.init(document.getElementById('proportionChart'));
                this.chartsObj['proportionChart'] = myChart;
                let colorList = this.trendChartColor;
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
                                    return params.value+'%'
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
            //    细类柱状图
            subclassBar(chartContainer, sourceArr, colorList) {
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
                            // fontSize : 16 * this.scale,
                            fontSize: 18 * this.scale
                        },
                        data: this.citySource
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
                        },
                        axisLabel: {
                            // rotate: 30,
                            fontSize: 18 * this.scale
                        },
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
                    // grid:{
                    //     left : 5 + '%',
                    //     right : 5  + '%',

                    // },
                    tooltip: {},
                    grid: {
                        top: 90 * this.scale,
                        bottom: 80 * this.scale,
                        left: 100 * this.scale,
                        right: 80 * this.scale
                    }
                };
                myChart.setOption(option);
            },

            renderChart() {
                let myCharts = document.querySelectorAll('.chart');
                myCharts.forEach(value => {
                    this.refreshCharts.push(value.getAttribute('id'))
                });
                let that = this;
                switch (this.$route.query.title) {
                    case "全省接警类型数据分析":
                        this.show=true;
                        this.chartTitle = [
                            '近七日接警类型数据分析',
                            '警情数据占比分析',
                            '110报警',
                            '122报警',
                            '119报警',
                            '综合报警'
                        ];
                        this.trendChartSource = [
                            {name: '110报警', value: [580, 630, 700, 400, 250, 156, 894]},
                            {name: '122报警', value: [468, 498, 481, 168, 79, 455, 155]},
                            {name: '119报警', value: [483, 558, 465, 48, 188, 465, 455]},
                            {name: '综合报警', value: [671, 465, 184, 561, 455, 268, 145]},
                            {name: '其他接警类型', value: [456, 567, 569, 594, 189, 498, 155]},
                        ];
                        this.trendChartColor = ['#05dbb0', '#00a3c0', '#4160fd', '#bd0fdc', '#803ff7'];
                        this.proportionSource = [
                            {name: '110报警', value: 12},
                            {name: '122报警', value: 5},
                            {name: '119报警', value: 21},
                            {name: '综合报警', value: 22},
                            {name: '其他接警类型', value: 10},
                        ];
                        this.subClassSource1 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList1 = ['#6ffeff', '#00a0a6'];
                        this.subClassSource2 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList2 = ['#7fd7fc', '#0083ba'];
                        this.subClassSource3 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList3 = ['#6f87ff', '#0024dd'];
                        this.subClassSource4 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList4 = ['#ff6cfa', '#a0009b'];
                        break;
                    case '全省报警方式数据分析':
                        this.show=true;
                        this.chartTitle = [
                            '近七日接警类型数据分析',
                            '报警方式数据占比分析',
                            '电话报警',
                            '来人（来电）报警',
                            '技防报警',
                            '短信报警'
                        ];
                        this.trendChartSource = [
                            {name: '电话报警', value: [580, 630, 700, 400, 250, 156, 894]},
                            {name: '来人来电报警', value: [468, 498, 481, 168, 79, 455, 155]},
                            {name: '技防报警', value: [483, 558, 465, 48, 188, 465, 455]},
                            {name: '短信报警', value: [671, 465, 184, 561, 455, 268, 145]},
                            {name: '其他报警方式', value: [456, 567, 569, 594, 189, 498, 155]}
                        ];
                        this.trendChartColor = ['#ffd75d', '#00a3c0', '#0d28a6', '#e344ff', '#6400cb'];
                        this.proportionSource = [
                            {name: '电话报警', value: 12},
                            {name: '来人来电报警', value: 5},
                            {name: '技防报警', value: 21},
                            {name: '短信报警', value: 22},
                            {name: '其他报警方式', value: 10},
                        ];
                        this.subClassSource1 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList1 = ['#ffebaf', '#ffd75e'];
                        this.subClassSource2 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList2 = ['#7fd7fc', '#0083ba'];
                        this.subClassSource3 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList3 = ['#6f87ff', '#0024dd'];
                        this.subClassSource4 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList4 = ['#a650ff', '#5200a7'];
                        break;
                    case '全省来话类型数据分析':
                        this.show=false;
                        this.chartTitle = [
                            '近七日来话类型数据分析',
                            '来话类型数据占比分析',
                            '报警求助、举报投诉',
                            '处警反馈',
                            '信息查询',
                            '重复报警',
                            '骚扰电话',
                            '系统测试'
                        ];
                        this.trendChartSource = [
                            {name: '报警求助、举报投诉', value: [580, 630, 700, 400, 250, 156, 894]},
                            {name: '处警反馈', value: [468, 498, 481, 168, 79, 455, 155]},
                            {name: '信息咨询', value: [483, 558, 465, 48, 188, 465, 455]},
                            {name: '重复报警', value: [671, 465, 184, 561, 455, 268, 145]},
                            {name: '骚扰电话', value: [456, 567, 569, 594, 189, 498, 155]},
                            {name: '系统测试', value: [652, 556, 155, 166, 562, 515, 565]},
                            {name: '其他来话类型', value: [256, 626, 515, 126, 512, 556, 488]}
                        ];
                        this.trendChartColor = ['#6c96ff', '#4160fb', '#2626e7', '#e344ff', '#00b3e9', '#803ff7', '#6905c6', '#17fff3'];
                        this.proportionSource = [
                            {name: '报警求助、举报投诉', value: 12},
                            {name: '处警反馈', value: 5},
                            {name: '信息咨询', value: 21},
                            {name: '重复报警', value: 22},
                            {name: '骚扰电话', value: 10},
                            {name: '系统测试', value: 19},
                            {name: '其他来话类型', value: 6},
                        ];
                        this.subClassSource1 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList1 = ['#ff6cfa', '#a0009b'];
                        this.subClassSource2 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList2 = ['#8298ff', '#324fcc'];
                        this.subClassSource3 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList3 = ['#6f87ff', '#0024dd'];
                        this.subClassSource4 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList4 = ['#a650ff', '#5200a7'];
                        break;
                }
                let Index = {
                    init() {
                        this.loadData();
                        Public.chartsResize(that.chartsObj);
                        Public.chartsReDraw(that.chartsObj, null, [
                            'mapChart'
                        ], ['trendChart','proportionChart','subClassChart1','subClassChart2','subClassChart3','subClassChart4'])
                    },
                    loadData() {
                        that.sevensjfx('trendChart', that.trendChartSource, that.trendChartColor);
                        that.percent();
                        that.subclassBar('subClassChart1', that.subClassSource1, that.subClassColorList1);
                        that.subclassBar('subClassChart2', that.subClassSource2, that.subClassColorList2);
                        that.subclassBar('subClassChart3', that.subClassSource3, that.subClassColorList3);
                        that.subclassBar('subClassChart4', that.subClassSource4, that.subClassColorList4);
                        // that.subclassBar('subClassSource5', that.subClassSource1, that.subClassColorList1);
                    },
                };
                Index.init();
            },
        },
        mounted() {
            this.getScale();
            this.renderChart();
        }
    }
</script>

<style scoped lang="scss">
    //样式里的l, m, r, t, b分别代表左，中，右，上，下
    //布局
    #pjqsjfx{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        main{
            padding:0 2rem 4rem; 
        }
    }


    #back {
        color: #17fff3;
        cursor: pointer;
    }

    main {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        flex: 1;

        .l > div, .m > div, .r > div {
            width: 100%;
            align-content: space-between;
        }

        .l {
            width: 25.73%;
            height:100%;
            background-image: url('../assets/images/index/m.png') ;
            background-repeat: no-repeat;
            background-size:100% 100%;

            .chartBox {
                width: 100%;
                height: 100%;
            }

            .chart {
                width: 100%;
                height: 100%;
            }

        }

        .chart-wrap {
            // border: .0625rem solid rgba(76, 180, 231, 0.33);
            width: 100%;
            height: 100%;
            //标题
            h3 {
                text-align: center;
                height: 10%;
            }
            // .chartBox{
            //     height: 80%;
            // }

        }

        .chart{
            width: 100%;
            height: 100%;
        }
        
        .r {
            width: 72.6%;
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
                    // height: 14.87rem;
                    height: 90%;
                }

                .r-t-l {
                    width: 37.25%;
                    height: 100%;
                    background-image: url('../assets/images/index/l-t-bg.png') ;
                    background-repeat: no-repeat;
                    background-size:100% 100%;
                }

                .r-t-r {
                    width: 60.5%;
                    height: 100%;
                    background-image: url('../assets/images/index/l-t-bg.png') ;
                    background-repeat: no-repeat;
                    background-size:100% 100%;
                }
            }

            .r-b {
                width: 100%;
                height: 57.78%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .r-b-t, .r-b-b {
                    width: 100%;
                    height: 47.2%;
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;

                    

                    .chartBox {
                        width: 100%;
                        height: 90%;
                    }

                    .r-b-t-l-1, .r-b-t-r-1,.r-b-b-l-1,.r-b-b-r-1 {
                        width: 48.91%;
                        height: 100%;
                        background-image: url('../assets/images/index/l-t-bg.png') ;
                        background-repeat: no-repeat;
                        background-size:100% 100%;
                    }
                    .r-b-t-l-2,.r-b-t-m-2, .r-b-t-r-2,.r-b-b-l-2,.r-b-b-r-2,.r-b-b-m-2 {
                        width: 32%;
                        height: 100%;
                        background: white;
                    }
                }
            }
        }
    }
</style>