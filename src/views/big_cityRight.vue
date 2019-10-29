<!--  -->
<template>
    <div class='r'>
        <div class="r-t">
            <div class="chart-wrap">
                <h3>{{this.title[0]}}</h3>
                <div class="chartBox">
                    <div class="chart" id="proportionChart"></div>
                </div>
            </div>
        </div>


        <div class="r-b">
            <div class="r-b-t">
                <div class="r-b-t-l-1" v-if="show">
                    <div class="chart-wrap">
                        <h3>{{this.title[1]}}</h3>
                        <div class="chartBox">
                            <div class="chart" id="subClassChart1"></div>
                        </div>
                    </div>
                </div>
                <div class="r-b-t-r-1" v-if="show">
                    <div class="chart-wrap">
                        <h3>{{this.title[2]}}</h3>
                        <div class="chartBox">
                            <div class="chart" id="subClassChart2"></div>
                        </div>
                    </div>
                </div>


                <div class="r-b-t-l-2" v-if="!show">
                    <div class="chart-wrap">
                        <h3>{{this.title[3]}}</h3>
                        <div class="chartBox">
                            <div class="chart" id="subClassChart5"></div>
                        </div>
                    </div>
                </div>
                <div class="r-b-t-m-2" v-if="!show">
                    <div class="chart-wrap">
                        <h3>{{this.title[4]}}</h3>
                        <div class="chartBox">
                            <div class="chart" id="subClassChart6"></div>
                        </div>
                    </div>
                </div>
                <div class="r-b-t-r-2" v-if="!show">
                    <div class="chart-wrap">
                        <h3>{{this.title[4]}}</h3>
                        <div class="chartBox">
                            <div class="chart" id="subClassChart7"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="r-b-b">
                <div class="r-b-b-l-1" v-if="show">
                    <div class="chart-wrap">
                        <h3>{{this.title[3]}}</h3>
                        <div class="chartBox">
                            <div class="chart" id="subClassChart3"></div>
                        </div>
                    </div>
                </div>
                <div class="r-b-b-r-1" v-if="show">
                    <div class="chart-wrap">
                        <h3>{{this.title[4]}}</h3>
                        <div class="chartBox">
                            <div class="chart" id="subClassChart4"></div>
                        </div>
                    </div>
                </div>


                <div class="r-b-b-l-2" v-if="!show">
                    <div class="chart-wrap">
                        <h3>{{this.title[3]}}</h3>
                        <div class="chartBox">
                            <div class="chart" id="subClassChart8"></div>
                        </div>
                    </div>
                </div>
                <div class="r-b-b-m-2" v-if="!show">
                    <div class="chart-wrap">
                        <h3>{{this.title[4]}}</h3>
                        <div class="chartBox">
                            <div class="chart" id="subClassChart9"></div>
                        </div>
                    </div>
                </div>
                <div class="r-b-b-r-2" v-if="!show">
                    <div class="chart-wrap">
                        <h3>{{this.title[4]}}</h3>
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
        components: {},
        data() {
//这里存放数据
            return {
                show:true,
                scale: 1,
                refreshCharts: [],
                proportionSource: [],
                proportionColor: [],
                title: [],
                chartsObj:{},
                axisesColor: '#0057ab',
                dateArr:['10-1','10-2','10-3','10-4','10-5','10-6','10-7'],
                position:[],
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
                //细类6
                subClassSource6: [],
                subClassColorList6: [],
            };
        },
//监听属性 类似于data概念
        computed: {},
//监控data中的数据变化
        watch: {},
