<template>
  <div class="centered-form">
    <el-form :model="form" :rules="rules" ref="loginForm" label-width="80px" v-if="isLogin" class="with-border">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item class="additional-button">
        <el-button type="primary" @click="handleLogin">登录</el-button>
        <el-button type="text" plain @click="switchMode">去注册</el-button>
      </el-form-item>
     
     
      <div v-if="loginFailed" class="error-message">登录失败，请检查用户名和密码。</div>
    </el-form>

    <el-form :model="form" :rules="rules" ref="registerForm" label-width="80px" v-else class="with-border">
      <el-form-item label="新用户名" prop="newUsername">
        <el-input v-model="form.newUsername"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="form.newPassword"></el-input>
      </el-form-item>
      <el-form-item class="additional-button">
        <el-button type="primary" @click="handleRegister">注册</el-button>
        <el-button type="text"  plain @click="switchMode">返回登录</el-button>
      </el-form-item>
    </el-form>

    
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      isLogin: true,
      form: {
        username: '',
        password: '',
        newUsername: '',
        newPassword: ''
      },
      loginFailed: false,
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        newUsername: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // 使用Axios发送POST请求到后端验证登录信息
          axios.post('http://192.168.84.216:8080/api/user/login', {
                username: this.form.username,
                password: this.form.password
              })
              
          .then(response => {
            console.log('Response data777:', response.data); // 添加这行用于调试，查看实际返回的数据结构
            if (response.data && response.data.state === 200) {
              console.log(11111);
              localStorage.setItem('token',response.data.data.token)
              this.$bus.$emit('loginSuccess');
                
                this.$router.push('/home/first'); // 登录或注册成功后跳转到另一个路径
                
                
                
            } else {
              this.loginFailed = true;
            }
          })
          .catch(error => {
            console.error('An error occurred during login:', error);
          });
        }
      });
      
    },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          // 使用Axios发送POST请求到后端注册新用户
          axios.post('http://192.168.84.216:8080/api/user/register', {
            username: this.form.newUsername,
            password: this.form.newPassword
          })
          .then(response => {
            console.log('User registered successfully:', response.data);
            
            this.switchMode()
          })
          .catch(error => {
            console.error('An error occurred during registration:', error);
          });
        }
      });
    },
   
    
    switchMode() {
      this.isLogin = !this.isLogin;
      this.loginFailed = false; // 切换模式时重置登录失败状态
    }
  }
}
</script>


<style scoped>
.centered-form {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 25vh; /* 占据页面四分之一的高度 */
  padding: 20px;
  background-image: url('../images/background.png'); 
  background-size: cover;
  background-attachment: fixed;
}

.with-border {
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
  margin: 0 auto;
  padding: 20px;
}

.switch-button {
  text-align: center;
  margin-top: 10px;
}

.error-message {
  color: red;
}
.el-form {
  margin-top: 200px;
}
</style>
