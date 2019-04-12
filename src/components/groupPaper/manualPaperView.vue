<template>
    <div class="paperView-container">
        <my-paper :paperInfo="paperInfo"></my-paper>
        <div class="paperView-button" v-show="flag">
            <button class="btn btn-success" @click="changePaper">更改组卷</button>
            <button class="btn btn-success" @click="confirmPaper">确认组卷</button>
        </div>
    </div>
</template>
<script>
    import myPaper from '../subcomponents/paperInfo.vue'
    export default {
        data() {
            return {
                courseId : this.$store.getters.getGroupPaperID , // 课程id
                paper_title : this.$route.params.paper_title ,   // 组卷标题
                groupInfo : this.$route.params.groupInfo , // 从路由获取的组卷信息
                paperInfo : [],  // 从服务器获取的试卷信息
                flag : false
            };
        },
        created(){
            this.getPaperInfo();
        },
        methods: {
            getPaperInfo(){
                var paramInfo = {
                    courseId : this.courseId ,
                    groupInfo: this.groupInfo,
                }
                this.$http.get('static/paperInfo.json',paramInfo).then(result=>{
                    if(result.body.status === 0){
                        this.paperInfo = result.body.message
                        this.flag = true
                        this.paperInfo.paper_title = this.paper_title
                    }
                })
            },
            changePaper(){
                this.getPaperInfo()
            },
            confirmPaper(){
                this.$message({
                    type: 'success',
                    message: '组卷成功！'
                });
                this.$router.push('/releasePaper')
            }
        },
        components : {
            myPaper
        }
    }
</script>
<style lang="scss" scoped>
    .paperView-container{
        .paperView-button{
            padding-left: 70%;
            margin: 15px 0;
            button{
                width: 110px;
                height: 40px;
                margin: 0 15px;
            }
        }
    }
</style>