<!--  -->
<template>
    <div class='r'>
        <div class="r-t">
            <div class="chart-wrap">
                <h3>近七日警情数据占比分析</h3>
                <div class="chartBox">
                    <div class="chart" id="proportionChart"></div>
                </div>
            </div>
        </div>


        <div class="r-b">
            <div class="r-b-t">
                <div class="r-b-t-l">

                </div>

                <div class="r-b-t-l">

                </div>

            </div>

            <div class="r-b-b">
                <div class="r-b-b-l">

                </div>

                <div class="r-b-b-l">

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
                scale:1,
                refreshCharts:[],
                proportionSource:[
                    {name:'110报警',value:25},
                    {name:'122报警',value:25},
                    {name:'119报警',value:25},
                    {name:'综合报警',value:25},
                    {name:'其他接警类型',value:25},
                ],
                proportionColor:[['#05dbb0','#ccfff5'],['#00a3c0','#9ff1ff'],['#4160fd','#a5b4ff'],['#bd0fdc','#f2aaff'],['#803ff7','#c3a2ff'],]
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
            percent(sourceArr,colorList){
                let myChart=this.$echarts.init(document.getElementById('proportionChart'));
                let titleArr=[];
                let seriesArr=[];
                sourceArr.forEach(function(item, index){
                    titleArr.push(
                        {
                            text:item.name,
                            left: index * 20 + 10 +'%',
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
                            itemStyle:  {
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
                                    fontSize:20
                                }
                            },
                            hoverAnimation: false,
                            center: [index * 20 + 10 +'%', '40%'],
                            data: [{
                                value: item.value,
                                label: {
                                    normal: {
                                        formatter: function(params){
                                            return params.value+'%';
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
                                value: 100-item.value,
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
                let option={
                    title:titleArr,
                    series: seriesArr
                };
                myChart.setOption(option);
            },
            renderChart(){
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
                        that.percent(that.proportionSource,that.proportionColor);
                    },
                };
                Index.init();
            },
        },
//生命周期 - 创建完成（可以访问当前this实例）
        created() {

        },
//生命周期 - 挂载完成（可以访问DOM元素）
        mounted() {
            this.getScale();
            this.renderChart();
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
    .chart-wrap{
        width: 100%;
        height: 100%;
        h3{
            height: 10%;
            text-align: center;
        }
        .chartBox{
            width: 100%;
            height: 90%;
            .chart{
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

                .r-b-t-l {
                    width: 48%;
                    height: 100%;
                    background-image: url('../assets/images/index/l-t-bg.png');
                    background-repeat: no-repeat;
                    background-size: 100% 100%;
                }


            }
        ;

            .r-b-b {
                height: 47.2%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
                // background-image: url('../assets/images/index/l-t-bg.png') ;
                // background-repeat: no-repeat;
                // background-size:100% 100%;
                .r-b-b-l {
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