/** 
*登录界面
*/
<template>
  <div id="login">
    <!-- 线 -->
    <div class="line"></div>
    <!-- 登录框 -->
    <div class="login-box">
      <!-- 左边 -->
      <div class="left">
        <div class="l-logo">
          <img class="logo" src="../assets/img/favicon.jpg" />
        </div>
        <div class="l-title">
          <h3>智学无忧后台系统</h3>
          <span>做最有态度、责任、良心的it教育</span>
        </div>
      </div>
      <!-- 右边 -->
      <div class="right">
        <div class="form">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
          >
            <ul>
              <li>
                <el-form-item prop="checkAcc">
                  <el-input placeholder="请输入账号" v-model="ruleForm.checkAcc" autocomplete="off"></el-input>
                  <span class="el-icon-user-solid"></span>
                </el-form-item>
              </li>
              <li>
                <el-form-item prop="checkPass">
                  <el-input
                    type="password"
                    placeholder="请输入密码"
                    v-model="ruleForm.checkPass"
                    autocomplete="off"
                  ></el-input>
                  <span class="el-icon-lock"></span>
                </el-form-item>
              </li>
              <li>
                <!-- <el-form-item> -->
                <el-checkbox v-model="remPwd">记住密码</el-checkbox>
                <!-- </el-form-item> -->
              </li>
              <li>
                <el-button type="success" :disabled="isDisabled" @click="submitForm('ruleForm')">登录</el-button>
              </li>
            </ul>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    var validateAcc = (rule, value, callback) => {
      if (value === "" || !value) {
        callback(new Error("请输入账号"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePwd = (rule, value, callback) => {
      if (value === "" || !value) {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        checkAcc: "", //账号
        checkPass: "" //密码
      },
      rules: {
        checkAcc: [{ validator: validateAcc, trigger: "blur" }],
        checkPass: [{ validator: validatePwd, trigger: "blur" }]
      },
      isDisabled: false, // 是否禁用登录按钮
      remPwd: "" //记住密码
    };
  },
  created() {
    if(document.cookie){
      var cookieVal = document.cookie.split("=")
      var cookieJson = eval("("+cookieVal[1]+cookieVal[2]+")")
      //解密
      this.ruleForm.checkAcc = atob(cookieJson.userAcc);
      this.ruleForm.checkPass = atob(cookieJson.userPwd);
    }
  },
  methods: {
    submitForm(formName) {
      //登录
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.isDisabled = true;
          this.axios
            .get(
              `api/OAuth/authenticate?stuMobile=${this.ruleForm.checkAcc}&stuPassword=${this.ruleForm.checkPass}`
            )
            .then(res => {
              if (res.status == 200) {
                var token = res.data.access_token;
                var tokenType = res.data.token_type;
                sessionStorage.setItem("token", tokenType + " " + token);
                if (this.remPwd) {
                  var date = new Date();
                  date.setTime(date.getTime() + 10080000);
                  //加密
                  var userAccBtoa = btoa(this.ruleForm.checkAcc);
                  var userPwdBtoa = btoa(this.ruleForm.checkPass);
                  document.cookie = `userInfo={userAcc:'${
                    userAccBtoa
                  }',userPwd:'${
                    userPwdBtoa
                  }'};expires=${date.toGMTString()};`;
                }
                this.$router.push("/");
                return;
              }
              this.isDisabled = false;
            })
            .catch(error => {
              this.showMsg("账号或密码错误", "warning");
              this.isDisabled = false;
            });
        } else {
          this.isDisabled = false;
          return;
        }
      });
    },
    showMsg(message, type) {
      //显示提示信息
      this.$message({
        message: message,
        type: type
      });
    }
  }
};
</script>

<style lang="less" scoped>
.boxAlign(@left:50%) {
  //盒子居中
  position: absolute;
  left: @left;
  top: 50%;
  transform: translate(-50%, -50%);
}
#login {
  background: url(../assets/img/background.jpg) no-repeat;
  height: 100%;
  background-size: cover;
}
.login-box {
  width: 35%;
  height: 40%;
  .boxAlign;
  box-shadow: 2px 2px 10px 10px #4d89e2;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 5px;
}
.left,
.right {
  width: 50%;
  height: 100%;
  float: left;
}
.left {
  text-align: center;
  .logo {
    height: 40%;
    width: 40%;
    border-radius: 50%;
    margin-top: 15%;
    box-shadow: 2px 2px 20px 5px #cfd4d8;
  }
  h3 {
    margin-top: 5%;
    color: #0d9084;
    text-shadow: 1px 1px #0d9084;
  }
  span {
    color: #849295;
    font-size: 10px;
    margin-top: 10%;
    display: inline-block;
  }
}
.form {
  margin: 15% 10%;
  li {
    margin-bottom: 10%;
    position: relative;
    span {
      .boxAlign(8%);
      color: #7f9d8e;
    }
  }
}
/deep/ .el-input__inner {
  padding: 0 15%;
  border: 1px solid #88a58f;
  border-radius: 0px;
  height: 30px;
  line-height: 30px;
}

.el-button,
.el-button--success,
.is-plain {
  width: 100%;
}
.line {
  height: 40%;
  width: 2px;
  .boxAlign;
  border-radius: 50%;
  z-index: 99;
  // background-color: red;
  background-color: #6da999;
}
@media (max-width: 1000px) {
  .login-box {
    height: 60%;
  }
  .left {
    width: 100%;
    height: 40%;
  }
  .right {
    width: 100%;
    height: 50%;
    // float: left;
  }
  .right {
    padding-bottom: 20px;
  }
  .left .logo[data-v-26084dc2] {
    height: 50%;
    width: 60%;
    margin-top: 0px;
    margin: auto;
  }
  .l-logo {
    display: flex;
    width: 40%;
    float: left;
    height: 100%;
    text-align: center;
  }
  .l-title {
    flex-wrap: wrap;
    display: flex;
    text-align: center;
    float: right;
    width: 60%;
    height: 100%;
    h3,
    span {
      margin: auto;
    }
    h3 {
      margin-bottom: 10px;
    }
    span {
      margin-top: 10px;
    }
  }
  .form[data-v-26084dc2] {
    margin: 0% 10%;
    li {
      margin-bottom: 0%;
      margin-top: 6px;
    }
  }
  .line[data-v-26084dc2] {
    height: 2px;
    width: 35%;
    top: 44%;
  }
}
</style>