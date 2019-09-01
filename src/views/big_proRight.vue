<!--  -->
<template>
    <div class='r'>
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

                <div class="r-b-t-l-2" v-show="!show">
                    <div class="chart-wrap">
                        <h3>{{this.chartTitle[2]}}</h3>
                        <div class="chartBox">
                            <div class="chart" id="subClassChart5"></div>
                        </div>
                    </div>
                </div>
                <div class="r-b-t-m-2" v-if="!show">
                    <div class="chart-wrap">
                        <h3>{{this.chartTitle[3]}}</h3>
                        <div class="chartBox">
                            <div class="chart" id="subClassChart6"></div>
                        </div>
                    </div>
                </div>
                <div class="r-b-t-r-2" v-if="!show">
                    <div class="chart-wrap">
                        <h3>{{this.chartTitle[4]}}</h3>
                        <div class="chartBox">
                            <div class="chart" id="subClassChart7"></div>
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
                        <h3>{{this.chartTitle[5]}}</h3>
                        <div class="chartBox">
                            <div class="chart" id="subClassChart8"></div>
                        </div>
                    </div>
                </div>
                <div class="r-b-b-m-2" v-if="!show">
                    <div class="chart-wrap">
                        <h3>{{this.chartTitle[6]}}</h3>
                        <div class="chartBox">
                            <div class="chart" id="subClassChart9"></div>
                        </div>
                    </div>
                </div>
                <div class="r-b-b-r-2" v-if="!show">
                    <div class="chart-wrap">
                        <h3>{{this.chartTitle[7]}}</h3>
                        <div class="chartBox">
                            <div class="chart" id="subClassChart10"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    //这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
    //例如：import 《组件名称》 from '《组件路径》';

    export default {
//import引入的组件需要注入到对象中才能使用
        props: ['typeAnalyze'],
        components: {},
        data() {
//这里存放数据
            return {
                show: true,
                //图表公用
                refreshCharts: [],
                chartsObj: {},
                axisesColor: '#36b2ae',
                //缩放值
                scale: 1,
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

                startDate:'',
                endDate:'',
                myPeriod:{},
                xAxisData :[],    //近七日接警类型数据分析     x 轴
                findUrl : [
                    'recJJLXTJB/findSAlarmData',   //省 近七日接警类型数据分析
                    'recBJFSTJB/findSAlarmMode',   //省 近七日报警类型数据分析
                    'recLHLXTJB/findSIncomingType' //省 近七日来话类型数据分析

                ],
                tableData :[],
             };
        },
//监听属性 类似于data概念
        computed: {},
//监控data中的数据变化
        watch: {},
//方法集合
        methods: {
            //获取缩放值
            getScale() {
                this.scale = localStorage.getItem('scale');
            },
            //趋势图
            sevensjfx(xAxisData,chartContainer, sourceArr, colorList) {
                let seriesArr = [];
                // let dateArr = ['10-1', '10-2', '10-3', '10-4', '10-5', '10-6', '10-7'];
                let dateArr = xAxisData;

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
                        axisLabel: {
                            fontSize: 20 * this.scale,
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
                            fontSize: 20 * this.scale,
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
                            show: true,
                            textStyle: {
                                color: function (value, index) {
                                    return colorList[index];
                                }
                            },
                            fontSize: 20 * this.scale
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
                            formatter: '{value} %',
                            fontSize: 20 * this.scale
                        }
                    },
                    series: {
                        type: 'pictorialBar',
                        barCategoryGap: '-16%',
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
                                },
                                fontSize: 20 * this.scale
                            }
                        },
                        data: sourceArr,
                        z: 10
                    },
                    tooltip: {
                        formatter:function (params) {
                            return params.marker+params.data.name+'：'+params.data.value+'%';
                        }
                    },
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
                        this.show = true;
                        this.chartTitle = [
                            '近七日接警类型数据分析',
                            '警情数据占比分析',
                            '110报警',
                            '122报警',
                            '119报警',
                            '综合报警'
                        ];
                        // this.xAxisData 
                        // this.trendChartSource = [
                        //     {name: '110报警', value: [436, 413, 439, 506, 431, 426, 434]},
                        //     {name: '122报警', value: [320, 370, 350, 412, 346, 348, 427]},
                        //     {name: '119报警', value: [240, 274, 245, 260, 248, 278, 272]},
                        //     {name: '综合报警', value: [142, 152, 107, 168, 146, 164, 151]},
                        //     {name: '其他接警类型', value: [14, 15, 14, 10, 12, 15, 17]},
                        // ];
                        this.trendChartColor = ['#05dbb0', '#00a3c0', '#4160fd', '#bd0fdc', '#803ff7'];
                        // this.proportionSource = [
                        //     {name: '110报警', value: 12},
                        //     {name: '122报警', value: 5},
                        //     {name: '119报警', value: 21},
                        //     {name: '综合报警', value: 22},
                        //     {name: '其他接警类型', value: 10},
                        // ];
                        // this.subClassSource1 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];    //110报警
                        this.subClassColorList1 = ['#6ffeff', '#00a0a6'];

                        // this.subClassSource2 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];  //122报警
                        this.subClassColorList2 = ['#7fd7fc', '#0083ba'];

                        // this.subClassSource3 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];  //119报警
                        this.subClassColorList3 = ['#6f87ff', '#0024dd'];

                        

                        // this.subClassSource4 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];  //综合报警
                        this.subClassColorList4 = ['#ff6cfa', '#a0009b'];


                        this.myPeriod=JSON.parse(sessionStorage.getItem('jjlx'));
                        this.startDate=this.myPeriod.start;
                        this.endDate=this.myPeriod.end;
                        break;
                    case '全省报警方式数据分析':
                        this.show = true;
                        this.chartTitle = [
                            '近七日报警类型数据分析',
                            '报警方式数据占比分析',
                            '电话报警',
                            '来人（来电）报警',
                            '技防报警',
                            '短信报警'
                        ];
                        // this.trendChartSource = [
                        //     {name: '电话报警', value: [436, 413, 439, 506, 431, 426, 434]},
                        //     {name: '来人来电报警', value: [320, 370, 350, 412, 346, 348, 427]},
                        //     {name: '技防报警', value: [240, 274, 245, 260, 248, 278, 272]},
                        //     {name: '短信报警', value: [142, 152, 107, 168, 146, 164, 151]},
                        //     {name: '其他报警方式', value: [14, 15, 14, 10, 12, 15, 17]}
                        // ];
                        this.trendChartColor = ['#ffd75d', '#00a3c0', '#0d28a6', '#e344ff', '#6400cb'];
                        // this.proportionSource = [
                        //     {name: '电话报警', value: 12},
                        //     {name: '来人来电报警', value: 5},
                        //     {name: '技防报警', value: 21},
                        //     {name: '短信报警', value: 22},
                        //     {name: '其他报警方式', value: 10},
                        // ];
                        // this.subClassSource1 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];  //电话报警
                        this.subClassColorList1 = ['#ffebaf', '#ffd75e'];

                        // this.subClassSource2 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700]; //来人（来电）报警
                        this.subClassColorList2 = ['#7fd7fc', '#0083ba'];

                        // this.subClassSource3 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];  //技防报警
                        this.subClassColorList3 = ['#6f87ff', '#0024dd'];

                        // this.subClassSource4 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList4 = ['#a650ff', '#5200a7'];

                        this.myPeriod=JSON.parse(sessionStorage.getItem('bjfs'));
                        this.startDate=this.myPeriod.start;
                        this.endDate=this.myPeriod.end;
                        break;
                    case '全省来话类型数据分析':
                        this.show = false;
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
                        // this.trendChartSource = [
                        //     {name: '报警求助、举报投诉', value: [560, 525, 494, 568, 516, 554, 523]},
                        //     {name: '处警反馈', value: [451, 450, 438, 443, 468, 461, 431]},
                        //     {name: '信息咨询', value: [382, 380, 351, 384, 345, 387, 364]},
                        //     {name: '重复报警', value: [301, 298, 310, 320, 316, 302, 286]},
                        //     {name: '骚扰电话', value: [230, 231, 204, 215, 228, 209, 232]},
                        //     {name: '系统测试', value: [123, 130, 128, 110, 125, 135, 120]},
                        //     {name: '其他来话类型', value: [15, 13, 20, 18, 16, 17, 18]}
                        // ];
                        this.trendChartColor = ['#6c96ff', '#4160fb', '#2626e7', '#e344ff', '#00b3e9', '#803ff7', '#6905c6', '#17fff3'];
                        // this.proportionSource = [
                        //     {name: '报警求助、举报投诉', value: 12},
                        //     {name: '处警反馈', value: 5},
                        //     {name: '信息咨询', value: 21},
                        //     {name: '重复报警', value: 22},
                        //     {name: '骚扰电话', value: 10},
                        //     {name: '系统测试', value: 19},
                        //     {name: '其他来话类型', value: 6},
                        // ];
                        // this.subClassSource1 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];  //报警求助、举报投诉
                        this.subClassColorList1 = ['#ff6cfa', '#a0009b'];

                        // this.subClassSource2 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];  //处警反馈
                        this.subClassColorList2 = ['#8298ff', '#324fcc'];

                        // this.subClassSource3 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];  //信息查询
                        this.subClassColorList3 = ['#6163ff', '#3032d7'];

                        // this.subClassSource4 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];  //重复报警
                        this.subClassColorList4 = ['#ad81ff', '#733be3'];

                        // this.subClassSource5 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];  //骚扰电话
                        this.subClassColorList5 = ['#8919ee', '#620ab4'];

                        // this.subClassSource6 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];   //系统测试
                        this.subClassColorList6 = ['#b0fffb', '#119b9d'];

                        this.myPeriod=JSON.parse(sessionStorage.getItem('lhlx'));
                        this.startDate=this.myPeriod.start;
                        this.endDate=this.myPeriod.end;
                        break;
                    default:
                        // console.log('false');
                        break;
                }
                // console.log(this.startDate);
                let Index = {
                    init() {
                        this.loadData();
                        Public.chartsResize(that.chartsObj);
                        Public.chartsReDraw(that.chartsObj, null, [
                            ''
                        ], that.refreshCharts)
                    },
                    loadData() {
                        that.sevensjfx(that.xAxisData,'trendChart', that.trendChartSource, that.trendChartColor);  //近七日接警类型数据分析  
                        that.percent();  // 警情数据占比分析
                        that.subclassBar('subClassChart1', that.subClassSource1, that.subClassColorList1);   //110报警
                        that.subclassBar('subClassChart2', that.subClassSource2, that.subClassColorList2);   //122报警
                        that.subclassBar('subClassChart3', that.subClassSource3, that.subClassColorList3);    //119报警
                        that.subclassBar('subClassChart4', that.subClassSource4, that.subClassColorList4);   //综合报警

                        // console.log(this.subClassSource1)
                        console.log(this.show);
                        if (that.show) return;
                        // console.log('进入settimeout')
                        setTimeout(function () {
                            that.subclassBar('subClassChart5', that.subClassSource1, that.subClassColorList1);
                            that.subclassBar('subClassChart6', that.subClassSource2, that.subClassColorList2);
                            that.subclassBar('subClassChart7', that.subClassSource3, that.subClassColorList3);
                            that.subclassBar('subClassChart8', that.subClassSource4, that.subClassColorList4);
                            that.subclassBar('subClassChart9', that.subClassSource5, that.subClassColorList5);
                            that.subclassBar('subClassChart10', that.subClassSource6, that.subClassColorList6);


                        }, 100)
                    },
                };
                Index.init();
                // Index.loadData()
                // console.log(this.myPeriod);
            },

            pdFilter_btn() {
                let str = this.$route.query.title;

                str = str.substring(0, 1);
                // console.log(str);

                if (str == '全') {
                    this.$emit('filter_btn', true)
                } else {
                    this.$emit('filter_btn', false)
                }
            },
            getShen(){
                // let start
                // let endTime
                console.log(this.startDate);
                console.log(this.endDate);
                let str = JSON.parse(sessionStorage.getItem('jjlx'));
                console.log(str);

                let str1 = JSON.parse(sessionStorage.getItem('bjfs'));
                console.log(str1);
                

                switch (this.$route.query.title) {
                    case '全省接警类型数据分析'  :
                        this.$http.get( this.apiRoot+this.findUrl[0],{
                            params : {
                                startTime : str['start'],
                                endTime : str['end'],
                            }
                        })
                        .then(function (res) { 
                            // console.log(res);
                            this.tableData =   res['data'];
                            if(this.tableData){
                                let obj1 =  this.tableData['110报警'];
                                this.citySource.forEach((item,index)=>{

                                        this.subClassSource1[index] = parseInt(obj1[item]) ;
                                })

                                let obj2 =  this.tableData['122报警'];   
                                this.citySource.forEach((item,index)=>{

                                        this.subClassSource2[index] = parseInt(obj2[item]) ;
                                })

                                let obj3 =  this.tableData['119报警'];
                                this.citySource.forEach((item,index)=>{
                
                                        this.subClassSource3[index] = parseInt(obj3[item]) ;
                                })

                                let obj4 =  this.tableData['综合报警'];
                                this.citySource.forEach((item,index)=>{

                                        this.subClassSource4[index] = parseInt(obj4[item]) ;
                                })

                                // 警情数据占比分析  proportionSource
                                this.proportionSource = [
                                    {name: '110报警', value: 12},
                                    {name: '122报警', value: 5},
                                    {name: '119报警', value: 21},
                                    {name: '综合报警', value: 22},
                                    {name: '其他接警类型', value: 10},
                                ];

                                let obj5 = this.tableData['proportion'];
                                // console.log(obj5['110报警'])


                                // console.log(obj5['其他接警类型'])
                                this.proportionSource[0]['value'] =  obj5['110报警'];
                                this.proportionSource[1]['value'] =  obj5['122报警'];
                                this.proportionSource[2]['value'] =  obj5['119报警'];
                                this.proportionSource[3]['value'] =  obj5['综合报警'];
                                this.proportionSource[4]['value'] =  obj5['其他接警类型'];

                                // 近七日接警类型数据分析

                                // x 轴  数据
                                let obj6 = this.tableData['sevenDays']['110报警'];
                                let str1 ;
                                let qian ;
                                let hou ; 
                                // console.log(obj6 );
                                this.xAxisData = [];
                                obj6.forEach((item,index)=>{
                                    str1 = item['tjrq'] ;
                                    str1 = str1.substring(4,8);
                                    qian = str1.substring(0,2);
                                    hou = str1.substring(2,4);
                                    str1 = qian + '-' + hou;
                                    this.xAxisData.push(str1);

                                })

                                this.trendChartSource = [
                                    {name: '110报警', value: []},
                                    {name: '122报警', value: []},
                                    {name: '119报警', value: []},
                                    {name: '综合报警', value: []},
                                    {name: '其他接警类型', value: []},
                                ];
                                let obj7 = this.tableData['sevenDays']
                                for(let key in obj7){
                                    switch (key) {
                                        case '110报警':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[0]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '119报警':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[2]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '122报警':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[1]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '其它接警类型':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[4]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '综合报警':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[3]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                    }
                                }
                                this.renderChart();
                            }
                        }.bind(this))

                        break;
                    
                    case '全省报警方式数据分析':
                        this.$http.get( this.apiRoot+this.findUrl[1],{
                            params : {
                                startTime : str1['start'],
                                endTime : str1['end'],
                            }
                        })
                        .then(function (res) { 
                            // console.log(res);
                            this.tableData =   res['data'];
                            if(this.tableData){
                                let obj1 =  this.tableData['电话报警'];
                                this.citySource.forEach((item,index)=>{

                                        this.subClassSource1[index] = parseInt(obj1[item]) ;
                                })

                                let obj2 =  this.tableData['来人(来电)报警'];   
                                this.citySource.forEach((item,index)=>{

                                        this.subClassSource2[index] = parseInt(obj2[item]) ;
                                })

                                let obj3 =  this.tableData['技防报警'];
                                this.citySource.forEach((item,index)=>{
                
                                        this.subClassSource3[index] = parseInt(obj3[item]) ;
                                })

                                let obj4 =  this.tableData['短信报警'];
                                this.citySource.forEach((item,index)=>{

                                        this.subClassSource4[index] = parseInt(obj4[item]) ;
                                })

                                // 报警方式数据占比分析  proportionSource
                                this.proportionSource = [
                                    {name: '电话报警', value: 12},
                                    {name: '来人来电报警', value: 5},
                                    {name: '技防报警', value: 21},
                                    {name: '短信报警', value: 22},
                                    {name: '其他报警方式', value: 10},
                                ];

                                let obj5 = this.tableData['proportion'];
                                // console.log(obj5['110报警'])


                                // console.log(obj5['其他接警类型'])
                                this.proportionSource[0]['value'] =  obj5['电话报警'];
                                this.proportionSource[1]['value'] =  obj5['来人来电报警'];
                                this.proportionSource[2]['value'] =  obj5['技防报警'];
                                this.proportionSource[3]['value'] =  obj5['短信报警'];
                                this.proportionSource[4]['value'] =  obj5['其他报警方式'];

                                // 近七日接警类型数据分析

                                // x 轴  数据
                                let obj6 = this.tableData['sevenDays']['电话报警'];
                                let str1 ;
                                let qian ;
                                let hou ; 
                                // console.log(obj6 );
                                this.xAxisData = [];
                                obj6.forEach((item,index)=>{
                                    str1 = item['tjrq'] ;
                                    str1 = str1.substring(4,8);
                                    qian = str1.substring(0,2);
                                    hou = str1.substring(2,4);
                                    str1 = qian + '-' + hou;
                                    this.xAxisData.push(str1);

                                })

                                this.trendChartSource = [
                                    {name: '电话报警', value: []},
                                    {name: '来人来电报警', value: []},
                                    {name: '技防报警', value: []},
                                    {name: '短信报警', value: []},
                                    {name: '其他报警方式', value: []},


                                ];
                                let obj7 = this.tableData['sevenDays']
                                for(let key in obj7){
                                    switch (key) {
                                        case '电话报警':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[0]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '来人来电报警':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[1]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '技防报警':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[2]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '短信报警':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[3]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '其他报警方式':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[4]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                    }
                                }



                                this.renderChart();
                            }
                        }.bind(this))



                        break;

                    case '全省来话类型数据分析':
                        this.$http.get(this.apiRoot+this.findUrl[2],{
                            params : {
                                startTime : str1['start'],
                                endTime : str1['end'],
                            }
                        })
                        .then(function (res) { 
                            console.log(res);
                            this.tableData =   res['data'];
                            console.log(this.tableData)
                            if(this.tableData){
                                let obj1 =  this.tableData['报警求助、举报投诉'];
                                this.citySource.forEach((item,index)=>{

                                        this.subClassSource1[index] = parseInt(obj1[item]) ;
                                })

                                let obj2 =  this.tableData['处警反馈'];   
                                this.citySource.forEach((item,index)=>{

                                        this.subClassSource2[index] = parseInt(obj2[item]) ;
                                })

                                let obj3 =  this.tableData['信息咨询'];
                                this.citySource.forEach((item,index)=>{
                
                                        this.subClassSource3[index] = parseInt(obj3[item]) ;
                                })

                                let obj4 =  this.tableData['重复报警'];
                                this.citySource.forEach((item,index)=>{

                                        this.subClassSource4[index] = parseInt(obj4[item]) ;
                                })

                                let obj8 =  this.tableData['骚扰电话'];
                                this.citySource.forEach((item,index)=>{

                                        this.subClassSource5[index] = parseInt(obj8[item]) ;
                                })

                                let obj9 =  this.tableData['系统测试'];
                                this.citySource.forEach((item,index)=>{

                                        this.subClassSource6[index] = parseInt(obj9[item]) ;
                                })
                                console.log(this.subClassSource1)

                                



                                // 报警方式数据占比分析  proportionSource
                                this.proportionSource = [
                                    {name: '报警求助、举报投诉', value: 0},
                                    {name: '处警反馈', value: 0},
                                    {name: '信息咨询', value: 0},
                                    {name: '重复报警', value: 0},
                                    {name: '骚扰电话', value: 0},
                                    {name: '系统测试', value: 0},
                                    {name: '其他来话类型', value: 0},
                                ];

                                let obj5 = this.tableData['proportion'];
                                // console.log(obj5['110报警'])


                                // console.log(obj5['其他接警类型'])
                                this.proportionSource[0]['value'] =  obj5['报警求助、举报投诉'];
                                this.proportionSource[1]['value'] =  obj5['处警反馈'];
                                this.proportionSource[2]['value'] =  obj5['信息咨询'];
                                this.proportionSource[3]['value'] =  obj5['重复报警'];
                                this.proportionSource[4]['value'] =  obj5['骚扰电话'];
                                this.proportionSource[5]['value'] =  obj5['系统测试'];
                                this.proportionSource[6]['value'] =  obj5['其他来话类型'];


                                // // 近七日接警类型数据分析

                                // // x 轴  数据
                                let obj6 = this.tableData['sevenDays']['信息咨询'];
                                let str1 ;
                                let qian ;
                                let hou ; 
                                // console.log(obj6 );
                                this.xAxisData = [];
                                obj6.forEach((item,index)=>{
                                    str1 = item['tjrq'] ;
                                    str1 = str1.substring(4,8);
                                    qian = str1.substring(0,2);
                                    hou = str1.substring(2,4);
                                    str1 = qian + '-' + hou;
                                    this.xAxisData.push(str1);

                                })

                                this.trendChartSource = [
                                    {name: '报警求助、举报投诉', value: []},
                                    {name: '处警反馈', value: []},
                                    {name: '信息咨询', value: []},
                                    {name: '重复报警', value: []},
                                    {name: '骚扰电话', value: []},
                                    {name: '系统测试', value: []},
                                    {name: '其他来话类型', value: []}
                                ];
                                let obj7 = this.tableData['sevenDays']
                                for(let key in obj7){
                                    switch (key) {
                                        case '报警求助、举报投诉':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[0]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '处警反馈':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[1]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '信息咨询':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[2]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '重复报警':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[3]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '骚扰电话':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[4]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '系统测试':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[5]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        case '其他来话类型':
                                            obj7[key].forEach((item,index)=>{
                                                this.trendChartSource[6]['value'].push(item['jjsl']) ;
                                            })
                                            break;
                                        
                                    }
                                   
                                }



                                this.renderChart();
                            }
                        }.bind(this))



                        break;

                    



                }

                
            }

        },
