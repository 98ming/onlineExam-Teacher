<template>
    <div class="bayes-container">
        <div style="display: block">
            <el-autocomplete
                    v-model="state"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请选择班号"
                    @select="handleSelect"
            ></el-autocomplete>
        </div>
        <div style="display: flex">
            <echarts :data="data1" :tid="3" :name="'bayes预测结果'"></echarts>
            <echarts :data="data2" :tid="4" :name="'bayes预测正确率'"></echarts>
        </div>

    </div>
</template>

<script>
    import echarts from '../subcomponents/pie.vue'
    export default {
        data(){
            return{
                data1:[{name:"优秀", value:0},
                      {name:"中等", value:0},
                      {name:"不及格", value:0}
                    ],
                data2:[
                    {name:"正确率",value:0},
                    {name:"错误率",value:0}
                ],
                data3:[
                    { "value": "16140Y01"},
                    { "value": "16140Y02"},
                    { "value": "16140Y03"}
                    ],
                class: [],
                state: '',
                timeout:  null
            }
        },
        created(){
            /*this.$http.get('class/getClass').then(result=>{
                if(result.body.status === 200){
                    console.log(result.body)
                }
            })*/
        },
        methods:{
            loadAll() {
                return this.data3;
            },
            querySearchAsync(queryString, cb) {
                var restaurants = this.class;
                var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 1000 * Math.random());
            },
            createStateFilter(queryString) {
                return (state) => {
                    return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                this.$http.post('algorithm/bayesClass',JSON.stringify({name:item.value})).then(result=>{
                    this.data1.forEach((item,i)=>{
                        item.value = result.body[i]
                    })
                    this.data2.forEach((item,i)=>{
                        item.value = result.body[i+3]
                    })
                })
            }
        },
        mounted() {
            this.class = this.loadAll();
        },
        components:{
            echarts
        }
    }

</script>
<style lang="scss" scoped>
    .bayes-container{

    }
</style>
