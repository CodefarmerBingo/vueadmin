<template>
  <div class="login-wrap">
    <img src="../assets/img/title.png" class="titleImage">
    <img src="../assets/img/light.png" class="lightImage">
    <el-form label-position="left" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm login-container">
      <h3 class="title">用户登录</h3>
      <el-form-item prop="username">
        <el-input type="text" v-model="ruleForm.username" prefix-icon="el-icon-s-custom" auto-complete="off" placeholder="请输入用户名" class="inputClass"></el-input>
      </el-form-item>
      <el-form-item prop="password">
          <el-input type="password" v-model="ruleForm.password" prefix-icon="el-icon-lock" auto-complete="off" placeholder="请输入用户密码" class="inputClass"></el-input>
      </el-form-item>
      <el-row class="rowClass">
        <el-col :span="10" :offset="2">
          <el-form-item prop="code">
            <el-input type="text" v-model="ruleForm.code" prefix-icon="el-icon-picture" class="yanzhengma" auto-complete="off" placeholder="请输入验证码" @keyup.enter.native="submitForm('ruleForm')"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10" class="code-box">
          <img :src="ruleForm.codeimg" alt="" class="codeimg" @click="getcode()">
        </el-col>
      </el-row>
      <el-checkbox class="remember" v-model="rememberpwd">记住密码</el-checkbox>
      <el-form-item>
        <el-button class="submitButton" type="primary" @click="submitForm('ruleForm')" :loading="logining">登录</el-button>
      </el-form-item>
    </el-form>
    <img src="../assets/img/shadow.png" class="shadowImage">
  </div>
</template>
<script type="text/ecmascript-6">
import { login } from '@/api/commonMG'
import { setCookie, getCookie, delCookie } from '../utils/util'
import md5 from 'js-md5'
export default {
  name: 'login',
  data() {
    return {
      //定义loading默认为false
      logining: false,
      // 记住密码
      rememberpwd: false,
      ruleForm: {
        //username和password默认为空
        username: '',
        password: '',
        code: '',
        codeimg: ''
      },
      //rules前端验证
      rules: {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
      }
    }
  },
  // 创建完毕状态(里面是操作)
  created() {
    // this.$message({
    //   message: '账号密码及验证码不为空即可',
    //   type: 'success'
    // })
    // 获取图形验证码
    this.getcode()
    // 获取存在本地的用户名密码
    this.getuserpwd()
    
  },
  // 里面的函数只有调用才会执行
  methods: {
    // 获取用户名密码
    getuserpwd() {
      if (getCookie('user') != '' && getCookie('pwd') != '') {
        this.ruleForm.username = getCookie('user')
        this.ruleForm.password = getCookie('pwd')
        this.rememberpwd = true
      }
    },
    //获取info列表
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.logining = true
          // 注释
          login(this.ruleForm).then(res => {
            if (res.success) {
              if (this.rememberpwd) {
                //保存帐号到cookie，有效期7天
                setCookie('user', this.ruleForm.username, 7)
                // localStorage.setItem('username',this.ruleForm.username)
                //保存密码到cookie，有效期7天
                setCookie('pwd', this.ruleForm.password, 7)
                // localStorage.setItem('password',this.ruleForm.password)
              } else {
                delCookie('user')
                delCookie('pwd')
              }
              //如果请求成功就让他1秒跳转路由
              setTimeout(() => {
                this.logining = false
                // 缓存用户个人信息
                localStorage.setItem('userdata', JSON.stringify(res.result))
                this.$store.commit('login', 'true')
                this.$router.push({ path: '/page/Welcome' })
              }, 1000)
            } else {
              this.$message.error(res.errors[0])
              this.logining = false
              return false
            }
          })
        } else {
          // 获取图形验证码
          this.getcode()
          this.$message.error('请输入用户名密码！')
          this.logining = false
          return false
        }
      })
    },
    getcode(){
      var num = Math.ceil(Math.random()*10);
      this.ruleForm.codeimg = '/platform-web/index/captchaImage?' + num;
    }
  }
}
</script>

<style scoped>
.login-wrap {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-image: url(../assets/img/BJ.jpg);
  background-repeat: no-repeat;
  background-size: 100%;
}
.login-wrap /deep/ .el-form-item__error{
  margin-left: 28px
}
.login-wrap .rowClass /deep/ .el-form-item__error{
  margin-left: 0px
}
.titleImage {
  width: 500px;
  margin: 130px 0 10px 520px
}
.lightImage{
  margin-left: 570px;
  width: 400px;
  margin-bottom: 50px
}
.shadowImage{
  margin-left: 37%;
  margin-top: -20px;
  width: 400px
}
.login-container {
  margin: 0px auto;
  box-sizing: border-box;
  width: 400px;
  height: 380px;
  padding: 30px 35px 15px 35px;
  background: #e7f3ff;
}
.title {
  margin: 0px auto 30px auto;
  font-size: 30px;
  text-align: center;
  font-weight: normal;
  color: #3350d8;
}
.rowClass {
  padding-left: 2px
}
.inputClass {
  width: 280px;
  margin-left:30px;
}
.inputClass /deep/ .el-input__inner {
  background-color: #e7f3ff;
  border: 1px solid #9ea2fc;
  height: 33px;
}
.inputClass /deep/ .el-input__inner::placeholder {
 color: #9ea4f8
}
.remember {
  margin: 10px 0px 20px 28px;
}
.code-box {
  text-align: right;
  margin-left: 4px;
}
.codeimg {
  height: 33px;
  width: 100px;
  margin: 4px -2px 0 0;
}
.submitButton {
  width: 280px;
  margin-left: 28px;
  height: 42px;
  font-size: 20px;
  background-color: #6177ef;
}
.yanzhengma /deep/ .el-input__inner{
  border: 1px solid #9ea2fc;
  height: 33px;
}
.yanzhengma /deep/ .el-input__inner::placeholder{
  color: #9ea4f8
}
</style>