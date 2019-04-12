<template>
    <div class="app-container">
        <!--  顶部 Head 区域   -->
        <nav class="navbar navbar-default navbar-fixed-top">
            <div id="nav">
                <!--logo-->
                <div id="logo">
                    <router-link to="/home">
                        <img src="../images/logo.jpg" width="100%">
                    </router-link>
                </div>
                <!--顶部导航栏-->
                <div id="top_nav">
                    <div class="row ">
                        <div class="col-md-2">
                            <a>首页</a>
                        </div>
                        <div class="col-md-3">
                            <a class="index-active">在线测评</a>
                        </div>
                        <div class="col-md-2">
                            <a>博客</a>
                        </div>
                        <div class="col-md-3">
                            <a>新工科介绍</a>
                        </div>
                        <div class="col-md-2">
                            <a>关于我们</a>
                        </div>
                    </div>
                </div>
                <!--右侧登录-->
                <div id="right_nav">
                    <img src="../images/touxiang.jpg" width="30%" class="img-circle">
                </div>
            </div>
        </nav>

        <!--  中间 路由 区域  -->
        <div class="row">
            <div class="col-md-2">
                <div class="router-link">
                    <ul class="nav nav-pills nav-stacked">
                        <router-link tag="li" to="/updateMyInfo" class="ripple">
                            <a>修改个人信息</a>
                        </router-link>
                        <router-link tag="li" to="/groupPaper" class="ripple">
                            <a>组卷管理</a>
                        </router-link>
                        <router-link tag="li" to="/checkPaper" class="ripple">
                            <a>查看试卷</a>
                        </router-link>
                        <router-link tag="li" to="/releasePaper" class="ripple">
                            <a>发布试卷</a>
                        </router-link>
                        <router-link tag="li" to="/correctPaper" class="ripple">
                            <a>批改试卷</a>
                        </router-link>
                        <router-link tag="li" to="/uploadPaper" class="ripple">
                            <a>上传试题</a>
                        </router-link>
                        <router-link tag="li" to="/releaseAnnouncement" class="ripple">
                            <a>公告发布</a>
                        </router-link>
                        <router-link tag="li" to="/checkResults" class="ripple">
                            <a>查看成绩详情</a>
                        </router-link>
                        <router-link tag="li" to="/myLetter" class="ripple">
                            <a>我的私信</a>
                        </router-link>
                        <router-link tag="li" to="/rePassword" class="ripple">
                            <a>修改密码</a>
                        </router-link>
                        <router-link tag="li" to="/warningInformation" class="ripple">
                            <a>发布预警信息</a>
                        </router-link>
                    </ul>
                </div>
            </div>
            <div class="col-md-10">
                <div class="router-view">
                    <transition>
                        <router-view></router-view>
                    </transition>
                </div>
            </div>
        </div>

        <!--  底部 联系我们 区域  -->
        <!--<div id="footer">
            <div class="QR_code">
                <img src="./images/trouble.png" width="100%">
            </div>
            <div class="encourage">
                <h3><b>昨晚多几分钟的准备，今天少几个小时的麻烦！</b></h3>
            </div>
            <div class="callus">
                <div class="aboutus">
                    <a href="#"><h4>关于我们</h4></a>
                    <a href="#"><h4>意见反馈</h4></a>
                    <a href="#"><h4>友情链接</h4></a>
                </div>
                <div class="contactus">
                    <h4><b>联系电话：</b></h4>
                    <h4><b>155xxxxxxxx</b></h4>
                    <h4><b>邮箱：</b></h4>
                    <h4><b>alter_ming@foxmail.com</b></h4>
                </div>
            </div>
        </div>-->
    </div>
</template>

<script>
    export default {
        data(){
            return{

            }
        },
        methods:{

        }
    }
</script>

