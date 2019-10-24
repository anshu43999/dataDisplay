<template>
    <div id="city">
        <my-header></my-header>
        <h3 id="back" @click="goBack">返回</h3>
        <main>
            <div class="class"></div>
        </main>
    </div>
</template>

<script>
    import MyHeader from "../components/Header";
    import MyMap from "../components/Map";
    export default {
        name: "City",
        components: {
            MyMap, MyHeader
        },
    }
</script>

<style scoped lang="scss">
    #back {
        color: #17fff3;
    }

    main {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

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
            height: 44.36rem;
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
                    width: 37.26%;
                    height: 100%;
                }

                .r-t-r {
                    width: 60.52%;
                    height: 100%;
                }
            }

            .r-b {
                width: 100%;
                height: 57.78%;
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .selectListBox {
                    width: 8.04rem;
                    height: 100%;
                    float: left;

                    ul {
                        width: 100%;
                        height: 21.67rem;
                        background: #17fff3;
                        margin-top: 1.44rem;
                    }
                }

                .chart {
                    width: 21.16rem;
                    height: 100%;
                    float: left;
                    background: aliceblue;
                    margin-left: 1.01rem;
                }
                .chart:nth-child(3){
                    background: antiquewhite;
                    width: 32.77rem;
                    margin-left: 4.11rem;
                }
            }
        }
    }
</style>