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

                <router-view></router-view>



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
                this.$router.push('/index/home');
            },

        },
        mounted() {

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
            &>div{
                width: 100%!important;
                height: 100%!important;
                &>canvas{
                    width: 100%!important;
                    height: 100%!important;
                }
            }
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
                        // background: white;
                        background-image: url('../assets/images/index/l-t-bg.png') ;
                        background-repeat: no-repeat;
                        background-size:100% 100%;
                    }
                }
            }
        }
    }
</style>