import Vue from 'vue'
import App from './App.vue'
import axios from "axios"
import VueRouter from "vue-router"

// element: 1.导入组件
import ElementUI from "element-ui"
//element样式
import 'element-ui/lib/theme-chalk/index.css';

// 导入组件
import Login from "./pages/Login.vue";

// element: 2. 注册element插件
Vue.use(ElementUI);

// 注册路由
Vue.use(VueRouter);

// 配置路由
const routes = [
  { path:"/login",component: Login }
];

// 路由实例
const router = new VueRouter({ routes });

Vue.config.productionTip = false;

//绑定到原型
Vue.prototype.$axios = axios;

new Vue({
  render: h => h(App),
  // 挂载路由
  router
}).$mount('#app') //$mount绑定控制区域,相当于el
