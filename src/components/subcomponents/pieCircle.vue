<template>
    <div>
        <div :id="id" style="width: 550px;height:600px;"></div>
    </div>
</template>

<script>
    var echarts = require('echarts');

    export default {
        data(){
            return{
                id:this.$props.tid,
            }
        },
        props:['data','tid','name','legend'],
        mounted() {
            this.echarts();
        },
        methods:{
            echarts(){
                // 基于准备好的dom，初始化echarts实例
                var myChart = echarts.init(document.getElementById(this.id));
                // 绘制图表
                myChart.setOption({
                    backgroundColor: 'white',
                    title : {
                        text: this.$props.name,
                        x:'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{b}:({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data:this.$props.legend
                    },
                    series: [
                        {
                            type:'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '30',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data:this.$props.data
                        }
                    ]
                });
            }
        },
        watch:{
            data:{
                handler(){
                    console.log(11111)
                    this.echarts();
                },
                deep:true
            }
        }
    }

</script>
<style lang="scss" scoped>

</style>
