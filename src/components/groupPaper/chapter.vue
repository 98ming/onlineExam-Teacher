<template>
    <div class="chapter-container">
        <div class="paper-number">
            <!--<span>试卷编号:</span>003-->
        </div>
        <div class="paper-difficulty">
            <span>试卷难度:</span>
            <star @getDifficulty="setChapterDifficulty"></star>
        </div>
        <div class="paper-difficulty">
            <span>试卷标题:</span>
            <input type="text" v-model.trim="paper_name" placeholder="请输入试卷标题" class="form-control">
        </div>
        <div class="paper-chapter">
            <span>试卷范围:</span>
            <select class="form-control" v-model="chapter">
                <option v-for="item in chapterList" :key="item.id" :value="item.id">
                    {{item.name}}
                </option>
            </select>
        </div>
        <button @click="startGroupPaper" class="btn btn-info btn-right">开始组卷</button>
    </div>
</template>
<script>
    import star from '../subcomponents/star.vue'
    export default {
        data(){
            return{
                chapterDifficult : '', // 章节难度
                chapterList : [], // 章节信息
                chapter : '', // 选择章节id
                course_id: this.$store.getters.getGroupPaperID,
                paper_name : ''
            }
        },
        created(){
            this.getChapterList();
        },
        methods : {
            getChapterList(){

                this.$http.post('topic/getTopic',JSON.stringify({id: this.course_id})).then(result=>{
                    if(result.body.status === 200){
                        this.chapterList = result.body.object
                        this.chapter = this.chapterList[0].id
                    }
                })

            },
            setChapterDifficulty(id){
                this.chapterDifficult = id
            },
            startGroupPaper(){
                if(this.$store.getters.getGroupPaperID == ''){
                    this.$alert('请选择需要组卷的课程','提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    this.$router.push('/groupPaper')
                    return
                }
                if(this.chapterDifficult == ''){
                    this.$alert('请选择试卷难度','提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return
                }
                if(this.paper_name == ''){
                    this.$alert('请输入试卷标题','提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return
                }
                this.$router.push({name : 'chapterPaper' ,
                    query : {courseId : this.$store.getters.getGroupPaperID ,
                             difficult : this.chapterDifficult ,
                             chapter : this.chapter},
                    params : {name : this.paper_name}})
            }
        },
        components : {
            star
        }
    }
</script>
<style lang="scss">
    .chapter-container{
        font-size: 20px;
        letter-spacing: 10px;
        padding: 15px 110px;
        .paper-number{
            height: 50px;
            span{
                margin-right: 30px;
            }
        }
        .paper-difficulty{
            height: 100px;
            display: flex;
            input{
                width: 300px;
                margin-left: 30px;
            }
        }
        .paper-chapter{
            height: 100px;
            display: flex;
            .form-control{
                width: 60%;
                font-size: 16px;
            }
            span{
                margin-right: 30px;
            }
        }
        .btn-right{
            margin-left: 70%;
        }
        button{
            width: 110px;
            height: 40px;
        }
    }
</style>