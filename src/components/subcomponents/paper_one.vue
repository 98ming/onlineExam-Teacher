<template>
    <div class="container">
        <div class="paper-info panel panel-default" v-for="(item,i) in paper" :key="item.id">
            <div class="panel-body">
                <p>{{i+1}}.&nbsp;{{item.content}}</p>
                <div v-if="item.option">
                    <p>A:{{item.option.option1}}</p>
                    <p>B:{{item.option.option2}}</p>
                    <p>C:{{item.option.option3}}</p>
                    <p v-if="item.option.option4 != ' '">D:{{item.option.option4}}</p>
                </div>
                <div class="manual-button">
                    <button class="btn btn-info" @click="select(item.id,item.type)" v-if="status[i] == 0">选择试题</button>
                    <button class="btn btn-default" @click="drop(item.id,item.type)" v-if="status[i] == 1">已经选择</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                status : [],
                select_status : this.$props.state
            };
        },
        beforeUpdate(){
            // 传入id 渲染 是否选择过
            this.init()
        },
        methods: {
            init(){
                this.status = []
                this.$props.paper.forEach(item=>{
                    var flag = false
                    this.$props.state.some(j=>{
                        if(j == item.id){
                            flag = true
                            this.status.push(1)
                        }
                    })
                    if(!flag) this.status.push(0)
                })
            },
            select(id,type){
                var d = {id : id , type : type};
                this.$emit('select',d)
            },
            drop(id,type){
                var d = {id : id , type : type}
                this.$emit('drop',d)
            }
        },
        props : ['paper','state'],
        watch:{
            select_status(cur){
                this.init()
            }
        }
    }
</script>
<style lang="scss" scoped>
    .container{
        padding: 15px 15px;
        .paper-info{
            margin: 15px 0;
            p{
                font-size: 15px;
                font-weight: bold;
            }
        }
        .panel{
            width: 80%;
            .manual-button{
                padding-left: 85%;
                margin-top: 10px;
            }
        }
    }
</style>