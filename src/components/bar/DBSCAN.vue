<template>
    <div>
        <div id="dbscan" style="width: 1100px;height:600px;"></div>
    </div>
</template>

<script>
    var echarts = require('echarts');

    export default {
        data(){
            return{

            }
        },
        created(){

        },
        mounted() {
            this.echarts()
        },
        methods : {
            echarts(){
                var myChart = echarts.init(document.getElementById('dbscan'));
                /*var last1 = String(Jsonclusters1);
                var strs1 = new Array();
                var xa1 = new Array();
                var ya1 = new Array();
                strs1 = last1.split(",");
                for(var i = 0,j=0;i<strs1.length;i=i+2){
                    xa1[j++] = strs1[i];
                }
                for(var i = 1,j=0;i<strs1.length;i=i+2){
                    ya1[j++] = strs1[i];
                }
                var arr1 = new Array();
                for(var i=0;i<xa1.length;i++){
                    var arr12 = new Array();
                    arr12[0] = xa1[i];
                    arr12[1] = ya1[i];
                    arr1.push(arr12);
                }
                alert(arr1)
                // 第二个簇
                var Jsonclusters2 = eval('${Jsonclusters2}');
                var last2 = String(Jsonclusters2);
                var strs2 = new Array();
                var xa2 = new Array();
                var ya2 = new Array();
                strs2 = last2.split(",");
                for(var i = 0,j=0;i<strs2.length;i=i+2){
                    xa2[j++] = strs2[i];
                }
                for(var i = 1,j=0;i<strs2.length;i=i+2){
                    ya2[j++] = strs2[i];
                }
                var arr2 = new Array();
                for(var i=0;i<xa2.length;i++){
                    var arr22 = new Array();
                    arr22[0] = xa2[i];
                    arr22[1] = ya2[i];
                    arr2.push(arr22);
                }
                alert(arr2)
                // 第0个簇
                var Jsonclusters0 = eval('${Jsonclusters0}');
                var last0 = String(Jsonclusters0);
                var strs0 = new Array();
                var xa0 = new Array();
                var ya0 = new Array();
                strs0 = last0.split(",");
                for(var i = 0,j=0;i<strs0.length;i=i+2){
                    xa0[j++] = strs0[i];
                }
                for(var i = 1,j=0;i<strs0.length;i=i+2){
                    ya0[j++] = strs0[i];
                }
                var arr0 = new Array();
                for(var i=0;i<xa0.length;i++){
                    var arr02 = new Array();
                    arr02[0] = xa0[i];
                    arr02[1] = ya0[i];
                    arr0.push(arr02);
                }
                alert(arr0)
                // 第3个簇
                var Jsonclusters3 = eval('${Jsonclusters3}');
                var last3 = String(Jsonclusters3);
                var strs3 = new Array();
                var xa3 = new Array();
                var ya3 = new Array();
                strs3 = last3.split(",");
                for(var i = 0,j=0;i<strs3.length;i=i+2){
                    xa3[j++] = strs3[i];
                }
                for(var i = 1,j=0;i<strs3.length;i=i+2){
                    ya3[j++] = strs3[i];
                }
                var arr3 = new Array();
                for(var i=0;i<xa3.length;i++){
                    var arr32 = new Array();
                    arr32[0] = xa3[i];
                    arr32[1] = ya3[i];
                    arr3.push(arr32);
                }
                alert(arr3)*/
                /* // 中心点
            var allcores = eval('${allcores}');
             var last4 = String(allcores);
                var strs4 = new Array();
                var xa4 = new Array();
                var ya4 = new Array();
                strs4 = last4.split(",");
                for(var i = 0,j=0;i<strs4.length;i=i+2){
                    xa4[j++] = strs4[i];
                }
                for(var i = 1,j=0;i<strs4.length;i=i+2){
                    ya4[j++] = strs4[i];
                }
                var arr4 = new Array();
                for(var i=0;i<xa4.length;i++){
                    var arr42 = new Array();
                    arr42[0] = xa4[i];
                    arr42[1] = ya4[i];
                    arr4.push(arr42);
                }
                alert(arr4) */
                option = {
                    title : {
                        text: '视频时长与成绩聚类分析',
                        x : 'center'
                    },
                    xAxis: {
                        name:"观看视频时长",
                    },
                    yAxis: {
                        name:"分数",
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer:{
                            type:'cross',
                        }
                    },
                    legend:{
                        data:['分数','观看视频时长'],
                    },
                    series: [{
                        name:'分数1',
                        symbolSize: 20,
                        data: [[2070.0,76.0],
                            [2070.0,68.0],
                            [2079.0,58.0],
                            [1974.0,79.0],
                            [1888.0,70.0],
                            [1809.0,65.0],
                            [1836.0,75.0],
                            [1863.0,71.0],
                            [1864.0,58.0]
                        ],
                        type: 'scatter',
                        itemStyle: {
                            normal: {
                                shadowBlur: 10,
                                shadowColor: 'rgba(120, 36, 50, 0.5)',
                                shadowOffsetY: 5,
                                color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                    offset: 0,
                                    color: 'rgb(251, 118, 123)'
                                }, {
                                    offset: 1,
                                    color: 'rgb(204, 46, 72)'
                                }])
                            }
                        }
                    },
                        {
                            name:'分数2',
                            symbolSize: 20,
                            data: [[1552.0,82.0],
                                [1552.0,74.0],
                                [1490.0,66.0],
                                [1568.0,71.0],
                                [1612.0,62.0],
                                [1664.0,43.0]
                            ],
                            type: 'scatter',
                            itemStyle:{
                                normal: {
                                    shadowBlur: 10,
                                    shadowColor: 'rgba(25, 100, 150, 0.5)',
                                    shadowOffsetY: 5,
                                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                        offset: 0,
                                        color: 'rgb(129, 227, 238)'
                                    }, {
                                        offset: 1,
                                        color: 'rgb(25, 183, 207)'
                                    }])
                                }

                            }

                        },
                        {
                            name:'分数0',
                            symbolSize: 20,
                            data: [[3.0,75.0],
                                [50.0,76.0],
                                [35.0,77.0],
                                [5.0,55.0],
                                [35.0,67.0],
                                [129.0,99.0],
                                [147.0,45.0],
                                [181.0,69.0],
                                [130.0,58.0],
                                [45.0,61.0],
                                [2.0,88.0],
                                [23.0,77.0],
                                [32.0,79.0],
                                [7.0,78.0],
                                [9.0,64.0],
                                [27.0,80.0],
                                [1.0,74.0],
                                [5.0,82.0],
                                [40.0,74.0],
                                [110.0,64.0],
                                [41.0,67.0],
                                [5.0,49.0],
                                [24.0,46.0],
                                [6.0,75.0],
                                [41.0,66.0],
                                [20.0,64.0],
                                [42.0,65.0],
                                [4.0,69.0],
                                [70.0,66.0],
                                [104.0,59.0],
                                [199.0,45.0],
                                [213.0,81.0],
                                [270.0,79.0],
                                [303.0,67.0],
                                [366.0,61.0],
                                [407.0,70.0],
                                [480.0,68.0],
                                [554.0,69.0],
                                [500.0,50.0],
                                [529.0,72.0],
                                [594.0,49.0],
                                [692.0,39.0],
                                [632.0,69.0],
                                [550.0,83.0],
                                [518.0,80.0],
                                [449.0,67.0],
                                [419.0,96.0],
                                [286.0,74.0],
                                [301.0,64.0],
                                [128.0,79.0],
                                [95.0,68.0],
                                [5.0,56.0],
                                [9.0,66.0],
                                [36.0,20.0],
                                [5.0,89.0],
                                [9.0,85.0],
                                [1.0,77.0],
                                [36.0,90.0],
                                [1.0,78.0],
                                [71.0,71.0],
                                [19.0,72.0],
                                [4.0,49.0],
                                [1.0,65.0],
                                [53.0,64.0],
                                [20.0,66.0],
                                [12.0,75.0],
                                [77.0,72.0],
                                [6.0,82.0],
                                [20.0,71.0],
                                [3.0,62.0],
                                [36.0,72.0],
                                [1.0,67.0],
                                [34.0,97.0],
                                [4.0,55.0],
                                [4.0,67.0],
                                [1.0,62.0],
                                [99.0,70.0],
                                [6.0,73.0],
                                [1.0,66.0],
                                [3.0,84.0],
                                [1.0,5.0],
                                [16.0,69.0],
                                [0.0,0.0]
                            ],
                            type: 'scatter',
                            itemStyle:{
                                normal: {
                                    shadowBlur: 10,
                                    shadowColor: 'rgba(25, 100, 150, 0.5)',
                                    shadowOffsetY: 5,
                                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                        offset: 0,
                                        color: 'rgb(000, 220, 208)'
                                    }, {
                                        offset: 1,
                                        color: 'rgb(20, 180, 107)'
                                    }])
                                }

                            }

                        },
                        {
                            name:'分数3',
                            symbolSize: 20,
                            data: [[974.0,54.0],
                                [916.0,90.0],
                                [873.0,85.0],
                                [933.0,65.0],
                                [989.0,66.0]
                            ],
                            type: 'scatter',
                            itemStyle:{
                                normal: {
                                    shadowBlur: 10,
                                    shadowColor: 'rgba(25, 100, 150, 0.5)',
                                    shadowOffsetY: 5,
                                    color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                        offset: 0,
                                        color: 'rgb(110, 2120, 108)'
                                    }, {
                                        offset: 1,
                                        color: 'rgb(10, 80, 107)'
                                    }])
                                }

                            }

                        },
                        /*  {
                         name:'中心点',
                         symbolSize: 20,
                         data: arr4,
                         type: 'scatter',
                         itemStyle: {
                             normal: {
                                 shadowBlur: 10,
                                 shadowColor: 'rgba(120, 36, 50, 0.5)',
                                 shadowOffsetY: 5,
                                 color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                                     offset: 0,
                                     color: 'rgb(121, 211, 23)'
                                 }, {
                                     offset: 1,
                                     color: 'rgb(114, 16, 12)'
                                 }])
                             }
                             }
                     } */
                    ]
                };
                myChart.setOption(option);
            }
        }
    }

</script>
<style lang="scss" scoped>

</style>
