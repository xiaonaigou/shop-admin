<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";

export default {
  mounted(){

    //请求测试接口
    // axios({
    //   url:"https://api.github.com/users",
    //   method:"GET",
    //   // get请求参数
    //   params:{
    //     abb:334
    //   }
    // }).then(res =>{
    //   console.log(res);
    // })

    this.$axios({
      url:"https://api.github.com/users",
      method:"GET",
    }).then(res =>{
      console.log(res);
    })
  }
}
</script>

<style>
  *{
    margin: 0;
    padding: 0;
  }

  ul,li,ol{
    list-style: none;
  }

  a{
    color: #333;
  }

  /* 类似于span */
  i,em{
    font-style: normal;
  }
</style>
