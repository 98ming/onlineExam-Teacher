<template>
    <div class="release-container">
        <my-title :img="'glyphicon glyphicon-ok'" :info="'发布试卷'"></my-title>
        <form class="form-horizontal">
            <div class="form-group">
                <label class="col-sm-2 control-label">选择发布课程：</label>
                <div class="col-sm-3">
                    <select class="form-control" v-model="courseId">
                        <option :value="item.id" v-for="item in courseList" :key="item.id">{{item.name}}</option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">选择发布试卷：</label>
                <div class="col-sm-3">
                    <select class="form-control" v-model="paperId">
                        <option :value="item.id" v-for="item in paperList" :key="item.id">
                            {{item.id + '---' +item.name}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">选择发放班级：</label>
                <div class="col-sm-3">
                    <select class="form-control" v-model="classId">
                        <option :value="item.id" v-for="item in classList" :key="item.id">
                            {{item.name}}
                        </option>
                    </select>
                </div>
            </div>
            <div class="form-group">
                <label class="col-sm-2 control-label">选择开放时间：</label>
                <div class="col-sm-10">
                    <div class="block">
                        <el-radio v-model="radio" :label="0">
                            <el-date-picker
                                    v-model="value4"
                                    type="datetimerange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期">
                            </el-date-picker>
                        </el-radio>
                        <el-radio v-model="radio" :label="1" border>不限时</el-radio>
                    </div>
                </div>
            </div>
        </form>
        <el-row>
            <el-button type="success" @click="releasePaper">发布</el-button>
        </el-row>
    </div>
</template>

<script>
    import myTitle from '../subcomponents/title.vue'
    export default {
        data(){
            return {
                value4: [], // 发布时间
                radio : '', // 是否限时
                courseList : [], // 课程列表
                courseId : this.$store.getters.getGroupPaperID, // 优先组卷课程id
                classList : [], // 班级列表
                classId : '', // 班级id
                paperList : [], // 试卷信息列表
                paperId : this.$store.state.groupQuestionId,
                notifyPromise:Promise.resolve()
            }
        },
        created(){
            this.getInfoList();
            this.getPaperInfo(this.courseId)
        },
        methods : {
            sleep(numberMillis) {
                var now = new Date();
                var exitTime = now.getTime() + numberMillis;
                while (true) {
                    now = new Date();
                    if (now.getTime() > exitTime)
                        return true;
                }
            },
            releasePaper(){
                this.$confirm('确定要发布此套试卷吗？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    if(!this.validate()) return
                    var releaseInfo = {}
                    releaseInfo.paper_id = this.paperId;
                    releaseInfo.clazz_ids = []
                    if(this.classId == 0){
                        this.classList.forEach(item=>{
                            if(item.id != 0)
                                releaseInfo.clazz_ids.push(item.id)
                        })
                    }
                    else{
                        releaseInfo.clazz_ids.push(this.classId)
                    }
                    if(this.radio == 0){
                        releaseInfo.start_date = this.value4[0];
                        releaseInfo.end_date = this.value4[1];
                    }
                    else{
                        releaseInfo.start_date = '';
                        releaseInfo.end_date = '';
                    }
                    this.$http.post('paper/distribute',JSON.stringify(releaseInfo)).then(result=>{
                        if (result.body.status === 200){
                            if(result.body.object.length == 0){// 都发布成功
                                this.$message({
                                    type: 'success',
                                    message: '发布成功!'
                                });
                            }
                            else{
                                result.body.object.forEach(item=>{
                                    this.classList.some(j=>{
                                        if(j.id == item){
                                            this.notifyPromise = this.notifyPromise.then(this.$nextTick).then(()=>{
                                                this.$notify({
                                                    title: '警告',
                                                    message: j.name + '班试卷已经发布，不需要重新发布',
                                                    type: 'warning',
                                                    duration: 3000,
                                                    position: "bottom-right"
                                                });
                                            })
                                            return true;
                                        }
                                    })
                                })
                            }
                            // console.log(result.body.object)
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消发布'
                    });
                });
            },
            validate(){
                var flag = true
                if(this.courseId === ''){
                    flag = false
                    this.$alert('请选择需要发布的课程','提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                }
                if(this.paperId === ''){
                    flag = false
                    this.$alert('请选择需要发布的试卷','提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                }
                if(this.classId === ''){
                    flag = false
                    this.$alert('请选择需要发布的班级','提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                }
                if(this.radio === '' || (this.radio === 0 && this.value4 == false)){
                    flag = false
                    this.$alert('请选择发布时间','提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                }
                return flag
            },
            getInfoList(){
                this.$http.get('course/getCourse').then(result=>{
                    if(result.body.status === 200){
                        this.courseList = result.body.object;
                        // this.getPaperInfo(this.courseId)
                    }
                })

                this.$http.get('class/getClass').then(result=>{
                    if(result.body.status === 200){
                        this.classList = result.body.object;
                    }
                })
            },
            getPaperInfo(id){
                this.$http.post('paper/getPaperByCourse',JSON.stringify({id:id})).then(result=>{
                    if(result.body.status === 200){
                        this.paperList = result.body.object;
                    }
                })
            }
        },
        components : {
            myTitle
        },
        watch: {
            value4(cur,old){
                if(cur != false){
                    this.radio = 0
                }
            },
            radio(cur){
                if(cur == 1){
                    this.value4 = []
                }
            },
            courseId(cur){
                this.getPaperInfo(cur)
            }
        }
    }
</script>
<style lang="scss" scoped>
    .release-container{
        label{
            font-size: 16px;
        }
        select{
            -webkit-appearance: menulist;
        }
        .form-group{
            padding: 0 60px;
            margin-bottom: 30px;
        }
        .el-row{
            button{
                margin-left: 700px;
                width: 100px;
            }
        }
    }
</style>