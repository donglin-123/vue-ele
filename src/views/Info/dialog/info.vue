<template>
  <div>
    <!-- 第一种办法 -->
    <!-- <el-dialog
      title="新增"
      :visible.sync="my_info_dialog"
      @close="close"
      append-to-body
    >
     

    </el-dialog> -->

    <!-- 第二种办法  第三种办法 这里一样-->
    <el-dialog
      title="新增"
      :visible.sync="my_info_dialog"
      append-to-body
      @close="close"
      width="435px"
    >
      <!-- 表单 -->
      <el-form :model="form">
        <el-form-item label="类型:" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="标题:" :label-width="formLabelWidth">
          <el-input v-model="form.name" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="概况:" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="form.name"
          ></el-input>
        </el-form-item>
      </el-form>
      <!-- 操作按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="danger">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { reactive, ref, watch } from '@vue/composition-api'
// vue3.0写法

export default {
  props: {
    info_dialog: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { root, emit }) {
    // ------------------------  data  ----------------------------------------------
    const my_info_dialog = ref(false)
    const formLabelWidth = ref('60px')
    const form = reactive({
      name: '',
      region: '',
    })
    // ------------------------   methods  ----------------------------------------------
    const close = () => {
      // 使用属性修饰符  是通过 .sunc 告知父组件更新某一个数据
      // 适合场景：只是告知父组件更新某一个值，没有其他业务逻辑
      emit('update:info_dialog', false)
    }
    // ------------------------    watch  ----------------------------------------------
    // 监听父组件的属性变化
    watch(
      () => props.info_dialog,
      (newValue, oldValue) => {
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
      close,
    }
  },
}

//  第一种办法

// 单项数据流 父组件传递的参数子组件可以使用但是不能直接修改
// export default {
//   data() {
//     return {
//       my_info_dialog: true,
//     }
//   },
//   methods: {
//     close() {
//       this.$emit('close', false)
//     },
//   },

// 第二种办法

// 单项数据流 父组件传递的参数子组件可以使用但是不能直接修改
// export default {
//   props: {
//     info_dialog: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   data() {
//     return {
//       my_info_dialog: false,
//     }
//   },
//   watch: {
//     // 监听父组件的属性变化
//     info_dialog: {
//       handler(newValue, oldValue) {
//         console.log(newValue, oldValue) //true false
//         this.my_info_dialog = newValue
//       },
//     },
//   },
//   methods: {
//     close() {
//       // console.log('xxx')
// 需要父组件监听事件
// 触发事件 ：是父组件监听子组件的自定义事件触发父组件的一个回调函数
//       this.$emit('close', false)
//     },
//   },
// }

// 第三种办法
// export default {
//   props: {
//     info_dialog: {
//       type: Boolean,
//       default: false,
//     },
//   },
//   setup(){
//     const my_info_dialog=ref(true),
//     const formLabelWidth=ref("60px"),
//     const form=reactive({
//         name: '',
//         region: '',
//         date1: '',
//         date2: '',
//         delivery: false,
//         type: [],
//         resource: '',
//         desc: '',
//     }),
//     return{
// my_info_dialog,
// formLabelWidth,
// form,
//     }
//   }
//   // data() {
//   //   return {
//   //     my_info_dialog: true,
//   //     formLabelWidth: '60px',
//   //     form: {
//   //       name: '',
//   //       region: '',
//   //       date1: '',
//   //       date2: '',
//   //       delivery: false,
//   //       type: [],
//   //       resource: '',
//   //       desc: '',
//   //     },
//   //   }
//   // },
//   watch: {
//     // 监听父组件的属性变化
//     info_dialog: {
//       handler(newValue, oldValue) {
//         // console.log(newValue, oldValue) //true false
//         this.my_info_dialog = newValue
//       },
//     },
//   },
//   methods: {
//     close() {
//       // 使用属性修饰符  是通过 .sunc 告知父组件更新某一个数据
//       // 适合场景：只是告知父组件更新某一个值，没有其他业务逻辑
//       // 触发事件 ：是父组件监听子组件的自定义事件触发父组件的一个回调函数
//       // 适合场景：可能在父组件的回调函数中写其他的业务逻辑
//       this.$emit('update:info_dialog', false)
//     },
//   },
// }
</script>
