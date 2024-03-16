<template>
  <div class="cart-container">
    <h2 style="color: white;">购 物 车</h2>
    <div v-if="cartItems.length === 0">
      <el-empty description="购物车为空"></el-empty>
    </div>
    <div v-else>
      <div class="cart-item" v-for="item in cartItems" :key="item.id">
        <img :src="item.image" alt="商品图片">
        <div>
          <h3>{{ item.name }}</h3>
          <p>价格：{{ item.price }}元</p>
          <button @click="removeFromCart(item)">移除</button>
        </div>
      </div>
      <div class="total-price">总价：{{ getTotalPrice() }}元</div>
      <button @click="createOrder">结算</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      cartItems: []
    };
  },
  created() {
    this.checkLoginStatus();
    this.fetchCartItems();
  },
  methods: {
    checkLoginStatus() {
    
    this.loadUserInfo()
},

loadUserInfo() {
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
//token
        fetchCartItems() {
            axios.get('/api/cart/items', {
                headers: {
                    'token': localStorage.getItem('token')
                }
            })
            .then(response => {
              this.cartItems = response.data;
            })
            .catch(error => {
              console.error('Failed to fetch cart items:', error);
            });
            },

    removeFromCart(item) {
      const index = this.cartItems.indexOf(item);
      if (index !== -1) {
        this.cartItems.splice(index, 1);
      }
    },
    getTotalPrice() {
      return this.cartItems.reduce((total, item) => total + item.price, 0);
    },
    createOrder() {
                if (this.cartItems.length > 0) {
                  this.checkoutWithBackend(); // 调用后端结算方法
                } else {
                  console.log('购物车为空，无法结算');
                }
              },
checkoutWithBackend() {
          const orderData = {
            items: this.cartItems,
            totalPrice: this.getTotalPrice(),
            orderTime: new Date().toLocaleString(),
            status: '待支付'
          };
          axios.post('http://192.168.27.216:8080/api/checkout', orderData, {
            headers: {
              'token': localStorage.getItem('token')
            }
          })
          .then(response => {
            console.log('成功创建订单:', response.data);
            this.cartItems = []; // 清空购物车
            this.$bus.$emit('order-created', response.data);
          })
          .catch(error => {
            console.error('Failed to create order:', error);
          });
}

  }
};
</script>


<style scoped>
/* 样式可以根据需求进行自定义 */
.cart-container {
  max-width: 800px;
  margin: 0 auto;
}
.cart-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.cart-item img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}
.total-price {
  margin-top: 20px;
  font-size: 18px;
}
button {
  padding: 10px 20px;
  background-color: #ff6600;
  color: #fff;
  border: none;
  cursor: pointer;
}
</style>
