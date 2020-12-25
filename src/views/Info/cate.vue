<template>
    <div id="category">
        <el-button type="danger" @click="addFirstCategory">添加一级分类</el-button>  
		<div class='space-20'></div>	
        <hr class="hr" />
		<div class='space-20'></div>	
        <div>
            <el-row :gutter="30">
                <el-col :span="10">
                    <div class="category-wrap">
                        <div class="category" v-for='(cate) in category.item' :key='cate.id' >
                            <!--一级分类-->
                            <h4>
                                <svg-icon iconName="plus"></svg-icon>
								{{cate.category_name}}
                                <div class="button-group">
                                    <el-button size="mini" type="danger" round @click="editCategory(cate,'first_category')">编辑</el-button>
                                    <el-button size="mini" type="success" round @click='addSecondCategory(cate)'>添加子级</el-button> 
                                    <el-button size="mini" round @click='deleteCategory(cate,"first_cate")'>删除</el-button>  
                                </div>
                            </h4>
                            <!--子级分类-->
                            <ul v-if='cate.children&&cate.children.length>0'>
                                <li v-for='_cate in cate.children' :key='_cate.id'  >
									{{_cate.category_name}}     
                                    <div class="button-group">
                                        <el-button size="mini" type="danger" round @click="editCategory(_cate,'second_category',cate.category_name)">编辑</el-button>
                                        <el-button size="mini" round @click="deleteCategory(_cate,'second_cate')">删除</el-button>
                                    </div>
                                </li>                      
                            </ul>
                        </div>
                    </div>
                </el-col>
				<el-col :span="14">
                    <h4 class="menu-title">分类编辑</h4>
                    <el-form label-width="142px" class="from-wrap" ref="categoryFrom">
                        <el-form-item label="一级分类名称：" prop="categoryName"  v-if='category_first_input' >
                            
                            <el-input v-model="form.categoryName" :disabled='is_disabled'></el-input>
                        </el-form-item>
                        <el-form-item label="二级分类名称：" prop="secCategoryName" v-if='category_second_input'>
                            
                            <el-input v-model="form.secCategoryName" ></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" style='width:100px' @click="submit">确定</el-button>
                            
                        </el-form-item>
                    </el-form>
                </el-col>	
            </el-row>
        </div>
    </div>
