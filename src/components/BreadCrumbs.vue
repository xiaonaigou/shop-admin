<template>
<div class="crumbs">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">后台管理</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">商品列表</el-breadcrumb-item>
    </el-breadcrumb>
</div>
</template>

<script>
export default {

}
</script>

<style>
    .crumbs{
        padding-bottom:10px;
        border-bottom:1px solid #ddd;
    }
</style>