//生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
//生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
           
            this.pdFilter_btn();   // 判断筛选框是否显示
            this.getScale();    //获取缩放值
            // this.renderChart();
            // console.log(this.tableData);
             this.getShen();

            



            // this.renderChart();
            



        },
        beforeCreate() {
        }, //生命周期 - 创建之前
        beforeMount() {
        }, //生命周期 - 挂载之前
        beforeUpdate() {
        }, //生命周期 - 更新之前
        updated() {
        }, //生命周期 - 更新之后
        beforeDestroy() {
        }, //生命周期 - 销毁之前
        destroyed() {
        }, //生命周期 - 销毁完成
        activated() {
            // console.log('缓存')
        }, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style lang='scss' scoped>
    //@import url(); 引入公共css类
    h3 {
        height: 10%;
        text-align: center;
    }

    .chartBox {
        height: 90%;
    }

    .r {
        // width: 72.6%;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .chart-wrap {
            width: 100%;
            height: 100%;

            .chartBox {
                width: 100%;
                // height: 14.87rem;
                height: 90%;

                .chart {
                    width: 100%;
                    height: 100%;

                }
            }
        }

        .r-t {
            width: 100%;
            height: 38.58%;
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            .r-t-l {
                width: 37.25%;
                height: 100%;
                background-image: url('../assets/images/index/l-t-bg.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
            }

            .r-t-r {
                width: 60.5%;
                height: 100%;
                background-image: url('../assets/images/index/l-t-bg.png');
                background-repeat: no-repeat;
                background-size: 100% 100%;
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

                .r-b-t-l-1, .r-b-t-r-1, .r-b-b-l-1, .r-b-b-r-1 {
                    width: 48.91%;
                    height: 100%;
                    background-image: url('../assets/images/index/l-t-bg.png');
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }

                .r-b-t-l-2, .r-b-t-m-2, .r-b-t-r-2, .r-b-b-l-2, .r-b-b-r-2, .r-b-b-m-2 {
                    width: 32%;
                    height: 100%;
                    // background: white;
                    background-image: url('../assets/images/index/l-t-bg.png');
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }
            }
        }
    }
</style>
