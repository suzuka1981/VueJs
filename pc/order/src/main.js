import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

import axios from 'axios'

import * as echarts from 'echarts'

import VueCookies from 'vue-cookies'

Vue.use(VueCookies)


// import {estimateLabelUnionRect} from "echarts/types/src/coord/axisHelper";

// 引入china.js/world.js 是为了使地图显示出来；
// import "echarts/map/js/china.js"
// import "echarts/map/js/world.js"
Vue.prototype.$echarts = echarts;


//挂在包全局 配置默认路径
// axios.defaults.baseURL = 'http://127.0.0.1:18823/orderapi/'
axios.defaults.baseURL = 'http://localhost:18823/orderapi/'
// axios.defaults.baseURL = 'http://52.13.251.120/orderapi/'

//是否跨域 默认false
// axios.defaults.withCredentials = true

//全局拦截器
//每次提交后台，header添加token字段

axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})

//如果返回data为10010 跳转login
axios.interceptors.response.use(function (response) {
    if (response.data.meta.status === 10010) {
        window.sessionStorage.removeItem('token')
        router.replace({
            path: '/login'
        })
    }
    //更新token
    // else if (response.data.token) {
    //     window.sessionStorage.setItem('token', response.data.token)
    // }
    return response
}, function (error) {
    return Promise.reject(error)
},)

//  路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
    let ca = document.cookie.split(";");

    let resultcookie = null
    let usernameone= null
    let usernametwo= null
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == " ") c = c.substring(1);

        let name = 'token' + "=";
        if (c.indexOf(name) != -1) {
            resultcookie = c.substring(name.length, c.length);

            if (resultcookie) {
                window.sessionStorage.setItem('token', resultcookie)
            }
        }

        name = 'userid' + "=";
        if (c.indexOf(name) != -1) {
            resultcookie = c.substring(name.length, c.length);

            if (resultcookie) {
                window.sessionStorage.setItem('userid', decodeURIComponent(resultcookie))
            }
        }

        name = 'usernameone' + "=";
        if (c.indexOf(name) != -1) {
            resultcookie = c.substring(name.length, c.length);

            if (resultcookie) {
                usernameone = resultcookie
            }
        }

        name = 'usernametwo' + "=";
        if (c.indexOf(name) != -1) {
            resultcookie = c.substring(name.length, c.length);

            if (resultcookie) {
                usernametwo = resultcookie
            }
        }

        name = 'type' + "=";
        if (c.indexOf(name) != -1) {
            resultcookie = c.substring(name.length, c.length);

            if (resultcookie) {
                window.sessionStorage.setItem('type', resultcookie)
            }
        }

        name = 'code' + "=";
        if (c.indexOf(name) != -1) {
            resultcookie = c.substring(name.length, c.length);

            if (resultcookie) {
                window.sessionStorage.setItem('code', resultcookie)
            }
        }

        name = 'name' + "=";
        if (c.indexOf(name) != -1
            && c.indexOf('usernameone') == -1
            && c.indexOf('usernametwo') == -1
        ) {
            resultcookie = c.substring(name.length, c.length);

            if (resultcookie) {
                window.sessionStorage.setItem('name', resultcookie)
            }
        }

        name = 'tmpPath' + "=";
        if (c.indexOf(name) != -1
            && c.indexOf('usernameone') == -1
            && c.indexOf('usernametwo') == -1
        ) {
            resultcookie = c.substring(name.length, c.length);

            if (resultcookie) {
                window.sessionStorage.setItem('tmpPath', resultcookie)
            }
        }
    }

    if(usernametwo && usernameone) {
        window.sessionStorage.setItem('username', usernameone + '@' + usernametwo)
    }
    // if (tokencookie) {
    //     window.sessionStorage.setItem('token', tokencookie)
    //     window.sessionStorage.setItem('userid', tokencookie)
    //     window.sessionStorage.setItem('type', tokencookie)
    //     window.sessionStorage.setItem('code', tokencookie)
    //     window.sessionStorage.setItem('name', tokencookie)
    // }

    // console.log(to.matched);
    if (to.matched.some(record => record.meta.requireAuth)) {  // 判断该路由是否需要登录权限
        // console.log('Please login');
        if (window.sessionStorage.getItem('token')) {  // 判断当前的token是否存在 ； 登录存入的token
            next();
        } else {
            next({
                path: '/',
                // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    } else {
        next();
    }
});

Vue.prototype.$http = axios
Vue.config.productionTip = false

Vue.config.productionTip = false

//修改title
Vue.directive('title', {
    inserted: function (el, binding) {
        document.title = el.dataset.title
    }
})

new Vue({
    router,
    VueCookies,
    render: h => h(App)
}).$mount('#app')