//方法集合
        methods: {
            getScale() {
                this.scale = localStorage.getItem('scale');
            },
            percent(sourceArr, colorList,postion) {
                let myChart = this.$echarts.init(document.getElementById('proportionChart'));
                this.chartsObj.proportionChart = myChart;
                let titleArr = [];
                let seriesArr = [];
                sourceArr.forEach(function (item, index) {
                    titleArr.push(
                        {
                            text: item.name,
                            left: index * postion[0] + postion[1] + '%',
                            top: '80%',
                            textAlign: 'center',
                            textStyle: {
                                fontWeight: 'normal',
                                fontSize: 12,
                                color: '#1af7f1',
                                textAlign: 'center',
                            },
                        }
                    );
                    seriesArr.push(
                        {
                            name: item.name,
                            type: 'pie',
                            clockWise: false,
                            radius: [48, 54],
                            itemStyle: {
                                normal: {
                                    color: colorList[index][0],
                                    shadowColor: colorList[index][0],
                                    shadowBlur: 0,
                                    label: {
                                        show: false
                                    },
                                    labelLine: {
                                        show: false
                                    },
                                    fontSize: 20
                                }
                            },
                            hoverAnimation: false,
                            center: [index * postion[0] + postion[1] + '%', '40%'],
                            data: [{
                                value: item.value,
                                label: {
                                    normal: {
                                        formatter: function (params) {
                                            return params.value + '%';
                                        },
                                        position: 'center',
                                        show: true,
                                        textStyle: {
                                            fontSize: 20,
                                            color: '#1af7f1'
                                        }
                                    }
                                },
                            }, {
                                value: 100 - item.value,
                                name: 'invisible',
                                itemStyle: {
                                    normal: {
                                        color: colorList[index][1]
                                    },
                                    emphasis: {
                                        color: colorList[index][1]
                                    }
                                }
                            }]
                        }
                    )
                });
                let option = {
                    title: titleArr,
                    series: seriesArr
                };
                myChart.setOption(option);
            },
            subclassBar(container, sourceArr, colorList) {
                let myChart = this.$echarts.init(document.getElementById(container));
                this.chartsObj[container] = myChart;
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
                            fontSize: 20 * this.scale
                        },
                        data: this.dateArr
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
                            fontSize: 20 * this.scale
                        },
                    },
                    series: [{
                        type: 'bar',
                        stack: 'chart',
                        data: sourceArr,
                        itemStyle: {
                            normal: {
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
                            }
                        },
                        barWidth: 17 * this.scale
                    },{
                        type: 'line',
                        data: sourceArr,
                        itemStyle: {
                            normal:{
                                color: colorList[2],
                            }
                        },
                        lineStyle:{
                            normal:{
                                width:1
                            }
                        },
                        showSymbol:false
                    }],
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
                switch (this.$route.query.title) {
                    case '市接警类型数据分析':
                        this.show=true;
                        this.proportionSource = [
                            {name: '110报警', value: 25},
                            {name: '122报警', value: 25},
                            {name: '119报警', value: 25},
                            {name: '综合报警', value: 25},
                            {name: '其他接警类型', value: 25},
                        ];
                        this.proportionColor = [['#05dbb0', '#ccfff5'], ['#00a3c0', '#9ff1ff'], ['#4160fd', '#a5b4ff'], ['#bd0fdc', '#f2aaff'], ['#803ff7', '#c3a2ff']];
                        this.title = ['近七日警情数据占比分析'];
                        this.subClassSource1 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList1 = ['#6ffeff', '#00a0a6','#05dbb0'];
                        this.subClassSource2 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList2 = ['#7fd7fc', '#0083ba','#009eba'];
                        this.subClassSource3 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList3 = ['#6f87ff', '#0024dd','#5470fd'];
                        this.subClassSource4 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList4 = ['#ff6cfa', '#a0009b','#bd0fdc'];
                        this.position=[20,10];
                        break;
                    case '市报警方式数据分析':
                        this.show=true;
                        this.proportionSource = [
                            {name: '电话报警', value: 25},
                            {name: '来人（来电报警）', value: 25},
                            {name: '技防报警', value: 25},
                            {name: '短信报警', value: 25},
                            {name: '其他报警方式', value: 25},
                        ];
                        this.proportionColor = [['#ffd75d', '#ffe9a6'], ['#00a3c0', '#9ff1ff'], ['#4160fd', '#a5b4ff'], ['#6400cb', '#ce9eff'], ['#e344ff', '#f9d8ff']];
                        this.title = ['近七日报警方式数据占比分析'];
                        this.subClassSource1 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList1 = ['#ffebaf', '#ffd75e','#ffd75d'];
                        this.subClassSource2 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList2 = ['#7fd7fc', '#0083ba','#009eba'];
                        this.subClassSource3 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList3 = ['#6f87ff', '#0024dd','#5470fd'];
                        this.subClassSource4 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList4 = ['#a650ff', '#a650ff','#bd0fdc'];
                        this.position=[20,10];
                        break;
                    case '市来话类型数据分析':
                        this.show=false;
                        this.proportionSource = [
                            {name: '报警求助、举报投诉', value: 25},
                            {name: '处警反馈', value: 25},
                            {name: '信息咨询', value: 25},
                            {name: '重复报警', value: 25},
                            {name: '骚扰电话', value: 25},
                            {name: '系统测试', value: 25},
                            {name: '其他来话类型', value: 25},
                        ];
                        this.proportionColor = [['#ed69ec', '#ffdeff'], ['#4a66ed', '#aebcff'], ['#1b22ac', '#7b8bff'], ['#8c4ff9', '#c7a8ff'], ['#6c08c8', '#b361ff'], ['#20f5ed', '#c3fffd'], ['#8b06a6', '#ed95ff']];
                        this.title = ['近七日报警方式数据占比分析'];
                        this.subClassSource1 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList1 = ['#ff6cfa', '#a0009b','#ff6cfa'];
                        this.subClassSource2 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList2 = ['#8298ff', '#324fcc','#415fec'];
                        this.subClassSource3 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList3 = ['#6163ff', '#3032d7','#243bcd'];
                        this.subClassSource4 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList4 = ['#ad81ff', '#733be3','#7c46e7'];
                        this.subClassSource5 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList5 = ['#8919ee', '#620ab4','#8618ea'];
                        this.subClassSource6 = [1200, 1500, 900, 900, 1300, 1200, 1500, 1400, 800, 800, 700];
                        this.subClassColorList6 = ['#b0fffb', '#119b9d','#18f3e9'];
                        this.position=[14,8];
                        break;
                }
                this.proportionSource.forEach(value => {
                    this.title.push(value.name);
                });
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
                        that.percent(that.proportionSource, that.proportionColor,that.position);
                        that.subclassBar('subClassChart1',that.subClassSource1,that.subClassColorList1);
                        that.subclassBar('subClassChart2',that.subClassSource2,that.subClassColorList2);
                        that.subclassBar('subClassChart3',that.subClassSource3,that.subClassColorList3);
                        that.subclassBar('subClassChart4',that.subClassSource4,that.subClassColorList4);

                        if(that.show) return;
                        setTimeout(function () {
                            that.subclassBar('subClassChart5', that.subClassSource1, that.subClassColorList1);
                            that.subclassBar('subClassChart6', that.subClassSource2, that.subClassColorList2);
                            that.subclassBar('subClassChart7', that.subClassSource3, that.subClassColorList3);
                            that.subclassBar('subClassChart8', that.subClassSource4, that.subClassColorList4);
                            that.subclassBar('subClassChart9', that.subClassSource5, that.subClassColorList5);
                            that.subclassBar('subClassChart10', that.subClassSource6, that.subClassColorList6);
                        },100)
                    },
                };
                Index.init();
            },


            pdFilter_btn(){
                let str = this.$route.query.title;

                str = str.substring(0,1);
                console.log(str);

                if(str == '全'){
                    this.$emit('filter_btn',true)
                }else{
                    this.$emit('filter_btn',false)
                }
            }
        },
