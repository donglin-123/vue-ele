<template>
  <div>
     <el-table :data="data.tableData" border style="width: 100%">
           <el-table-column type="selection" width="55" v-if='data.tableConfig.showSelect'></el-table-column>
           <el-table-column v-for='item in data.tableConfig.tHead' :key="item.label" :prop="item.prop" :label="item.label" :width='item.width'></el-table-column>
           <el-table-column label="禁启用状态">
                   <template slot-scope="scope">
                        <slot name='del'></slot>
                   </template>
           </el-table-column>
           <el-table-column label="操作">
                   <template slot-scope="scope">
                        <slot name='update'></slot>
                   </template>
           </el-table-column>
           
      </el-table>
  </div>
</template>

<script>
import { reactive, onMounted } from '@vue/composition-api'

export default {
   props:{
        tableConfig:{
                type:Object,
                default:{}

                
        }
   },
   setup(props,{root}){
        const data=reactive({
                tableConfig:{
                    tHead:[],
                    showSelect:true,
                },

                tableData: [
                   {
                        username: '12345678@qq.com',
                        truename: '张三',
                        phone: '13012345678',
                        region:'北京',
                        role:'校长',
                   },
                   {
                        username: '12345678@qq.com',
                        truename: '李四',
                        phone: '13012345678',
                        region:'北京',
                        role:'教师',
                   },
                   {
                        username: '12345678@qq.com',
                        truename: '王五',
                        phone: '13012345678',
                        region:'北京',
                        role:'助教',
                   },
                   
                ]
        }) 
        onMounted(()=>{
                // data.tableConfig.tHead = props.tableConfig.tHead
                // data.tableConfig.showSelect=props.tableConfig.showSelect
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
        })
        return{
                data,
        }
   }
}
</script>
<style lang="scss" scoped></style>
