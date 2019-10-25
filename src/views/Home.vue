<template>
    <div id="container">
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
                                <div class="chart" id="jrjjlxsjfxSourceChart"></div>
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
                        <div class="chart-wrap">
                            <h3 @click="jump">近七日接警类型数据分析</h3>
                            <div class="chartBox">
                                <div class="chart" id="sevenjjlxsjfxChart"></div>
                            </div>
                        </div>
                    </div>
                    <div class="r-r-m">
                        <div class="chart-wrap">
                            <h3 @click="jump">近七日报警方式数据分析</h3>
                            <div class="chartBox">
                                <div class="chart" id="sevenbjfssjfxChart"></div>
                            </div>
                        </div>
                    </div>
                    <div class="r-r-b">
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
                //默认获取本周数据
                period: 'week',
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
                //    地图
            
                grading:[0.2,0.4,0.6,0.8,1],
                mapSource:[
                    {name: "太原市", value: 80, value1: 70},
                    {name: "长治市", value: 42, value1: 50},
                    {name: "朔州市", value: 4, value1: 20},
                    {name: "运城市", value: 53, value1: 60},
                    {name: "大同市", value: 30, value1: 80},
                    {name: "晋城市", value: 52, value1: 60},
                    {name: "晋中市", value: 21, value1: 30},
                    {name: "临汾市", value: 5, value1: 20},
                    {name: "忻州市", value: 5, value1: 50},
                    {name: "阳泉市", value: 10, value1: 30},
                    {name: "吕梁市", value: 32, value1: 40},
                ],
                mapData: {name: '报警事件总数', value: 96666},
                //    今日接警类型数据分析、今日来话类型数据分析
                jrjjlxsjfxSourceSource: [
                    {name: '110报警', value: 442},
                    {name: '122报警', value: 155},
                    {name: '119报警', value: 263},
                    {name: '综合报警', value: 145},
                    {name: '其他接警类型', value: 155}
                ],
                jrjjlxsjfxSourceColor: ['#05dbb0', '#00a3c0', '#4160fd', '#bd0fdc', '#803ff7'],
                //    今日报警方式数据分析
                jrbjfssjfxSource: [
                    {name: '电话报警', value: 442},
                    {name: '来人（来电）报警', value: 155},
                    {name: '技防报警', value: 263},
                    {name: '短信报警', value: 145},
                    {name: '其他报警方式', value: 155}
                ],
                jrbjfssjfxColor: ['#ffd75d', '#00a3c0', '#0d28a6', '#e344ff', '#6400cb'],
                //    今日来话类型数据分析
                jrrlhlxsjfxSource: [
                    {name: '报警求助、举报投诉', value: 442},
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
                    {name: '110报警', value: [580, 630, 700, 400, 250, 156, 894]},
                    {name: '122报警', value: [468, 498, 481, 168, 79, 455, 155]},
                    {name: '119报警', value: [483, 558, 465, 48, 188, 465, 455]},
                    {name: '综合报警', value: [671, 465, 184, 561, 455, 268, 145]},
                    {name: '其他接警类型', value: [456, 567, 569, 594, 189, 498, 155]},
                ],
                //    近七日报警方式数据分析
                sevenbjfssjfxSource: [
                    {name: '电话报警', value: [580, 630, 700, 400, 250, 156, 894]},
                    {name: '来人来电报警', value: [468, 498, 481, 168, 79, 455, 155]},
                    {name: '技防报警', value: [483, 558, 465, 48, 188, 465, 455]},
                    {name: '短信报警', value: [671, 465, 184, 561, 455, 268, 145]},
                    {name: '其他报警方式', value: [456, 567, 569, 594, 189, 498, 155]}
                ],
                //    近七日来话类型数据分析
                sevenlhlxsjfxSource: [
                    {name: '报警求助、举报投诉', value: [580, 630, 700, 400, 250, 156, 894]},
                    {name: '处警反馈', value: [468, 498, 481, 168, 79, 455, 155]},
                    {name: '信息咨询', value: [483, 558, 465, 48, 188, 465, 455]},
                    {name: '重复报警', value: [671, 465, 184, 561, 455, 268, 145]},
                    {name: '骚扰电话', value: [456, 567, 569, 594, 189, 498, 155]},
                    {name: '系统测试', value: [652, 556, 155, 166, 562, 515, 565]},
                    {name: '其他来话类型', value: [256, 626, 515, 126, 512, 556, 488]}
                ]

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
                                    axisTick:{
                                        show: false,
                                    },
                                    splitLine:{
                                        length:15*that.scale,
                                        lineStyle:{
                                            width:2*that.scale
                                        }
                                    },
                                    axisLabel:{
                                        fontSize:16*that.scale,
                                        color:'#91c7ae'
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
                                        width: 6*that.scale
                                    },
                                    detail: {
                                        show: true,
                                        offsetCenter: [0, '90%'],
                                        textStyle: {
                                            fontSize: 20*that.scale,
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
                                    splitLine:{
                                        length:15*that.scale,
                                        lineStyle:{
                                            width:2*that.scale
                                        }
                                    },
                                    axisTick:{
                                        length: 8*that.scale,
                                        lineStyle:{
                                            width:2*that.scale
                                        }
                                    },
                                    axisLabel:{
                                        show:false
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
                let dateArr = [];
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
                        axisLabel :{
                            fontSize : 20 * this.scale,
                        },
                        data: dateArr
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
                        axisLabel :{
                            fontSize : 20 * this.scale,
                        },
                    },
                    grid:{
                        // width : 80 + '%',
                        height :75 + '%',
                        left : 100 * this.scale,
                        right : 50 * this.scale,
                        top : 5 + '%',
                        // bottom : 5 + '%',
                        // height : 50,

                    },
                    series: {
                        type: 'bar',
                        data: sourceArr,
                        itemStyle: {
                            color: new this.$echarts.graphic.LinearGradient(
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
                        barWidth: 17 * this.scale
                    },
                    tooltip: {}
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
                            fontSize : 16 * this.scale,
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
                        barWidth: 17 * this.scale
                    },
                    grid: { 
                        width : 85 + '%',
                        height : 70 + "%",
                        top : 5 + '%',
                        // bottom : 5+ '%',

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
                    // data2.push({name:value.name,value:Math.round((value.value/value.value1)*100),value1:value.value});
                    data2.push({name:value.name,value:(value.value/value.value1).toFixed(2),value1:value.value});
                    /*if (value.value < value.value2) {
                        data2.push({name: value.name, value: 20, value1: value.value})
                    }
                    if (value.value < value.value1 && value.value > value.value2) {
                        data2.push({name: value.name, value: 50, value1: value.value})
                    }
                    if (value.value > value.value1) {
                        data2.push({name: value.name, value: 70, value1: value.value})
                    }*/
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
                    option.visualMap = {
                        type: 'piecewise',
                        pieces: [{
                            max: that.grading[0],
                            label: '一级',
                            color: '#00e57c'
                        }, {
                            min: that.grading[0],
                            max: that.grading[1],
                            label: '二级',
                            color: '#ffe71a'
                        }, {
                            min: that.grading[1],
                            max: that.grading[2],
                            label: '三级',
                            color: '#ffad1a'
                        },
                            {
                                min: that.grading[2],
                                max: that.grading[3],
                                label: '四级',
                                color: '#ff6600'
                            },
                            {
                                min: that.grading[3],
                                // max: that.grading[4],
                                label: '五级',
                                color: '#ed0000'
                            }
                        ],
                        left: 'right',
                        top: 'bottom',
                        calculable: true,
                        seriesIndex: [1],
                        textStyle:{
                            color:'#fff'
                        }
                        /*inRange: {
                            color: ['#f7fbff', '#4e7cef', '#0549f3']
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
            //110:{'10-1':110}
            jrjjlxsjfxSourceChart(chartContainer, sourceArr, colorList) {
                let myChart = this.$echarts.init(document.getElementById(chartContainer));
                this.chartsObj[chartContainer] = myChart;
                let total = 0;
                sourceArr.forEach(value => {
                    total += value.value
                });
                let option = {
                    legend: {
                        textStyle: {
                            fontSize: 12 * this.scale,
                            color: function (params) {
                                return colorList[params.dataIndex]
                            }
                        },
                        itemWidth: 12 * this.scale,
                        itemHeight: 12 * this.scale
                    },
                    tooltip: {},
                    series: [{
                        type: 'pie',
                        radius: ['20%', '80%'],
                        center: ['50%', '50%'],
                        roseType: 'radius',
                        label: {
                            normal: {
                                formatter: function (params) {
                                    return params.name + '\n' + Math.round((params.value / total) * 100) + '%'
                                },
                                fontSize: 12 * this.scale
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
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true,
                                length: 5 * this.scale,
                                length2: 5 * this.scale,
                                lineStyle: {
                                    color: '#d3d3d3'
                                },
                                align: 'right'
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
                                show: false
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
                let dateArr = [];
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
                        bottom: 60 * this.scale
                    }
                };
                myChart.setOption(option);
            },
           // 跳转
            jump(e){
                let h3=e.currentTarget;
                switch (h3.innerText) {
                    case '近七日接警类型数据分析':this.$router.push({name:'全省接警类型数据分析',query:{title:'全省接警类型数据分析'}});break;
                    case '近七日报警方式数据分析':this.$router.push({name:'全省报警方式数据分析',query:{title:'全省报警方式数据分析'}});break;
                    case '近七日来话类型数据分析':this.$router.push({name:'全省来话类型数据分析',query:{title:'全省来话类型数据分析'}});break;
                    case '警情分类数据分析':this.$router.push({name:'全省警情分类数据分析',query:{title:'全省警情分类数据分析'}});break;
                }
            },
        //    数据转换
            change() {
                let dataArr=[];
                let data = {
                    "sevenDays": {
                        "122报警": [
                            {
                                "tjrq": "20130308",
                                "jjlxdm": "122报警",
                                "jjsl": 54
                            },
                            {
                                "tjrq": "20130307",
                                "jjlxdm": "122报警",
                                "jjsl": 74
                            },
                            {
                                "tjrq": "20130306",
                                "jjlxdm": "122报警",
                                "jjsl": 92
                            },
                            {
                                "tjrq": "20130305",
                                "jjlxdm": "122报警",
                                "jjsl": 69
                            },
                            {
                                "tjrq": "20130304",
                                "jjlxdm": "122报警",
                                "jjsl": 58
                            },
                            {
                                "tjrq": "20130303",
                                "jjlxdm": "122报警",
                                "jjsl": 92
                            }
                        ],
                        "110报警": [
                            {
                                "tjrq": "20130308",
                                "jjlxdm": "110报警",
                                "jjsl": 558
                            },
                            {
                                "tjrq": "20130307",
                                "jjlxdm": "110报警",
                                "jjsl": 371
                            },
                            {
                                "tjrq": "20130306",
                                "jjlxdm": "110报警",
                                "jjsl": 506
                            },
                            {
                                "tjrq": "20130305",
                                "jjlxdm": "110报警",
                                "jjsl": 439
                            },
                            {
                                "tjrq": "20130304",
                                "jjlxdm": "110报警",
                                "jjsl": 413
                            },
                            {
                                "tjrq": "20130303",
                                "jjlxdm": "110报警",
                                "jjsl": 436
                            }
                        ],
                        "119报警": [
                            {
                                "tjrq": "20130308",
                                "jjlxdm": "119报警",
                                "jjsl": 5
                            },
                            {
                                "tjrq": "20130307",
                                "jjlxdm": "119报警",
                                "jjsl": 8
                            },
                            {
                                "tjrq": "20130306",
                                "jjlxdm": "119报警",
                                "jjsl": 10
                            },
                            {
                                "tjrq": "20130305",
                                "jjlxdm": "119报警",
                                "jjsl": 9
                            },
                            {
                                "tjrq": "20130304",
                                "jjlxdm": "119报警",
                                "jjsl": 3
                            },
                            {
                                "tjrq": "20130303",
                                "jjlxdm": "119报警",
                                "jjsl": 14
                            }
                        ]
                    }
                };
                // console.log(data.sevenDays["110报警"]);
                let date=[];
                let data1=[];
                for (let i=0;i<data.sevenDays["122报警"].length;i++){
                    date.push(data.sevenDays["122报警"][i].tjrq);
                    data1.push(data.sevenDays["122报警"][i].jjsl)
                }
                let data2=[];
                for (let i=0;i<data.sevenDays["110报警"].length;i++){
                    data2.push(data.sevenDays["110报警"][i].jjsl)
                }
                let data3=[];
                for (let i=0;i<data.sevenDays["119报警"].length;i++){
                    data3.push(data.sevenDays["119报警"][i].jjsl)
                }
                dataArr.push({name:'122报警',value:data1});
                dataArr.push({name:'110报警',value:data2});
                dataArr.push({name:'110报警',value:data3});
            }
        },
        mounted() {
            this.getScale();
            let myCharts = document.querySelectorAll('.chart');
            myCharts.forEach(value => {
                this.refreshCharts.push(value.getAttribute('id'))
            });
            this.change();
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
                    that.jrjjlxsjfxSourceChart('jrjjlxsjfxSourceChart', that.jrjjlxsjfxSourceSource, that.jrjjlxsjfxSourceColor);
                    that.jrjjlxsjfxSourceChart('jrbjfssjfxChart', that.jrbjfssjfxSource, that.jrbjfssjfxColor);
                    that.jrjjlxsjfxSourceChart('jrrlhlxsjfxChart', that.jrrlhlxsjfxSource, that.jrrlhlxsjfxColor);
                    that.sevensjfx('sevenjjlxsjfxChart', that.sevenjjlxsjfxSource, that.jrjjlxsjfxSourceColor);
                    that.sevensjfx('sevenbjfssjfxChart', that.sevenbjfssjfxSource, that.jrbjfssjfxColor);
                    that.sevensjfx('sevenlhlxsjfxChart', that.sevenlhlxsjfxSource, that.jrrlhlxsjfxColor);
                },
            };
            Index.init();
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
        h3{
            cursor:pointer;
        }
        .l > div, .m > div, .r > div {
            width: 100%;
            align-content: space-between;
        }

        .l {
            width: 25.68%;
            display: flex;
            flex-direction: column ;
            justify-content: space-between;

            .l-t {
                height:30%;
                background-image: url('../assets/images/index/l-t-bg.png') ;
                background-repeat: no-repeat;
                background-size:100% 100%;
                // margin-bottom:3.3%; 
            }
            .l-m{
                height:30%;
                background-image: url('../assets/images/index/l-m-bg.png') ;
                background-repeat: no-repeat;
                background-size:100% 100%;
                // margin-bottom:3.3%; 
            }
            .l-b{
                height:30%;
                background-image: url('../assets/images/index/l-b-bg.png') ;
                background-repeat: no-repeat;
                background-size:100% 100%;
                // margin-bottom:3.3%; 
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
            >h3 {
                height: 20%;
                text-align: center;
            }
        }

        .chartBox {
            width: 100%;
            height: 100%;
        }

        .m {
            width: 25.73%;
            background-image: url('../assets/images/index/m.png') ;
            background-repeat: no-repeat;
            background-size:100% 100%;
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
                        height: 80%;
                    }
                }
                .r-l-t{
                    height: 30%;
                    background-image: url('../assets/images/index/r-l-all.png') ;
                    background-repeat: no-repeat;
                    background-size:100% 100%;
                }
                .r-l-b{
                    height: 30%;
                    background-image: url('../assets/images/index/r-l-all.png') ;
                    background-repeat: no-repeat;
                    background-size:100% 100%;
                }
                .r-l-m{
                    height: 30%;
                    background-image: url('../assets/images/index/r-l-all.png') ;
                    background-repeat: no-repeat;
                    background-size:100% 100%;
                }



                .r-r-t{
                    height: 30%;
                    background-image: url('../assets/images/index/r-r-all.png') ;
                    background-repeat: no-repeat;
                    background-size:100% 100%;
                }
                .r-r-m{
                    height: 30%;
                    background-image: url('../assets/images/index/r-r-all.png') ;
                    background-repeat: no-repeat;
                    background-size:100% 100%;;
                }
                .r-r-b{
                    height: 30%;
                    background-image: url('../assets/images/index/r-r-all.png') ;
                    background-repeat: no-repeat;
                    background-size:100% 100%;;
                }

            }

            .r-r {
                width: 57.72%;
            }
        }
    }
</style>