<template>
  <div class="order-container">
    <h2>我的订单</h2>
    <el-divider></el-divider>
    <div v-if="orders.length === 0">
      <el-empty>
        <el-button type="primary"><router-link to="/home/first" style="text-decoration: none; color: white;">前往主页购买</router-link></el-button>
      </el-empty>
    </div>
    <div v-else>
      <div class="order-item" v-for="order in orders" :key="order.id">
        <img :src="order.image" alt="商品图片">
        <div>
          <h3>{{ order.name }}</h3>
          <p>价格：{{ order.price }}元</p>
          <p>下单时间：{{ order.orderTime }}</p>
          <p>订单状态：{{ order.status }}</p>
          <button v-if="order.status === '待支付'" @click="makePayment(order)">付款</button>
          <button v-else disabled>已支付</button>
          <button @click="cancelOrder(order)">取消订单</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      orders: []
    };
  },
  created() {
    this.checkLoginStatus(); // 添加用户登录状态检查
    this.fetchOrders(); // 在组件创建时获取订单数据
    this.$bus.$on('order-created', (orderData) => {
      this.orders.push(orderData); // 更新订单数据
    });
  },
  methods: {
    checkLoginStatus() { // 新增的用户登录状态检查方法
      
      this.loadUserInfo()
    },
    
    loadUserInfo() { // 加载用户信息的方法
      axios.get('http://192.168.27.216:8080/api/user/get_user_info', {
        headers: {
          'token':localStorage.getItem('token')
        }
      })
      .then(response => {
        console.log('成功加载用户信息:', response.data);
      })
      .catch(error => {
        console.error('获取用户信息时出现错误', error);
      });
    },

    fetchOrders() {
  axios.get('/api/orders', {
      headers: {
          'token': localStorage.getItem('token')
      }
  })
  .then(({ data }) => {
    this.orders = data; // 更新订单数据
  })
  .catch(error => {
    console.error('Failed to fetch orders:', error);
  });
},
makePayment(order) {
  axios.post(`/api/orders/${order.id}/pay`, null, {
      headers: {
          'token': localStorage.getItem('token')
      }
  })
  .then(() => {
    order.status = '已支付'; // 更新订单状态
  })
  .catch(error => {
    console.error('Failed to make payment:', error);
  });
},
cancelOrder(order) {
  axios.delete(`/api/orders/${order.id}`, {
      headers: {
          'token': localStorage.getItem('token')
      }
  })
  .then(() => {
    this.orders = this.orders.filter(o => o.id !== order.id); // 从订单列表中移除已取消的订单
  })
  .catch(error => {
    console.error('Failed to cancel order:', error);
  });
}
  }
};
</script>


  
  
  <style scoped>
  /* 样式可以根据需求进行自定义 */
  .order-container {
    max-width: 800px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .order-item {
    display: flex;
    align-items: center;
    padding: 10px;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .order-item img {
    width: 100px;
    height: 100px;
    margin-right: 20px;
    border-radius: 5px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #ff6600;
    color: #fff;
    border: none;
    cursor: pointer;
    border-radius: 5px;
  }
  </style>
  