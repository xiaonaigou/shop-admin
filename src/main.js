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

// 导入vuex的store
// import store from "/store/index.js";  下面默认简写
import store from "./store";

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

// 权限管理
// to: 去哪个页面
// from: 页面来源
// next: 接收参数是url,并且可以跳转到该url
// next()方法必须调用
router.beforeEach((to,from,next)=>{
  // 判断是否登录
  axios({
    method:"GET",
    url:"http://localhost:8899/admin/account/islogin",
    // 处理session跨域
    withCredentials: true
  }).then(res=>{
    const {code} = res.data;
    // 访问登录页
    if(to.path === "/login"){

      // 已登录
      if(code === "logined"){
        next("/admin/goods-list")
      }else{
        // 未登录
        next();
      }

    }else{
      // 访问未登录页

      // 已登录
      if(code === "logined"){
        next();
      }else{
        // 未登录
        next("/login");
      }
    }
  })
  // console.log(to,from);
});

Vue.config.productionTip = false;

//绑定到原型
Vue.prototype.$axios = axios;

new Vue({
  render: h => h(App),
  // 挂载路由
  router,

  // 仓库对象
  store,
}).$mount('#app') //$mount绑定控制区域,相当于el
