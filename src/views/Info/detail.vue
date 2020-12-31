<template>
    <div>
        <el-form :model="form" status-icon ref="ruleForm" label-width="100px" >
            <el-form-item label="分类:" prop="pass">
                <el-select v-model="form.categoryId" placeholder="请选择">
                    <el-option
                    v-for='cate in category.item'
                    :key='cate.id'
                    :label="cate.category_name"
                    :value="cate.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label='标题' style='width:320px' >
                 <el-input v-model="form.title"></el-input>
            </el-form-item>

            <el-form-item label='缩略图:'>
                缩略图 
            </el-form-item>

            <el-form-item label='创建日期:'>
                 <el-date-picker
                v-model="form.createDate"
                type="date"
                format='yyyy.MM.dd /HH:mm:ss'
                placeholder="选择日期" disabled>
                </el-date-picker>
            </el-form-item>
            <el-form-item label='详细内容:'>
                <quill-editor v-model='form.content' style="height:100px" :options='editorOption'></quill-editor> 
            </el-form-item>
            <el-form-item class="inputaa">
                <el-button type="danger" class="pull-right" @click="submit">提交</el-button>
            </el-form-item>
        </el-form>
        
    </div>
</template>

<script>
import{get_news} from '@/api/info.js'
import{common} from '@/api/common.js'
import{formatDate} from '@/utils/functions.js'
import {onMounted,reactive, ref, onActivated, onDeactivated, watch } from '@vue/composition-api'
import { quillEditor } from "vue-quill-editor" //调用编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import {edit_news} from '@/api/info.js'
export default {
     components: {
        quillEditor
    },
       
   setup(props,{root}){
       // console.log('----->','setup')
       const toolbarOptions=[

                          [{ 'header': 1 }, { 'header': 2 }],        // 标题，键值对的形式；1、2表示字体大小
                          [{ 'list': 'ordered'}, { 'list': 'bullet' }],     //列表
                          [{ 'size': ['small', false, 'large', 'huge'] }], // 字体大小
                          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],     //几级标题
                          [{ 'color': [] }, { 'background': [] }],     // 字体颜色，字体背景颜色
                          [{ 'font': [] }],     //字体
                          [{ 'align': [] }],    //对齐方式
                          ['clean'],    //清除字体样式
                          ['image','video']    //上传图片、上传视频
                          ]

      
       const editorOption=reactive({
           placeholder:'编辑内容',
           modules:{
               toolbar:toolbarOptions
           }
       })
        const id=ref('')
        const form=reactive({
            categoryId:'',
            title:'',
            content:'',
            createDate:'',
            imgUrl:''
        })
        const category=reactive({
            item:[]
        })
        const {category:cate,getCategoryAll}=common()
        const getInfo=()=>{
            get_news({
                pageNumber:1,
                pageSize:1,
                id:id.value
            }).then(res=>{
                const responseData=res.data.data.data[0]
                form.categoryId=responseData.categoryId
                form.tiyle=responseData.title
                form.content=responseData.content
                form.createDate=formatDate(responseData.createDate)
                form.imgUrl=responseData.imgUrl
            })
        }
        onMounted(()=>{
            getCategoryAll()
        })
        
        watch(()=>cate.item,(value)=>{
            category.item=value
        })
        onActivated(()=>{

            console.log("activated 进入")
            id.value=root.$route.params.id||root.$store.getters['params/id']
            getInfo()
        })
        onDeactivated(()=>{
            console.log('activated 离开')
        })

        const submit=(()=>{
            const data={
                id:id.value,
                categoryId:form.categoryId,
                title:form.title,
                content:form.content,
            }
            edit_news(data).then(res=>{
                root.$message({
                    type:'success',
                    message:'修改成功'
                })
            })
        })
        return{
            //ref
             id,
            //reactive
            form,category,editorOption,toolbarOptions,
            // methods
            submit,
        }
   }
}
</script>
<style lang='scss' scoped>
.inputaa{
    margin-top: 10px;
}

</style>