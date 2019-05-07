<template>
    <div class="app-container">
        <!--  顶部 Head 区域   -->
        <!--<nav class="navbar navbar-default navbar-fixed-top">
            <div id="nav">
                &lt;!&ndash;logo&ndash;&gt;
                <div id="logo">
                    <router-link to="/home">
                        <img src="../images/logo.jpg" width="100%">
                    </router-link>
                </div>
                &lt;!&ndash;顶部导航栏&ndash;&gt;
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
                &lt;!&ndash;右侧登录&ndash;&gt;
                <div id="right_nav">
                    <img src="../images/touxiang.jpg" width="30%" class="img-circle">
                </div>
            </div>
        </nav>-->
        <el-menu
            class="el-menu-demo"
            mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item index="1"><img src="../images/logo.jpg"  style="height: 100%"/></el-menu-item>
            <el-submenu index="2">
                <template slot="title">个人中心</template>
                <el-menu-item index="2-1">我的信息</el-menu-item>
                <el-menu-item index="2-2">我的课程</el-menu-item>
                <el-menu-item index="2-3">我的班级</el-menu-item>
                <el-menu-item index="2-4">修改密码</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">消息中心</el-menu-item>
            <el-menu-item>
                <!--<el-input
                        size="medium"
                        placeholder="请输入学生学号或姓名"
                        prefix-icon="el-icon-search"
                        clearable
                        v-model="input">
                </el-input>-->
                <div data-v-6efe4612="" class="el-input el-input--suffix">
                    <input type="text" autocomplete="off" placeholder="请输入学生姓名或学号" class="el-input__inner" style="margin-bottom: 5px">
                    <span class="el-input__suffix">
                        <span class="el-input__suffix-inner">
                            <i data-v-6efe4612="" class="el-input__icon el-icon-search"></i>
                        </span>
                    </span>
                </div>
            </el-menu-item>
            <el-menu-item  style="float: right;margin-right: 30px"><img src="../images/touxiang.jpg" class="img-circle" style="height: 100%"></el-menu-item>
            <el-menu-item  style="float: right;margin-right: 30px"><img src="../images/star_off.png" class="img-circle" style="height: 100%"></el-menu-item>
            <el-menu-item  style="float: right;margin-right: 30px"><img src="../images/star_off.png" class="img-circle" style="height: 100%"></el-menu-item>
            <el-menu-item  style="float: right;margin-right: 30px"><img src="../images/star_off.png" class="img-circle" style="height: 100%"></el-menu-item>
    </el-menu>
        <!--  中间 路由 区域  -->
        <div class="row">
                <div class="router-link">
                    <el-radio-group v-model="isCollapse">
                        <el-radio-button :label="false">展开</el-radio-button>
                        <el-radio-button :label="true">收起</el-radio-button>
                    </el-radio-group>
                    <!--<div class="">
                        <span class="el-icon-caret-right" v-if="isCollapse" @click="show" style="background-color: #ccc"></span>
                        <span class="el-icon-caret-left" v-if="!isCollapse" @click="show" style="background-color: #ccc"></span>
                    </div>-->
                    <el-menu
                             default-active=""
                             class="el-menu-vertical-demo"
                             :collapse="isCollapse"
                             background-color="#545c64"
                             text-color="#fff"
                             active-text-color="#ffd04b"
                    >
                        <el-submenu index="1">
                            <template slot="title">
                                <i class="el-icon-s-data"></i>
                                <span>数据分析</span>
                            </template>
                            <el-menu-item-group>
                                <template slot="title">聚类</template>
                                <!--<el-menu-item index="1-1" @click="href('kmeans')">k-means</el-menu-item>-->
                                <el-menu-item index="1-1">
                                    <router-link to="/kmeans" tag="li">k-means</router-link>
                                </el-menu-item>
                                <el-menu-item index="1-6">
                                    <router-link to="/kmedoide" tag="li">k-medoide</router-link>
                                </el-menu-item>
                                <el-menu-item index="1-2">
                                    <router-link to="/DBSCAN" tag="li">DBSCAN</router-link>
                                </el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="关联规则">
                                <el-menu-item index="1-3">
                                    <router-link to="/apriori" tag="li">课程关联</router-link>
                                </el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group title="分类">
                                <el-menu-item index="1-4">
                                    <router-link to="/studentAnalyse" tag="li">学生预测</router-link>
                                </el-menu-item>
                                <el-menu-item index="1-5">
                                    <router-link to="/classAnalyse" tag="li">班级预测</router-link>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <!--<el-menu-item index="2" @click="href('groupPaper')">
                            <i class="el-icon-menu"></i>
                            <router-link to="/groupPaper" tag="span">
                                组卷管理
                            </router-link>
                        </el-menu-item>-->
                        <router-link to="/groupPaper" tag="li">
                            <el-menu-item index="2">
                                <i class="el-icon-menu"></i>
                                <span slot="title">组卷管理</span>
                            </el-menu-item>
                        </router-link>
                        <router-link to="/checkPaper" tag="li">
                            <el-menu-item index="3">
                                <i class="el-icon-document"></i>
                                <span slot="title">查看试卷</span>
                            </el-menu-item>
                        </router-link>
                        <router-link to="/releasePaper" tag="li">
                            <el-menu-item index="4" @click="href('releasePaper')">
                                <i class="el-icon-s-promotion"></i>
                                <span slot="title">发布试卷</span>
                            </el-menu-item>
                        </router-link>
                        <router-link to="correctPaper" tag="li">
                            <el-menu-item index="5" @click="href('correctPaper')">
                                <i class="el-icon-setting"></i>
                                <span slot="title">批改试卷</span>
                            </el-menu-item>
                        </router-link>
                        <router-link to="/uploadPaper" tag="li">
                            <el-menu-item index="6">
                                <i class="el-icon-setting"></i>
                                <span slot="title">上传试题</span>
                            </el-menu-item>
                        </router-link>
                        <router-link to="/releaseAnnouncement" tag="li">
                            <el-menu-item index="7">
                                <i class="el-icon-setting"></i>
                                <span slot="title">公告发布</span>
                            </el-menu-item>
                        </router-link>
                        <router-link to="/checkResults" tag="li">
                            <el-menu-item index="8">
                                <i class="el-icon-setting"></i>
                                <span slot="title">查看成绩详情</span>
                            </el-menu-item>
                        </router-link>
                        <router-link to="/myLetter" tag="li">
                            <el-menu-item index="9">
                                <i class="el-icon-setting"></i>
                                <span slot="title">我的私信</span>
                            </el-menu-item>
                        </router-link>
                        <router-link to="/rePassword" tag="li">
                            <el-menu-item index="10">
                                <i class="el-icon-setting"></i>
                                <span slot="title">修改密码</span>
                            </el-menu-item>
                        </router-link>
                        <router-link to="/updateMyInfo" tag="li">
                            <el-menu-item index="11">
                                <i class="el-icon-setting"></i>
                                <span slot="title">修改个人信息</span>
                            </el-menu-item>
                        </router-link>
                        <router-link to="/warningInformation" tag="li">
                            <el-menu-item index="12">
                                <i class="el-icon-setting"></i>
                                <span slot="title">发布预警信息</span>
                            </el-menu-item>
                        </router-link>
                    </el-menu>
                    <!--<ul class="nav nav-pills nav-stacked">
                        &lt;!&ndash;<router-link tag="li" to="/dataAnalyse" class="ripple">
                            <a>数据分析</a>
                        </router-link>&ndash;&gt;
                        <li class="ripple" @click="open">
                            <a >数据分析&nbsp;&nbsp;
                                <span class="glyphicon glyphicon-chevron-down" v-if="!show"></span>
                                <span class="glyphicon glyphicon-chevron-up" v-if="show"></span>
                            </a>
                        </li>
                        <router-link tag="li" to="/dataAnalyse" class="ripple" v-if="show">
                                <a>课程关联</a>
                        </router-link>
                        <router-link tag="li" to="/dataAnalyse" class="ripple" v-if="show">
                                <a>成绩预测</a>
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
                        <router-link tag="li" to="/updateMyInfo" class="ripple">
                            <a>修改个人信息</a>
                        </router-link>
                        <router-link tag="li" to="/warningInformation" class="ripple">
                            <a>发布预警信息</a>
                        </router-link>
                    </ul>-->
            </div>
            <div class="router-view">
                    <transition>
                        <router-view :key="key"></router-view>
                    </transition>
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
                isCollapse : false,
                input:''
            }
        },
        methods:{
            href(url){
                this.$router.push('/'+ url)
            },
            show(){
                this.isCollapse = !this.isCollapse
            }
        },
        computed:{
            key(){
                return this.$route.path + Math.random();
            }
        }
    }
