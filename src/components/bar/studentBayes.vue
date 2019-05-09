<template>
    <div class="bayes-container">
        <div style="display: block">
            <el-autocomplete
                    v-model="id"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入学号"
                    @select="handleSelect"
            ></el-autocomplete>
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
                data1:[1200,5,60,500],
                data2:[
                    {name:"优秀率",value:80},
                    {name:"及格率",value:20},
                    {name:"挂科率",value:10},
                ],
                data3:[],
                legend1:['视频时长','做题次数','正确率','做题时长'],
                legend2:['优秀率','及格率','挂科率'],
                students: [],
                id: '',
                timeout:  null
            }
        },
        created(){
            this.$http.get('algorithm/getUser').then(result=>{
                var da = [];
                result.body.forEach(item=>{
                    var i = {}
                    i.value = item.name;
                    i.id = item.id
                    da.push(i)
                })
                this.data3 = da
            })
        },
        methods:{
            loadAll() {
                return this.data3;
            },
            querySearchAsync(queryString, cb) {
                var students = this.students;
                var results = queryString ? students.filter(this.createStateFilter(queryString)) : students;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 500 * Math.random());
            },
            createStateFilter(queryString) {
                return (state) => {
                    return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                this.$http.post('algorithm/bayes',JSON.stringify({id:item.id})).then(result=>{
                    var da = [];
                    da.push(result.body.videoDuration)
                    da.push(result.body.exerciseNum)
                    da.push(result.body.accuracy)
                    da.push(result.body.exerciseTime)
                    this.data1 = da
                    this.data2.forEach((item,i)=>{
                        item.value = result.body.data[i]
                    })

                })
            },
        },
        mounted() {
            this.students = this.loadAll();
        },
        components:{
            piecircle,
            radar
        },
        watch:{
            data3(){
                this.students = this.data3
            }
        }
    }

</script>
<style lang="scss" scoped>
    .bayes-container{

    }
</style>
