// 导入vuex
import Vuex from "vuex";
import Vue from "vue";

// 注册插件
Vue.use(Vuex);

// 调用vuex创建一个仓库
const store = new Vuex.Store({
    // 数据位置
    state:{
        // user:{
        //     realname:"竹简",
        //     uid:334,
        //     uname:"扫把头"
        // }
        user:JSON.parse(localStorage.getItem("user")) || {}
    },

    // 设置仓库数据的方法
    mutations:{
        // 设置用户数据
        // statue是默认参数,所有mutations下的方法第一个参数都是statue
        // statue指向上面的仓库数据
        setUser(state,data){
            state.user = data;

            // 保存到本地
            localStorage.setItem("user",JSON.stringify(data));
        }
    }
});

export default store;