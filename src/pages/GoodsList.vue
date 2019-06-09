<template>
    <div>
        <el-row type="flex" justify="space-between">
            <!-- 按钮列表 -->
            <div>
                <el-button>新增</el-button>
                <el-button type="danger">批量删除</el-button>
            </div>

            <!-- 搜索输入框 -->
            <div class="input-search">
                <!-- 把值绑定到searchValue -->
                <el-input 
                placeholder="请输入内容" 
                class="input-with-select"
                v-model="searchValue">
                    <el-button slot="append" 
                    icon="el-icon-search"
                    @click="handleValue">
                    </el-button>
                </el-input>
            </div>
        </el-row>

        <!-- 商品列表的表格 -->
        <!-- data 表格数据 -->
        <!-- tooltip-effect 工具栏效果 -->
        <!-- selection-change 选择表格时就出发的事件 -->
        <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%; margin-top:20px"
        @selection-change="handleSelectionChange">

        <!-- type="selection"表格可以选择方块 -->
        <el-table-column
        type="selection"
        width="55">
        </el-table-column>

        <!-- label每一列的标题文字 -->
        <!-- width当前列的宽度 -->
        <el-table-column
        label="标题"
        width="500">
            <!-- 自定义模板 -->
            <!-- scope.row每一项数据的对象 -->
            <template slot-scope="scope">
                <el-row type="flex" align="middle">
                    <img :src="scope.row.imgurl" class="goods-img">
                    <div>
                        {{ scope.row.title }}
                    </div>
                </el-row>
            </template>
        </el-table-column>

        <!-- 显示数据的简写方式,
        指定prop属性自动读取每一项数据的prop值的属性 -->
        <el-table-column
        prop="categoryname"
        label="类型"
        width="120">
        </el-table-column>

        <el-table-column
        prop="sell_price"
        label="价格"
        width="120">
        </el-table-column>

        <!-- 操作栏 -->
        <el-table-column label="操作">
            <!-- 自定义模板 -->
            <template slot-scope="scope">
                <!-- 编辑事件 -->
                <el-button
                size="mini"
                @click="handleEdit(scope.row)">编辑</el-button>
                <!-- 删除单个商品 -->
                <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.row)">删除</el-button>
            </template>
        </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="block">
            <!-- size-change 显示条数切换 -->
            <!-- current-change 页数切换 -->
            <!-- current-page 当前页 -->
            <!-- page-sizes 条数下拉框 -->
            <!-- page-size 下拉框显示的当前条数 -->
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            :page-sizes="[5, 10, 15, 20]"
            :page-size="5"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
      return {
         tableData: [
            // {
            //     id: 103,        
            //     title: "骆驼男装2017秋季新款运动休闲纯色夹克青年宽松长袖针织开衫卫",
            //     is_top: 1,
            //     is_hot: 1,
            //     is_slide: 1,      
            //     categoryname: "男装",
            //     img_url: "/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
            //     imgurl:"http://139.199.192.48:6060/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
            //     goods_no: "NZ0000000002",
            //     stock_quantity: 200,
            //     market_price: 1000,
            //     sell_price: 800   
            // }
        ],
        pageSize:5,
        pageIndex:1,
        total:0,
        searchValue:""
      }
    },
    
    methods: {
        // 选择任一项时就触发
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },

        // 编辑商品
        handleEdit(goods){
            console.log(goods);
        },

        // 删除商品
        handleDelete(goods){
            console.log(goods);
        },

        //搜索
        handleValue(){
            this.getList()
        },

        // 显示条数的切换
        handleSizeChange(val){
            // console.log(`每页${val}条`);
            // console.log(val);
            this.pageSize = val;
            this.getList();
        },
        // 页数切换
        handleCurrentChange(val){
            // console.log(`当前页:${val}`);
            // 保存当前页面
            this.pageIndex = val
            // 重新发起请求
            this.getList()
        },

        // 封装getList()
        getList(){
            this.$axios({
                method:"GET",
                url:`http://localhost:8899/admin/goods/getlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&searchvalue=${this.searchValue}`
                }).then(res=>{
                    const data = res.data.message;
                    // 商品列表数据
                    this.tableData = data;
                    console.log(res);
                    // 总条数
                    this.total = res.data.totalcount
            })
        }
    },
    mounted(){
        this.getList()
    }
}
</script>

<style scoped>
  
  .block{
      margin-top:14px;
  }

  .el-select .el-input {
    width: 130px;
  }

  .input-with-select .el-input-group__prepend {
    background-color: #fff;
  }

  .input-search{
      width:200px;
  }
</style>
