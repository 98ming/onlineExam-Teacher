<template>
    <div class="paperInfo-container">
        <div class="paper-title">
            <!--<span>试卷编号：{{paperInfo.id}}</span>-->
            <span>试卷标题：{{paperInfo.name}}</span>
            <!--<span>出卷教师：{{paperInfo.paper_teacher}}</span>-->
            <span>出卷教师：李华玲</span>
            <span>出卷时间：{{paperInfo.create_time | dateFormat}}</span>
        </div>
        <div class="paper-info" v-for="(item,i) in paperInfo.questions" :key="item.id">
            <p>{{i+1}}.&nbsp;{{item.content}}</p>
            <div v-if="item.option">
                <p >A:{{item.option.option1}}</p>
                <p >B:{{item.option.option2}}</p>
                <p >C:{{item.option.option3}}</p>
                <p v-if="item.option.option4">D:{{item.option.option4}}</p>
                <p v-if="item.option.option5">E:{{item.option.option5}}</p>
                <p v-if="item.option.option6">F:{{item.option.option6}}</p>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return{}
        },
        props : ['paperInfo']
    }
</script>
<style lang="scss">
    .paperInfo-container{
        padding: 15px 15px;
        .paper-title{
            font-size: 16px;
            font-weight: bold;
            span{
                letter-spacing: 2px;
                margin: 5px 10px;
            }
        }
        .paper-info{
            margin: 15px 0;
        }
    }
</style>