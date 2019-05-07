<template>
    <div class="bayes-container">
        <div style="display: block">
            <el-autocomplete
                    v-model="id"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入学号"
                    @select="handleSelect"
            ></el-autocomplete>
            <el-button type="primary" round @click="startBayes">开始预测</el-button>
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
                    {name:"优秀率",value:1.8988125E-6},
                    {name:"及格率",value:2.19770570092528E-4},
                    {name:"挂科率",value:1.3695932376E-7},
                ],
                legend1:['视频时长','做题次数','正确率','做题时长'],
                legend2:['优秀率','及格率','挂科率'],
                students: [],
                id: '',
                timeout:  null
            }
        },
        created(){
            /*this.$http.get('').then(result=>{
                if(result.body.status === 200){

                }
            })*/
        },
        methods:{
            loadAll() {
                return [
                    { "value": "1614010512--张航铭" , id : "1614010512"},
                    { "value": "1614010628--郭灏" , id : "1614010628"},
                    { "value": "1614010751--贾文兵" , id : "1614010751"},
                    { "value": "1614010301--郑倩荣" , id : "1614010301"},
                    { "value": "1614010317--刘小兵" , id : "1614010317"},
                ];
            },
            querySearchAsync(queryString, cb) {
                var students = this.students;
                var results = queryString ? students.filter(this.createStateFilter(queryString)) : students;

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
            },
            startBayes(){
                this.$http.post('',).then(result=>{
                    if(result.body.status === 200){

                    }
                })
            }
        },
        mounted() {
            this.students = this.loadAll();
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
