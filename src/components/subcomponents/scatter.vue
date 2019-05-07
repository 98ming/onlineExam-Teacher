<template>
    <div>
        <div :id="id" style="width: 1100px;height:600px;padding-bottom: 30px"></div>
    </div>
</template>

<script>
    var echarts = require('echarts');

    export default {
        data(){
            return{
                id:this.$props.tid,
                person : this.$props.data
            }
        },
        props:['data','tid'],
        mounted() {
            this.echarts();
        },
        methods:{
            echarts(){
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById(this.id));
                // 绘制图表
                myChart.setOption({
                    title : {
                        text: '男性女性课程成绩分布',
                    },
                    grid: {
                        left: '3%',
                        right: '7%',
                        bottom: '3%',
                        containLabel: true
                    },
                    tooltip : {
                        // trigger: 'axis',
                        showDelay : 0,
                        formatter : function (params) {
                            if (params.value.length > 1) {
                                return params.seriesName + ' :<br/>'
                                   + '理论课成绩' + params.value[0] + '分:<br/>'
                                    + '非理论课成绩' + params.value[1] + '分';
                            }
                            else {
                                return params.seriesName + ' :<br/>'
                                    + params.name + ' : '
                                    + params.value + '分';
                            }
                        },
                        axisPointer:{
                            show: true,
                            type : 'cross',
                            lineStyle: {
                                type : 'dashed',
                                width : 1
                            }
                        }
                    },
                    toolbox: {
                        feature: {
                            dataZoom: {},
                            brush: {
                                type: ['rect', 'polygon', 'clear']
                            }
                        }
                    },
                    brush: {
                    },
                    legend: {
                        data: ['男生','女生',],
                        left: 'center'
                    },
                    xAxis : [
                        {
                            name : '理论课成绩',
                            type : 'value',
                            scale:true,
                            axisLabel : {
                                formatter: '{value}'
                            },
                            splitLine: {
                                show: false
                            }
                        }
                    ],
                    yAxis : [
                        {
                            name : '非理论课成绩',
                            type : 'value',
                            scale:true,
                            axisLabel : {
                                formatter: '{value}'
                            },
                            splitLine: {
                                show: false
                            }
                        }
                    ],
                    series : [
                        {
                            name:'女生',
                            type:'scatter',
                            data: this.$props.data.woman,
                            markArea: {
                                silent: true,
                                itemStyle: {
                                    normal: {
                                        color: 'transparent',
                                        borderWidth: 1,
                                        borderType: 'dashed'
                                    }
                                },
                                data: [[{
                                    name: '女生分布区间',
                                    xAxis: 'min',
                                    yAxis: 'min'
                                }, {
                                    xAxis: 'max',
                                    yAxis: 'max'
                                }]]
                            },
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            },
                            markLine : {
                                lineStyle: {
                                    normal: {
                                        type: 'solid'
                                    }
                                },
                                data : [
                                    {type : 'average', name: '平均值'},
                                    { xAxis: 160 }
                                ]
                            }
                        },
                        {
                            name:'男生',
                            type:'scatter',
                            data: this.$props.data.man,
                            markArea: {
                                silent: true,
                                itemStyle: {
                                    normal: {
                                        color: 'transparent',
                                        borderWidth: 1,
                                        borderType: 'dashed'
                                    }
                                },
                                data: [[{
                                    name: '男生分布区间',
                                    xAxis: 'min',
                                    yAxis: 'min'
                                }, {
                                    xAxis: 'max',
                                    yAxis: 'max'
                                }]]
                            },
                            markPoint : {
                                data : [
                                    {type : 'max', name: '最大值'},
                                    {type : 'min', name: '最小值'}
                                ]
                            },
                            markLine : {
                                lineStyle: {
                                    normal: {
                                        type: 'solid'
                                    }
                                },
                                data : [
                                    {type : 'average', name: '平均值'},
                                    { xAxis: 170 }
                                ]
                            }
                        },
                    ]
                });
            }
        },
        watch:{
            data(){
                this.echarts()
            }
        }
    }

</script>
<style lang="scss" scoped>

</style>
