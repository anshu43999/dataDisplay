<template>
    <div id="mapChart" class="chart"></div>
</template>

<script>
    export default {
        props: ['typeAnalyze'],
        name: "Map",
        data() {
            return {
                chartsObj: {},
                type: '',
                newStr: '',
                cityObj: {},
                option: {
                    title: {
                        show: false
                    },
                    animationDuration: 1000,
                    animationEasing: 'cubicOut',
                    animationDurationUpdate: 1000,
                },
                mapdata:{}
            }
        },
        methods: {
            //地图
            mapChart() {
                let that = this;
                let myChart = that.$echarts.init(document.getElementById('mapChart'));//初始化
                this.chartsObj.mapChart = myChart;
                //初显示
                /*this.$http.get('static/json/140000_full.json').then(res => {
                    if (res.status === 200) {
                        let d = [];
                        for (let i = 0; i < res.data.features.length; i++) {
                            d.push({
                                name: res.data.features[i].properties.name,
                            });
                            this.cityObj[res.data.features[i].properties.name] = res.data.features[i].properties.adcode;
                        }
                        that.mapdata = d;
// 注册地图
                        that.$echarts.registerMap('山西省', res.data);
// 绘制地图
                        that.renderMap('山西省', d);
                    }
                });*/
// 绘制地图
                that.renderMap('山西省', that.mapdata);
                //点击地图
                myChart.on('click', function (params) {
                    /*if (params.name in that.cityObj) {
// 如果点击的是11个市，绘制选中地区的二级地图
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
                                that.renderMap(params.name, d);
                                // that.type=that.$route.query.title;

                                // console.log(that.typeAnalyze);

                                let str =  '市'+that.newStr
                                // console.log(str);

                                that.$router.push({name:str,query:{title:str,city:params.name}});
                            }
                        });
                        that.renderCity(params.name);
                    } else {
// 点击县级时是否返回
                        this.renderMap('山西省', mapdata);

                        let str = '省' + that.newStr
                        // console.log(str);

                        let str1 = '全省' + that.newStr

                        that.$router.push({name: str, query: {title: str1}});
                    }*/
                    that.renderCity(params.name);
                });
                //配置项
                /*let option = {
                    title: {
                        show: false
                    },
                    animationDuration: 1000,
                    animationEasing: 'cubicOut',
                    animationDurationUpdate: 1000,
                };*/

                /*function renderMap(map, data) {
// 初始化绘制全国地图配置
                    option.title.subtext = map;
                    option.series = [
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
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    areaColor: '#667aed',
                                    borderColor: '#fff',
                                    borderWidth: 1.5,
                                    label: {
                                        show: true,
                                        color: '#fff',
                                    },

                                    emphasis: {
                                        label: {
                                            show: true
                                        }
                                    }
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
// 渲染地图
                    myChart.setOption(option);
                }*/
            },
            renderMap(map, data) {
                let myChart=this.$echarts.init(document.getElementById('mapChart'));
// 初始化绘制全国地图配置
                this.option.title.subtext = map;
                this.option.series = [
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
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                areaColor: '#667aed',
                                borderColor: '#fff',
                                borderWidth: 1.5,
                                label: {
                                    show: true,
                                    color: '#fff',
                                },

                                emphasis: {
                                    label: {
                                        show: true
                                    }
                                }
                            }
                        },
                    },
                ];
                this.option.geo = {
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
// 渲染地图
                myChart.setOption(this.option);
            },
            renderCity(name) {
                let that = this;
                if (name in that.cityObj) {
                    that.$http.get('/static/json/' + that.cityObj[name] + '_full.json').then(res => {
                        if (res.status === 200) {
                            let d = [];
                            that.$echarts.registerMap(name, res.data);
                            //插入获取数据
                            for (let i = 0; i < res.data.features.length; i++) {
                                d.push({
                                    name: res.data.features[i].properties.name,
                                })
                            }
                            that.renderMap(name, d);
                            // that.type=that.$route.query.title;

                            // console.log(that.typeAnalyze);

                            let str = '市' + that.newStr
                            // console.log(str);

                            that.$router.push({name: str, query: {title: str, city: name}});
                        }
                    });
                } else {
// 点击县级时是否返回
                    this.renderMap('山西省', that.mapdata);

                    let str = '省' + that.newStr
                    // console.log(str);

                    let str1 = '全省' + that.newStr

                    that.$router.push({name: str, query: {title: str1}});
                }
            },
            getProvince(){
                let that=this;
                this.$http.get('static/json/140000_full.json').then(res => {
                    if (res.status === 200) {
                        let d = [];
                        for (let i = 0; i < res.data.features.length; i++) {
                            d.push({
                                name: res.data.features[i].properties.name,
                            });
                            this.cityObj[res.data.features[i].properties.name] = res.data.features[i].properties.adcode;
                        }
                        that.mapdata = d;
                        // 注册地图
                        that.$echarts.registerMap('山西省', res.data);
                    }
                });
            }
        },
        mounted() {
            let that = this;
            that.getProvince();
            let Index = {
                init() {
                    this.loadData();
                    Public.chartsResize(that.chartsObj);
                    Public.chartsReDraw(that.chartsObj, null, [
                        'mapChart'
                    ], [])
                },
                loadData() {
                    that.mapChart();
                },
            };
            Index.init();
            // console.log(this.typeAnalyze);
            // this.typeAnalyze.slice(0,1);
            // this.newStr  = this.typeAnalyze.substring(2);
            // console.log(newStr);
            // this.newStr

        },
        created() {
            this.newStr = this.typeAnalyze.substring(2);
            // console.log(this.newStr);
            // this.newStr 
        }
    }
</script>

<style scoped lang="scss">
    .chart {
        width: 100%;
        height: 100%;
    }
</style>