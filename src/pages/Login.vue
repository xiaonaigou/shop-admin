<template>
    <!-- el-form是表单组件 -->
    <!-- ref 可以操作dom -->
    <!-- model 当前表单数据 -->
    <!-- rules 表单的校验规则 -->
    <div class="form-wrapper">
        <el-form class="form" ref="form" :model="form" :rules="rules" label-width="80px">
            
        <el-form-item label="账号">
            <el-input v-model="form.username" prop="username" ></el-input>
        </el-form-item>

        <el-form-item label="密码">
            <el-input type="password" v-model="form.password" prop="password"></el-input>
        </el-form-item>
        
        <el-form-item class="login">
            <el-button type="primary" @click="onSubmit" >登录</el-button>
            <el-button>取消</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>
<script>
  export default {
    data() {
      return {
          // 表单数据
        form: {
          username:"",
          password:""
        },
        // 表单规则
        rules:{
            username: [
                // require 必须要输入,message提示信息,trigger失去焦点时触发
            { required: true, message: '请输入账号', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'change' }
            ]
        }
      }
    },
    methods: {
      // 登录事件,提交账密到服务器
      onSubmit() {
        // 提交到后台的数据
        const data = {
            uname:this.form.username,
            upwd:this.form.password
        }

        // 如果表单验证不通过,不提交表单
        this.$refs.form.validate((valid)=>{
            if(valid){
                //调用axios
                this.$axios({
                    url:"http://localhost:8899/admin/account/login",
                    // 请求方式
                    method:"POST",
                    // 数据
                    data,
                    // 处理session跨域
                    withCredentials: true
                }).then(res=>{
                    // 解构赋值
                    const { message, status } = res.data;

                    // $store下的方法commit设置仓库的数据
                    // commit方法调用仓库中mutations的方法，第一个参数是方法名
                    // 第二个参数就是传递的数据对象
                    this.$store.commit("setUser",message);

                    // 登录成功
                    if( status===0 ){
                        this.$router.push("/")
                    }
                    // 登录失败
                    if( status===1 ){
                        this.$message.error(message);
                    }
                })
            }
        });
      }
    }
  }
</script>

<style scoped>
.form-wrapper{
    width:100%;
    /* background: #999; */
    position: absolute;
    top:0;
    bottom:0;
}

.form{
    width:500px;
    position: absolute;
    left:50%;
    margin-left:-250px;
    top:50%;
    margin-top:-93px;
}

.login{
    margin-left:-155px;
    position: absolute;
    left:50%;
}
</style>
