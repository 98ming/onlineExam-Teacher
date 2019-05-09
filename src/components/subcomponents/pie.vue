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
                    tooltip : {
                        trigger: 'item',
                        formatter: "{b} :{c} ({d}%)"

                    },
                    legend: {
                        orient : 'vertical',
                        x : 'left',
                        data:['tp','tn','fp','fn'],
                        textStyle :{color: 'auto'}
                    },
                    toolbox: {
                        show : true,
                        feature : {
                            mark : {show: true},
                            dataView : {show: true, readOnly:false},
                            restore : {show: true},
                            saveAsImage : {show: true}
                        }
                    },
                    calculable : true,
                    series : [
                        {
                            name:'结果分析',
                            type:'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data: this.$props.data
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
