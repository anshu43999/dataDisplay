let axisesColor='#037AFF';
//所有图表的公共属性
let com_charts = {
    grid: {
        top: '25%',
        bottom: '10%'
    },
    textStyle: {
        fontSize: 10 * scale
    },
    legend: {
        itemWidth: 20 * scale,
        itemHeight: 10 * scale,
        inactiveColor: '#666',
        lineHeight: 10 * scale,
        textStyle: {
            color: '#333',
            fontSize: 16 * scale,
        }
    },
    tooltip: {
        textStyle: {
            fontSize: 16 * scale,
            color: '#333'
        },
    },
};

//直角坐标系坐标轴
let com_axis = {
    axisLabel: { //标签名称
        color: '#333',
        margin: 8 * scale,
        fontSize: 16 * scale,
    },
    axisTick: { //小刻度线
        show: false
    },
    axisLine: { //坐标轴
        show: true,
        lineStyle: {
            color: axisesColor
        }
    },
};

//竖条图公共属性
let opt_bar_v = $.extend(true, {}, com_charts, {
    xAxis: $.extend(true, {}, com_axis, {
        boundaryGap: true,
        splitLine: {
            show: false
        },
        type: 'category'
    }),
    yAxis: $.extend(true, {}, com_axis, {
        type: 'value',
        splitLine: {
            show: false
        }
    }),
    tooltip: {
        trigger: 'axis',
    }
    //这里写此类图表其他属性
});
let seri_bar_v = {
    type: 'bar',
    barWidth: '15%'
};

//折线图公共属性
let opt_line = $.extend(true, {}, com_charts, {
    xAxis: $.extend(true, {}, com_axis, {
        type: 'category',
    }),
    yAxis: $.extend(true, {}, com_axis, {
        type: 'value',
        splitLine: {
            show: true,
            lineStyle: {
                type: 'dashed',
                color: '#03eeff'
            }
        },
    }),
    //这里写此类图表其他属性
    tooltip: {
        trigger: 'axis',
    },
});
let seri_line = {
    type: 'line',
    smooth: true,
    lineStyle: {
        width: 1.5 * scale,
    },
};

//玫瑰图公共属性
let opt_pie = $.extend(true, {}, com_charts, {
    series:[{
        type: 'pie',
        radius: ['20%', '80%'],
        center: ['80%', '50%'],
        roseType: 'radius',
    },{
        type: 'pie',
        radius: ['10%', '12%'],
        center: ['80%', '50%'],
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
});
