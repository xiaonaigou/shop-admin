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
import Admin from "./pages/Admin.vue";
import GoodsList from "./pages/GoodsList.vue";
import CategoryList from "./pages/CategoryList.vue";
import GoodsAdd from "./pages/GoodsAdd.vue";
import GoodsEdit from "./pages/GoodsEdit.vue";

// element: 2. 注册element插件
Vue.use(ElementUI);

// 注册路由
Vue.use(VueRouter);

// 配置路由
const routes = [
  { 
    path:"/", 
    redirect: "/admin/goods-list",
    meta:"首页" 
  },
  { 
    path:"/login",
    component: Login, 
    meta:"登录" 
  },
  { 
    path:"/admin",
    component: Admin, 
    meta:"后台管理", 
    children: [
      { 
        path:"goods-list",
        component: GoodsList, 
        meta:"商品列表" 
      },
      { 
        path:"category-list",
        component: CategoryList, 
        meta:"栏目列表" 
      },
      { 
        path:"goods-add",
        component: GoodsAdd, 
        meta:"新增商品" 
      },
      { 
        // 注意使用动态id
        path:"goods-edit/:id",
        component: GoodsEdit, 
        meta:"编辑商品" 
      }
  ]}
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
