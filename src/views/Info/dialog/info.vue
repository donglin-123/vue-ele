<template>
  <div>
    <el-dialog
      title="新增"
      :visible.sync="my_info_dialog"
      append-to-body
      @close="close"
      width="435px"
    >
      <!-- 表单 -->
      <el-form :model="form" ref='info'>
        <el-form-item label="分类:" :label-width="formLabelWidth">
          <el-select v-model="form.category" placeholder="请选择">
            <el-option v-for='cate in category' :label="cate.category_name" :key='cate.id'  :value="cate.id"></el-option>
          
          </el-select>
        </el-form-item>

        <el-form-item label="标题:" :label-width="formLabelWidth">
          <el-input v-model="form.title" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="概况:" :label-width="formLabelWidth">
          <el-input type="textarea" :rows="6" v-model="form.content" placeholder="请输入内容"  ></el-input>         
        </el-form-item>
      </el-form>
      <!-- 操作按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="danger" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref, watch } from '@vue/composition-api'
import{add_new} from '@/api/info.js'
export default {
  props: {
    info_dialog: {
      type: Boolean,
      default: false,
    },
    category:{
        type:Array,
        default:[]
    }
    
  },
  setup(props, { root, emit ,refs}) {
   

    // ------------------------  data  ----------------------------------------------
    const my_info_dialog = ref(false)
    const formLabelWidth = ref('60px')
    const form = reactive({
      category:"",
      title:"",
      content:"",
    })
    // ------------------------   methods  ----------------------------------------------
 
    const submit=(()=>{
      if(!form.category){
        root.$message({
          type:'error',
          message:'分类必须填写',
          duration:1000,
        })
        return false
      }
       const data={
          categoryId:form.category,
          title:form.title,
          content:form.content,
       }
        add_new(data).then(res=>{
            root.$message({
            type:'success',
            message:'添加信息成功!',
            duration:1000,
          })
          close()
        })
    }) 
    const close = (() => {
      emit('update:info_dialog', false)
      //重置表单
      reset()
      //通知父组件更新数据
      emit('loadNews')
    })
    //重置表单
    const reset=()=>{
      form.category="",
      form.title="",
      form.content=''
    }
    // ------------------------    watch  ----------------------------------------------
    // 监听父组件的属性变化
    watch(() => props.info_dialog,(newValue, oldValue) => {
        my_info_dialog.value = newValue
      }
    )
    return {
      // ref
      my_info_dialog,
      formLabelWidth,
      // reactive
      form,
      //  methods
      close,submit,
    }
  },
}
</script>
