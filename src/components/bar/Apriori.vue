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
                data : [],
                support : 0,
                confidence : 0
            }
        },
        created(){
          this.$http.get('algorithm/getCourseAssociationRule').then(result=>{
                if(result.body.status === 200){
                    console.log(result.body)
                    var jsonArray = result.body.object
                    // data为包含数组的数组
                    var data = new Array();
                    for (i = 0; i < jsonArray.length; i++) {
                        var obj = jsonArray[i];
                        var array = new Array()
                        array.push(obj.support)
                        array.push(obj.confidence)
                        array.push(obj.lift)
                        array.push(obj.precursorList)
                        array.push(obj.consequentList)
                        data.push(array);
                    }
                    this.data = data
                }
          })
        },
        mounted() {
            this.echarts();
        },
        methods:{
          echarts(val){
              // 基于准备好的dom，初始化echarts实例
              var myChart = echarts.init(document.getElementById('apriori'));
              // 绘制图表
              var schema = [
                  {name: 'support', index: 0, text: '支持度'},
                  {name: 'confidence', index: 1, text: '置信度'},
                  {name: 'lift', index: 2, text: '提升度'}
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
                  title : {
                      text: '课程关联规则挖掘',
                      textStyle:{
                          color : 'white'
                      },
                      x : 'center'
                  },
                  backgroundColor: '#404a59',
                  grid: {
                      x: '10%',
                      x2: 150,
                      y: '18%',
                      y2: '10%'
                  },
                  dataZoom: [{
                      type: 'inside'
                  }, {
                      type: 'slider'
                  }],
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
                              + schema[0].text + '：' + value[0] + '<br>'
                              + schema[1].text + '：' + value[1] + '<br>'
                              + schema[2].text + '：' + value[2] + '<br>';
                      }
                  },
                  xAxis: {
                      type: 'value',
                      min: 0.08, //支持度阈值
                      interval:0.05,
                      name: 'support',
                      nameGap: 16,
                      nameTextStyle: {
                          fontSize: 14
                      },
                      axisLine: {
                          lineStyle:{
                              color:"#eee",
                          },
                          symbol:['none', 'arrow'],
                      },
                      splitLine: {
                          show: false
                      }
                  },
                  yAxis: {
                      type: 'value',
                      min:0.59, //置信度阈值
                      max:1.04,
                      interval:0.02,
                      name: 'confidence',
                      nameLocation: 'end',
                      nameGap: 20,
                      nameTextStyle: {
                          fontSize: 16
                      },
                      axisLine: {
                          symbol:['none', 'arrow'],
                          lineStyle:{
                              color:"#eee",
                          }
                      },
                      splitLine: {
                          show: false
                      }
                  },
                  visualMap: [ //视觉映射组件
                      {
                          left: 'right',
                          align:'right', //组件中手柄和文字的摆放位置
                          top: '10%',
                          orient:'vertical', // 竖直显示映射组件
                          dimension: 2, //指定用数据的『哪个维度』，映射到视觉元素上。『数据』即 series.data。 可以把 series.data 理解成一个二维数组
                          min: 0,
                          max: 5,
                          hoverLink:true, //鼠标移到数据上时进行高亮
                          inverse:false,
                          itemWidth: 30, //长条的宽度
                          itemHeight: 120,
                          calculable: true, //是否显示拖拽用的手柄
                          precision: 2, //展示的小数精度（保留几位小数）
                          text: ['圆形颜色：提升度'],
                          textGap: 30,
                          textStyle: {
                              color: '#fff'
                          },
                          // color: ['red', 'yellow'],
                          /*inRange: {
                              symbolSize: [10, 70]
                          },*/
                          outOfRange: {
                              //symbolSize: [10, 70],
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
                          data: val
                      }
                  ]
              };
              myChart.setOption(option);
          }
        },
        watch:{
            data(newVal){
                this.echarts(newVal);
            }
        }
    }

</script>
<style lang="scss" scoped>

</style>
