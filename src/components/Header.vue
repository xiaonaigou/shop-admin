<template>
    <div>
        <!-- el-row是布局组件
        type="flex"声明是flex布局,并且带有降级方案
        (如果浏览器不支持flex,会自动调用其他布局方式) -->
        <el-row type="flex" justify="space-between">
            <div class="arrow" @click="handleClick">
                <i class="el-icon-back"></i>
            </div>
            <div>
                {{user.uname}} {{user.realname}} 
                <span class="loginout" @click="handleLogout">退出</span>
            </div>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            user:{}
        }
    },
    methods:{
        handleClick(){
            this.$emit("click")
        },
        // 退出登录
        handleLogout(){
            // 调用退出的接口
            this.$axios({
                method:"GET",
                url:" http://localhost:8899/admin/account/logout",
                // 处理session跨域
                withCredentials: true
            }).then(res=>{
                const { status,message } = res.data;

                if( status===0 ){
                    this.$message.success(message);

                    //跳转到登录页
                    this.$router.push("/login")
                    // 清除本地的用户数据
                    localStorage.removeItem("user");
                }
            })
        }
    },
    mounted(){
        // 读取vuex的store数据
        this.user = this.$store.state.user;

        // this.$store.state.user = 123;  不支持这种写法
    }
}
</script>

<style scoped>
.arrow{
    font-size: 24px;
    cursor: pointer;
}
.loginout{
    cursor: pointer;
}
</style>
