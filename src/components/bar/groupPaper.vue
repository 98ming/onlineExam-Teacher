<template>
    <div class="group-container">
        <my-title :img="'glyphicon glyphicon-retweet'" :info="'组卷管理'"></my-title>
        <div class="course">
            <div class="course-left">
                <span>选择组卷课程：</span>
            </div>
            <div class="course-right">
                <select class="form-control" v-model="course">
                    <option v-for="item in courseList" :key="item.id" :value="item.id">
                        {{item.name}}
                    </option>
                </select>
            </div>
        </div>
        <div class="method">
            选择组卷方式：
            <button class="btn btn-info" @click="GroupPaper(course,1)">系统组卷</button>
            <button class="btn btn-info" @click="GroupPaper(course,2)">手动组卷</button>
        </div>
    </div>
</template>

<script>
    import myTitle from '../subcomponents/title.vue'
    export default {
        data(){
          return{
              courseList : [],
              course : this.$store.getters.getGroupPaperID
          }
        },
        created(){
            this.getCourseList();
        },
        methods : {
            getCourseList(){
                this.$http.get('course/getCourse').then(result=>{
                    if(result.body.status === 200){
                        // console.log(result.body);
                        this.courseList = result.body.object
                    }
                })
            },
            GroupPaper(id,method){
                if (id === ''){
                    this.$alert('请选择需要组卷的课程','提示', {
                        confirmButtonText: '确定',
                        type: 'warning'
                    });
                    return
                }
                else{
                    var groupPaperInfo = {id : id , name : ''}
                    this.courseList.some(item=>{
                        if(item.id == id){
                            groupPaperInfo.name = item.name
                            return true
                        }
                    })
                    this.$store.commit('setGroupPaper',groupPaperInfo)
                    if(method === 1)
                        this.$router.push({name : '/autoGroupPaper'})
                    if(method === 2)
                        this.$router.push({name : '/manualGroupPaper'})
                }
            }
        },
        components : {
            myTitle
        }
    }
</script>
<style lang="scss" scoped>
    .group-container{
        font-size: 20px;
        .course{
            height: 150px;
            /*border: 1px black solid;*/
            padding: 15px 15px;
            display: flex;
            .course-right{
                width: 20%;
                /*border: 1px black solid;*/
            }
            .course-left{
                width: 14%;
                /*border: 1px black solid;*/
            }
        }
        .method{
            height: 250px;
            padding: 15px 15px;
            /*border: 1px black solid;*/
            button{
                width: 100px;
            }
        }
    }
</style>