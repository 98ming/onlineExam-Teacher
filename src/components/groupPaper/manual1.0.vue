<template>
    <div class="manual-container">
        <my-title :img="'glyphicon glyphicon-pencil'" :info="'手动组卷'"></my-title>
        <p>当前组卷课程：{{this.$store.getters.getGroupPaperName}}</p>
        <div class="manual-score">
            <span>已组选择题数：{{paperNumber[0]}}道</span>
            <span>已组填空题数：{{paperNumber[1]}}道</span>
            <span>已组简答题数：{{paperNumber[2]}}道</span>
            <span>已组程序题数：{{paperNumber[3]}}道</span>
            <span>当前总分：{{totalScore}}分</span>
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
                            <select class="form-control" v-model="knowledgeId" multiple>
                                <option :value="item.id" v-for="item in knowledgeList" :key="item.id">
                                    {{item.name}}
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="paper-chapter">
                <div class="left">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">选择题个数：</label>
                        <div class="col-sm-9">
                            <select class="form-control" v-model="select[0].number">
                                <option :value="item" v-for="item in numberList" :key="item">{{item}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">每道分值：</label>
                        <div class="col-sm-9">
                            <select class="form-control" v-model="select[0].score">
                                <option :value="item" v-for="item in scoreList">{{item}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="paper-chapter">
                <div class="left">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">填空题个数：</label>
                        <div class="col-sm-9">
                            <select class="form-control" v-model="select[1].number">
                                <option :value="item" v-for="item in numberList" :key="item">{{item}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">每道分值：</label>
                        <div class="col-sm-9">
                            <select class="form-control" v-model="select[1].score">
                                <option :value="item" v-for="item in scoreList">{{item}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="paper-chapter">
                <div class="left">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">简答题个数：</label>
                        <div class="col-sm-9">
                            <select class="form-control" v-model="select[2].number">
                                <option :value="item" v-for="item in numberList" :key="item">{{item}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">每道分值：</label>
                        <div class="col-sm-9">
                            <select class="form-control" v-model="select[2].score">
                                <option :value="item" v-for="item in scoreList">{{item}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="paper-chapter">
                <div class="left">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">程序题个数：</label>
                        <div class="col-sm-9">
                            <select class="form-control" v-model="select[3].number">
                                <option :value="item" v-for="item in numberList" :key="item">{{item}}</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="form-group">
                        <label class="col-sm-3 control-label">每道分值：</label>
                        <div class="col-sm-9">
                            <select class="form-control" v-model="select[3].score">
                                <option :value="item" v-for="item in scoreList">{{item}}</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="manual-button">
            <button class="btn btn-warning" @click="continueGroupPaper">保存</button>
            <button class="btn btn-danger" @click="deleteGroupPaper">删除当前章节</button>
            <button class="btn btn-info" @click="confirmGroupPaper">提交组卷</button>
        </div>
        <div class="manual-view">
            <p>组卷章节显示：</p>
            <div class="manual-select">
                <button class="btn btn-success"
                        v-for="item in selectView" :key="item.chapterId"
                        @click="setChapterId(item.chapterId)">
                    {{item.chapterInfo}}
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    import myTitle from '../subcomponents/title.vue'
    export default {
        data() {
            return {
                totalScore : 0,
                select : [
                    {score : 0, number : 0}, // 选择题
                    {score : 0, number : 0}, // 填空题
                    {score : 0, number : 0}, // 简答题
                    {score : 0, number : 0}  // 代码题
                ], // 下拉框选中的值临时保存
                paper_title : '', // 试卷标题
                infoList : [], // 章节及知识点列表
                chapterId : '', // 选择章节id
                knowledgeId : [], // 选择知识点id
                knowledgeList : [], // 已选章节对应的知识点列表
                scoreList : [0,5,10,15,20,25,30],
                numberList : [0,1,2,3,4,5,6,7,8,9,10],
                selectView : [], // 点击继续组卷后组卷信息保存的位置
                paperNumber : [0,0,0,0] // 试卷题目个数
            };
        },
        created(){
            // if(this.$store.getters.getGroupPaperID == ''){
            //     this.$alert('请选择需要组卷的课程','提示', {
            //         confirmButtonText: '确定',
            //         type: 'warning'
            //     });
            //     this.$router.push('/groupPaper')
            //     return
            // }
            this.getInfoList();
        },
        methods : {
            getInfoList(){
                this.$http.post('topic/getKnowledge',JSON.stringify({id : this.$store.getters.getGroupPaperID})).then(result=>{
                    if(result.body.status === 200){
                        console.log(result.body)
                        this.infoList = result.body.object
                        this.chapterId = this.infoList[0].id
                        this.knowledgeList = this.infoList[0].knowledges
                        // this.knowledgeId = this.knowledgeList[0].knowledgeId
                    }
                })
            },
            initSelect(){
                this.select.forEach(item=>{
                    item.number = 0
                    item.score = 0
                })
            },
              continueGroupPaper(){
                 this.$confirm('你确定要保存吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    if (await this.validate())
                        return
                    var groupPaperInfo = {}
                    groupPaperInfo.chapterId = this.chapterId
                    groupPaperInfo.knowledge = []
                    groupPaperInfo.selectInfo = []
                    this.infoList.some(item => {
                        if (item.id === this.chapterId) {
                            groupPaperInfo.chapterInfo = item.name
                            this.knowledgeId.forEach(i => {
                                item.knowledges.some(j => {
                                    if (j.id === i) {
                                        var knowledge = {id: i, info: j.name}
                                        groupPaperInfo.knowledge.push(knowledge)
                                        return true
                                    }
                                })
                            })
                            return true
                        }
                    })
                    this.select.forEach(item => {
                        var score = {score: item.score, number: item.number}
                        groupPaperInfo.selectInfo.push(score)
                    })
                    groupPaperInfo.totalScore = this.getCurTotal()
                    var flag = false
                    var al = -1
                    this.selectView.some( (item, i) => {
                         if (item.chapterId === this.chapterId) {
                              al = i
                             /*if (window.confirm('当前所选章节已保存，若继续保存，则会覆盖已有的内容')) {
                                 //alert("确定");
                                 this.selectView.splice(i, 1)
                                 this.selectView.splice(i, 0, groupPaperInfo)
                                 flag = true
                                 return true;
                             } else {
                                 //alert("取消");
                                 flag = true
                                 return false;
                             }*/
                             return true
                         }
                     })
                     if(al != -1){
                         await this.$confirm('当前所选章节已保存，若继续保存，则会覆盖已有的内容', '提示', {
                             confirmButtonText: '确定',
                             cancelButtonText: '取消',
                             type: 'warning'
                         }).then(() => {
                             this.selectView.splice(al, 1)
                             this.selectView.splice(al, 0, groupPaperInfo)
                             flag = true
                             this.$message({
                                 type: 'success',
                                 message: '保存成功!'
                             });
                             return true;
                         }).catch(() => {
                             flag = true
                             this.$message({
                                 type: 'info',
                                 message: '已取消保存'
                             });
                             return false;
                         });
                     }
                     if (!flag) {
                        this.selectView.push(groupPaperInfo)
                    }
                    return true;
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消保存'
                    });
                    return false;
                });
            },
            async validate(){
                var flag = false;
                var al = false;
                if(this.knowledgeId == false){
                    flag = true;
                    this.$alert('请选择需要组卷的知识点','提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return flag;
                }
                if(this.getCurTotal() == 0){
                    flag = true;
                    this.$alert('当前总分为0,请选择试题个数以及题目分值','提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return flag
                }
                var type = ['选择题','填空题','简答题','程序题'];
                var zeroinfo = [];
                var zeroid = [];
                this.select.forEach((item,i)=>{
                    if(item.number * item.score === 0){
                        if((item.number != 0) || (item.score != 0)){
                            al = true;
                            zeroinfo.push(type[i]);
                            zeroid.push(i);
                        }
                    }
                });
                if(al){
                    await this.$confirm('检测到' + zeroinfo.join('、') + '选择了个数或分值，但总分为0，' +
                        '若继续保存，系统会把数量和分值清零', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        zeroid.forEach(item=>{
                            this.select[item].score = 0;
                            this.select[item].number = 0;
                        })
                    }).catch(() => {
                        flag = true;
                        this.$message({
                            type: 'info',
                            message: '已取消保存'
                        });
                    });
                    /*if(window.confirm('检测到' + zeroinfo.join('、') + '选择了个数或分值，但总分为0，' +
                        '若继续保存，系统会把数量和分值清零')){
                        zeroid.forEach(item=>{
                            this.select[item].score = 0;
                            this.select[item].number = 0;
                        })
                    }else{
                        flag = true
                    }*/
                }
                return flag
            },
            confirmGroupPaper(){
                if(this.paper_title.length === 0){
                    this.$alert('请输入试卷标题','提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return
                }
                if(this.selectView == false){
                    this.$alert('请选择组卷信息并保存，即可提交组卷!','提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return
                }
                this.$router.push({name : 'manualPaper' ,
                                   params : {paper_title : this.paper_title , groupInfo : this.selectView}})
            },
            setChapterId(id){
                this.chapterId = id
            },
            getCurTotal(){
                var score = 0
                this.select.forEach(item=>{
                    score += item.number * item.score
                })
                return score
            },
            getSelectInfo(id){
                this.selectView.some(item=>{
                    if(item.chapterId === id){
                        this.chapterId = item.chapterId
                        this.initSelect()
                        item.selectInfo.forEach((item,i)=>{
                            this.select[i].score = item.score
                            this.select[i].number = item.number
                        })
                        this.knowledgeId = []
                        item.knowledge.forEach(i=>{
                            this.knowledgeId.push(i.id)
                        })
                        return true
                    }
                })
            },
            deleteGroupPaper(){
                var flag = false;
                this.selectView.some((item,i)=>{
                    if(item.chapterId === this.chapterId){
                        flag = true
                        this.$confirm('确定要删除当前章节的组卷信息嘛？', '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            this.selectView.splice(i,1);
                            this.initSelect();
                            this.knowledgeId = []
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            });
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除'
                            });
                        });
                        /*if(window.confirm('确定要删除当前章节的组卷信息嘛？')){
                            this.selectView.splice(i,1);
                            this.initSelect();
                            this.knowledgeId = []
                        }
                        else{

                        }*/
                        return true
                    }
                });
                if(!flag){
                    this.$alert('当前章节组卷信息未保存','提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                }
            }
        },
        components : {
            myTitle
        },
        watch : {
            chapterId(cur,old){
                // console.log(cur + '---------'+old)
                var flag = false
                this.selectView.some(item=>{
                    if(item.chapterId === cur){
                        flag = true
                        this.getSelectInfo(cur)
                        return true
                    }
                })
                this.infoList.some(item=>{
                    if(item.id === cur){
                        this.knowledgeList = item.knowledges;
                        // this.knowledgeId = this.knowledgeList[0].knowledgeId
                        return true
                    }
                })
                if(!flag){
                    this.knowledgeId = []
                    this.initSelect();
                }
            },
            select : {
                handler(cur,old){
                    var score = 0;
                    var paperNumber = [0,0,0,0]
                    this.selectView.forEach(item=>{
                        if(item.chapterId != this.chapterId){
                            score += item.totalScore
                            item.selectInfo.forEach((i,j)=>{
                                paperNumber[j] += i.number
                            })
                        }
                    })
                    cur.forEach((item,i)=>{
                        score += item.number * item.score
                        paperNumber[i] += item.number
                    })
                    this.totalScore = score
                    this.paperNumber = paperNumber.slice()
                },
                deep : true
            },
            selectView : {
                handler(cur,old){
                    var score = 0;
                    cur.forEach(item=>{
                        score += item.totalScore
                    })
                    this.totalScore = score
                }
            }
        }
    }
</script>
<style lang="scss" scoped>
    .manual-container{
        p{
            font-size: 16px;
            margin-left: 30px;
        }
        .manual-score{
            color: red;
            font-weight: bold;
            font-size: 16px;
            letter-spacing: 2px;
            padding-left: 5%;
            margin: 20px 0;
            span{
                margin: 0 15px;
            }
        }
        .manual-group{
            padding: 15px 15px;
            label{
                font-size: 16px;
            }
            select{
                width: 260px;
                -webkit-appearance: menulist;
            }
            input[type='text']{
                width: 260px;
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
        }
        .manual-button{
            padding-left: 51%;
            margin: 15px 0;
            button{
                width: 110px;
                height: 40px;
                margin: 0 15px;
            }
        }
        .manual-view{
            padding: 15px 15px;
            .manual-select{
                padding-left: 30px;
                button {
                    margin: 0 3px;
                }
            }
        }
    }
</style>