</script>

<style lang="scss" scoped>
    .app-container{
        ul{
            margin-bottom: 5px;
        }
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

        .router-link{
            .el-icon-caret-right{
                font-size: 30px;
            }
            .el-icon-caret-left{
                font-size: 30px;
            }
            position: relative;
            //top: 85px;
            left:20px;
            float: left;
            /*width: 200px;
            left: 10px;
            box-shadow: 0 0 8px #cccccc;
            font-size: 15px;
            line-height: 25px;*/
            .el-menu-vertical-demo:not(.el-menu--collapse) {
                width: 200px;
                min-height: 400px;
            }
            /*li:hover{
                cursor: pointer;
                transform: translate(0,-5px);
            }*/
            /*.ripple {
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
            }*/
            .router-link-active{
                color: #ffd04b;
                span{
                    color: #ffd04b;
                }
                i{
                    color: #ffd04b;
                }
            }
            /*.ripple:active:after {
                transform: scale(0, 0);
                opacity: .3;
                //设置初始状态
                transition: 0s;
            }*/
        }
        .router-view{
            background-color: #F7F7F7;
            box-shadow: 0 0 8px #cccccc;
            margin-top: 45px;
            margin-bottom: 10px;
            margin-left: 50px;
            padding: 5px 10px;
            min-width: 1100px;
            min-height: 520px;
            float: left;
        }

        /*.v-enter{
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
        }*/
    }
</style>