<style lang="scss" scoped>
    .app-container{
        align-items: center;
        #nav {
            width: 100%;
            height: 80px;
            background: white;
        }
        #logo{
            position: relative;
            width: 150px;
            height: 75px;
            /*border: 1px red solid;*/
            left: 5%;
            top: 5px;
            float: left;
            padding-top: 9px;
        }
        /*顶部导航栏*/
        #top_nav{
            position: relative;
            width: 600px;
            height: 75px;
            /*border: 1px white solid;*/
            left: 18%;
            top: 5px;
            float: left;
            padding-top: 26px;
            font-size: 18px;
            .index-active{
                border-bottom: 2px #1ebf9b solid;
            }
            a{
                text-decoration: none;
            }
        }
        /*nav的右侧登录*/
        #right_nav{
            position: relative;
            width: 250px;
            height: 75px;
            /*border: 1px red solid;*/
            left: 30%;
            top: 5px;
            float: left;
            padding-top: 7px;
            font-size: 18px;
            padding-left: 40px;
        }
        /*展示图片*/
        #show_photo{
            position: relative;
            width: 100%;
            height:500px;
            /*border: 1px red solid;*/
            top: 90px;
        }
        /*尾部导航栏*/
        #footer {
            width: 100%;
            height: 250px;
            background: #2a2f35;
            /*border: 1px red solid;*/
            padding-top: 45px;
            padding-left: 100px;
            color: white;
        }
        /*二维码*/
        .QR_code{
            width: 150px;
            height: 150px;
            /*border: 1px black solid;*/
            float: left;
        }
        /*激励标语*/
        .encourage{
            width: 550px;
            height: 150px;
            margin-left: 50px;
            /*border: 1px black solid;*/
            float: left;
            padding-top: 42px;
            padding-left: 27px;
        }
        /*联系我们*/
        .callus{
            width: 350px;
            height: 150px;
            margin-left: 100px;
            /*border: 1px black solid;*/
            float: left;

        }
        /*关于我们*/
        .aboutus{
            width: 30%;
            height: 80%;
            /*border: 1px black solid;*/
            margin-top: 15px;
            margin-left: 15px;
            padding-top: 15px;
            padding-left: 15px;
            float: left;
        }
        /*联系方式*/
        .contactus{
            width: 55%;
            height: 80%;
            /*border: 1px black solid;*/
            margin-top: 15px;
            margin-left: 15px;
            float: right;
            padding-left: 15px;
        }
        .col-md-2,col-md-10{
            padding: 0 10px;
        }
        .router-link{
            a{
                color: black;
            }
            position: fixed;
            top: 85px;
            width: 200px;
            left: 10px;
            box-shadow: 0 0 8px #cccccc;
            font-size: 15px;
            line-height: 25px;
            li:hover{
                cursor: pointer;
                transform: translate(0,-5px);
            }
            .ripple {
                position: relative;
                //隐藏溢出的径向渐变背景
                overflow: hidden;
            }

            .ripple:after {
                content: "";
                display: block;
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                pointer-events: none;
                //设置径向渐变
                background-image: radial-gradient(circle, #666 10%, transparent 10.01%);
                background-repeat: no-repeat;
                background-position: 50%;
                transform: scale(10, 10);
                opacity: 0;
                transition: transform .3s, opacity .5s;
            }
            .router-link-active{
                background-color: #EDEDED;
                a{
                    color: #2196f3;
                }
            }
            .ripple:active:after {
                transform: scale(0, 0);
                opacity: .3;
                //设置初始状态
                transition: 0s;
            }
        }
        .router-view{
            background-color: #F7F7F7;
            box-shadow: 0 0 8px #cccccc;
            margin-top: 85px;
            margin-bottom: 10px;
            padding: 5px 10px;
            width: 1100px;
            min-height: 520px;
        }
        .v-enter{
            opacity: 0;
            transform: translateY(100%);
        }
        .v-leave-to{
            opacity: 0;
            transform: translateY(-100%);
            position: absolute;
        }
        .v-enter-active,.v-leave-active{
            transition: all 0.5s ease;
        }
    }
</style>