<template>
    <div class="bayes-container">
        <div style="display: block">
            <el-autocomplete
                    v-model="state"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请选择班号"
                    @select="handleSelect"
            ></el-autocomplete>
            <el-button type="primary" round>开始预测</el-button>
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
                data1:[{name:"优秀", value:40},
                      {name:"中等", value:15},
                      {name:"不及格", value:3}
                    ],
                data2:[
                    {name:"正确率",value:80},
                    {name:"错误率",value:20}
                ],
                restaurants: [],
                state: '',
                timeout:  null
            }
        },
        methods:{
            loadAll() {
                return [
                    { "value": "16140Y01"},
                    { "value": "16140Y02"},
                    { "value": "16140Y03"},
                ];
            },
            querySearchAsync(queryString, cb) {
                var restaurants = this.restaurants;
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
                console.log(item);
            }
        },
        mounted() {
            this.restaurants = this.loadAll();
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
