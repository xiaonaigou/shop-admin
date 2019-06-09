<template>
<div class="crumbs">
    <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item,index) in info" :key="index">
            {{ item }}
        </el-breadcrumb-item>
    </el-breadcrumb>
</div>
</template>

<script>
export default {
    data(){
        return {
            info: []
        }
    },

    // 获取meta信息
    watch: {
        $route(){
            // 获取到matched的每一项meta信息
            // const arr = this.$route.matched;
            // let info = [];

            // arr.forEach(v =>{
            //     info.push(v.meta)
            // });

            // this.info = info;
            this.getRoute();
        }
    },

    methods:{
        // 保存meta信息
        getRoute(){
            // 获取到matched的每一项meta信息
            const arr = this.$route.matched;
            let info = [];

            arr.forEach(v =>{
                info.push(v.meta)
            });

            this.info = info;
        }
    },

    mounted(){
        // console.log(this);
        // 组件加载完成后获取meta信息
        this.getRoute();
    }
}
</script>

<style scoped>
    .crumbs{
        padding-bottom:10px;
        margin-bottom:18px;
        border-bottom:1px solid #ddd;
    }
</style>
