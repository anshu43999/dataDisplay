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
                        <div class="option">
                            <div class="filterTitle">
                                <div>时间筛选</div>
                            </div>
                            <ul class="filterItem" @click="selectItem">
                                <li v-for="item in periodArr" :key="item">
                                    <div>{{item}}</div>
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
                            <div class="option">
                                <div class="filterTitle">
                                    <div>时间筛选</div>
                                </div>
                                <ul class="filterItem" @click="selectItem">
                                    <li v-for="item in periodArr" :key="item">
                                        <div>{{item}}</div>
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
                            <div class="option">
                                <div class="filterTitle">
                                    <div>时间筛选</div>
                                </div>
                                <ul class="filterItem" @click="selectItem">
                                    <li v-for="item in periodArr" :key="item">
                                        <div>{{item}}</div>
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
                            <div class="option">
                                <div class="filterTitle">
                                    <div>时间筛选</div>
                                </div>
                                <ul class="filterItem" @click="selectItem">
                                    <li v-for="item in periodArr" :key="item">
                                        <div>{{item}}</div>
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
                //需要刷新的图表
                refreshCharts: [],
                //    所有的图标对象
                chartsObj: {},
                //坐标轴颜色
                axisesColor: '#0057ab',
                //缩放值
                scale: 1,
                //筛选选项
                periodArr:['近7日','上周','近半年'],
                //默认获取本周数据
                period: 'lastWeek',
                //警情统计监测
                jqtjjcData: [
                    {name: '报警事件总数', value: 18364},
                    {name: '有效警情总数', value: 18364},
                    {name: '处警事件总数', value: 18364},
                    {name: '反馈事件总数', value: 18364},
                ],
                jqtjjcSource: [
                    {name: '处警时间占比', value: 85, radius: '65%'},
                    {name: '有效警情占比', value: 90, radius: '75%'},
                    {name: '反馈事件占比', value: 95, radius: '65%'}
                ],
                //    近期警情统计
                jqjqtjScoure: [900, 1100, 700, 900, 1000, 600, 500],
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
                    {name: "太原市", value: 80, value1: 70},
                    {name: "长治市", value: 42, value1: 50},
                    {name: "朔州市", value: 4, value1: 20},
                    {name: "运城市", value: 32, value1: 60},
                    {name: "大同市", value: 30, value1: 80},
                    {name: "晋城市", value: 10, value1: 60},
                    {name: "晋中市", value: 21, value1: 30},
                    {name: "临汾市", value: 5, value1: 20},
                    {name: "忻州市", value: 5, value1: 50},
                    {name: "阳泉市", value: 10, value1: 30},
                    {name: "吕梁市", value: 20, value1: 40},
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
                /*sevenjjlxsjfxSource: [
                    {name: '110报警', value: [580, 630, 700, 400, 250, 156, 894]},
                    {name: '122报警', value: [468, 498, 481, 168, 79, 455, 155]},
                    {name: '119报警', value: [483, 558, 465, 48, 188, 465, 455]},
                    {name: '综合报警', value: [671, 465, 184, 561, 455, 268, 145]},
                    {name: '其他接警类型', value: [456, 567, 569, 594, 189, 498, 155]},
                ],*/
                sevenjjlxsjfxSource: {},
                //    近七日报警方式数据分析
                sevenbjfssjfxSource: [
                    {name: '电话报警', value: [580, 630, 700, 400, 250, 156, 894]},
                    {name: '来人来电报警', value: [468, 498, 481, 168, 79, 455, 155]},
                    {name: '技防报警', value: [483, 558, 465, 48, 188, 465, 455]},
                    {name: '短信报警', value: [671, 465, 184, 561, 455, 268, 145]},
                    {name: '其他报警方式', value: [456, 567, 569, 594, 189, 498, 155]}
                ],
                // sevenbjfssjfxSource:{},
                //    近七日来话类型数据分析
                sevenlhlxsjfxSource: [
                    {name: '报警求助、举报投诉', value: [580, 630, 700, 400, 250, 156, 894]},
                    {name: '处警反馈', value: [468, 498, 481, 168, 79, 455, 155]},
                    {name: '信息咨询', value: [483, 558, 465, 48, 188, 465, 455]},
                    {name: '重复报警', value: [671, 465, 184, 561, 455, 268, 145]},
                    {name: '骚扰电话', value: [456, 567, 569, 594, 189, 498, 155]},
                    {name: '系统测试', value: [652, 556, 155, 166, 562, 515, 565]},
                    {name: '其他来话类型', value: [256, 626, 515, 126, 512, 556, 488]}
                ],
                // sevenlhlxsjfxSource:{}
                time: {'jqflsjfx': 'week', 'jqsjfx': 'week', 'bjfssjfx': 'week', 'lhlxsjfx': 'week'},
                option: {
                    xAxis: {
                        type: 'category',
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#0057ab'
                            }
                        },
                        axisTick: {
                            show: false
                        },
                    },
                    yAxis: {
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: '#0057ab'
                            }
                        },
                        axisTick: {
                            show: false
                        }
                    },
                    series: {
                        type: 'bar',
                        stack: 'chart',
                    },
                    grid: {
                        left: '9%',
                        right: '5%',
                        top: '5%',
                        bottom: '15%'
                    },
                    tooltip: {}
                }
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
                                        offsetCenter: [0, '90%'],
                                        textStyle: {
                                            fontSize: 20 * that.scale,
                                        },
                                        formatter: [
                                            '{value}% ' + (item.unit || ''),
                                            '{name|' + item.name + '}'
                                        ].join('\n'),
                                        rich: {
                                            name: {
                                                fontSize: 22 * that.scale,
                                                lineHeight: 70 * that.scale,
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
                    })()
                };
                myChart.setOption(option);
            },
            //    近期警情统计
            jqjqtjChart() {
                let myChart = this.$echarts.init(document.getElementById('jqjqtjChart'));
                this.chartsObj.jqjqtjChart = myChart;
                let sourceArr = this.jqjqtjScoure;
                let dateArr = ['10-1', '10-2', '10-3', '10-4', '10-5', '10-6', '10-7'];
                let option = this.option;
                option.series.data = sourceArr;
                option.series.itemStyle = {
                    color: this.gradient(['#00dce4', '#529fff'])
                };
                option.series.barWidth = 20 * this.scale;
                option.xAxis.data = dateArr;
                option.xAxis.axisLabel = {
                    fontSize: 20 * this.scale,
                    interval: 0,
                };
                option.yAxis.axisLabel = {
                    fontSize: 20 * this.scale,
                };
                myChart.setOption(option);
            },
            //    警情分类数据分析
            jqflsjfxChart() {
                let myChart = this.$echarts.init(document.getElementById('jqflsjfxChart'));
                this.chartsObj.jqflsjfxChart = myChart;
                let xData = [];
                let sourceArr = this.jqflsjfxSource;
                sourceArr.forEach(value => {
                    xData.push(value.name);
                });
                let option = this.option;
                option.series.data = sourceArr;
                option.series.itemStyle = {
                    color: this.gradient(['#fcc60a', '#f5834a'])
                };
                option.series.barWidth = 20 * this.scale;
                option.xAxis.data = xData;
                option.xAxis.axisLabel = {
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
                };
                option.yAxis.axisLabel = {
                    fontSize: 20 * this.scale,
                };
                option.grid.bottom = '24%';
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
                            nameMap: {
                                '山西省': '山西省'
                            },
                            label: {
                                normal: {
                                    show: true,
                                    formatter: function (params) {
                                        if (params.data.value1) {
                                            let valueType = params.data.value[1] ? 'valueUp' : 'valueDown';
                                            return params.name +
                                                '：{' + valueType + '|' + params.data.value1 + '}';
                                        } else {
                                            return params.name
                                        }
                                    },
                                    position: 'inside',
                                    backgroundColor: '#fff',
                                    padding: [4, 5],
                                    borderRadius: 3,
                                    borderWidth: 1,
                                    borderColor: 'rgba(0,0,0,0.5)',
                                    color: '#333',
                                    rich: {
                                        valueUp: {
                                            color: '#019D2D',
                                            fontSize: 14
                                        },
                                        valueDown: {
                                            color: '#019D2D',
                                            fontSize: 14
                                        },
                                    }
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            itemStyle: {
                                emphasis: {
                                    label: {
                                        show: true
                                    },
                                    areaColor: '#ffde7b'
                                }
                            },
                        },
                    ];
                    option.geo = {
                        show: true,
                        map: map,
                        label: {
                            normal: {
                                show: false
                            },
                            emphasis: {
                                show: false,
                            }
                        },
                        roam: false,
                    };
                    // let color=['rgba(255,0,0,0.2)','rgba(255,0,0,0.4)','rgba(255,0,0,0.6)','rgba(255,0,0,0.8)','rgba(255,0,0,1)'];
                    option.visualMap = {
                        type: 'piecewise',
                        pieces: [{
                            max: that.grading[0],
                            label: '一级',
                            color: '#47bef5'
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
                        radius: ['20%', '80%'],
                        center: ['50%', '50%'],
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
                        })
                    }, {
                        type: 'pie',
                        radius: ['10%', '12%'],
                        center: ['50%', '50%'],
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
                        ]
                    }]
                };
                myChart.setOption(option);
            },
            // 近七日接警类型数据分析、近七日报警方式数据分析、近七日来话类型数据分析
            sevensjfx(chartContainer, sourceArr, colorList) {
                let seriesArr = [];
                let myChart = this.$echarts.init(document.getElementById(chartContainer));
                this.chartsObj[chartContainer] = myChart;
                for (let i = 0; i < sourceArr['data'].length; i++) {
                    seriesArr.push({
                        name: sourceArr['data'][i].name,
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
                        data: sourceArr['data'][i].value
                    });
                }
                let option = this.option;
                option.xAxis.boundaryGap = false;
                option.xAxis.axisLabel = option.yAxis.axisLabel = {
                    fontSize: 20 * this.scale
                };
                option.xAxis.data = sourceArr['date'];
                option.yAxis.splitLine = {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color: '#03eeff'
                    }
                };
                option.series = seriesArr;
                option.tooltip = {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                };
                option.legend = {
                    textStyle: {
                        fontSize: 20 * this.scale,
                        color: '#63cbff'
                    },
                    itemWidth: 18 * this.scale,
                    itemHeight: 18 * this.scale,
                    width: '85%'
                };
                option.grid = {
                    top: 100 * this.scale,
                    bottom: 60 * this.scale,
                };
                myChart.setOption(option);
            },
            sevensjfx1(chartContainer, sourceArr, colorList) {
                let seriesArr = [];
                let dateArr = ['10-1', '10-2', '10-3', '10-4', '10-5', '10-6', '10-7'];
                let myChart = this.$echarts.init(document.getElementById(chartContainer));
                this.chartsObj[chartContainer] = myChart;
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
                            width: 2
                        },
                        data: sourceArr[i].value
                    });
                }
                let option = this.option;
                option.xAxis.boundaryGap = false;
                option.xAxis.axisLabel = option.yAxis.axisLabel = {
                    fontSize: 20 * this.scale
                };
                option.xAxis.data = dateArr;
                option.yAxis.splitLine = {
                    show: true,
                    lineStyle: {
                        type: 'dashed',
                        color: '#03eeff'
                    }
                };
                option.series = seriesArr;
                option.tooltip = {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                };
                option.legend = {
                    textStyle: {
                        fontSize: 20 * this.scale,
                        color: '#63cbff'
                    },
                    itemWidth: 18 * this.scale,
                    itemHeight: 18 * this.scale,
                    width: '85%'
                };
                option.grid = {
                    top: 100 * this.scale,
                    bottom: 60 * this.scale,
                };
                myChart.setOption(option);
            },
            // 日期
            /*getDate() {
                switch (this.period) {
                    case "week":
                        let date1 = new Date();
                        let start1 = date1.getFullYear().toString() + (date1.getMonth() + 1).toString() + date1.getDate().toString();
                        let timestamp = (new Date()).getTime();
                        let day = timestamp - 6 * 24 * 60 * 60 * 1000;
                        let date2 = new Date(day);
                        let end1 = date2.getFullYear().toString() + (date2.getMonth() + 1).toString() + date2.getDate().toString();
                        // console.log(end1);
                        break;
                    case 'lastWeek':
                        let d = new Date();
// set to Monday of this week
                        d.setDate(d.getDate() - (d.getDay() + 6) % 7);
// set to previous Monday
                        let date3 = new Date(d.setDate(d.getDate() - 7));
                        let Monday = date3.getFullYear().toString() + (date3.getMonth() + 1).toString() + date3.getDate().toString();
// create new date of day before
                        let date4 = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7);
                        let Sunday = date4.getFullYear().toString() + (date4.getMonth() + 1).toString() + date4.getDate().toString();
                        break;

                }
            },*/
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
            //    数据转换
            change() {
                let dataArr = [];
                let data = {
                    "sevenDays": {
                        "122报警": [
                            {
                                "tjrq": "20191008",
                                "jjlxdm": "122报警",
                                "jjsl": 54
                            },
                            {
                                "tjrq": "20191007",
                                "jjlxdm": "122报警",
                                "jjsl": 74
                            },
                            {
                                "tjrq": "20191006",
                                "jjlxdm": "122报警",
                                "jjsl": 92
                            },
                            {
                                "tjrq": "20191005",
                                "jjlxdm": "122报警",
                                "jjsl": 69
                            },
                            {
                                "tjrq": "20191004",
                                "jjlxdm": "122报警",
                                "jjsl": 58
                            },
                            {
                                "tjrq": "20191003",
                                "jjlxdm": "122报警",
                                "jjsl": 92
                            }
                        ],
                        "110报警": [
                            {
                                "tjrq": "20191008",
                                "jjlxdm": "110报警",
                                "jjsl": 558
                            },
                            {
                                "tjrq": "20191007",
                                "jjlxdm": "110报警",
                                "jjsl": 371
                            },
                            {
                                "tjrq": "20191006",
                                "jjlxdm": "110报警",
                                "jjsl": 506
                            },
                            {
                                "tjrq": "20191005",
                                "jjlxdm": "110报警",
                                "jjsl": 439
                            },
                            {
                                "tjrq": "20191004",
                                "jjlxdm": "110报警",
                                "jjsl": 413
                            },
                            {
                                "tjrq": "20191003",
                                "jjlxdm": "110报警",
                                "jjsl": 436
                            }
                        ],
                        "119报警": [
                            {
                                "tjrq": "20191008",
                                "jjlxdm": "119报警",
                                "jjsl": 5
                            },
                            {
                                "tjrq": "20191007",
                                "jjlxdm": "119报警",
                                "jjsl": 8
                            },
                            {
                                "tjrq": "20191006",
                                "jjlxdm": "119报警",
                                "jjsl": 10
                            },
                            {
                                "tjrq": "20191005",
                                "jjlxdm": "119报警",
                                "jjsl": 9
                            },
                            {
                                "tjrq": "20191004",
                                "jjlxdm": "119报警",
                                "jjsl": 3
                            },
                            {
                                "tjrq": "20191003",
                                "jjlxdm": "119报警",
                                "jjsl": 14
                            }
                        ],
                    }
                };
                // console.log(data.sevenDays["110报警"]);
                let date = [];
                let dateArr = [];
                let data1 = [];
                for (let i = 0; i < data.sevenDays["122报警"].length; i++) {
                    date.push(data.sevenDays["122报警"][i].tjrq);
                    data1.push(data.sevenDays["122报警"][i].jjsl)
                }
                for (let i = 0; i < date.length; i++) {
                    let Y = date[i].slice(0, 4);
                    let M = date[i].slice(4, 6);
                    let D = date[i].slice(6, 8);
                    dateArr[i] = M + '-' + D;
                }
                let data2 = [];
                for (let i = 0; i < data.sevenDays["110报警"].length; i++) {
                    data2.push(data.sevenDays["110报警"][i].jjsl)
                }
                let data3 = [];
                for (let i = 0; i < data.sevenDays["119报警"].length; i++) {
                    data3.push(data.sevenDays["119报警"][i].jjsl)
                }
                dataArr.push({name: '122报警', value: data1});
                dataArr.push({name: '110报警', value: data2});
                dataArr.push({name: '119报警', value: data3});
                this.sevenjjlxsjfxSource.data = dataArr;
                this.sevenjjlxsjfxSource.date = dateArr;
                this.sevenjjlxsjfxSource.color = ['#05dbb0', '#00a3c0', '#4160fd', '#bd0fdc', '#803ff7'];
            },
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
                        Public.chartsReDraw(that.chartsObj, null, [
                            ''
                        ], that.refreshCharts)
                    },
                    loadData() {
                        that.panChart();
                        that.jqjqtjChart();
                        that.jqflsjfxChart();
                        that.mapChart();
                        //console.log(that.sevenjjlxsjfxSource);
                        that.jrPieChart('jrPieChart', that.jrjjlxsjfxSourceSource, that.jrjjlxsjfxSourceColor);
                        that.jrPieChart('jrbjfssjfxChart', that.jrbjfssjfxSource, that.jrbjfssjfxColor);
                        that.jrPieChart('jrrlhlxsjfxChart', that.jrrlhlxsjfxSource, that.jrrlhlxsjfxColor);
                        that.sevensjfx('sevenjjlxsjfxChart', that.sevenjjlxsjfxSource, that.jrjjlxsjfxSourceColor);
                        that.sevensjfx1('sevenbjfssjfxChart', that.sevenbjfssjfxSource, that.jrbjfssjfxColor);
                        that.sevensjfx1('sevenlhlxsjfxChart', that.sevenlhlxsjfxSource, that.jrrlhlxsjfxColor);
                    },
                };
                Index.init();
            },
            selectedItem() {
                let item = document.querySelectorAll('.option>.filterItem>li>div');
                item[0].classList.add('active');
            },
            selectItem(e) {
                let item = document.querySelectorAll('.option>.filterItem>li>div');
                item.forEach((value) => {
                    value.classList.remove('active');
                });
                e.target.classList.add('active');
                switch (e.target.innerHTML) {
                    case'近7日':
                        let date1 = new Date();
                        let start1 = date1.getFullYear().toString() + (date1.getMonth() + 1).toString() + date1.getDate().toString();
                        let timestamp = (new Date()).getTime();
                        let day = timestamp - 6 * 24 * 60 * 60 * 1000;
                        let date2 = new Date(day);
                        let end1 = date2.getFullYear().toString() + (date2.getMonth() + 1).toString() + date2.getDate().toString();
                        e.target.parentNode.parentNode.parentNode.style.display='none';
                        break;
                    case'上周':
                        let d = new Date();
// set to Monday of this week
                        d.setDate(d.getDate() - (d.getDay() + 6) % 7);
// set to previous Monday
                        let date3 = new Date(d.setDate(d.getDate() - 7));
                        let Monday = date3.getFullYear().toString() + (date3.getMonth() + 1).toString() + date3.getDate().toString();
// create new date of day before
                        let date4 = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7);
                        let Sunday = date4.getFullYear().toString() + (date4.getMonth() + 1).toString() + date4.getDate().toString();
                        e.target.parentNode.parentNode.parentNode.style.display='none';
                        break;
                    case'近半年':
                        let dt = new Date();
                        dt.setMonth( dt.getMonth()-6 );
                        let halfYear=dt.getFullYear() + '-' + (dt.getMonth()+1);
                        e.target.parentNode.parentNode.parentNode.style.display='none';
                        break;
                    default:
                        console.log('false');
                        break;
                }
            },
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
            }
        },
        mounted() {
            this.getScale();
            this.selectedItem();
            this.change();
            this.renderChart();
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
                    height: 2.25rem;
                    display: flex;
                    justify-content: space-between;

                    li {
                        transform: scale(0.64);
                        transform-origin: top;
                        height: 3.69rem;

                        p {
                            text-align: center;
                            color: #00fffc;

                            &:first-child {
                                margin-bottom: 0.91rem;
                                color: #00a8ff;
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