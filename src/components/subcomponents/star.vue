<template>
      <div>
         <div class="star">
           <div class="starXin" v-for="(item,index) in list" :key='index'>
                <div @mouseenter="setStar(index)">
                            <img :src="xing>index?stara:starb"/>
                        </div>
           </div>
            
         </div>
      
      </div>
</template>

<script>
    export default {
        name: "",
        data() {
            return {
                list:[0,1,2,3,4],
                stara:'../src/images/star_on.png',//亮星星
                starb:'../src/images/star_off.png',//暗星星
                xing:0
            }
        },
        //方法
        methods: {
            setStar(val){
                this.xing = val+1
                this.$emit('getDifficulty',this.xing)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .star{
        width: 90%;
        height: auto;
        margin: 0 auto;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .starXin{
            height: auto;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            line-height: 20px;
            div{
                margin-left:15px;
            }
        }
        img{
            width: 23px;
            height: 23px;
        }
    }

</style>