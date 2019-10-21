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
                        <div class="chartBox">
                            <!--                        图表-->
                            <div class="chart" id="jqflsjfx"></div>
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
                        <div class="chart" id="map"></div>
                    </div>
                </div>
            </div>

            <div class="r">
                <div class="r-l">
                    <div class="r-l-t">
                        <div class="chart-wrap">
                            <h3>今日警情数据分析</h3>
                            <div class="chartBox">
                                <div class="chart" id="jrjqsjfx"></div>
                            </div>
                        </div>
                    </div>
                    <div class="r-l-b">
                        <div class="chart-wrap">
                            <h3>今日报警方式数据分析</h3>
                            <div class="chartBox">
                                <div class="chart" id="jrbjfssjfx"></div>
                            </div>
                        </div>
                    </div>
                    <div class="r-l-m">
                        <div class="chart-wrap">
                            <h3>今日来话类型数据分析</h3>
                            <div class="chartBox">
                                <div class="chart" id="jrrlhlxsjfx"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="r-r">
                    <div class="r-r-t">
                        <div class="chart-wrap">
                            <h3>近七日警情数据分析</h3>
                            <div class="chartBox">
                                <div class="chart" id="sevensjfx"></div>
                            </div>
                        </div>
                    </div>
                    <div class="r-r-m">
                        <div class="chart-wrap">
                            <h3>近七日报警方式数据分析</h3>
                            <div class="chartBox">
                                <div class="chart" id="sevenbjfssjfx"></div>
                            </div>
                        </div>
                    </div>
                    <div class="r-r-b">
                        <div class="chart-wrap">
                            <h3>近七日来话类型数据分析</h3>
                            <div class="chartBox">
                                <div class="chart" id="sevenlhlxsjfx"></div>
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

    export default {
        name: "Test",
        components: {MyHeader},
        data() {
            return {
                axisesColor: '#0057ab',
                scale: 1,
                date: 7,
                //警情统计监测
                jqtjjcData: [
                    {name: '报警事件总数', value: 18364},
                    {name: '有效警情总数', value: 18364},
                    {name: '处警事件总数', value: 18364},
                    {name: '反馈事件总数', value: 18364},
                ],
                jqtjjcSource: [
                    {name: '处警时间占比', value: 85, radius: '60%'},
                    {name: '有效警情占比', value: 90, radius: '70%'},
                    {name: '反馈事件占比', value: 95, radius: '60%'}
                ],
                //    近期警情统计
                jqjqtjScoure: [
                    [900, 1100, 700, 900, 1000, 600, 500]
                ],
                //    警情分类数据分析
                jqflsjfxSource: [
                    ['刑事', '行政(治安)', '交通类', '消防救援', '群众救助', '应急联动事件(非警情事件)', '群体事件', '纠纷', '灾害事故', '举报', '投诉监督'],
                    [1300, 1500, 900, 900, 1400, 1100, 1500, 1400, 800, 850, 700]
                ],
                //    地图
                mapSource: [
                    {name: "太原市", value: 80, value1: 70, value2: 35},
                    {name: "长治市", value: 42, value1: 50, value2: 25},
                    {name: "朔州市", value: 4, value1: 20, value2: 10},
                    {name: "运城市", value: 53, value1: 60, value2: 30},
                    {name: "大同市", value: 30, value1: 80, value2: 40},
                    {name: "晋城市", value: 52, value1: 60, value2: 30},
                    {name: "晋中市", value: 21, value1: 30, value2: 15},
                    {name: "临汾市", value: 5, value1: 20, value2: 10},
                    {name: "忻州市", value: 5, value1: 50, value2: 25},
                    {name: "阳泉市", value: 10, value1: 30, value2: 15},
                    {name: "吕梁市", value: 32, value1: 40, value2: 20},
                ],
                data1: [],
                mapData: {name: '报警事件总数', value: 96666},
                //    今日警情数据分析、今日来话类型数据分析
                jrjqsjfxSource: [
                    {name: '110报警', value: 442},
                    {name: '122报警', value: 155},
                    {name: '119报警', value: 263},
                    {name: '综合报警', value: 145},
                    {name: '其他接警类型', value: 155}
                ],
                jrjqsjfxColor: ['#05dbb0', '#00a3c0', '#4160fd', '#bd0fdc', '#803ff7'],
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
                jrrlhlxsjfxColor: ['#6c96ff', '#4160fb', '#2626e7', '#e344ff', '#00b3e9','#803ff7','#6905c6','#17fff3'],
            //    近七日警情数据分析
                sevensjfxSource: [
                    ['110报警', 580, 630, 700, 400, 250, 156, 894],
                    ['122报警', 468, 498, 481, 168, 79, 455, 155],
                    ['119报警', 483, 558, 465, 48, 188, 465, 455],
                    ['综合报警', 671, 465, 184, 561, 455, 268, 145],
                    ['其他接警类型', 456, 567, 569, 594, 189, 498, 155]
                ],
            //    近七日报警方式数据分析
                sevenbjfssjfxSource:[
                    ['电话报警', 580, 630, 700, 400, 250, 156, 894],
                    ['来人来电报警', 468, 498, 481, 168, 79, 455, 155],
                    ['技防报警', 483, 558, 465, 48, 188, 465, 455],
                    ['短信报警', 671, 465, 184, 561, 455, 268, 145],
                    ['其他报警方式', 456, 567, 569, 594, 189, 498, 155]
                ],
            //    近七日来话类型数据分析
                sevenlhlxsjfxSource:[
                    ['报警求助、举报投诉', 580, 630, 700, 400, 250, 156, 894],
                    ['处警反馈', 468, 498, 481, 168, 79, 455, 155],
                    ['信息咨询', 483, 558, 465, 48, 188, 465, 455],
                    ['重复报警', 671, 465, 184, 561, 455, 268, 145],
                    ['骚扰电话', 456, 567, 569, 594, 189, 498, 155],
                    ['系统测试', 652, 556, 155, 166, 562, 515, 565],
                    ['其他来话类型', 256, 626, 515, 126, 512, 556, 488],
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
                let myChart = this.$echarts.init(document.getElementById('jqtjjc'));
                let that = this;
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
                                            width: 25 * that.scale,
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
                                            width: 25 * that.scale,
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
                                                fontSize: 14 * that.scale,
                                                lineHeight: 100 * that.scale,
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
                let sourceArr = this.jqjqtjScoure;
                let dateArr = [];
                for (let i = 0; i < this.date; i++) {
                    let timestamp = (new Date()).getTime();
                    let day = timestamp - (i - 1) * 24 * 60 * 60 * 1000;
                    let date = new Date(day);
                    dateArr.push(date.getMonth() + 1 + '-' + date.getDate());
                }
                sourceArr.unshift(dateArr);
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
                    tooltip: {}
                };
                myChart.setOption(option);
            },
            //    地图
            renderMap() {
                let cityObj = {};
                let cityData = this.mapSource;
                let that = this;
                let myChart = that.$echarts.init(document.getElementById('map'));//初始化
                let data2 = [];
                cityData.forEach(value => {
                    if (value.value < value.value2) {
                        data2.push({name: value.name, value: 20, value1: value.value})
                    }
                    if (value.value < value.value1 && value.value > value.value2) {
                        data2.push({name: value.name, value: 50, value1: value.value})
                    }
                    if (value.value > value.value1) {
                        data2.push({name: value.name, value: 70, value1: value.value})
                    }
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
                //点击地图
                myChart.on('click', function (params) {
                    if (params.name in cityObj) {
// 如果点击的是11个市，绘制选中地区的二级地图
                        let areaValue = [];
                        that.$http.get('/static/json/' + cityObj[params.name] + '_full.json').then(res => {
                            if (res.status === 200) {
                                let d = [];
                                that.$echarts.registerMap(params.name, res.data);
                                //插入获取数据
                                for (let i = 0; i < res.data.features.length; i++) {
                                    d.push({
                                        name: res.data.features[i].properties.name,
                                    })
                                }
                                renderMap(params.name, d);
                            }
                        });
                    } else {
// 点击县级时是否返回
                        renderMap('山西省', that.data1);
                    }
                });
                //配置项
                let option = {
                    title: {
                        show: false
                    },
                    toolbox: {
                        show: true,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            dataView: {readOnly: false},
                            restore: {},
                            saveAsImage: {}
                        },
                        iconStyle: {
                            normal: {
                                color: '#fff'
                            }
                        }
                    },
                    animationDuration: 1000,
                    animationEasing: 'cubicOut',
                    animationDurationUpdate: 1000,
                };

                function renderMap(map, data) {
                    // console.log(data);
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
                                                '：{' + valueType + '|' + params.value + '}';
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
                            max: 30,
                            label: '安全',
                            color: '#2c9a42'
                        }, {
                            min: 30,
                            max: 60,
                            label: '警告',
                            color: '#d08a00'
                        }, {
                            min: 60,
                            label: '危险',
                            color: '#c23c33'
                        }
                        ],
                        // show: false,
                        // min: 0,
                        // max: max,
                        left: 'left',
                        top: 'bottom',
                        calculable: true,
                        seriesIndex: [1],
                        inRange: {
                            color: ['#f7fbff', '#4e7cef', '#0549f3']
                        }
                    };
// 渲染地图
                    myChart.setOption(option);
                    // console.log(option);
                }
            },
            //    今日警情数据分析、今日报警方式数据分析、今日来话类型数据分析
            /**
             * @param chartContainer String 图表容器
             * @param sourceArr Arrary 数据数组
             * @param colorList Arrary 颜色数组
             * */
            jrjqsjfxChart(chartContainer, sourceArr, colorList) {
                let myChart = this.$echarts.init(document.getElementById(chartContainer));
                let total = 0;
                sourceArr.forEach(value => {
                    total += value.value
                });
                let option = {
                    legend: {
                        textStyle: {
                            fontSize: 12 * this.scale,
                            color:function (params) {
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
                        data: sourceArr.sort(function (a, b) { return a.value - b.value; })
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
        //近七日警情数据分析、近七日报警方式数据分析、近七日来话类型数据分析
            sevensjfx(chartContainer, sourceArr, colorList){
                let dataArr=[];
                let seriesArr=[];
                let myChart = this.$echarts.init(document.getElementById(chartContainer));
                sourceArr.unshift([]);
                for (let i = 1; i < sourceArr.length; i++) {
                    dataArr.push(sourceArr[i]);
                }
                for (let i = 0; i < this.date; i++) {
                    let timestamp = (new Date()).getTime();
                    let day = timestamp - (i - 1) * 24 * 60 * 60 * 1000;
                    let date = new Date(day);
                    sourceArr[0].push(date.getMonth() + 1 + '-' + date.getDate());
                }
                for (let i = 1; i < sourceArr.length; i++) {
                    seriesArr.push({
                        type: "line",
                        showSymbol: false,
                        smooth: true,
                        seriesLayoutBy: 'row',
                        itemStyle: {
                            normal: {
                                color: colorList[i - 1],
                            }
                        },
                        lineStyle: {
                            width: 3
                        }
                    });
                }
                sourceArr[0].reverse();
                sourceArr[0].unshift('type');
                let option={
                    dataset: {
                        source: sourceArr
                    },
                    legend: {
                        textStyle: {
                            fontSize: 12 * this.scale,
                            color:function (params) {
                                return colorList[params.dataIndex]
                            }
                        },
                        itemWidth: 12 * this.scale,
                        itemHeight: 12 * this.scale
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
                    grid:{
                        top:35*this.scale,
                        bottom:60*this.scale
                    }
                };
                myChart.setOption(option);
            }
        },
        mounted() {
            this.getScale();
            this.panChart();
            this.jqjqtjChart();
            this.jqflsjfxChart();
            this.renderMap();
            this.jrjqsjfxChart('jrjqsjfx', this.jrjqsjfxSource, this.jrjqsjfxColor);
            this.jrjqsjfxChart('jrbjfssjfx', this.jrbjfssjfxSource, this.jrbjfssjfxColor);
            this.jrjqsjfxChart('jrrlhlxsjfx', this.jrrlhlxsjfxSource, this.jrrlhlxsjfxColor);
            this.sevensjfx('sevensjfx',this.sevensjfxSource,this.jrjqsjfxColor);
            this.sevensjfx('sevenbjfssjfx',this.sevenbjfssjfxSource,this.jrbjfssjfxColor);
            this.sevensjfx('sevenlhlxsjfx',this.sevenlhlxsjfxSource,this.jrrlhlxsjfxColor);
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

        .l > div, .m > div, .r > div {
            width: 100%;
            align-content: space-between;
        }

        .l {
            width: 25rem;

            .l-t {
                height: 16.1rem;
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
                #jqtjjc {
                    width: 100%;
                    height: 11.31rem;
                }
            }
        }

        .chart {
            width: 100%;
            height: 100%;
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

        .chartBox {
            width: 100%;
            height: 100%;
        }

        .m {
            width: 25.04rem;

            .chartBox {
                position: relative;

                #mapData {
                    position: absolute;
                    top: 0;
                    left: 0;

                    p:first-child {
                        font-size: 1.52rem;
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
            width: 44rem;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .r-l,.r-r {
                width: 17rem;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                & > div {
                    width: 100%;
                    height: 14.25rem;

                    .chartBox {
                        height: 12.8rem;
                    }
                }
            }

            .r-r {
                width: 25.4rem;
            }
        }
    }
</style>