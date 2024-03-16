<template>
  <div class="container">
    <h2 style="text-align: center;">用户信息</h2>
    <el-form :model="userInfo" :rules="rules" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="userInfo.username" :disabled="true" style="width: 50%;"></el-input> <!-- 禁用用户名编辑 -->
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="userInfo.password" :disabled="true" style="width: 50%;"></el-input>
      </el-form-item>
      <el-form-item label="昵称">
        <el-input v-model="userInfo.niname" :disabled="!editMode" visibility="visible" style="width: 50%;"></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="userInfo.address" :disabled="!editMode" style="width: 50%;"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userInfo.email" :disabled="!editMode" style="width: 50%;"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="userInfo.gender" :disabled="!editMode" style="width: 50%;">
          <el-radio label="1">男</el-radio>
          <el-radio label="0">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="手机号码">
        <el-input v-model="userInfo.phone" :disabled="!editMode" style="width: 50%;"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="toggleEditMode">{{ editMode ? '取消' : '编辑' }}</el-button>
        <el-button v-if="editMode" type="primary" @click="saveUserInfo">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      userInfo: {
        username: '',
        password: '',
        niname: '',
        email: '',
        gender: '',
        phone: '',
        address:''
      },
      rules: {
        // 表单验证规则
      },
      editMode: false
    };
  },
  mounted() {
    console.log(localStorage.getItem('token'))
    this.loadUserInfo(); // 在组件创建时调用检查登录状态的方法
  },
  methods: {
    
loadUserInfo() {
  axios.get('http://192.168.84.216:8080/api/user/get_by_uid',
  {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      token: localStorage.getItem('token')
    }
  }
  )
  .then(response => {
    console.log(response.data)
    this.userInfo = response.data.data;
    // 设置其他字段的初始值
    this.userInfo.niname = response.data.data.niname;
    this.userInfo.email = response.data.data.email;
    this.userInfo.gender = response.data.data.gender;
    this.userInfo.phone = response.data.data.phone;
    this.userInfo.username = response.data.data.username;
    this.userInfo.address = response.data.data.address;

  })
  .catch(error => {
    console.error('获取用户信息时出现错误', error);
  });
},

    toggleEditMode() {
      this.editMode = !this.editMode;
    },
    saveUserInfo() {
      axios.post('http://192.168.84.216:8080/api/user/change_info', 
      this.userInfo, 
      {
        headers: {
          'token': localStorage.getItem('token')
        }
      }
      )
        .then(response => {
          console.log('用户信息保存成功', response.data);
          this.editMode = false;
          // 处理保存成功的逻辑
        })
        .catch(error => {
          console.error('保存用户信息时出现错误', error);
          // 处理保存失败的逻辑
        });
    }
  }
};
</script>
<style scoped>
.el-form-item {
  margin-left: 430px;
}
</style>