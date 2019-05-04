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
                id:this.$props.tid
            }
        },
        props:['data','tid','name'],
        mounted() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(this.id));
            // 绘制图表
            myChart.setOption({
                backgroundColor: 'white',
                title: {
                    text: this.$props.name,
                    x:'center'
                },
                tooltip: {},
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#fff',
                            backgroundColor: '#999',
                            borderRadius: 3,
                            padding: [3, 5]
                        }
                    },
                    indicator: [
                        { name: '视频时长', max: 2000},
                        { name: '做题次数', max: 10},
                        { name: '正确率', max: 1},
                        { name: '做题时长', max: 2000},
                    ]
                },
                series: [{
                    type: 'radar',
                    // areaStyle: {normal: {}},
                    data : [
                        {
                            name : "学生属性",
                            value : this.$props.data,
                        }
                    ]
                }]
            });
        }
    }

</script>
<style lang="scss" scoped>

</style>