</template>
<script>
import {reactive,ref,onMounted,watch} from '@vue/composition-api'
import {add_first_category,get_all_category,add_second_category,delete_first_category,edit_category} from '@/api/info'
import {global} from '@/utils/global_3.0.js'
import {common} from '@/api/common.js'
export default {                           
     name:'category',
     setup(props,{root,refs}){

///////////////////// ref ///////////////////////////////////////
        const category_first_input = ref(true)
        const category_second_input = ref(true)
        const is_disabled = ref(false)  //一级分类的启用禁用
        const submit_type=ref('')

///////////////////// reative ///////////////////////////////////////
        // 分类表单绑定的数据
         const form = reactive({
             categoryName:'',
             secCategoryName:''
         })
        //存储分类信息   
         const category = reactive({
             item:[], //所有的分类数据
             current:{}//当前操作的是哪个分类
         })
////////////////// global///////////////////////////////////////////    
        const {confirm}=global()
////////////////// methods ///////////////////////////////////////////
        //点击添加一级分类按钮
        const addFirstCategory=(()=>{
            //点击添加一级分类
            category_second_input.value = false
            category_first_input.value = true
            submit_type.value='add_first_category'
            is_disabled.value=false
            form.categoryName=''
        })
        //点击添加二级分类按钮
        const addSecondCategory = ((cate)=>{
            form.categoryName = cate.category_name
            is_disabled.value=true
            category_second_input.value = true
            category_first_input.value = true
            submit_type.value='add_second_category'
            category.current=cate
            form.secCategoryName=''
        })
        //编辑一级和二级菜单
        const editCategory=(cate,type,first_cate_name='')=>{
            if(type==='first_category'){  //一级分类
                is_disabled.value=false
                form.categoryName = cate.category_name
                category_second_input.value = false
                submit_type.value='edit_first_category'
                category.current=cate
            }else{ //二级
                is_disabled.value=true
                form.secCategoryName = cate.category_name
                form.categoryName = first_cate_name  //所对应的一级菜单的值
                category_second_input.value = true
                category_first_input.value = true
                submit_type.value='edit_second_category'
                category.current=cate
            }
        }
        //执行一级分类添加
        const doAddFirstCategory=()=>{
            if(!form.categoryName){
              root.$message({
                 type:'error',
                 message:'一级分类不能为空',
                 duration:1000

              })
              return false
            }
            add_first_category({categoryName:form.categoryName}).then(res=>{
             root.$message({
                  type:'success',
                 message:res.data.message,
                 duration:1000
             })
             category.item.unshift(res.data.data)
             //清空表单
             form.categoryName=''
            }).catch(err=>{

            })
        }
        //执行二级分类添加
        const doAddSecondCategory=()=>{
            add_second_category({
                categoryName:form.secCategoryName,
                parentId:category.current.id
            }).then(res=>{

            //    1.重新获取 http请求
            //    2.手动找到父类children 数据中的push
                // category.item.map(cate=>{
                //     if(cate.id===category.current.id){
                //         cate.children.unshift(res.data.data)
                //     }
                // })
                getCategoryAll()
                 //清空表单
                form.categoryName=''
                form.secCategoryName=''
            }).catch(err=>{

            })
        }
        //编辑一级二级
        const doEditCategory=(categoryName)=>{
            edit_category({
                id:category.current.id,
                categoryName:categoryName
            }).then(res=>{
                category.current.category_name=res.data.data.data.categoryName
                form.secCategoryName=''
                form.categoryName=''
            })
        }
        //删除一级 二级分类
        const deleteCategory=((cate,type)=>{
            confirm({
                content:'确定删除吗', 
                tip:"删除", 
                type:'error', 
                center:true,
                callback:()=>{
                    delete_first_category({
                        categoryId:cate.id
                    }).then(res=>{
                        if(type==='first_cate'){
                            category.item.map((_cate,index)=>{
                            if(_cate.id==cate.id){
                                category.item.splice(index,1)
                            }
                        })
                        
                        }else{
                            getCategoryAll()
                            
                        }
                    })
                }
            })
           
        })
      
        //点击表单提交
        const submit = (()=>{
           //判断业务逻辑
            if(submit_type.value==='add_first_category'){
                //添加一级分类
                doAddFirstCategory()
            }
            if(submit_type.value==='add_second_category'){
                //添加二级分类
                doAddSecondCategory()
            }
            if(submit_type.value==='edit_first_category'){
                doEditCategory(form.categoryName)
            }
            if(submit_type.value==='edit_second_category'){
                doEditCategory(form.secCategoryName)
            }
        })
        
        
        const {category:_category,getCategoryAll}=common()
        watch(()=>_category.item,(value)=>{
          category.item=value
        })
       
///////////////////  生命周期 ///////////////////////////////////////
        onMounted(()=>{
            //获取分类信息
            getCategoryAll()
        })
         return{
             //ref
             category_second_input,
             category_first_input,
             is_disabled,
             //reactive
             form,category,
             //methods
             addFirstCategory,
             submit,
             addSecondCategory,
             deleteCategory,
             editCategory,

            
         }
     }
}
</script>
<style lang="scss" scoped>
  #category{
	padding:20px;
	color:#344a5f;
}
.category-wrap {
    div:first-child {
        &:before { top: 20px; }
    }
    div:last-child {
        &:before { bottom: 21px; }
    }
}
.menu-title {
    line-height: 44px;
    padding-left: 22px;
    background-color: #f3f3f3;
}
.category {
    position: relative;
    line-height: 44px;
    cursor: pointer;
    &:before {
        content: '';
        position: absolute;
        left: 22px;
        top: 0;
        bottom: 0;
        width: 32px;
        border-left: 1px dotted #000;
    }
    h4 {
        position: relative;
        padding-left: 40px;
    }
    svg {
        position: absolute;
        left: 14px;
        top: 15px;
        background-color: #fff;
        font-size: 17px;
    }
    li {
        position: relative;
        padding-left: 36px;
        margin-left: 24px;
        &:before {
            content: '';
            position: absolute;
            left: 0;
            top: 22px;
            width: 32px;
            border-bottom: 1px dotted #000;
        }
    }
    li, h4 {
        @include webkit(transition, all .5s ease 0s);
        &:hover {
            background-color: #f3f3f3;
            .button-group { display: block; }
        }
    }
}
.button-group {
    display: none;
    position: absolute;
    z-index: 2;
    right: 11px;
    top: -1px;
    button { font-size: 12px; }
}
.from-wrap {
    width: 410px;
    padding-top: 26px;
}
.hr-e9e9e9 {
    width: calc(100% + 60px);
    margin-left: -30px;
    border: none;
    margin-top: 30px;
    margin-bottom: 30px;
	border-bottom: 1px solid #e9e9e9;
	
}
.svg-icon{
    color:#666;
    width: 1em;
    height: 1em;
} 
</style>
