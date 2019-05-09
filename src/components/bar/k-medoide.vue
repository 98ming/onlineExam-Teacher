<template>
    <div>
        <scatter :tid="'kmedoide1'" :data="data1"></scatter>
        <scatter :tid="'kmedoide2'" :data="data2"></scatter>
        <scatter :tid="'kmedoide3'" :data="data3"></scatter>
    </div>
</template>

<script>
    import scatter from '../subcomponents/scatter.vue'

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
            this.$http.get('algorithm/kmedoids').then(result=>{
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
