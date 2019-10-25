<template>
    <div id="city">
        <div class="chart" id="proportionChart"></div>
        <div class="chart" id="detailChart1"></div>
    </div>
</template>

<script>
    export default {
        name: "City",
        data(){
            return {
                proportionSource:[
                    {name:'110报警',value:25},
                    {name:'122报警',value:25},
                    {name:'119报警',value:25},
                    {name:'综合报警',value:25},
                    {name:'其他接警类型',value:25},
                ],
                proportionColor:[['#05dbb0','#ccfff5'],['#00a3c0','#9ff1ff'],['#4160fd','#a5b4ff'],['#bd0fdc','#f2aaff'],['#803ff7','#c3a2ff'],]
            }
        },
        methods:{
            percent(sourceArr,colorList){
                let myChart=this.$echarts.init(document.getElementById('proportionChart'));
                let titleArr=[];
                let seriesArr=[];
                sourceArr.forEach(function(item, index){
                    titleArr.push(
                        {
                            text:item.name,
                            left: index * 20 + 10 +'%',
                            top: '85%',
                            textAlign: 'center',
                            textStyle: {
                                fontWeight: 'normal',
                                fontSize: '16',
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
                            radius: [60, 70],
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
                                }
                            },
                            hoverAnimation: false,
                            center: [index * 20 + 10 +'%', '50%'],
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
                                            fontSize: '20',
                                            fontWeight: 'bold',
                                            color: colorList[index][0]
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
            }
        },
        mounted() {
            this.percent(this.proportionSource,this.proportionColor);
        }
    }
</script>

<style scoped lang="scss">
    #city{
        width: 100%;
        height: 100%;
        .chart{
            width: 100%;
            height: 38.58%;
        }
    }
</style>