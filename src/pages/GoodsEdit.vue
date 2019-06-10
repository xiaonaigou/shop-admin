<template>
    <el-form ref="form" :model="form" label-width="80px">

    <el-form-item label="所属类型">
        <!-- index在循环体里唯一,把category_id绑定到form -->
        <el-select v-model="form.category_id" placeholder="请选择所属类型">
        <el-option 
        v-for="(item,index) in categories"
        :label="item.title"
        :value="item.category_id"
        :key="index"></el-option>
        </el-select>
    </el-form-item>

    <el-form-item label="是否发送">
        <el-switch v-model="form.status"></el-switch>
    </el-form-item>

    <el-form-item label="推荐类型">
        <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
        <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
    </el-form-item>

    <el-form-item label="内容标题">
        <el-input v-model="form.title"></el-input>
    </el-form-item>

    <el-form-item label="副标题">
        <el-input v-model="form.sub_title"></el-input>
    </el-form-item>

    <el-form-item label="封面图片"> 
        <!-- action 上传地址 -->
        <!-- show-file-list 是否支持多选 -->
        <!-- on-success 上传成功的回调 -->
        <!-- before-upload 上传前执行的函数 -->
        <el-upload
        class="avatar-uploader"
        action="http://localhost:8899/admin/article/uploadimg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
            <!-- 预览 -->
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <!-- + -->
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </el-form-item>

    <el-form-item label="商品货号">
        <el-input v-model="form.goods_no"></el-input>
    </el-form-item>

    <el-form-item label="库存数量">
        <el-input v-model="form.stock_quantity"></el-input>
    </el-form-item>

    <el-form-item label="市场价格">
        <el-input v-model="form.market_price"></el-input>
    </el-form-item>

    <el-form-item label="销售价格">
        <el-input v-model="form.sell_price"></el-input>
    </el-form-item>

    <el-form-item label="图片相册">
        <!-- list-type 声明当前图片相册的显示方式 -->
        <!-- on-preview 预览事件的处理函数 -->
        <!-- on-remove 删除图片时触发的事件 -->
        <el-upload
        action="http://localhost:8899/admin/article/uploadimg"
        list-type="picture-card"
        :on-success="handleCartSuccess"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </el-form-item>

    <el-form-item label="内容摘要">
        <el-input type="textarea" v-model="form.zhaiyao"></el-input>
    </el-form-item>

    <!-- 富文本框 -->
    <el-form-item label="内容描述">
        <quillEditor v-model="form.content"></quillEditor>
    </el-form-item>

    <el-form-item>
        <el-button type="primary" @click="onSubmit">立即修改</el-button>
        <el-button>取消</el-button>
    </el-form-item>
    </el-form>
</template>

<style>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  
    .ql-snow .ql-picker{
      line-height: 1;
  }
</style>

<script>
// 富文本框需要样式
import'quill/dist/quill.core.css';
import'quill/dist/quill.snow.css';
import'quill/dist/quill.bubble.css';

import { quillEditor } from 'vue-quill-editor'

  export default {
    components: {
        quillEditor
    },

    data() {
      return {
        form: {
            title:"",
            sub_title:"",
            good_no:"",
            category_id:"",
            stock_quantity:"",
            market_price:"",
            sell_price:"",
            status:false,
            is_slide:false,
            is_top:false,
            is_hot:false,
            zhaiyao:"",
            content:"",
            imgList:[],
            fileList:[],

        },

        // 所属类别的数组
        categories:[],
        imageUrl:'',
        dialogImageUrl: '',
        dialogVisible: false,
      }
    },
    methods: {
      onSubmit() {
        // console.log('submit!');
        // 提交到添加商品的接口
        this.$axios({
            method:"POST",
            url:"http://localhost:8899/admin/goods/add/goods",
            data:this.form,
            // 处理session跨域
            withCredentials:true
        }).then(res=>{
            const {message,status} = res.data;
            // console.log(message);
            if(status===0){
                this.$message.success(message)
                //返回上一页
                this.$router.back()
            }else{
                this.$router,push("/login")
            }
        })
      },

      // 上传成功后的回调
      handleAvatarSuccess(res, file) {
        // 设置图片地址
        this.imageUrl = URL.createObjectURL(file.raw);

        // 把上传成功的结果赋值给form.imgList
        this.form.imgList = [res]
      },

      // upload:上传前执行的函数
      beforeAvatarUpload(file) {
        // 图片大小
        const isLt2M = file.size / 1024 / 1024 < 2;
        
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }

        // 返回false不会上传
        return isLt2M;
      },

      // 删除多张图片事件
      handleRemove(file, fileList) {
        // console.log(file, fileList);
        // 把删除之后的列表赋值给this.form.fileList
        const files = fileList.map(v=>{
            return v.response;
        });
        
        this.form.fileList = files;
      },
      // 预览
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      // 上传多张成功的回调
      handleCartSuccess(res,file,fileList){
        // console.log(fileList);
        // 把fileList数组中每一项response属性提取出来
        const files = fileList.map(v=>{
            return v.response;
        });
        thid.form.List = files;
      }
    },
    mounted(){
        // 获取类别的数据
        this.$axios({
            method:"GET",
            url:" http://localhost:8899/admin/category/getlist/goods"
        }) .then(res=>{
            const { status,message } = res.data;
            // 所有类别数据保存到categories
            this.categories = message;
        });

        // 获取动态参数id
        const {id} = this.$route.params;
        
        this.$axios({
            method:"GET",
            url:" http://localhost:8899/admin/goods/getgoodsmodel/" + id,
        }).then(res=>{
            const { status,message } = res.data;
             console.log(message);
            // 对象合并
            this.form = {
                ...message,
                // category_id转化为数字
                category_id: + message.category_id,
            }

            // imageUrl封面预览
            this.imageUrl = message.imgList[0].url;

            // 图片相册暂留
        })
    }
  }
</script>