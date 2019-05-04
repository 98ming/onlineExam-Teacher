<template>
    <div>
        <div id="apriori" style="width: 1100px;height:600px;"></div>
    </div>
</template>

<script>
    var echarts = require('echarts');

    export default {
        data(){
            return{

            }
        },
        mounted() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('apriori'));
            // 绘制图表
            var data = [
                [0.4,1,4,["Coke"],["Milk"]],
                [0.4,0.8,3,["Coke"],["Diaper"],],
                [0.4,0.6666666666666666,2,["Beer","Diaper"],["Milk"]],
            ]


            var schema = [
                {name: 'AQIindex', index: 0, text: '支持度'},
                {name: 'AQIindex', index: 1, text: '支持度'},
                {name: 'PM25', index: 2, text: '置信度'},
                {name: 'PM10', index: 3, text: '提升度'}
            ];


            var itemStyle = {
                normal: {
                    opacity: 0.8,
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            };

            option = {
                backgroundColor: '#404a59',
                color: [
                    '#dd4444', '#fec42c', '#80F1BE'
                ],
                title : {
                    text: '课程关联规则挖掘',
                    textStyle:{
                        color:"white"
                    },
                    x:'center'
                },
                grid: {
                    x: '10%',
                    x2: 150,
                    y: '18%',
                    y2: '10%'
                },
                tooltip: {
                    padding: 10,
                    backgroundColor: '#222',
                    borderColor: '#777',
                    borderWidth: 1,
                    formatter: function (obj) {
                        var value = obj.value;
                        return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                            + ' ' + value[3] + '--->'
                            + value[4]
                            + '</div>'
                            + schema[1].text + '：' + value[0] + '<br>'
                            + schema[2].text + '：' + value[1] + '<br>'
                            + schema[3].text + '：' + value[2] + '<br>';
                    }
                },
                xAxis: {
                    type: 'value',
                    name: 'support',
                    nameGap: 16,
                    nameTextStyle: {
                        color: '#fff',
                        fontSize: 14
                    },
                    splitLine: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#eee'
                        }
                    }
                },
                yAxis: {
                    type: 'value',
                    name: 'confidence',
                    nameLocation: 'end',
                    nameGap: 20,
                    nameTextStyle: {
                        color: '#fff',
                        fontSize: 16
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#eee'
                        }
                    },
                    splitLine: {
                        show: false
                    }
                },
                visualMap: [
                    {
                        left: 'right',
                        top: '10%',
                        dimension: 2,
                        min: 0,
                        max: 5,
                        itemWidth: 30,
                        itemHeight: 120,
                        calculable: true,
                        precision: 0.1,
                        text: ['圆形大小：提升度'],
                        textGap: 30,
                        textStyle: {
                            color: '#fff'
                        },
                        inRange: {
                            symbolSize: [10, 70]
                        },
                        outOfRange: {
                            symbolSize: [10, 70],
                            color: ['rgba(255,255,255,.2)']
                        },
                        controller: {
                            inRange: {
                                color: ['#c23531']
                            },
                            outOfRange: {
                                color: ['#444']
                            }
                        }
                    }
                ],
                series: [
                    {
                        type: 'scatter',
                        itemStyle: itemStyle,
                        data: data
                    }
                ]
            };
            myChart.setOption(option);
        }
    }

</script>
<style lang="scss" scoped>

</style>
