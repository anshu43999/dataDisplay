<template>
    <div id="pjqflsjfx">
        <my-header></my-header>
        <h3 id="back" @click="goBack">返回</h3>
        <main>
            <!--样式里的l,m,r,t,b分别代表左，中，右，上，下-->
            <div class="l">
                <div class="chart-wrap">
                    <div class="chartBox">
                        <my-map ref="map"></my-map>
                    </div>
                </div>
            </div>

            <div class="r">
                <div class="r-t">
                    <div class="r-t-l">
                        <div class="chart-wrap">
                            <h3>{{this.chartTitle[0]}}</h3>
                            <div class="chartBox">

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

                </div>
            </div>
        </main>
    </div>
</template>

<script>
    import MyHeader from "../components/Header";
    import MyMap from "../components/Map";
    export default {
        name: "PJQFLSJFX",
        components:{
            MyMap,MyHeader
        },
        data(){
            return {
                chartTitle:[]
            }
        },
        methods:{
            //获取缩放值
            getScale() {
                this.scale = localStorage.getItem('scale');
            },
            //返回
            goBack() {
                this.$router.go(-1);
            },
            renderChart(){
                this.chartTitle=['警情分类数据分析','警情分类数据占比分析']
            }
        },
        mounted() {
this.getScale();
        }
    }
</script>

<style scoped lang="scss">
    //样式里的l, m, r, t, b分别代表左，中，右，上，下
    //布局
    #back {
        color: #17fff3;
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
            height: 42.38rem;

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
            border: .0625rem solid rgba(76, 180, 231, 0.33);
            width: 100%;
            height: 100%;
            //标题
            h3 {
                text-align: center;
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
                    height: 14.87rem;
                }

                .r-t-l {
                    width: 37.25%;
                    height: 100%;
                }

                .r-t-r {
                    width: 60.5%;
                    height: 100%;
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
                        height: 10.07rem;
                    }
                }
            }
        }
    }
</style>