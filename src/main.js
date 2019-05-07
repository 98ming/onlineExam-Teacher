// 入口文件
import Vue from 'vue'
Vue.config.devtools = true;
// 导入路由的包
import VueRouter from 'vue-router'
// 安装路由
Vue.use(VueRouter)
// 导入 vue-resource
import VueResource from 'vue-resource'
// 安装 vue-resource
Vue.use(VueResource)
// 导入 ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
// 导入 vuex
import Vuex from 'vuex'
// 安装 vuex
Vue.use(Vuex)
// new Vuex.store() 实例，得到一个数据仓储对象

var course = JSON.parse(localStorage.getItem('course')) || ''
var user = JSON.parse(localStorage.getItem('user')) || []

var store = new Vuex.Store({
    state : {
        groupPaperId : course.id,
        groupPaperName : course.name,
        groupQuestionId : '',
        userInfo:user
    },
    mutations : {
        setGroupPaper(state,groupPaperInfo){
            state.groupPaperId = parseInt(groupPaperInfo.id)
            state.groupPaperName = groupPaperInfo.name
            localStorage.setItem('course',JSON.stringify(groupPaperInfo))
        },
        setGroupQuestionId(state,id){
            state.groupQuestionId = id
        },
        setUser(state,user){
            state.userInfo = user
            localStorage.setItem('user',JSON.stringify(user))
        }
    },
    getters : {
        getGroupPaperID(state){
            return state.groupPaperId
        },
        getGroupPaperName(state){
            return state.groupPaperName
        }
        // 经过回顾对比，发现 getters 中的方法，和组件中的过滤器比较类似，因为，过滤器和 getters 都没有
        // 修改原数据，都是把原数据做了一层包装，提供给了调用者
        // 其次， getters 也和 computed 比较像，只要 state 中的数据发生了变化，那么，如果 getters 正好也
        // 引用了这个数据，那么，就会立即触发 getters 的重新求值；
    }
})
// vuex总结：
// 1.state 中的数据，不能直接修改，如果想要修改，必须通过 mutations
// 2.如果组件想要直接从 state 上获取数据；需要使用 this.$store.state.***
// 3.如果组件想要修改数据，必须使用 mutations 提供的方法，需要通过 this.$store.commit('方法名'，唯一的参数)
// 4.如果 store 中 state 上的数据，在对外提供的时候，需要做一层包装，那么，推荐使用 getters，如果需要
// 使用 getters ，则用 this.$store.getters.***


// 设置请求根路径
Vue.http.options.root='http://192.168.1.107:8080/'
// 全局设置 post 时候表单数据格式组织形式
Vue.http.options.emulateJSON = true

// 安装图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

// 导入格式化时间插件
import moment from 'moment'
// 设置全局时间过滤器
Vue.filter('dateFormat',function (dataStr,pattern="YYYY-MM-DD HH:mm:ss") {
    return moment(dataStr).format(pattern)
})

// 导入 App 跟组件
import app from './app.vue'

// 导入 MUI 的样式
import './lib/mui/dist/css/mui.css'
import './lib/mui/dist/css/icons-extra.css'

// 导入 jquery
import $ from 'jquery'



// 导入 Bootstrap 样式
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'


// 按需导入 Mint-UI 中的组件
// import {  } from 'mint-ui'

// 按需导入 Element UI 中的组件
/*import {DatePicker} from 'element-ui'
Vue.component(DatePicker.name , DatePicker)*/

// 导入自己的 router.js 模块
import router from './router.js'

var vm = new Vue({
    el : '#app',
    render : c => c(app),
    router ,// 挂载路由对象到 vm 实例上
    store   // 将 数据仓库挂载到 vm 实例，只要挂载到了 vm 上，任何组件都能使用 store 存取数据
})
