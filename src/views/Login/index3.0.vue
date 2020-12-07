<template>
  <div id="login">
       <div class="login-warp">
          <ul class="menuTab"> 
            <li :class='{"current":item.current}' v-for='(item,index) in menuTab' :key='index' @click="toggleMenu(item)">{{item.text}}</li>
          </ul>
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm"   class="login-form" size="medium">
            
            <el-form-item  prop="username" class="form-item">
              <label for="username" >邮箱</label>
              <el-input id="username" type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
            </el-form-item>
            
            <el-form-item  prop="password" class="form-item">
              <label for="password">密码</label>
              <el-input id="password" type="text" v-model="ruleForm.password" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item v-show='mode == "register"' prop="password1" class="form-item">
              <label for="password1">再次确认密码</label>
              <el-input id="password1" type="text" v-model="ruleForm.password1" autocomplete="off"></el-input>
            </el-form-item>
            
            <el-form-item  prop="code" class="form-item">
              
              <label for="code">验证码</label>
              <el-row :gutter="10">
                <el-col :span="15">
                   <el-input id="code" v-model="ruleForm.code" ></el-input>
                </el-col>
                <el-col :span="9">
                   <el-button type="success" class="block">获取验证码</el-button>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item class="form-item">
              <el-button type="danger" class="block top" @click="submitForm('ruleForm')">{{this.mode=="login"?"登录":"注册"}}</el-button>
            
            </el-form-item>
          </el-form>
       </div>
  </div>
</template>
<script>
import validateUtils from '@/utils/validate.js'
import{onMounted,reactive,ref} from '@vue/composition-api'
export default {

  // vue3.0新增
    setup(prop,context){
 
        // context.attrs  --> this.$attrs  //包含了父组件给子组件传递的属性（除了prop之外的其他属性）
        // context.slots  --> this.slots  //访问当前组件中的具名插槽
        // context.parent --> this.parent  //代表父组件的实例化对象 this.$parent. 调用父组件的方法和属性
        // context.root   --> this.root   //根组件     这里的根组件就是min.js下的new Vue({...})
        // context.emit   --> this.emit  //子组件想父组件出发一个自定义方法，目的是为了传递参数，这是实现2.0父子组件传值的基本方式
        // context.refs   -->this.refs   // 在组件中获取DOM元素的引用，返回的是一个对象，ref在Dom中返回的是dom的js对象
                      //ref在子组件上，返回的是子组件的实例化对象，this.$refs.XXX 调用子组件的数据和方法 
    
    //1.数组的定义和使用
      // 引用类型数据  Object array
      //基本类型数据  string number boolean null undefined 返回的是一个响应式的对象

      /*响应式:
            获取.value值  触发get方法
            设置.value="新值"  触发set方法
      */

    //  2. setup 定义数据 生命周期钩子 自定义方法：
              // (1)定义的数据必须 return  如果不 return不能在模板中使用
              // (2)定义生命周期       按照生命周期的顺序执行
              //      onMounted(()=>{ //回调函数
              //        console.log(xxx)
              //     })
     },
    data(){

    //验证码验证 
      var validateCode = (rule, value, callback) => {
      //过滤特殊字符
      this.ruleForm.code = value = validateUtils.validate_inputValue(value,'code')
      if (!value) {
        return callback(new Error('验证码不能为空'))
      } else if (validateUtils.test_code(value)) {
        callback(new Error('验证码格式错误'))
      } else {
        callback()
      }
    }

// 邮箱验证
    var validateUsername = (rule, value, callback) => {
      this.ruleForm.username = value = validateUtils.validate_inputValue(value,'email')
           
      //   let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      //   严谨模式的邮箱
      if (value === '') {
        callback(new Error('请输入邮箱'))
      } else if (validateUtils.test_email(value)) {
        callback(new Error('邮箱格式错误'))
      } else {
        callback()
      }
    };

    // 密码验证
    var validatePassword = (rule, value, callback) => {
      this.ruleForm.password = value = validateUtils.validate_inputValue(value,'password')
      
      // 验证的字段 rule  输入的值 value 验证后做的操作（回调函数）
      //   注意是数字字母组合
      if (value === '') {
        //   输入错误
        callback(new Error('请输入密码'))
      } else if (validateUtils.test_password(value)) {
        callback(new Error('密码格式需6~20位'))
      } else {
        //   输入正确
        callback()
      }
    };

    //再次密码验证
    var validatePassword1 = (rule, value, callback) => {
      //如果想用 v-show而不用 v-if隐藏重复密码时
      if(this.mode=='login') {
        callback()
        return
        }
      //验证的字段 输入的值 验证后要做什么（回调函数）
      this.ruleForm.password1 = value = validateUtils.validate_inputValue(value,'password1')
      
       if(value!==this.ruleForm.password){
        callback(new Error('两次密码输入不一致'))
      }else{
        callback()
      }
    };
    //   验证码验证
    
      return {
        mode:"login",
        menuTab:[
            {text:"登录",current:true,type:"login"},
            {text:"注册",current:false,type:"register"}
        ],
        //input绑定的数据
        ruleForm: {
          username: '',
          password: '',
          password1: '',
          code: ''
        },
       //校验方式
        rules: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          password1: [
            { validator: validatePassword1, trigger: 'blur' }
          ],
          code: [
            { validator: validateCode, trigger: 'blur' }
          ]
        }
      }
    },
    methods:{
      toggleMenu(item){
        this.menuTab.map(item=>item.current=false);
        item.current=true;
        this.mode=item.type
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    
    }
};
</script>
<style lang="scss">
  #login{
    height:100vh;//基于浏览器的可视区域
    background-color:rgb(52, 74, 95);
  }
  .login-warp{
     width: 331px;
     margin:0 auto;
  }
  .menuTab{  
      text-align: center;
      li{
        margin-top: 250px;
        display: inline-block;
        list-style: none;
        width: 91px;
        height:37px;
        line-height: 35px;
        color: #fff;
        font-size: 16px;
        border-radius:3px; 
      }
      .current{
        background-color:rgb(48, 66, 86);
      }
  }
  .login-form{
    label{
      display: block;
      color: #fff;
      font-size: 16px;
      margin-bottom: 3px;
    }
    .form-item{
       margin-bottom: 14px;

    }
    .block{
      display: block;
      width: 100%;
    }
    .top{
      margin-top: 23px;
      background-color: rgba(250,182,183,1);
      color:#fff;
    }
  }
 .cheng{
   margin-left: 10px;
 }
  
</style>