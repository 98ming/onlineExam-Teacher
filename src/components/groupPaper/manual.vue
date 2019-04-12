<template>
    <div class="manual-container">
        <my-title :img="'glyphicon glyphicon-pencil'" :info="'手动组卷'"></my-title>
        <p><b>当前组卷课程：{{this.$store.getters.getGroupPaperName}}</b></p>
        <div class="select">
            <p>选择题：{{select_num[0]}}道</p>
            <p>填空题：{{select_num[1]}}道</p>
            <p>简答题：{{select_num[2]}}道</p>
            <p>代码题：{{select_num[3]}}道</p>
        </div>
        <div class="manual-group form-horizontal">
            <div class="form-group">
                <label class="col-sm-2 control-label">试卷标题：</label>
                <div class="col-sm-10">
                    <input type="text" class="form-control"  placeholder="请输入试卷标题" v-model.trim="paper_title">
                </div>
            </div>
            <div class="paper-chapter">
                <div class="left">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">题目范围：</label>
                        <div class="col-sm-9">
                            <select class="form-control" v-model="chapterId">
                                <option :value="item.id" v-for="item in infoList" :key="item.id">
                                    {{item.name}}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">知识点：</label>
                        <div class="col-sm-9">
                            <select class="form-control" v-model="knowledgeId">
                                <option :value="item.id" v-for="item in knowledgeList" :key="item.id">
                                    {{item.name}}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="paper-show">
                <my-paper :paper="paper_view" @select="select" :state="select_id" @drop="drop"></my-paper>
            </div>
            <div class="block">
                <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[5, 10]"
                        :page-size="page_size"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="paper_show.length">
                </el-pagination>
            </div>
            <div class="manual-button">
                <button class="btn btn-success" @click="confirmGroupPaper">提交组卷</button>
            </div>
        </div>

    </div>
</template>
<script>
    import myTitle from '../subcomponents/title.vue'
    import myPaper from '../subcomponents/paper_one.vue'
    export default {
        data() {
            return {
                paper_title : '', // 试卷标题
                infoList : [], // 章节及知识点列表
                chapterId : '', // 选择章节id
                knowledgeId : '', // 选择知识点id
                knowledgeList : [], // 已选章节对应的知识点列表
                paper_list : [],// 请求回来的试卷信息
                paper_show: [], // 当前章节的试卷信息
                paper_view:[],  // 页面显示信息
                select_id : [], // 已选试卷id
                select_state : [], // 页面显示的选择状态
                select_store : [], // 保存用户的选择信息
                currentPage : 1, // 默认页数
                page_size : 5, // 每页的个数
                select_num : [0,0,0,0] // 选择的数量
            };
        },
        created(){
            this.getInfoList();
        },
        methods : {
            validate(){
                var flag = false;
                if(this.paper_title == '') {
                    this.$message({
                        type: 'warning',
                        message: '请输入试卷标题~~'
                    });
                    return true
                }
                if(this.select_id == false){
                    this.$message({
                        type: 'warning',
                        message: '请选择组卷信息~~'
                    });
                    return true
                }
                return flag
            },
            confirmGroupPaper(){
                if(this.validate()) return ;
                this.$confirm('确定要提交组卷嘛？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    var select = [];
                    this.select_id.forEach(item=>{
                        select.push({id : item})
                    })
                    this.$http.post('paper/confirmPaper',JSON.stringify({course_id : this.$store.getters.getGroupPaperID,name : this.paper_title , questions : select})).then(result=>{
                        if(result.body.status === 200){
                            this.$store.commit('setGroupQuestionId',result.body.object)
                            this.$router.push('/releasePaper')
                            this.$message({
                                type: 'success',
                                message: '组卷成功!'
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消组卷'
                    });
                });
            },
            getInfoList(){
                this.$http.post('topic/getKnowledge',JSON.stringify({id : this.$store.getters.getGroupPaperID})).then(result=>{
                    if(result.body.status === 200){
                        // console.log(result.body)
                        this.infoList = result.body.object;
                        this.chapterId = this.infoList[0].id;
                        this.knowledgeList = this.infoList[0].knowledges
                        // this.knowledgeId = this.infoList[0].knowledges[0].id
                    }
                })
            },
            getPaper(){
                this.$http.post('paper/getQuestions',JSON.stringify({topic_id : this.chapterId , id : this.knowledgeId})).then(result=>{
                    if(result.body.status === 200){
                        // console.log(result.body)
                        this.paper_list.push(result.body.object);
                        this.paper_show = result.body.object.questions;
                        this.handleCurrentChange(1);
                    }
                })
            },
            translate(type){
                if(type == "选择题") return 0;
                if(type == "填空题") return 1;
                if(type == "简答题") return 2;
                if(type == "代码题") return 3
            },
            select(param){
                this.select_id.push(param.id)
                this.select_num[this.translate(param.type)]++
            },
            drop(param){
                this.select_id.some((item,i)=>{
                    if(item == param.id){
                        this.select_id.splice(i,1)
                        return true
                    }
                })
                this.select_num[this.translate(param.type)]--
            },
            handleSizeChange(val) { // 改变每页显示的条数后执行的函数
                this.page_size = val;
                this.handleCurrentChange(this.currentPage);
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val){ // 当前页数改变后执行的函数
                this.currentPage = val;
                this.paper_view = [];
                this.paper_show.forEach((item,i)=>{
                    if(i+1 >= (this.currentPage-1) * this.page_size + 1 && i+1 <= this.currentPage * this.page_size)
                        this.paper_view.push(item)
                })
                console.log(`当前页为${val}`)
            }
        },
        components : {
            myTitle,
            myPaper
        },
        watch : {
            chapterId(cur,old){
                this.infoList.some(item=>{
                    if(item.id === cur){
                        this.knowledgeList = item.knowledges;
                        this.knowledgeId = this.knowledgeList[0].id
                        return true
                    }
                })
            },
            knowledgeId(cur,old){
                var flag = false
                this.paper_list.some(item=>{
                    if(cur == item.id){
                        this.paper_show = item.questions;
                        this.handleCurrentChange(1);
                        flag = true;
                        return true
                    }
                })
                if(flag){
                    console.log('阻止请求')
                    return
                }
                this.getPaper();
            }
        }
    }
</script>
<style lang="scss" scoped>
    .manual-container{
        .select{
            width: 165px;
            height: 133px;
            background-color: white;
            position: fixed;
            left: 87%;
            top: 19%;
            box-shadow: 0 0 8px #cccccc;
            border: 1px black solid;
            font-weight: 700;
            p{
                color: red;
            }
        }
        p{
            font-size: 16px;
            margin-left: 30px;
        }
        .manual-group{
            padding: 15px 15px;
            label{
                font-size: 16px;
            }
            select{
                width: 230px;
                -webkit-appearance: menulist;
            }
            input[type='text']{
                width: 230px;
            }
            .paper-chapter{
                display: flex;
                padding-left: 50px;
                margin: 10px 0;
                .left{
                    width: 500px;
                }
                .right{
                    width: 500px;
                }
            }
            .paper-show{
                padding: 10px 55px;
            }
        }
        .manual-button{
            padding-left: 81%;
            margin: 15px 0;
            button{
                width: 110px;
                height: 40px;
                margin: 0 15px;
            }
        }
        .block{
            margin: 15px 15px;
            text-align: center;
        }
    }
</style>