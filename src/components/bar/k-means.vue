<template>
    <div>
        <scatter :tid="8" :data="data1"></scatter>
        <scatter :tid="9" :data="data2"></scatter>
        <scatter :tid="10" :data="data3"></scatter>
    </div>
</template>

<script>
    import scatter from '../subcomponents/scatter.vue'
    var echarts = require('echarts');

    export default {
        data(){
            return{
                data1 : [],
                data2 : [],
                data3 : []
            }
        },
        mounted() {

        },
        created(){
            this.$http.get('algorithm/kmeans').then(result=>{
                console.log(result.body)
                this.data1 = result.body[0]
                this.data2 = result.body[1]
                this.data3 = result.body[2]
            })
        },
        methods:{

        },
        components:{
            scatter
        }
    }

</script>
<style lang="scss" scoped>

</style>
