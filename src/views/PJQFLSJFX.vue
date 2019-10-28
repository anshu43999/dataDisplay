<template>
    <div id="pjqflsjfx">
        <my-header></my-header>
        <div class="headerBox">
            <h3 id="back" @click="goBack">返回</h3>
            <div class="filter" v-show="filter_show">
                <ul class="filterItem" @click="selectItem">
                    <li v-for="item in periodArr" :key="item">
                        <div>{{item}}</div>
                    </li>
                </ul>
            </div>
        </div>
        <main>
            <!--样式里的l,m,r,t,b分别代表左，中，右，上，下-->
            <div class="l">
                <div class="chart-wrap">
                    <div class="chartBox">
                        <my-map  :typeAnalyze='typeAnalyze' @filter_btn='filter_btn'></my-map>
                    </div>
                </div>
            </div>

            <div class="r">
                <router-view  :typeAnalyze='typeAnalyze' @filter_btn='filter_btn'></router-view>
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
                typeAnalyze: '111111',
                periodArr:['近7日','上周','近半年'],
                filter_show : true,
            }
        },
        methods: {
            //获取缩放值
            getScale() {
                this.scale = localStorage.getItem('scale');
            },
            //返回
            goBack() {
                // this.$router.go(-1);
                this.$router.push('/index/home');
            },
            setName() {
                this.chartTitle = ['警情分类数据分析', '警情分类数据占比分析','警情分类数据占比分析']
            },
            //柱状图
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
                            },
                            fontSize:20*this.scale,
                            interval:0
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
                        },
                        axisLabel:{
                            fontSize:20*this.scale
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
                    grid:{
                        top:80*this.scale,
                        bottom:120*this.scale
                    },
                    tooltip: {},
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
                            fontSize: 20 * this.scale
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
                                color: '#0c9ca3',
                                fontSize:20*this.scale
                            }
                        },
                        barWidth: 17 * this.scale
                    },
                    grid: {
                        left:80,
                        top: 0,
                        bottom: 0
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
                            color: colorList[index],
                        },
                    };
                    value.label={
                        textStyle: {
                            color: colorList[index],
                            fontSize:20*this.scale,
                        },
                    };
                });
                let option={
                    tooltip: {},
                    series: {
                        type: 'sunburst',
                        radius: ['47%', '60%'],
                        center: ['50%', '50%'],
                        data: sourceArr,
                        label: {
                            rotate: 'radial',
                            align:'left',
                            position:'top',
                            distance:26,
                        },
                        itemStyle: {
                            borderColor: '#021f3b',
                        },
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
            },
            selectedItem() {
                let item = document.querySelectorAll('.filter>.filterItem>li>div');
                item[0].classList.add('active');
            },
            selectItem(e) {
                let item = document.querySelectorAll('.filter>.filterItem>li>div');
                item.forEach((value) => {
                    value.classList.remove('active');
                });
                e.target.classList.add('active')
            },
            filter_btn(v){
                // this.filter_show = false;
                console.log(v);
                this.filter_show = v;
            }
        
        },
        mounted() {
            this.selectedItem();

        },
        created(){
            this.typeAnalyze = this.$route.query.title
        }
    }
</script>

<style scoped lang="scss">
    //样式里的l, m, r, t, b分别代表左，中，右，上，下
    //布局
    #pjqflsjfx{
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        // justify-content: space-around;

        // main{
        //     padding:0 2rem 4rem;
        // }
    }

    .headerBox{
        width: 100%;
        position: relative;
        margin-top: -3rem;
        height: 4rem;
        padding:0 2rem;
        margin-bottom: 0.7rem;
        #back {
            color: #17fff3;
            cursor: pointer;
            float: left;
            line-height: 4rem;
        }

        .filter{
            width: 16rem;
            height: 4rem;
            background: url("../assets/images/province/filterBg.png");
            background-repeat: no-repeat;
            background-size: 100% 100%;
            float: right;
            position: relative;
            .filterItem{
                width: 13.8rem;
                height: 1.4rem;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                margin: auto;
                display: flex;
                flex-direction: row;
                align-content: space-between;
                li{
                    width: 33.33%;
                    div{
                        width: 167%;
                        height: 167%;
                        background: url("../assets/images/province/filterItemBg.png");
                        transform: scale(0.6);
                        transform-origin: left top;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        &.active{
                            background-image: linear-gradient(-86deg,
                                    #53b0ff 0%,
                                    #0b5fa7 100%);
                        }
                    }
                }
            }
        }
    }
    main {
        display: flex;
        flex:  1;
        padding: 0 2rem 4rem;
        flex-direction: row;
        justify-content: space-between;

        h3{
            height: 10%;
            text-align: center;
        }
        .chartBox{
            height: 90%;
        }

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
            height: 100%;
            background-image: url('../assets/images/index/m.png') ;
            background-repeat: no-repeat;
            background-size:100% 100%;

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
            // border: .0625rem solid rgba(76, 180, 231, 0.33);
            width: 100%;
            height: 100%;
        }

        .r {
            width: 72.6%;
            height: 100%;
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
                    height: 90%;
                }

                .r-t-l {
                    width: 37.26%;
                    height: 100%;
                    background-image: url('../assets/images/index/l-t-bg.png') ;
                    background-repeat: no-repeat;
                    background-size: 100% 100%;


                }

                .r-t-r {
                    width: 60.52%;
                    height: 100%;
                    background-image: url('../assets/images/index/l-t-bg.png') ;
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

                background-image: url('../assets/images/index/l-t-bg.png') ;
                background-repeat: no-repeat;
                background-size: 100% 100%;

                .selectListBox {
                    width: 12.14%;
                    height: 100%;
                    float: left;

                    ul {
                        width: 100%;
                        height: 21.67rem;
                        margin-top: 1.44rem;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        background-image: url('../assets/images/type/bg.png') ;
                        background-repeat: no-repeat;
                        background-size: 100% 100%;
                        box-shadow:0 0 5px #011425;
                        li{
                            width: 100%;
                            height: 5.85%;
                            background-image: url('../assets/images/type/itemBg.png') ;
                            div{
                                width: 166%;
                                height: 167%;
                                transform: scale(0.6);
                                transform-origin: left top;
                                text-align: center;
                                line-height: 2;
                                cursor: pointer;
                                &.active{
                                    background: #4c7fff;
                                }
                            }
                        }
                    }
                }

                .chart {
                    width: 36.97%;
                    height: 80%;
                    float: left;
                    margin-left: 1.01rem;
                    margin-top: 2rem;
                }
                .chart:nth-child(3){
                    float: left;
                    width: 32.77rem;
                    margin-right: 3rem;
                }
            }
        }
    }
</style>