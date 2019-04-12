<template>
    <div class="auto-container">
        <my-title :img="'glyphicon glyphicon-pencil'" :info="'系统组卷'"></my-title>
        <p><b>当前组卷课程：{{this.$store.getters.getGroupPaperName}}</b></p>
        <div class="groupPaper">
            <div class="groupPaper-left">
                <router-link to="/groupPaper/auto/chapter" tag="button">章节组卷</router-link>
                <router-link :to="{name : 'endPaper' ,
                    query : {courseId : this.$store.getters.getGroupPaperID ,
                        difficult : 0 ,
                        chapter : 0}}" tag="button">期末组卷</router-link>
            </div>
            <div class="groupPaper-right">
                <router-view :key="key"></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import myTitle from '../subcomponents/title.vue'
    export default {
        data() {
            return {

            };
        },
        methods : {
            endPaper(){
                this.$router.push()
            }
        },
        components : {
            myTitle
        },
        computed : {
            key(){
                return this.$route.path + Math.random();
            }
        }
    }
</script>
<style lang="scss">
    .auto-container{
        p{
            font-size: 16px;
            margin-left: 30px;
        }
        .groupPaper{
            display: flex;
            .groupPaper-left{
                /*border: 1px black solid;*/
                width: 30%;
                text-align: center;
                .router-link-active{
                    color: red;
                    box-shadow: 0 0 8px #cccccc;
                }
                button{
                    margin: 85px 85px;
                    font-size: 20px;
                    font-weight: bold;
                    width: 160px;
                }
            }
            .groupPaper-right{
                /*border: 1px black solid;*/
                width: 70%;
                box-shadow: 0 0 8px #cccccc;
            }
        }
    }
</style>