//生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
//生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            this.pdFilter_btn();
            this.getScale();
            this.renderChart();
            // console.log(1111);



            // if (window.performance.navigation.type == 1) {
            //     console.log("页面被刷新1111111111")
            // }else{
            //     console.log("首次被加载1111111")
            // }


           

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
        }, //如果页面有keep-alive缓存功能，这个函数会触发
    }
</script>
<style lang='scss' scoped>
    //@import url(); 引入公共css类
    .chart-wrap {
        width: 100%;
        height: 100%;

        h3 {
            height: 10%;
            text-align: center;
        }

        .chartBox {
            width: 100%;
            height: 90%;

            .chart {
                width: 100%;
                height: 100%;
            }
        }
    }

    .r {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .r-t {
            width: 100%;
            height: 38%;
            background-image: url('../assets/images/index/l-t-bg.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }

        .r-b {
            width: 100%;
            height: 57%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            .r-b-t {
                height: 47.2%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                .r-b-t-r-1,.r-b-t-l-1 {
                    width: 48%;
                    height: 100%;
                    background-image: url('../assets/images/index/l-t-bg.png');
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }


            }
        ;
            .r-b-t-l-2,.r-b-t-m-2, .r-b-t-r-2,.r-b-b-l-2,.r-b-b-r-2,.r-b-b-m-2 {
                width: 32%;
                height: 100%;
                // background: white;
                background-image: url('../assets/images/index/l-t-bg.png') ;
                background-repeat: no-repeat;
                background-size:100% 100%;
            }

            .r-b-b {
                height: 47.2%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                // background-image: url('../assets/images/index/l-t-bg.png') ;
                // background-repeat: no-repeat;
                // background-size:100% 100%;
                .r-b-b-l-1,.r-b-b-r-1 {
                    width: 48%;
                    height: 100%;
                    background-image: url('../assets/images/index/l-t-bg.png');
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }
            }

        }


    }
</style>