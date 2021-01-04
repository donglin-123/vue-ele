<template>
  <div>
     
     <el-table :data="data.tableData" border style="width: 100%">
             <!-- 多选框 -->
           <el-table-column type="selection" width="55" v-if='data.tableConfig.showSelect'></el-table-column>
           
           <template v-for='item in data.tableConfig.tHead'>
              <!-- 表头  文本渲染 --> 
               <el-table-column v-if='item.type!="slot"'  :key="item.label" :prop="item.prop" :label="item.label" :width='item.width'></el-table-column>
              <!-- 表头  插槽渲染 -->
               <el-table-column v-else  :key="item.label"  :label="item.label" :width='item.width'>
                  <template v-slot="scope">
                       <slot :name='item.slotName' :data='scope.row'></slot>     
                  </template>        
               </el-table-column>
           </template>  
      </el-table>
      <div class="space-20"></div>
      <el-row>
              <el-col :span=4>
                      <slot name='footer'></slot>
              </el-col>
              <el-col :span=20>
                     <el-pagination
                       class="pull-right"
                        background
                        :layout=data.tableConfig.page.layout
                        :total=data.tableConfig.page.total
                        :page-sizes='data.tableConfig.page.page_sizes'
                        :current-page='data.tableConfig.page.current_page'
                         @current-change="current_change"
                         @size-change='size_change'

                        >
                     </el-pagination>
                </el-col>
      </el-row>

  </div>
</template>

<script>
import { reactive, onMounted } from '@vue/composition-api'
// import {get_users,add_user} from '@/api/user.js'/
import{loadTableData} from '@/api/common.js'

export default {
   props:{
        tableConfig:{
                type:Object,
                default:{}           
        }
   },
   setup(props,{root}){
        const test=reactive({
                name:'张三'
        })
        const data=reactive({
                tableConfig:{
                    tHead:[],
                    showSelect:true,
                    requestData:{},
                     page:{
                      
                     }
                    
                  
                },

                tableData: []    
        }) 
        // 初始化表格的样式
        const initTable=()=>{
                 const tableConfigKeys=Object.keys(data.tableConfig)
                //传什么配置  替换什么配置
                for(let key in props.tableConfig){
                        // 判断传递的属性是否属于配置属性 --->key
                        if(tableConfigKeys.includes(key)){
                           data.tableConfig[key]=props.tableConfig[key]     
                        }else{
                        root.$message({
                                type:'error',
                                message:`${key}属性未定义`
                        }) 
                        }
                        
                }
        }
        // 请求表格数据
        const loadData=()=>{
                loadTableData(data.tableConfig.requestData).then(res=>{
                   data.tableData = res.data.data.data
                   data.tableConfig.page.total=res.data.data.total
                })
        }
        // 分页处理
        const current_change = ((pagenumber)=>{
                data.tableConfig.requestData.data.pageNumber=pagenumber
                loadData()
        })
        const size_change = ((pagesize)=>{
                data.tableConfig.requestData.data.pageSize=pagesize
                loadData()
        })
        onMounted(()=>{
                
               initTable()
               loadData()
        })
        return{
                data,test,current_change,size_change
        }
   }
}
</script>
<style lang="scss" scoped></style>
