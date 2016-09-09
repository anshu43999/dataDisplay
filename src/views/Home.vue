<template>
    <div id="container">
        <my-header></my-header>
        <main @click="filter">
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
                            <div class="chart" id="jqtjjcChart"></div>
                        </div>
                    </div>
                </div>
                <div class="l-m">
                    <div class="chart-wrap">
                        <h3>近期警情统计</h3>
                        <div class="chartBox">
                            <!--                        图表-->
                            <div class="chart" id="jqjqtjChart"></div>
                        </div>
                    </div>
                </div>
                <div class="l-b">
                    <div class="filter">
                        <div class="iconBox"></div>
                        <i class="iconfont iconguolv"></i>
                        <div data-id="jqfl" class="option">
                            <div class="filterTitle">
                                <div>时间筛选</div>
                            </div>
                            <ul class="filterItem" @click="selectItem">
                                <!--                                <li v-for="item in periodArr" :key="item">-->
                                <!--                                    <div data-id="jqfl">{{item}}</div>-->
                                <!--                                </li>-->
                                <li v-for="item in periodArr1" :key="item">
                                    <div data-id="jqfl">{{item}}</div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="chart-wrap">
                        <h3 @click="jump">警情分类数据分析</h3>
                        <div class="chartBox">
                            <!--                        图表-->
                            <div class="chart" id="jqflsjfxChart"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="m">
                <div class="chart-wrap">
                    <div class="chartBox">
                        <div id="mapData">
                            <p>{{mapData.value}}</p>
                            <p>{{mapData.name}}</p>
                        </div>
                        <!--                        图表-->
                        <div id="mapChart" class="chart"></div>
                    </div>
                </div>
            </div>

            <div class="r">
                <div class="r-l">
                    <div class="r-l-t">
                        <div class="chart-wrap">
                            <h3>今日接警类型数据分析</h3>
                            <div class="chartBox">
                                <div class="chart" id="jrPieChart"></div>
                            </div>
                        </div>
                    </div>
                    <div class="r-l-b">
                        <div class="chart-wrap">
                            <h3>今日报警方式数据分析</h3>
                            <div class="chartBox">
                                <div class="chart" id="jrbjfssjfxChart"></div>
                            </div>
                        </div>
                    </div>
                    <div class="r-l-m">
                        <div class="chart-wrap">
                            <h3>今日来话类型数据分析</h3>
                            <div class="chartBox">
                                <div class="chart" id="jrrlhlxsjfxChart"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="r-r">
                    <div class="r-r-t">
                        <div class="filter">
                            <div class="iconBox"></div>
                            <i class="iconfont iconguolv"></i>
                            <div data-id="jjlx" class="option">
                                <div class="filterTitle">
                                    <div>时间筛选</div>
                                </div>
                                <ul class="filterItem" @click="selectItem">
                                    <li v-for="item in periodArr" :key="item">
                                        <div data-id="jjlx">{{item}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="chart-wrap">
                            <h3 @click="jump">近七日接警类型数据分析</h3>
                            <div class="chartBox">
                                <div class="chart" id="sevenjjlxsjfxChart"></div>
                            </div>
                        </div>
                    </div>
                    <div class="r-r-m">
                        <div class="filter">
                            <div class="iconBox"></div>
                            <i class="iconfont iconguolv"></i>
                            <div data-id="bjfs" class="option">
                                <div class="filterTitle">
                                    <div>时间筛选</div>
                                </div>
                                <ul class="filterItem" @click="selectItem">
                                    <li v-for="item in periodArr" :key="item">
                                        <div data-id="bjfs">{{item}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="chart-wrap">
                            <h3 @click="jump">近七日报警方式数据分析</h3>
                            <div class="chartBox">
                                <div class="chart" id="sevenbjfssjfxChart"></div>
                            </div>
                        </div>
                    </div>
                    <div class="r-r-b">
                        <div class="filter">
                            <div class="iconBox"></div>
                            <i class="iconfont iconguolv"></i>
                            <div data-id="lhlx" class="option">
                                <div class="filterTitle">
                                    <div>时间筛选</div>
                                </div>
                                <ul class="filterItem" @click="selectItem">
                                    <li v-for="item in periodArr" :key="item">
                                        <div data-id="lhlx">{{item}}</div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="chart-wrap">
                            <h3 @click="jump">近七日来话类型数据分析</h3>
                            <div class="chartBox">
                                <div class="chart" id="sevenlhlxsjfxChart"></div>
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
    // import sevensjfx from '../assets/js/sevenChart'

    export default {
        name: "Test",
        components: {MyHeader},
        data() {
            return {
                //今天的日期
                todayIndex: '',
                threeDaysAgo:'',
                sevenDaysAgo: '',
                // select: true,
                // 接口
                findUrl: [
                    'recJQTJB/findJQNum',//警情统计监测
                    'recJQTJB/findJQSevenDayShen',//近期警情统计
                    'recJQFLTJB/findJQFLNum',//警情分类数据分析
                    'recJQTJB/findXZQHNum',//map
                    'recJJLXTJB/findJJLXShen',///  饼    今日接警类型数据分析
                    'recJJLXTJB/findJJLXSevenDayShen',///  右   七日接警类型数据分析
                    'recBJFSTJB/findBJFSShen',  //   今日报警方式数据分析   
                    'recBJFSTJB/findBJFSSevenDayShen', //    七日报警方式数据分析
                    'recLHLXTJB/findLHLXShen',//今日来话类型数据分析
                    'recLHLXTJB/findLHLXSevenDayShen'//七日来话类型数据分析
                ],
                //需要刷新的图表
                refreshCharts: [],
                //    所有的图标对象
                chartsObj: {},
                //坐标轴颜色
                axisesColor: '#04d5ce',
                //缩放值
                scale: 1,
                //筛选选项
                periodArr: ['近7日', '上周', '上上周'],
                periodArr1: ['今天', '昨天', '前天'],
                //默认获取本周数据
                jqfl: {date:'', per: ''},
                jjlx: {start: '', end: '', per: ''},
                lhlx: {start: '', end: '', per: ''},
                bjfs: {start: '', end: '', per: ''},
                //警情统计监测
                jqtjjcData: [
                    {name: '报警事件总数', value: 4512},
                    {name: '有效警情总数', value: 2361},
                    {name: '处警事件总数', value: 2316},
                    {name: '反馈事件总数', value: 7312},
                ],
                jqtjjcSource: [
                    {name: '处警事件占比', value: 45, radius: '65%'},
                    {name: '有效警情占比', value: 21, radius: '75%'},
                    {name: '反馈事件占比', value: 63, radius: '65%'}
                ],
                //    近期警情统计  y
                jqjqtjScoure: [900, 1100, 700, 900, 1000, 600, 500],
                //  近期警情统计  x
                // jqjqtjXdata: ['10-1', '10-2', '10-3', '10-4', '10-5', '10-6', '10-7'],

                //    警情分类数据分析
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
                grading: [0.2, 0.4, 0.6, 0.8, 1],
                mapSource: [
                    {name: "太原市", value: 80, value1: 5000},
                    {name: "长治市", value: 30, value1: 4000},
                    {name: "朔州市", value: 4, value1: 3000},
                    {name: "运城市", value: 32, value1: 2000},
                    {name: "大同市", value: 30, value1: 4000},
                    {name: "晋城市", value: 10, value1: 3000},
                    {name: "晋中市", value: 21, value1: 3600},
                    {name: "临汾市", value: 5, value1: 4000},
                    {name: "忻州市", value: 5, value1: 4000},
                    {name: "阳泉市", value: 10, value1: 2000},
                    {name: "吕梁市", value: 20, value1: 1600},
                ],
                mapData: {name: '报警事件总数', value: 96666},
                //    今日接警类型数据分析、今日来话类型数据分析
                jrjjlxsjfxSourceSource: [
                    {name: '110报警', value: 200},
                    {name: '122报警', value: 155},
                    {name: '119报警', value: 263},
                    {name: '综合报警', value: 145},
                    {name: '其他接警类型', value: 155}
                ],
                jrjjlxsjfxSourceColor: ['#05dbb0', '#00a3c0', '#4160fd', '#bd0fdc', '#803ff7'],
                //    今日报警方式数据分析
                jrbjfssjfxSource: [
                    {name: '电话报警', value: 200},
                    {name: '来人（来电）报警', value: 155},
                    {name: '技防报警', value: 263},
                    {name: '短信报警', value: 145},
                    {name: '其他报警方式', value: 155}
                ],
                jrbjfssjfxColor: ['#ffd75d', '#00a3c0', '#0d28a6', '#e344ff', '#6400cb'],
                //    今日来话类型数据分析
                jrrlhlxsjfxSource: [
                    {name: '报警求助、举报投诉', value: 200},
                    {name: '处警反馈', value: 155},
                    {name: '信息咨询', value: 263},
                    {name: '短信报警', value: 145},
                    {name: '重复报警', value: 155},
                    {name: '骚扰电话', value: 231},
                    {name: '系统测试', value: 251},
                    {name: '其他来话类型', value: 134},
                ],
                jrrlhlxsjfxColor: ['#6c96ff', '#4160fb', '#2626e7', '#e344ff', '#00b3e9', '#803ff7', '#6905c6', '#17fff3'],
                //    近七日接警类型数据分析
                sevenjjlxsjfxSource: [
                    {name: '110报警', value: [436, 413, 439, 506, 431, 426, 434]},
                    {name: '122报警', value: [320, 370, 350, 412, 346, 348, 427]},
                    {name: '119报警', value: [240, 274, 245, 260, 248, 278, 272]},
                    {name: '综合报警', value: [142, 152, 107, 168, 146, 164, 151]},
                    {name: '其他接警类型', value: [14, 15, 14, 10, 12, 15, 17]},
                ],
                // sevenjjlxsjfxSource: {},
                //    近七日报警方式数据分析
                sevenbjfssjfxSource: [
                    {name: '电话报警', value: [436, 413, 439, 506, 431, 426, 434]},
                    {name: '来人来电报警', value: [320, 370, 350, 412, 346, 348, 427]},
                    {name: '技防报警', value: [240, 274, 245, 260, 248, 278, 272]},
                    {name: '短信报警', value: [142, 152, 107, 168, 146, 164, 151]},
                    {name: '其他报警方式', value: [14, 15, 14, 10, 12, 15, 17]}
                ],
                // sevenbjfssjfxSource:{},
                //    近七日来话类型数据分析
                //    近七日来话类型数据分析
                sevenlhlxsjfxSource: [
                    {name: '报警求助、举报投诉', value: [560, 525, 494, 568, 516, 554, 523]},
                    {name: '处警反馈', value: [451, 450, 438, 443, 468, 461, 431]},
                    {name: '信息咨询', value: [382, 380, 351, 384, 345, 387, 364]},
                    {name: '重复报警', value: [301, 298, 310, 320, 316, 302, 286]},
                    {name: '骚扰电话', value: [230, 231, 204, 215, 228, 209, 232]},
                    {name: '系统测试', value: [123, 130, 128, 110, 125, 135, 120]},
                    {name: '其他来话类型', value: [15, 13, 20, 18, 16, 17, 18]}
                ],
                // sevenlhlxsjfxSource:{}
            }
        },
        methods: {
            //获取缩放比例
            getScale() {
                this.scale = localStorage.getItem('scale');
            },
            //    警情统计监测
            panChart() {
                let myChart = this.$echarts.init(document.getElementById('jqtjjcChart'));
                this.chartsObj.panChart = myChart; //放入charts对象方便后面的刷新缩放以及其他操作
                let that = this;
                let sourceArr = this.jqtjjcSource;
                let colorSet = [
                    [0.2, '#ff1f34'],
                    [0.8, '#0079cc'],
                    [1, '#1af7f1']
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
                                    center: [index * 30 + 20 + '%', '50%'],
                                    axisLine: {
                                        show: false,
                                    },
                                    detail: {
                                        show: 0
                                    },
                                    axisTick: {
                                        show: false,
                                    },
                                    splitLine: {
                                        length: 15 * that.scale,
                                        lineStyle: {
                                            width: 2 * that.scale
                                        }
                                    },
                                    axisLabel: {
                                        fontSize: 16 * that.scale,
                                        color: '#91c7ae'
                                    },
                                },
                                // 内侧指针、数值显示
                                {
                                    name: item.name,
                                    type: 'gauge',
                                    center: [index * 30 + 20 + '%', '50%'],
                                    radius: item.radius,
                                    axisLine: {
                                        show: true,
                                        lineStyle: {
                                            color: colorSet,
                                            width: 25 * that.scale,
                                            shadowOffsetX: 0,
                                            shadowOffsetY: 0,
                                            opacity: 1
                                        }
                                    },
                                    pointer: {
                                        show: true,
                                        length: '102%',
                                        width: 6 * that.scale
                                    },
                                    detail: {
                                        show: true,
                                        offsetCenter: [0, '110%'],
                                        textStyle: {
                                            fontSize: 30 * that.scale,
                                            color: that.axisesColor,
                                        },
                                        formatter: [
                                            '{value}% ' + (item.unit || ''),
                                            '{name|' + item.name + '}'
                                        ].join('\n'),
                                        rich: {
                                            name: {
                                                fontSize: 22 * that.scale,
                                                lineHeight: 60 * that.scale,
                                                color: that.axisesColor
                                            }
                                        }
                                    },
                                    splitLine: {
                                        length: 15 * that.scale,
                                        lineStyle: {
                                            width: 2 * that.scale
                                        }
                                    },
                                    axisTick: {
                                        length: 8 * that.scale,
                                        lineStyle: {
                                            width: 2 * that.scale
                                        }
                                    },
                                    axisLabel: {
                                        show: false
                                    },
                                    data: [{
                                        value: item.value
                                    }]
                                }
                            );
                        });
                        return result;
                    })(),
                    tooltip: {
                        formatter: function (params) {
                            return params.seriesName + '：' + params.data.value + '%';
                        }
                    }
                };
                myChart.setOption(option);
            },
            //    近期警情统计
            jqjqtjChart(dateArr) {
                let myChart = this.$echarts.init(document.getElementById('jqjqtjChart'));
                this.chartsObj.jqjqtjChart = myChart;
                let sourceArr = this.jqjqtjScoure;
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
                            fontSize: 20 * this.scale,
                            interval: 0,
                        },
                        data: dateArr
                    },
                    yAxis: {
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
                            fontSize: 20 * this.scale,
                            interval: 0,
                        }
                    },
                    series: {
                        type: 'bar',
                        stack: 'chart',
                        data: sourceArr,
                        itemStyle: {
                            color: this.gradient(['#00dce4', '#529fff'])
                        },
                        barWidth: 20 * this.scale
                    },
                    grid: {
                        left: '9%',
                        right: '5%',
                        top: '5%',
                        bottom: '15%'
                    },
                    tooltip: {}
                };
                myChart.setOption(option);
            },
            //    警情分类数据分析
            jqflsjfxChart(sourceArr) {
                let myChart = this.$echarts.init(document.getElementById('jqflsjfxChart'));
                this.chartsObj.jqflsjfxChart = myChart;
                let xData = [];
                // let sourceArr = this.jqflsjfxSource;
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
                            fontSize: 20 * this.scale,
                            rotate: 30,
                            interval: 0,
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
                            fontSize: 20 * this.scale,
                        }
                    },
                    series: {
                        type: 'bar',
                        stack: 'chart',
                        data: sourceArr,
                        itemStyle: {
                            color: this.gradient(['#fcc60a', '#f5834a'])
                        },
                        barWidth: 20 * this.scale
                    },
                    grid: {
                        left: '9%',
                        right: '5%',
                        top: '5%',
                        bottom: '24%'
                    },
                    tooltip: {}
                };
                myChart.setOption(option);
            },

            //地图
            mapChart() {
                let cityObj = {};
                let cityData = this.mapSource;
                let that = this;
                let myChart = that.$echarts.init(document.getElementById('mapChart'));//初始化
                this.chartsObj.mapChart = myChart;
                let data2 = [];
                cityData.forEach(value => {
                    data2.push({name: value.name, value: (value.value / value.value1).toFixed(2), value1: value.value});
                });
                that.data1 = data2;
                //初显示
                this.$http.get('static/json/140000_full.json').then(res => {
                    if (res.status === 200) {
                        for (let i = 0; i < res.data.features.length; i++) {
                            cityObj[res.data.features[i].properties.name] = res.data.features[i].properties.adcode;
                        }
                        // 注册地图
                        that.$echarts.registerMap('山西省', res.data);
                        // 绘制地图
                        renderMap('山西省', data2);
                    }
                });
                //配置项
                let option = {
                    title: {
                        show: false
                    },
                    animationDuration: 1000,
                    animationEasing: 'cubicOut',
                    animationDurationUpdate: 1000,
                };

                function renderMap(map, data) {
// 初始化绘制全国地图配置
                    option.title.subtext = map;
                    option.series = [
                        {
                            name: '散点',
                            type: 'scatter',
                            coordinateSystem: 'geo',
                            data: data,
                            symbolSize: 0,
                        },
                        {
                            map: map,
                            type: 'map',
                            mapType: map,
                            roam: false,
                            data: data,
                            zoom: 1.18,   //这里是关键，一定要放在 series中
                            nameMap: {
                                '山西省': '山西省'
                            },
                            label: {
                                normal: {
                                    show: true,
                                    formatter: function (params) {
                                        // console.log(params.data.name, params.data.value);
                                        let style = '';
                                        if (params.data.value < that.grading[0]) {
                                            style = 'colorZero';
                                        } else if (params.data.value >= that.grading[0] && params.data.value <= that.grading[1]) {
                                            style = 'colorOne';
                                        } else if (params.data.value >= that.grading[1] && params.data.value <= that.grading[2]) {
                                            style = 'colorTwo';
                                        } else if (params.data.value >= that.grading[2] && params.data.value <= that.grading[3]) {
                                            style = 'colorThere';
                                        } else {
                                            style = 'colorFour';
                                        }
                                        if (params.data.value1) {
                                            return params.name + ' - {' + style + '|' + params.data.value1 + '}';
                                        } else {
                                            return params.name
                                        }
                                    },
                                    position: 'inside',
                                    fontSize: 8,
                                    fontWeight: 'normal',
                                    color: '#1af7f1',
                                    rich: {
                                        colorZero: {
                                            color: '#88ffc6',
                                            fontSize: 12,
                                            fontFamily: 'heijian',
                                            fontWeight: 'bold',
                                        },
                                        colorOne: {
                                            color: '#ffe71b',
                                            fontSize: 12,
                                            fontFamily: 'heijian',
                                            fontWeight: 'bold',
                                        },
                                        colorTwo: {
                                            color: '#ffac1b',
                                            fontSize: 12,
                                            fontFamily: 'heijian',
                                            fontWeight: 'bold',
                                        },
                                        colorThere: {
                                            color: '#ff6600',
                                            fontSize: 12,
                                            fontFamily: 'heijian',
                                            fontWeight: 'bold',
                                        },
                                        colorFour: {
                                            color: '#e12d00',
                                            fontSize: 12,
                                            fontFamily: 'heijian',
                                            fontWeight: 'bold',
                                        }
                                    }
                                },
                                emphasis: {
                                    show: true,
                                }
                            },
                            itemStyle: {
                                emphasis: {
                                    label: {
                                        show: true,
                                        color: '#fff'
                                    },
                                    areaColor: '#5a3cff',
                                }
                            },
                        },
                    ];
                    // let color=['rgba(255,0,0,0.2)','rgba(255,0,0,0.4)','rgba(255,0,0,0.6)','rgba(255,0,0,0.8)','rgba(255,0,0,1)'];
                    option.visualMap = {
                        type: 'piecewise',
                        pieces: [{
                            max: that.grading[0],
                            label: '一级',
                            color: '#5ea2f5'
                            /*color: new that.$echarts.graphic.LinearGradient(
                                //右，下，左，上
                                0, 0, 0, 1, [{
                                    //0%位置的颜色
                                    offset: 0,
                                    color: 'rgb(15,135,91)'
                                },
                                    {
                                        //100%位置的颜色
                                        offset: 1,
                                        color: 'rgb(83,205,156)'                                    }
                                ]
                            )*/
                        }, {
                            min: that.grading[0],
                            max: that.grading[1],
                            label: '二级',
                            color: '#3d8bea',
                            /*color: new that.$echarts.graphic.LinearGradient(
                                //右，下，左，上
                                0, 0, 0, 1, [{
                                    //0%位置的颜色
                                    offset: 0,
                                    color: 'rgb(21,179,171)'
                                },
                                    {
                                        //100%位置的颜色
                                        offset: 1,
                                        color: 'rgb(127,245,238)'
                                    }
                                ]
                            )*/
                        }, {
                            min: that.grading[1],
                            max: that.grading[2],
                            label: '三级',
                            color: '#2a5cc0',
                            /*color: new that.$echarts.graphic.LinearGradient(
                                //右，下，左，上
                                0, 0, 0, 1, [{
                                    //0%位置的颜色
                                    offset: 0,
                                    color: 'rgb(24,98,150)'
                                },
                                    {
                                        //100%位置的颜色
                                        offset: 1,
                                        color: 'rgb(25,177,227)'
                                    }
                                ]
                            )*/
                        },
                            {
                                min: that.grading[2],
                                max: that.grading[3],
                                label: '四级',
                                color: '#0f07b0'
                                /*color: new that.$echarts.graphic.LinearGradient(
                                    //右，下，左，上
                                    0, 0, 0, 1, [{
                                        //0%位置的颜色
                                        offset: 0,
                                        color: 'rgb(5,82,173)'
                                    },
                                        {
                                            //100%位置的颜色
                                            offset: 1,
                                            color: 'rgb(72,124,251)'
                                        }
                                    ]
                                )*/
                            },
                            {
                                min: that.grading[3],
                                // max: that.grading[4],
                                label: '五级',
                                color: '#060086'
                                /*color: new that.$echarts.graphic.LinearGradient(
                                    //右，下，左，上
                                    0, 0, 0, 1, [{
                                        //0%位置的颜色
                                        offset: 0,
                                        color: 'rgb(5,29,138)'
                                    },
                                        {
                                            //100%位置的颜色
                                            offset: 1,
                                            color: 'rgb(25,62,236)'
                                        }
                                    ]
                                )*/
                            }
                        ],
                        left: 'right',
                        top: 'bottom',
                        calculable: true,
                        seriesIndex: [1],
                        textStyle: {
                            color: '#fff'
                        },
                        /*itemWidth:24*that.scale,
                        itemHeight:24*that.scale*/

                        /*inRange: {
                            color: ['#00e57c', '#ed0000']
                        }*/
                    };
// 渲染地图
                    myChart.setOption(option);
                }
            },

            //    今日接警类型数据分析、今日报警方式数据分析、今日来话类型数据分析
            /**
             * @param chartContainer String 图表容器
             * @param sourceArr Arrary 数据数组
             * @param colorList Arrary 颜色数组
             * */
            jrPieChart(chartContainer, sourceArr, colorList) {
                let myChart = this.$echarts.init(document.getElementById(chartContainer));
                this.chartsObj[chartContainer] = myChart;
                let total = 0;
                sourceArr.forEach(value => {
                    total += value.value
                });
                let option = {
                    tooltip: {},
                    series: [{
                        type: 'pie',
                        radius: ['20%', '70%'],
                        center: ['50%', '55%'],
                        roseType: 'radius',
                        label: {
                            normal: {
                                formatter: function (params) {
                                    return params.name + '\n\n' + Math.round((params.value / total) * 100) + '%'
                                },
                                fontSize: 20 * this.scale
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    return colorList[params.dataIndex]
                                },
                                lineStyle: {
                                    color: function (params) {
                                        return colorList[params.dataIndex]
                                    }
                                },
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true,
                                length: 5 * this.scale,
                                length2: 10,
                                align: 'bottom'
                            },
                            color: "#000",
                            emphasis: {
                                show: true
                            }
                        },
                        data: sourceArr.sort(function (a, b) {
                            return a.value - b.value;
                        }),
                    }, {
                        name: '内圈',
                        type: 'pie',
                        radius: ['10%', '12%'],
                        center: ['50%', '55%'],
                        roseType: 'radius',
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        lableLine: {
                            normal: {
                                show: false,
                            },
                            emphasis: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#fff',
                            },
                            emphasis: {
                                animation: false
                            }
                        },
                        hoverAnimation: false,
                        data: [
                            {value: 10},
                        ],
                        tooltip: {
                            show: false
                        }
                    }]
                };
                myChart.setOption(option);
            },
            // 近七日接警类型数据分析、近七日报警方式数据分析、近七日来话类型数据分析
            sevensjfx1(chartContainer, sourceArr, colorList, dateArr) {
                let seriesArr = [];
                let myChart = this.$echarts.init(document.getElementById(chartContainer));
                this.chartsObj[chartContainer] = myChart;
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
                            width: 2
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
                        axisLabel: {
                            fontSize: 20 * this.scale
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
                        },
                        axisLabel: {
                            fontSize: 20 * this.scale
                        },
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
                        bottom: 60 * this.scale
                    }
                };
                myChart.setOption(option);
            },
            // 跳转
            jump(e) {
                let h3 = e.currentTarget;
                switch (h3.innerText) {
                    case '近七日接警类型数据分析':
                        this.$router.push({name: '省接警类型数据分析', query: {title: '全省接警类型数据分析'}});
                        break;
                    case '近七日报警方式数据分析':
                        this.$router.push({name: '省接警类型数据分析', query: {title: '全省报警方式数据分析'}});
                        break;
                    case '近七日来话类型数据分析':
                        this.$router.push({name: '省接警类型数据分析', query: {title: '全省来话类型数据分析'}});
                        break;
                    case '警情分类数据分析':
                        this.$router.push({name: '省警情分类数据分析', query: {title: '全省警情分类数据分析'}});
                        break;
                    default:
                        console.log('false');
                        break;
                }
            },
            //柱状图渐变
            gradient(colorList) {
                return new this.$echarts.graphic.LinearGradient(
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
            //渲染图表
            renderChart() {
                console.log(1);
                let myCharts = document.querySelectorAll('.chart');
                myCharts.forEach(value => {
                    this.refreshCharts.push(value.getAttribute('id'))
                });
                let that = this;
                let Index = {
                    init() {
                        this.loadData();
                        Public.chartsResize(that.chartsObj);
                        Public.chartsReDraw(that.chartsObj, null, [
                            ''
                        ], that.refreshCharts)
                    },
                    loadData() {
                        that.getJqtj();
                        that.getJqjq();
                        that.getMapData();
                        that.getJjlx();
                        that.getFlsj();

                        that.getJjlxSeven();
                        that.getBjfs();
                        that.getBjfsSeven();
                        that.getLhlx();
                        that.getLhlxSeven();

                        // let xData=[1,2,3,4,5,6,7];
                        // that.panChart();
                        // that.jqjqtjChart();
                        // that.jqflsjfxChart(that.jqjqtjScoure);
                        // that.mapChart();
                        // that.jrPieChart('jrPieChart', that.jrjjlxsjfxSourceSource, that.jrjjlxsjfxSourceColor,xData);
                        // that.jrPieChart('jrbjfssjfxChart', that.jrbjfssjfxSource, that.jrbjfssjfxColor,xData);
                        // that.jrPieChart('jrrlhlxsjfxChart', that.jrrlhlxsjfxSource, that.jrrlhlxsjfxColor,xData);
                        // that.sevensjfx1('sevenjjlxsjfxChart', that.sevenjjlxsjfxSource, that.jrjjlxsjfxSourceColor,xData);
                        // that.sevensjfx1('sevenjjlxsjfxChart', that.sevenjjlxsjfxSource, that.jrjjlxsjfxSourceColor,xData);
                        // that.sevensjfx1('sevenbjfssjfxChart', that.sevenbjfssjfxSource, that.jrbjfssjfxColor,xData);
                        // that.sevensjfx1('sevenlhlxsjfxChart', that.sevenlhlxsjfxSource, that.jrrlhlxsjfxColor,xData);
                    },
                };
                Index.init();
            },
            //进入渲染选中的选项
            selectedItem() {
                // console.log(this.period);
                let item = document.querySelectorAll('.option>.filterItem');
                // console.log(item);
                switch (this.jqfl.per) {
                    case "week":
                        item[0].firstChild.firstChild.classList.add('active');
                        break;
                    case "lastWeek":
                        item[0].childNodes[1].childNodes[0].classList.add('active');
                        break;
                    case "halfYear":
                        item[0].childNodes[2].childNodes[0].classList.add('active');
                        break;
                    case "today":
                        item[0].firstChild.firstChild.classList.add('active');
                        break;
                    case "yesterday":
                        item[0].childNodes[1].firstChild.classList.add('active');
                        break;
                    case "threeDaysAgo":
                        item[0].childNodes[2].childNodes[0].classList.add('active');
                        break;
                    default:
                        console.log('false');
                }
                switch (this.jjlx.per) {
                    case "week":
                        item[1].firstChild.firstChild.classList.add('active');
                        break;
                    case "lastWeek":
                        item[1].childNodes[1].childNodes[0].classList.add('active');
                        break;
                    case "halfYear":
                        item[1].childNodes[2].childNodes[0].classList.add('active');
                        break;
                    default:
                        console.log('false');
                }
                switch (this.bjfs.per) {
                    case "week":
                        item[2].firstChild.firstChild.classList.add('active');
                        break;
                    case "lastWeek":
                        item[2].childNodes[1].childNodes[0].classList.add('active');
                        break;
                    case "halfYear":
                        item[2].childNodes[2].childNodes[0].classList.add('active');
                        break;
                    default:
                        console.log('false');
                }
                switch (this.lhlx.per) {
                    case "week":
                        item[3].firstChild.firstChild.classList.add('active');
                        break;
                    case "lastWeek":
                        item[3].childNodes[1].childNodes[0].classList.add('active');
                        break;
                    case "halfYear":
                        item[3].childNodes[2].childNodes[0].classList.add('active');
                        break;
                    default:
                        console.log('false');
                }
            },
            //选择选项
            selectItem(e) {
                let item = document.querySelectorAll('.option');
                let type = e.target.getAttribute('data-id');
                item.forEach(value => {
                    let children = value.childNodes[1].childNodes;
                    if (value.getAttribute('data-id') === type) {
                        switch (e.target.innerHTML) {
                            case'近7日':
                                e.target.parentNode.parentNode.parentNode.style.display = 'none';
                                let type1 = e.target.getAttribute('data-id');
                                this[type1].end = this.todayIndex;
                                this[type1].start = this.sevenDaysAgo;
                                this[type1].per = 'week';
                                // this.start = this.todayIndex;
                                // console.log(value.childNodes[1].childNodes);
                                for (let i = 0; i < children.length; i++) {
                                    children[i].childNodes[0].classList.remove('active');
                                }
                                e.target.classList.add('active');
                                break;
                            case'上周':
                                let d = new Date();
// set to Monday of this week
                                d.setDate(d.getDate() - (d.getDay() + 6) % 7);
// set to previous Monday
                                let date3 = new Date(d.setDate(d.getDate() - 7));
                                let Monday = date3.getFullYear().toString() + (date3.getMonth() + 1).toString().padStart(2, '0') + date3.getDate().toString().padStart(2, '0');
// create new date of day before
                                let date4 = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 6);
                                let Sunday = date4.getFullYear().toString() + (date4.getMonth() + 1).toString().padStart(2, '0') + date4.getDate().toString().padStart(2, '0');
                                e.target.parentNode.parentNode.parentNode.style.display = 'none';
                                let type2 = e.target.getAttribute('data-id');
                                this[type2].end = Sunday;
                                this[type2].start = Monday;
                                this[type2].per = 'lastWeek';
                                for (let i = 0; i < children.length; i++) {
                                    children[i].childNodes[0].classList.remove('active');
                                }
                                e.target.classList.add('active');
                                break;
                            case'上上周':
                                let dt = new Date();
                                // set to Monday of this week
                                dt.setDate(dt.getDate() - (dt.getDay() + 6) % 7);
                                // set to previous Monday
                                let date5 = new Date(dt.setDate(dt.getDate() - 14));

                                let beforeMonday = date5.getFullYear().toString() + ((date5.getMonth() + 1).toString()).padStart(2, 0) + (date5.getDate().toString()).padStart(2, 0);
                                // create new date of day before
                                let date6 = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate() + 6);
                                let beforeSunday = date6.getFullYear().toString() + ((date6.getMonth() + 1).toString()).padStart(2, 0) + (date6.getDate().toString()).padStart(2, 0);

                                e.target.parentNode.parentNode.parentNode.style.display = 'none';
                                let type3 = e.target.getAttribute('data-id');
                                this[type3].end = beforeSunday;
                                this[type3].start = beforeMonday;
                                this[type3].per = 'halfYear';
                                for (let i = 0; i < children.length; i++) {
                                    children[i].childNodes[0].classList.remove('active');
                                }
                                e.target.classList.add('active');
                                break;
                            case'今天':
                                let type4 = e.target.getAttribute('data-id');
                                this[type4].date = this.todayIndex;
                                this[type4].per = 'today';
                                e.target.parentNode.parentNode.parentNode.style.display = 'none';
                                // this.start = this.todayIndex;
                                // console.log(value.childNodes[1].childNodes);
                                for (let i = 0; i < children.length; i++) {
                                    children[i].childNodes[0].classList.remove('active');
                                }
                                e.target.classList.add('active');
                                break;
                            case'昨天':
                                let timestamp = (new Date()).getTime();
                                let day = timestamp - 24 * 60 * 60 * 1000;
                                let date1 = new Date(day);
                                let start1 = date1.getFullYear().toString() + (date1.getMonth() + 1).toString().padStart(2, '0') + date1.getDate().toString().padStart(2, '0');
                                e.target.parentNode.parentNode.parentNode.style.display = 'none';
                                let type5 = e.target.getAttribute('data-id');
                                this[type5].date = start1;
                                this[type5].per = 'yesterday';
                                // this.start = this.todayIndex;
                                // console.log(value.childNodes[1].childNodes);
                                for (let i = 0; i < children.length; i++) {
                                    children[i].childNodes[0].classList.remove('active');
                                }
                                e.target.classList.add('active');
                                break;
                            case'前天':
                                e.target.parentNode.parentNode.parentNode.style.display = 'none';
                                let type6 = e.target.getAttribute('data-id');
                                this[type6].date = this.threeDaysAgo;
                                this[type6].per = 'threeDaysAgo';
                                // this.start = this.todayIndex;
                                // console.log(value.childNodes[1].childNodes);
                                for (let i = 0; i < children.length; i++) {
                                    children[i].childNodes[0].classList.remove('active');
                                }
                                e.target.classList.add('active');
                                break;
                            default:
                                console.log('false');
                                break;
                        }
                    }
                });

                sessionStorage.setItem('jqfl', JSON.stringify(this.jqfl));
                sessionStorage.setItem('jjlx', JSON.stringify(this.jjlx));
                sessionStorage.setItem('bjfs', JSON.stringify(this.bjfs));
                sessionStorage.setItem('lhlx', JSON.stringify(this.lhlx));

                switch (type) {
                    case 'jqfl':
                        this.getFlsj();
                        break;
                    case 'jjlx':
                        this.getJjlx();
                        break;
                    case 'bjfs':
                        this.getBjfs();
                        break;
                    case 'lhlx':
                        this.getLhlx();
                        break;
                    default:
                        console.log('false');
                }
            },
            //筛选显示隐藏
            filter(e) {
                let ele = e.target.getAttribute('class');
                let option = document.getElementsByClassName('option');
                if (ele === 'iconBox') {
                    for (let i = 0; i < option.length; i++) {
                        option[i].style.display = 'none';
                    }
                    let selected = e.target.parentNode.lastChild;
                    selected.style.display = 'block';
                }
                if (ele === null) {
                    for (let i = 0; i < option.length; i++) {
                        option[i].style.display = 'none';
                    }
                }
            },
            //获取或保存筛选时间
            setperiod() {
                if (sessionStorage.getItem('jqfl') && sessionStorage.getItem('jjlx') && sessionStorage.getItem('bjfs') && sessionStorage.getItem('lhlx')) {
                    this.jqfl = JSON.parse(sessionStorage.getItem('jqfl'));
                    this.jjlx = JSON.parse(sessionStorage.getItem('jjlx'));
                    this.bjfs = JSON.parse(sessionStorage.getItem('bjfs'));
                    this.lhlx = JSON.parse(sessionStorage.getItem('lhlx'));
                } else {
                    // let date1 = new Date();
                    // let end1 = date1.getFullYear().toString() + (date1.getMonth() + 1).toString().padStart(2, '0') + date1.getDate().toString().padStart(2, '0');
                    // let timestamp = (new Date()).getTime();
                    // let day = timestamp - 6 * 24 * 60 * 60 * 1000;
                    // let date2 = new Date(day);
                    // let start1 = date2.getFullYear().toString() + (date2.getMonth() + 1).toString().padStart(2, '0') + date2.getDate().toString().padStart(2, '0');
                    this.jjlx.end = this.todayIndex;
                    this.jjlx.start = this.sevenDaysAgo;
                    this.jjlx.per = 'week';
                    this.bjfs.end = this.todayIndex;
                    this.bjfs.start = this.sevenDaysAgo;
                    this.bjfs.per = 'week';
                    this.jqfl.date = this.todayIndex;
                    this.jqfl.per = 'today';
                    this.lhlx.end = this.todayIndex;
                    this.lhlx.start = this.sevenDaysAgo;
                    this.lhlx.per = 'week';
                    sessionStorage.setItem('jqfl', JSON.stringify(this.jqfl));
                    sessionStorage.setItem('jjlx', JSON.stringify(this.jjlx));
                    sessionStorage.setItem('bjfs', JSON.stringify(this.bjfs));
                    sessionStorage.setItem('lhlx', JSON.stringify(this.lhlx));
                }
            },
            // 警情统计监测  左上角
            getJqtj() {
                this.$http({
                    method: 'post',
                    url: this.apiRoot + this.findUrl[0],
                    headers: {'Content-Type': 'application/x-www-form-urlencoded', 'crossDomain': true},
                    transformRequest: [function (data) {
                        let ret = '';
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    // withCredentials: true,// 允许携带token ,这个是解决跨域产生的相关问题
                    crossDomain: true,
                    data: {
                        tjTime: 20160909,
                        // tjTime: this.todayIndex,
                    }
                })
                    .then(function (res) {
                        // console.log(res);
                        // console.log(res['data'][0]);
                        // cjsl: 14020      //处警事件总数 // fksl: 7419   //反馈事件总数 // hb: 0      //环比
                        // jjsl: 18669    //报警事件总数 // yxjq: 4887  //有效警情总数
                        this.jqtjjcData[0]['value'] = res['data'][0]['jjsl'];
                        this.mapData['value'] = res['data'][0]['jjsl'];
                        this.jqtjjcData[1]['value'] = res['data'][0]['yxjq'];
                        this.jqtjjcData[2]['value'] = res['data'][0]['cjsl'];
                        this.jqtjjcData[3]['value'] = res['data'][0]['fksl'];

                        // 处警事件占比
                        let sum1 = res['data'][0]['cjsl'] / res['data'][0]['yxjq'];
                        // console.log(sum);
                        // 有效警情占比
                        let sum2 = res['data'][0]['yxjq'] / res['data'][0]['jjsl'];
                        // 反馈事件占比
                        let sum3 = res['data'][0]['fksl'] / res['data'][0]['cjsl'];

                        if (sum1 > 1) {
                            this.jqtjjcSource[0]['value'] = 100
                        } else {
                            this.jqtjjcSource[0]['value'] = sum1.toFixed(2) * 100;
                        }
                        if (sum2 > 1) {
                            this.jqtjjcSource[1]['value'] = 100;
                        } else {
                            this.jqtjjcSource[1]['value'] = sum2.toFixed(2) * 100;
                        }
                        if (sum3 > 1) {
                            this.jqtjjcSource[2]['value'] = 100;
                        } else {
                            this.jqtjjcSource[2]['value'] = sum3.toFixed(2) * 100;
                        }

                        // console.log(this.jqtjjcSource);
                        this.panChart();
                    }.bind(this))
            },
            // 近期警情统计  左 中
            getJqjq() {
                this.$http({
                    method: 'post',
                    url: this.apiRoot + this.findUrl[1],
                    headers: {'Content-Type': 'application/x-www-form-urlencoded', 'crossDomain': true},
                    transformRequest: [function (data) {
                        let ret = '';
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    // withCredentials: true,// 允许携带token ,这个是解决跨域产生的相关问题
                    crossDomain: true,
                    data: {
                        // startTime:  this.sevenDaysAgo,  //开始
                        // endTime: this.todayIndex   //结束
                        startTime: 20160909,  //开始
                        endTime: 20160915     //结束
                    }
                })
                    .then(function (res) {
                        // console.log(res);
                        let y = [];
                        let x = [];
                        res['data'].forEach(item => {
                            // console.log(item);
                            x.push(item['tjrq']);
                            y.push(item['jjsl']);
                        });
                        for (let i = 0; i < x.length; i++) {
                            let Y = x[i].slice(0, 4);
                            let M = x[i].slice(4, 6);
                            let D = x[i].slice(6, 8);
                            x[i] = M + '-' + D;
                        }
                        // console.log(y);
                        // console.log(x);
                        this.jqjqtjScoure = y;
                        this.jqjqtjChart(x);


                        //    近期警情统计  y
                        // jqjqtjScoure: [900, 1100, 700, 900, 1000, 600, 500]
                        // //  近期警情统计  x
                        // jqjqtjXdata:['10-1', '10-2', '10-3', '10-4', '10-5', '10-6', '10-7'],

                    }.bind(this))
            },
            // 警情分类数据分析
            getFlsj() {
                let that = this;
                this.$http({
                    method: 'post',
                    url: this.apiRoot + this.findUrl[2],
                    headers: {'Content-Type': 'application/x-www-form-urlencoded', 'crossDomain': true},
                    transformRequest: [function (data) {
                        let ret = '';
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    // withCredentials: true,// 允许携带token ,这个是解决跨域产生的相关问题
                    crossDomain: true,
                    data: {
                        // startTime: this.bjfs.start,
                        // endTime: this.bjfs.end
                        tjTime: '20160909',
                        // endTime: '20160915',
                    }
                })
                    .then(function (res) {
                        // console.log(res);
                        res.data.map(item => {
                            item.name = item.fldm;
                            item.value = item.jjsl;
                            delete item.fldm;
                            delete item.jjsl;
                            delete item.tjrq;
                            delete item.fllx;
                            return item;
                        });
                        // console.log(res.data);
                        let arr = [];
                        for (let i = 0; i < res.data.length; i++) {
                            if (res.data[i].name === undefined) {
                                res.data.slice(i, 1);
                            } else {
                                arr.push(res.data[i]);
                            }
                        }
                        // console.log(arr);
                        that.jqflsjfxChart(arr);
                    })
            },
            // 地图
            getMapData() {
                let that = this;
                this.$http({
                    method: 'post',
                    url: this.apiRoot + this.findUrl[3],
                    headers: {'Content-Type': 'application/x-www-form-urlencoded', 'crossDomain': true},
                    transformRequest: [function (data) {
                        let ret = '';
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    // withCredentials: true,// 允许携带token ,这个是解决跨域产生的相关问题
                    crossDomain: true,
                    data: {
                        // tjTime: this.todayIndex
                        tjTime: 20160909,  //今天
                    }
                })
                    .then(function (res) {
                        res.data.map(item => {
                            item.name = item.xzqhdm + '市';
                            item.value = item.jjsl;
                            delete item.xzqhdm;
                            delete item.jjsl;
                            return item;
                        });
                        //把data合并到source
                        res.data.forEach(function (o, d) {
                            for (let k in o) {
                                that.mapSource.forEach(function (t) {
                                    for (let key in t) {
                                        if (t.name == o.name) {
                                            t[k] = o[k];
                                        }
                                    }
                                })
                            }
                        });
                        that.mapChart();
                        // console.log(that.mapSource);
                        // console.log(res.data)
                    })
            },
            //接警类型数据分析    饼
            getJjlx() {
                let that = this;
                this.$http({
                    method: 'post',
                    url: this.apiRoot + this.findUrl[4],
                    headers: {'Content-Type': 'application/x-www-form-urlencoded', 'crossDomain': true},
                    transformRequest: [function (data) {
                        let ret = '';
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    // withCredentials: true,// 允许携带token ,这个是解决跨域产生的相关问题
                    crossDomain: true,
                    data: {
                        tjTime: 20160909,  //今天
                        // tjTime: this.todayIndex,  //今天
                    }
                })
                    .then(function (res) {
                        res.data.map(item => {
                            item.name = item.jjlxdm;
                            item.value = item.jjsl;
                            delete item.jjlxdm;
                            delete item.jjsl;
                            delete item.tjrq;
                            return item;
                        });
                        // console.log(res.data);
                        // that.jrjjlxsjfxSourceSource=res.data;
                        that.jrPieChart('jrPieChart', res.data, that.jrbjfssjfxColor);
                    })
            },
            // 近七日接警类型数据分析    右边
            getJjlxSeven() {
                let that = this;
                this.$http({
                    method: 'post',
                    url: this.apiRoot + this.findUrl[5],
                    headers: {'Content-Type': 'application/x-www-form-urlencoded', 'crossDomain': true},
                    transformRequest: [function (data) {
                        let ret = '';
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    // withCredentials: true,// 允许携带token ,这个是解决跨域产生的相关问题
                    crossDomain: true,
                    data: {
                        // startTime: this.jjlx.start,
                        // endTime: this.jjlx.end,
                        startTime: '20160909',
                        endTime: '20160915',
                    }
                })
                    .then(function (res) {
                        // console.log(res);
                        let r = [];
                        let narr = [];
                        for (let i = 0; i < res.data.length; i++) {
                            // arr.push({name:res.data[i].fldmmc,value:res.data[i].jjsl});
                            let n = r.indexOf(res.data[i].tjrq);
                            if (n == -1) {
                                r.push(res.data[i].tjrq);
                                narr.push({
                                    "date": res.data[i].tjrq,
                                    dataArr: [{name: res.data[i].jjlxdm, value: res.data[i].jjsl}]
                                });
                            } else {
                                narr[n].dataArr.push({name: res.data[i].jjlxdm, value: res.data[i].jjsl})
                            }
                        }
                        // console.log(narr);
                        let dateArr = [];
                        let data = [];
                        narr.forEach(value => {
                            data.push(...value.dataArr);
                            dateArr.push(value.date);
                        });
                        for (let i = 0; i < dateArr.length; i++) {
                            let Y = dateArr[i].slice(0, 4);
                            let M = dateArr[i].slice(4, 6);
                            let D = dateArr[i].slice(6, 8);
                            dateArr[i] = M + '-' + D;
                        }
                        // console.log(data);
                        let r1 = [];
                        let narr1 = [];
                        for (let i = 0; i < data.length; i++) {
                            // console.log(data[i]);
                            let n = r1.indexOf(data[i].name);
                            if (n == -1) {
                                r1.push(data[i].name);
                                narr1.push({"name": data[i].name, value: [data[i].value]})
                            } else {
                                narr1[n].value.push(data[i].value)
                            }
                        }
                        // console.log(narr1);
                        // that.sevenjjlxsjfxSource.log=narr1;
                        that.sevensjfx1('sevenjjlxsjfxChart', narr1, that.jrjjlxsjfxSourceColor, dateArr);
                    })
            },
            // 今日报警方式数据分析
            getBjfs() {
                let that = this;
                this.$http({
                    method: 'post',
                    url: this.apiRoot + this.findUrl[6],
                    headers: {'Content-Type': 'application/x-www-form-urlencoded', 'crossDomain': true},
                    transformRequest: [function (data) {
                        let ret = '';
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    // withCredentials: true,// 允许携带token ,这个是解决跨域产生的相关问题
                    crossDomain: true,
                    data: {
                        // tjTime: this.todayIndex
                        tjTime: 20160909,  //今天
                    }
                })
                    .then(function (res) {
                        // console.log(res);
                        res.data.map(item => {
                            item.name = item.bjfsdm;
                            item.value = item.jjsl;
                            delete item.bjfsdm;
                            delete item.jjsl;
                            delete item.tjrq;
                            return item;
                        });
                        // console.log(res.data);
                        // that.jrjjlxsjfxSourceSource=res.data;
                        that.jrPieChart('jrbjfssjfxChart', res.data, that.jrjjlxsjfxSourceColor);
                    })

            },
            // 近七日报警方式数据分析
            getBjfsSeven() {
                let that = this;
                this.$http({
                    method: 'post',
                    url: this.apiRoot + this.findUrl[7],
                    headers: {'Content-Type': 'application/x-www-form-urlencoded', 'crossDomain': true},
                    transformRequest: [function (data) {
                        let ret = '';
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    // withCredentials: true,// 允许携带token ,这个是解决跨域产生的相关问题
                    crossDomain: true,
                    data: {
                        // startTime: this.bjfs.start,
                        // endTime: this.bjfs.end
                        startTime: '20160909',
                        endTime: '20160915',
                    }
                })
                    .then(function (res) {
                        // console.log(res);
                        let r = [];
                        let narr = [];
                        for (let i = 0; i < res.data.length; i++) {
                            // arr.push({name:res.data[i].fldmmc,value:res.data[i].jjsl});
                            let n = r.indexOf(res.data[i].tjrq);
                            if (n == -1) {
                                r.push(res.data[i].tjrq);
                                narr.push({
                                    "date": res.data[i].tjrq,
                                    dataArr: [{name: res.data[i].bjfsdm, value: res.data[i].jjsl}]
                                });
                            } else {
                                narr[n].dataArr.push({name: res.data[i].bjfsdm, value: res.data[i].jjsl})
                            }
                        }
                        // console.log(narr);
                        let dateArr = [];
                        let data = [];
                        narr.forEach(value => {
                            data.push(...value.dataArr);
                            dateArr.push(value.date);
                        });
                        for (let i = 0; i < dateArr.length; i++) {
                            let Y = dateArr[i].slice(0, 4);
                            let M = dateArr[i].slice(4, 6);
                            let D = dateArr[i].slice(6, 8);
                            dateArr[i] = M + '-' + D;
                        }
                        // console.log(data);
                        let r1 = [];
                        let narr1 = [];
                        for (let i = 0; i < data.length; i++) {
                            // console.log(data[i]);
                            let n = r1.indexOf(data[i].name);
                            if (n == -1) {
                                r1.push(data[i].name);
                                narr1.push({"name": data[i].name, value: [data[i].value]})
                            } else {
                                narr1[n].value.push(data[i].value)
                            }
                        }
                        that.sevensjfx1('sevenbjfssjfxChart', narr1, that.jrbjfssjfxColor, dateArr);
                    })

            },

            // 今日来话类型数据分析
            getLhlx() {
                let that = this;
                this.$http({
                    method: 'post',
                    url: this.apiRoot + this.findUrl[8],
                    headers: {'Content-Type': 'application/x-www-form-urlencoded', 'crossDomain': true},
                    transformRequest: [function (data) {
                        let ret = '';
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    // withCredentials: true,// 允许携带token ,这个是解决跨域产生的相关问题
                    crossDomain: true,
                    data: {
                        tjTime: 20160909,  //今天
                        // tjTime: this.todayIndex,  //今天
                    }
                })
                    .then(function (res) {
                        // console.log(res);
                        res.data.map(item => {
                            item.name = item.lhlxdm;
                            item.value = item.jjsl;
                            delete item.lhlxdm;
                            delete item.jjsl;
                            delete item.tjrq;
                            return item;
                        });
                        // console.log(res.data);
                        that.jrPieChart('jrrlhlxsjfxChart', res.data, that.jrrlhlxsjfxColor);
                    })
            },
            // 近七日来话类型数据分析
            getLhlxSeven() {
                let that = this;
                this.$http({
                    method: 'post',
                    url: this.apiRoot + this.findUrl[9],
                    headers: {'Content-Type': 'application/x-www-form-urlencoded', 'crossDomain': true},
                    transformRequest: [function (data) {
                        let ret = '';
                        for (let it in data) {
                            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                        }
                        return ret
                    }],
                    // withCredentials: true,// 允许携带token ,这个是解决跨域产生的相关问题
                    crossDomain: true,
                    data: {
                        // startTime: this.bjfs.start,
                        // endTime: this.bjfs.end
                        startTime: '20160909',
                        endTime: '20160915',
                    }
                })
                    .then(function (res) {
                        // console.log(res);
                        let r = [];
                        let narr = [];
                        for (let i = 0; i < res.data.length; i++) {
                            // arr.push({name:res.data[i].fldmmc,value:res.data[i].jjsl});
                            let n = r.indexOf(res.data[i].tjrq);
                            if (n == -1) {
                                r.push(res.data[i].tjrq);
                                narr.push({
                                    "date": res.data[i].tjrq,
                                    dataArr: [{name: res.data[i].lhlxdm, value: res.data[i].jjsl}]
                                });
                            } else {
                                narr[n].dataArr.push({name: res.data[i].lhlxdm, value: res.data[i].jjsl})
                            }
                        }
                        // console.log(narr);
                        let dateArr = [];
                        let data = [];
                        narr.forEach(value => {
                            data.push(...value.dataArr);
                            dateArr.push(value.date);
                        });
                        for (let i = 0; i < dateArr.length; i++) {
                            let Y = dateArr[i].slice(0, 4);
                            let M = dateArr[i].slice(4, 6);
                            let D = dateArr[i].slice(6, 8);
                            dateArr[i] = M + '-' + D;
                        }
                        // console.log(data);
                        let r1 = [];
                        let narr1 = [];
                        for (let i = 0; i < data.length; i++) {
                            // console.log(data[i]);
                            let n = r1.indexOf(data[i].name);
                            if (n == -1) {
                                r1.push(data[i].name);
                                narr1.push({"name": data[i].name, value: [data[i].value]})
                            } else {
                                narr1[n].value.push(data[i].value)
                            }
                        }
                        // console.log(narr1);
                        that.sevensjfx1('sevenlhlxsjfxChart', narr1, that.jrrlhlxsjfxColor, dateArr);
                    })

            },
            //获取7天日期
            getDate() {
                let date = new Date();
                this.todayIndex = date.getFullYear().toString() + (date.getMonth() + 1).toString().padStart(2, '0') + date.getDate().toString().padStart(2, '0');
                let timestamp = date.getTime();
                let day1=timestamp-2 * 24 * 60 * 60 * 1000;
                let day = timestamp - 6 * 24 * 60 * 60 * 1000;
                let date1=new Date(day1);
                this.threeDaysAgo=date1.getFullYear().toString() + (date1.getMonth() + 1).toString().padStart(2, '0') + date1.getDate().toString().padStart(2, '0');
                let date2 = new Date(day);
                this.sevenDaysAgo = date2.getFullYear().toString() + (date2.getMonth() + 1).toString().padStart(2, '0') + date2.getDate().toString().padStart(2, '0');
            },
        },
        mounted() {
            this.getDate();
            this.setperiod();
            this.getScale();
            this.selectedItem();
            // this.change();
            this.renderChart();
            // this.getFlsj();
        }
    }
</script>

<style scoped lang="scss">
    //样式里的l, m, r, t, b分别代表左，中，右，上，下
    //布局
    @font-face {
        font-family: heijian;
        src: url('../assets/style/font/heijian.ttf');
    }

    main {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        h3 {
            cursor: pointer;
        }

        .l > div, .m > div, .r > div {
            width: 100%;
            align-content: space-between;
        }

        .filter {
            position: absolute;
            right: 0;
            width: 1.5rem;
            height: 1.5rem;
            z-index: 999;

            .iconBox {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 999;
            }

            .iconguolv {
                color: #17fff3;
                font-weight: lighter;
                transform: scale(0.4);
                transform-origin: top right;
                margin-top: 0.1rem;
                position: absolute;
                top: 0.08rem;
                right: 0.2rem;
            }

            .option {
                width: 12rem;
                height: 11.43rem;
                position: absolute;
                top: 0;
                right: -0.5rem;
                background: url("../assets/images/index/filter.png");
                background-repeat: no-repeat;
                background-size: 100% 100%;
                display: none;

                .filterTitle {
                    color: #17fff3;
                    position: absolute;
                    top: 1.3rem;
                    left: 0;
                    right: 0;
                    margin: auto;
                    height: 16%;

                    div {
                        width: 167%;
                        height: 167%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transform: scale(0.6);
                        transform-origin: left top;
                        letter-spacing: 2px;
                    }
                }

                .filterItem {
                    position: absolute;
                    top: 33%;
                    width: 70%;
                    height: 50%;
                    left: 0;
                    right: 0;
                    margin: auto;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;

                    li {
                        width: 100%;
                        height: 27.4%;

                        div {
                            width: 167%;
                            height: 167%;
                            transform: scale(0.6);
                            transform-origin: left top;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            letter-spacing: 2px;
                            cursor: pointer;
                            background-image: linear-gradient(-86deg,
                                    #0b5fa7 0%,
                                    #0b5fa7 100%);
                            border-style: solid;
                            border-width: 1px;
                            border-image-source: linear-gradient(268deg,
                                    #0493e4 41%,
                                    #0492e3 43%,
                                    rgba(8, 120, 197, 0.5) 71%,
                                    #0b5fa7 100%);
                            border-image-slice: 1;

                            &.active {
                                background-image: linear-gradient(-86deg,
                                        #53b0ff 0%,
                                        #0b5fa7 100%);
                            }
                        }
                    }
                }
            }
        }

        .l {
            width: 25.68%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .l-t {
                height: 30%;
                background-image: url('../assets/images/index/l-t-bg.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
                // margin-bottom:3.3%; 
            }

            .l-m {
                height: 30%;
                background-image: url('../assets/images/index/l-m-bg.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
                // margin-bottom:3.3%; 
            }

            .l-b {
                height: 30%;
                background-image: url('../assets/images/index/l-b-bg.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
                // margin-bottom:3.3%;
                position: relative;
            }

            //内容
            .chartBox {
                height: 80%;
                margin: 0 auto;
                display: flex;
                flex-direction: column;
                //数据
                .statistics {
                    width: 100%;
                    /*height: 2.25rem;*/
                    display: flex;
                    justify-content: space-between;

                    li {
                        transform: scale(0.7);
                        transform-origin: center;

                        p {
                            text-align: center;
                            color: #00fffc;

                            &:first-child {
                                margin-bottom: 0.91rem;
                                color: #00a8ff;
                            }

                            &:nth-child(2) {
                                transform: scale(1.5);
                                font-family: heijian;
                                letter-spacing: 2px;
                            }
                        }
                    }

                }

                // 图表
                #jqtjjcChart {
                    width: 100%;
                    height: 8.19rem;
                    flex: 1;
                }
            }
        }

        .chart {
            width: 100%;
            height: 100%;
        }

        .chart-wrap {
            // border: .0625rem solid rgba(76, 180, 231, 0.33);
            width: 100%;
            height: 100%;
            //标题
            > h3 {
                height: 15%;
                text-align: center;
            }
        }

        .chartBox {
            width: 100%;
            height: 100%;
        }

        .m {
            width: 25.73%;
            background-image: url('../assets/images/index/m.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;;

            .chartBox {
                position: relative;

                #mapData {
                    position: absolute;
                    top: 1rem;
                    left: 1.04rem;

                    p:first-child {
                        font-size: 3rem;
                        letter-spacing: 0.3rem;
                        font-family: heijian;
                    }

                    p:nth-child(2) {
                        transform: scale(0.6);
                        transform-origin: left;
                        color: #00a8ff;
                    }
                }
            }
        }

        .r {
            width: 45.21%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .r-l, .r-r {
                //586.716
                width: 38.63%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                & > div {
                    width: 100%;
                    height: 14.25rem;

                    .chartBox {
                        height: 85%;
                    }
                }

                .iconguolv {
                    right: 0.3rem;
                }

                .r-l-t, .r-l-m, .r-l-b {
                    height: 30%;
                    background-image: url('../assets/images/index/r-l-all.png');
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }

                .r-r-t, .r-r-m, .r-r-b {
                    height: 30%;
                    background-image: url('../assets/images/index/r-r-all.png');
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                    position: relative;
                }
            }

            .r-r {
                width: 57.72%;
            }
        }
    }
</style>