<template>
  <div class="main-container" >
    <!-- 导航 -->
    <el-menu
      :default-active="activeIndex"
      mode="horizontal"
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      class="menu-container"
    >
      <el-menu-item index="first">首页 </el-menu-item>
      <el-menu-item v-if="loggedIn" index="che">购物车</el-menu-item>
      <el-menu-item index="login">登录</el-menu-item>
      <el-menu-item v-if="loggedIn" index="xinxi">用户信息</el-menu-item>
      <el-menu-item v-if="loggedIn" index="dingdan">我的订单</el-menu-item>
    </el-menu>
    <div class="background-container">
      <router-view></router-view>
    </div>

    <el-footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>购物指南</h3>
          <ul>
            <li>购物流程</li>
            <li>会员介绍</li>
            <!-- 其他购物指南链接 -->
          </ul>
        </div>
        <div class="footer-section">
          <h3>配送方式</h3>
          <ul>
            <li>上门自提</li>
            <li>211限时达</li>
            <!-- 其他配送方式链接 -->
          </ul>
        </div>
        <!-- 其他链接分组 -->
        <div class="footer-section">
          <h3>联系我们</h3>
          <p>客服电话：400-123-4567</p>
          <p>投诉电话：800-987-6543</p>
          <!-- 其他联系方式 -->
        </div>
      </div>
      <div class="copyright">
        <p>© 2023 版权所有</p>
        <p>公司名称 | 浙ICP备12345678号</p>
      </div>
    </el-footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loggedIn: true, // 用户登录状态
      activeIndex: "", // 导航菜单激活项
      newProducts: [
        // 新到好货商品数据
      ],
      hotProducts: [
        // 热销排行商品数据
      ],
    };
  },
  created() {
    this.checkLoginStatus(); // 确保在组件创建时检查登录状态
    this.$bus.$on('loginSuccess', this.updateLoginStatus);
  },
  methods: {
    
      checkLoginStatus() {
      // 在这里使用真实的认证机制检查用户登录状态
      // 示例：假设通过判断cookie中是否有userToken来确定用户是否已登录
      const userToken = localStorage.getItem('token');
      if (userToken) {
        this.loggedIn = true;
      }
    },
    updateLoginStatus() {
    this.checkLoginStatus(); // 手动触发checkLoginStatus方法来更新登录状态
  },
 
    handleSelect(index) {
      if (index === "che") {
        this.$router.push("/home/che"); // 点击购物车按钮后进行路由跳转
      } else if (index === "first") {
        this.$router.push("/home/first"); // 点击首页按钮后进行路由跳转到 /home/first 路径
      } else if (index === "xinxi") {
        this.$router.push("/home/xinxi");
      } // 点击首页按钮后进行路由跳转到 /home/first 路径
      else if (index === "dingdan") {
        this.$router.push("/home/dingdan"); // 点击首页按钮后进行路由跳转到 /home/first 路径
      } else {
        this.activeIndex = index; // 更新激活项
        this.$router.push("/" + index); // 根据激活项进行路由跳转
      }
    },
  },
};
</script>

<style scoped>
.content {
  background-color: rgba(255, 255, 255, 0.5); /* 使用rgba指定一个半透明的白色背景 */
  position: relative; /* 将位置设置为相对定位 */
  z-index: 1; /* 确保组件处于正常的叠放顺序上 */
}


.main-container {
  /* display: flex;
  flex-direction: column;
  justify-content: flex-end; */
  position: relative;
  height: 100vh;
  background: url("../images/background.png");
  background-size: cover;
  background-attachment: fixed;
}
.menu-container {
  margin-left: auto;
}
.el-footer {
  position: fixed; /* 固定定位 */
  bottom: 100px;
  width: 100%; /* 确保宽度占满整个视口 */
}
.footer {
  color: #666;
  padding: 20px 0;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-section {
  margin-right: 30px;
}

.footer-section h3 {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section li {
  line-height: 2;
}

.footer-contact {
  margin-right: 30px;
}

.copyright {
  text-align: center;
  margin-top: 20px;
}
.menu-container .el-menu {
  display: flex;
  justify-content: space-between;
}

.menu-container .el-menu-item:nth-child(3) {
  float: right;
}
</style>