<template>
    <el-container>

        <el-aside width="auto">
            <!-- 菜单栏组件,isCollapse是否展开 -->
            <Aside :isCollapse="isCollapse"></Aside>
        </el-aside>

        <el-container>
            <el-header>
                <!-- 渲染头部组件 -->
                <Header @click="handleChangeShow"></Header>
            </el-header>
            <el-main>
                <!-- 面包屑 -->
                <BreadCrumbs></BreadCrumbs>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
// 导入头部组件
import Header from "../components/Header";
import Aside from "../components/Aside";
import BreadCrumbs from "../components/BreadCrumbs";

export default {
    data() {
      return {
        // 控制菜单的展开收起
        isCollapse: false
      };
    },

    // 注册组件
    components:{
        Header,
        Aside,
        BreadCrumbs
    },
    
    methods:{
        // 修改isCollapse事件
        handleChangeShow(){
            this.isCollapse = !this.isCollapse;
        }
    }

}
</script>

<style>
.el-header, .el-footer {
    /* background-color: #B3C0D1; */
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /* text-align: center;
    line-height: 160px; */
  }
  
  body > div > .el-container {
    width:100%;
    position: absolute;
    top:0;
    bottom:0;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
