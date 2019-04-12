<template>
    <div class="paperView-container">
        <my-paper :paperInfo="paperInfo" v-show="flag"></my-paper>
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
                courseId : this.$route.query.courseId,
                difficult : this.$route.query.difficult,
                chapter : this.$route.query.chapter,
                paper_title : this.$route.params.name,
                paperInfo : [],
                flag : false
            };
        },
        created(){
            this.getPaperInfo();
        },
        methods: {
            confirmPaper(){
                this.$http.post('paper/confirmPaper',JSON.stringify(this.paperInfo)).then(result=>{
                    if(result.body.status === 200){
                        // console.log(result.body)
                        this.$message({
                            type: 'success',
                            message: '组卷成功！'
                        });
                        this.$store.commit('setGroupQuestionId',result.body.object)
                        this.$router.push('/releasePaper')
                    }
                },reason => {
                    this.$message({
                        type: 'warning',
                        message: '正在调试服务器，请稍候！'
                    });
                })
            },
            getPaperInfo(){
                this.$http.post('paper/autoGroupPaper',JSON.stringify({
                    course_id : this.courseId ,
                    difficult_level: this.difficult,
                    topic_id : this.chapter,
                    name : this.paper_title
                })).then(result=>{
                    if(result.body.status === 200 && result.body.object.questions.length != 0){
                        // console.log(result.body.object.questions.length)
                        this.paperInfo = result.body.object;
                        this.paperInfo.questions.forEach(item=>{
                            if(item.option){
                                item.option.option4 = item.option.option4.trim();
                                // item.option.option5 = item.option.option5.trim();
                                // item.option.option6 = item.option.option6.trim();
                            }
                        })
                        this.flag = true
                    }
                    else{
                        this.$alert('本章节暂时还没有题呦~~','提示', {
                            confirmButtonText: '确定',
                            type: 'warning'
                        });
                        this.$router.push({name : 'chapter'})
                    }
                })
            },
            changePaper(){
                this.getPaperInfo();
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
            padding-left: 60%;
            margin: 15px 0;
            button{
                width: 110px;
                height: 40px;
                margin: 0 15px;
            }
        }
    }
</style>