<template>
    <div class="bayes-container">
        <div style="display: block">
            <el-autocomplete
                    v-model="state"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入学号"
                    @select="handleSelect"
            ></el-autocomplete>
            <el-button type="primary" round>开始预测</el-button>
        </div>
        <div style="display: flex">
            <radar :data="data1" :tid="1" :name="'学生属性'"></radar>
            <piecircle :data="data2" :tid="2" :name="'预测结果'" :legend="legend2"></piecircle>
        </div>

    </div>
</template>

<script>
    import piecircle from '../subcomponents/pieCircle.vue'
    import radar from '../subcomponents/radar.vue'
    export default {
        data(){
            return{
                data1:[1200,5,0.6,500],
                data2:[
                    {name:"优秀率",value:80},
                    {name:"及格率",value:10},
                    {name:"挂科率",value:10},
                ],
                legend1:['视频时长','做题次数','正确率','做题时长'],
                legend2:['优秀率','及格率','挂科率'],
                restaurants: [],
                state: '',
                timeout:  null
            }
        },
        methods:{
            loadAll() {
                return [
                    { "value": "1614010512--张航铭"},
                    { "value": "1614010628--郭灏"},
                    { "value": "1614010751--贾文兵"},
                    { "value": "1614010301--郑倩荣"},
                    { "value": "1614010317--刘小兵"},
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
            piecircle,
            radar
        }
    }

</script>
<style lang="scss" scoped>
    .bayes-container{

    }
</style>
