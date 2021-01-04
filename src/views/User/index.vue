<template>
  <div>
        <div class='space-20'></div>
       <br>
       <el-row>
           <el-col :span='20'>
        <div class='label-warp keyword' >
          <label  > 关键字 :</label>
          <div class='warp-content' >
              <el-row :gutter="20">
                <el-col :span='4'>
                  <selectVue  :option='data.option'  :selectValue.sync='data.selectValue'/>
                </el-col>
                <el-col :span='4'>
                   <el-input></el-input>
                </el-col>
                
                <el-col :span='15'>
                  <el-button type='danger'>搜索</el-button>
                </el-col>
              </el-row>
          </div>
        </div>
           </el-col>
         <el-col :span='4'>
           <el-button type='danger' class="pull-right">新增</el-button>
         </el-col>
       </el-row>
       <!-- <br> -->
       <div class="space-20"></div>
       <el-row>
          <tableVue :tableConfig='data.tableConfig'>
            <!-- 2.6版本之前的具名插槽 -->
              <!-- <el-button slot='del'>删除</el-button>
              <el-button slot='update'>编辑</el-button> -->
              
              <template v-slot:del='scopeData'> <!--简化: #del -->
                 <el-button type='danger' size='mini' @click="del(scopeData.data)">删除</el-button>
              </template>
               <template v-slot:update ><!--简化: #update -->
                <el-button type="success" size='mini'>编辑</el-button>
              </template> 
              <template v-slot:footer >
                    <el-button type="info">批量删除</el-button>
              </template>
        

          </tableVue>
       </el-row>
  </div>
</template>
<script>
import {onMounted,reactive,ref,watch } from '@vue/composition-api'
import selectVue from '@c/Select/index.vue'
import tableVue from '@c/Table/index.vue'
export default {
  components:{selectVue,tableVue },
  setup() {
        //初始化下拉框选项
        const data=reactive({
           option:{
             init:['phone','name']
             },
             //选中的select
             selectValue:{},
             tableConfig:{
                // 表头
                  tHead:[
                      {
                                prop:'username',
                                label:'邮箱/用户名',
                                width:'280'
                        },
                        {
                                prop:'truename',
                                label:'真实姓名',
                                width:'180'
                        },
                        {
                                prop:'phone',
                                label:'手机号',
                                width:''
                        },
                        {
                                prop:'region',
                                label:'地区',
                                width:''
                        },
                        {
                                prop:'role',
                                label:'角色',
                                width:''
                        },
                        {
                                prop:'',
                                label:'禁启用状态',
                                width:'',
                                type:'slot',
                                slotName:'del'
                        },
                        {
                                prop:'',
                                label:'操作',
                                width:'',
                                type:'slot',
                                slotName:'update'
                        },
                  ],
                  // 是否要显示多选框
                  showSelect:true,
                  //表格接口请求参数
                  requestData:{
                        url: "/user/getList/",
                        method: "post",
                        data:{
                            pageNumber:1,
                            pageSize:2
                        }
                    },
                    // 分页样式
                    page:{
                       layout:"total,sizes,prev, pager, next",
                        total:0,
                        page_sizes:[2,4,5]
                    }
             }

        }) 
        const del=((value)=>{
           console.log(value)
        }) 
        return{
          data,del,
        }
  }
}
</script>
<style lang="scss" scoped>
.label-warp {
  &.keyword {@include labelDom(center, 60, 40);}
}

/* 传递什么值?
 值的格式是什么?*/
 // const data={
                //         username:'1000012937@qq.com',
                //         truename:'选搜的',
                //         password:'12345',
                //         phone:13222333388,
                //         region:{},
                //         status:1,
                //         role:'info, user',
                //         btnPerm:'',
                // }
                // add_user(data).then(res=>{
                // console.log(res)
                // })
</style>
