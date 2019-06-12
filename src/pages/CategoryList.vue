<template>
    <div>
        <div class="custom-tree-container">
            <div class="block">
                <!-- data 组件接收的数据 -->
                <!-- show-checkbox 是否显示选择框 -->
                <!-- node-key 类似for循环的key -->
                <!-- default-expand-all 默认展开全部 -->
                <!-- expand-on-click-node 是否在点击节点的时候展开或者收缩节点 -->
                <el-tree
                :data="data"
                show-checkbox
                node-key="id"
                default-expand-all
                :expand-on-click-node="false">
                <!-- { node, data } 相当于 const { node,data } scope -->
                <!-- scope.data/scope.node 代表每一行的数据对象 -->
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ data.title }}</span>
                    <span>
                        <input 
                        :value="data.sort_id"
                        @blur="handleBlur($event,data)">
                    </span>
                    <span>
                    <el-button
                        type="text"
                        size="mini">
                        编辑
                    </el-button>
                    </span>
                </span>
                </el-tree>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
    //   const data = [];
      return {
        data: []
      }
    },

    methods: {
        handleBlur(data){
            // 如果修改的值没变化--return
            if(data.sort_id == event.target.value) { 
                return;
            }

            // 弹窗询问是否编辑
            var res = window.confirm("是否确认编辑?");

            // 确定
            if(res){
                this.$axios({
                    method:"POST",
                    url:" http://localhost:8899/admin/category/edit/" + data.category_id,
                    data:{
                        ...data,
                        sort_id: event.target.value
                    },
                    // 处理session跨域
                    withCredentials: true
                }).then(res=>{
                    this.getlist();
                    this.$message.success("修改成功");
                })
            }
        },

         getlist(){
            // 请求分类数据
            this.$axios({
                method:"GET",
                url:" http://localhost:8899/admin/category/getlist/goods"
            }).then(res=>{
                console.log(res);
                const { status,message } = res.data;

                if(status===0){
                    // 把列表数据赋值给data,渲染到el-tree
                    this.data = message;
                }
            })
        },
    },

    mounted(){
        this.getlist();
    }
}
</script>

<style scoped>
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
  }
</style>
