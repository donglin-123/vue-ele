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

            <el-form-item v-if='mode == "register"' prop="password1" class="form-item">
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
                   <el-button type="success" class="block" @click="getCode">{{codeButtonText}}</el-button>
                </el-col>
              </el-row>
            </el-form-item> 
            <el-form-item class="form-item">
              <el-button type="danger" :disabled="buttonStatus"  class="block top" @click="submitForm('ruleForm')">{{this.mode=="login"?"登录":"注册"}}</el-button>
            
            </el-form-item>
          </el-form>
       </div>
  </div>
</template>
<script>
import validateUtils from '@/utils/validate.js'
import{onMounted,reactive,ref} from '@vue/composition-api'
import{get_code,do_register,do_login} from '@/api/login.js'
export default {

    setup(prop,{refs,root}){
//------------------生命周期------------------------------------
  //  onMounted(()=>{
  //    get_code().then(res=>{
  //      console,log(res)
  //    })
  //  })
//-------------------data--------------------------------------
      const status_username=ref(false)
      const status_password=ref(false)
      const status_password1=ref(false)
//验证码验证 
      let validateCode = (rule, value, callback) => {
      //过滤特殊字符
      ruleForm.code = value = validateUtils.validate_inputValue(value,'code')
      if (!value) {
        return callback(new Error('验证码不能为空'))
      } else if (validateUtils.test_code(value)) {
        callback(new Error('验证码格式错误'))
      } else {
        callback()
      }
    }

// 邮箱验证
    let validateUsername = (rule, value, callback) => {
      ruleForm.username = value = validateUtils.validate_inputValue(value,'email')
           
      //   let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      //   严谨模式的邮箱
      if (value === '') {
        status_username.value=false
        callback(new Error('请输入邮箱'))
      } else if (validateUtils.test_email(value)) {
        status_username.value=false
        callback(new Error('邮箱格式错误'))
      } else {
        status_username.value=true
        callback()
      }
    };

    // 密码验证
    let validatePassword = (rule, value, callback) => {
      ruleForm.password = value = validateUtils.validate_inputValue(value,'password')
      
      // 验证的字段 rule  输入的值 value 验证后做的操作（回调函数）
      //   注意是数字字母组合


      if (value === '') {
        // 输入错误
        status_password.value=false
        callback(new Error('请输入密码'))
      } else if (validateUtils.test_password(value)) {
        status_password.value=false
        callback(new Error('密码格式需6~20位'))
      } else {
        //   输入正确
        status_password.value=true
        callback()
      }
    }
    //再次密码验证
    let validatePassword1 = (rule, value, callback) => {
      //如果想用 v-show而不用 v-if隐藏重复密码时
      if(mode.value=='login') {
        callback()
        return
        }
      //验证的字段 输入的值 验证后要做什么（回调函数）
      ruleForm.password1 = value = validateUtils.validate_inputValue(value,'password1')
      
       if(value!==ruleForm.password){
         status_password1.value=false
        callback(new Error('两次密码输入不一致'))
      }else{
        status_password1.value=true
        callback()
      }
    };

//定义tab切换模式
      const mode =ref('login')
      //定义表单相关数据
      const menuTab=reactive([
            {text:"登录",current:true,type:"login"},
            {text:"注册",current:false,type:"register"}
      ])
      //input绑定的数据
      const ruleForm=reactive({
          username: '',
          password: '',
          password1: '',
          code: ''
        })
        //校验方式
      const rules = reactive({
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
        })

    //定义启用和禁用按钮
    const buttonStatus=ref(true)
    //定义验证码按钮的启用和禁用
    const codeButtonStatus=ref(false)
    //定义验证码按钮文本
    const codeButtonText=ref("获取验证码")
    //定义一个验证码的一次性延迟定时器
    const timer_delay=ref(null)
    //定义验证码倒计时定时器
    const timer_count_down=ref(null)


//-------------------methods---------------------------------

const submitForm=(formName=>{
        refs[formName].validate((valid) => {
          if (valid) {         
            //执行登录注册
             mode.value==="login" ? dologin() : doRegister()
          } else {
            
            return false;
          }
        });
      })
const  toggleMenu=((item)=>{
        menuTab.map(item=>item.current=false);
        item.current=true
        mode.value=item.type
        //点击登录切换到注册时清空数据
        refs['ruleForm'].resetFields()
        // 还原验证码相关状态
        resetCodeButton()
        //还原登录注册按钮状态
        buttonStatus.value=true
      })


//获取验证码
const getCode=(()=>{
    const {result,filed}=validateFileds()
    let offset=0
    if(!result){   //true是验证通过， false是验证失败
        filed.map(item=>{
            offset += 40
            root.$message({
                type:"error",
                message:`错误字段:${item.message}`,
                offset:offset,
                duration:2000

            })
        })
        
        return false
    }

     //让获取验证码的按钮禁用，按钮内容改为 "发送中"
    setCodeButton({
          status:true,
          text:"发送中"
      })
    

     //为了模拟网络延迟 设置一个一次性定时器
     timer_delay.value=setTimeout(()=>{
        const data={
          username:ruleForm.username,
          module:mode.value
        }
        get_code(data).then((res)=>{
            //显示倒计时
            countDown(10)
            //获取到对应的验证码
            root.$message.success(res.data.message)
            //登录注册按钮启用
            buttonStatus.value=false

        }).catch((err)=>{
            console.log("请求错误",err)
        })
     },500)
     
})
//--------------------------辅助方法-----------------------------

  //验证码定时器的倒计时效果
const countDown=(timer)=>{
    if(timer_count_down.value){
      clearInterval(timer_count_down.value)
    }
    timer_count_down.value=setInterval(()=>{
      timer--;
      if(timer===0){
        //清除定时器
        clearInterval(timer_count_down.value)
        //显示重新发送 
          setCodeButton({
            status:false,
            text:"重新发送"
        })   
     }else{
       codeButtonText.value=`倒计时${timer}秒`
     }
      
   },1000)
}

//还原验证码的相关状态
 const resetCodeButton=()=>{
    //默认 启用 “发送中”的状态
      setCodeButton({
          status:false,
          text:"获取验证码"
      })

      
       // 清空所有的定时器
      clearTimeout(timer_delay.value)
      clearInterval(timer_count_down.value)
 }

//设置获取验证码的相关状态
const setCodeButton=({status,text})=>{
     codeButtonStatus.value= status
     codeButtonText.value=text
}
// ****************************************************
//执行登录
const dologin=()=>{
    const data={
      username:ruleForm.username,
      password:ruleForm.password,
      code:ruleForm.code
    }
    do_login(data).then(res=>{
        root.$message.success(res.data.message)
    }).catch(err=>{

    })
 }

//执行注册
const doRegister=()=>{
   const data={
      username:ruleForm.username,
      password:ruleForm.password,
      code:ruleForm.code
   }
   //注册
   do_register(data).then(res=>{

     //提示注册成功
     root.$message.success(res.data.message)
      //注册成功后直接切换到登录tab
      toggleMenu(menuTab[0])
   }).catch(err=>{

   })
}

// 发送验证码时验证相关字段
const validateFileds=()=>{

    const _filed_arr=[
        {filed:'username',flag:status_username.value,message:'邮箱格式错误'},
        {filed:'password',flag:status_password.value,message:'密码错误'},
        {filed:'password1',flag:status_password1.value,message:'重复密码错误'},
        
      ].filter(item=>!item.flag)

    return{
      result:status_username.value && status_password.value && status_password1.value,
      filed:_filed_arr
      }
} 

   return{
          mode,
          menuTab,
          ruleForm,
          rules,
          submitForm,
          toggleMenu,
          getCode,
          buttonStatus,
          codeButtonStatus,
          codeButtonText

      }
    },
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
      color:#fff;
    }
  }
 .cheng{
   margin-left: 10px;
 }
  
</style>