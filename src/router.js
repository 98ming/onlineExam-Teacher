import Vue from 'vue'
// 1. 导入 vue-router 包
import VueRouter from 'vue-router'
// 2. 手动安装 VueRouter
Vue.use(VueRouter)

// 导入对应的路由组件
import login from './components/login.vue'
import home from './components/bar/home.vue'
import index from './components/index.vue'
import updateMyInfo from './components/bar/updateMyInfo.vue'
import groupPaper from './components/bar/groupPaper.vue'
import releasePaper from './components/bar/releasePaper.vue'
import checkPaper from './components/bar/checkPaper.vue'
import correctPaper from './components/bar/correctPaper.vue'
import uploadPaper from './components/bar/uploadPaper.vue'
import releaseAnnouncement from './components/bar/releaseAnnouncement.vue'
import checkResults from './components/bar/checkResults.vue'
import myLetter from './components/bar/myLetter.vue'
import rePassword from './components/bar/rePassword.vue'
import warningInformation from './components/bar/warningInformation.vue'
import autoGroupPaper from './components/groupPaper/auto.vue'
import manualGroupPaper from './components/groupPaper/manual.vue'
import chapterAutoGroupPaper from './components/groupPaper/chapter.vue'
import chapterPaper from './components/groupPaper/autoPaperView.vue'
import manualPaperView from './components/groupPaper/manualPaperView.vue'
//3. 创建路由对象
var router = new VueRouter({
    routes : [
        {path : '/' , redirect: '/login'},
        {path : '/login' ,name: 'login' , component : login},
        {path : '/index' , component : index,children: [
                {path : '/home' , component: home},
                {path : '/updateMyInfo' , component: updateMyInfo},
                {path : '/groupPaper' , component : groupPaper },
                {path : '/checkPaper' , component : checkPaper},
                {path : '/releasePaper' , component : releasePaper},
                {path : '/correctPaper' , component : correctPaper},
                {path : '/uploadPaper' , component : uploadPaper},
                {path : '/releaseAnnouncement' , component : releaseAnnouncement},
                {path : '/checkResults' , component : checkResults},
                {path : '/myLetter' , component : myLetter},
                {path : '/rePassword' , component : rePassword},
                {path : '/warningInformation' , component : warningInformation},
                {path : '/groupPaper/auto',
                    component : autoGroupPaper,
                    name : '/autoGroupPaper' ,
                    redirect : '/groupPaper/auto/chapter',
                    children : [
                        {path : 'chapter' ,component : chapterAutoGroupPaper , name : 'chapter'},
                        {path : 'end' ,component : chapterPaper , name : 'endPaper'},
                        {path : 'chapter/chapterPaper' ,component : chapterPaper , name : 'chapterPaper'},
                    ]
                },
                {path : '/groupPaper/manual',component : manualGroupPaper,name : '/manualGroupPaper'},
                {path : '/groupPaper/manual/manualPaper',component : manualPaperView,name : 'manualPaper'}
            ]},

    ],
    // linkActiveClass : '' // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
})
export default router