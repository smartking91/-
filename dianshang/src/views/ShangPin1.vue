<template>
  <div class="product-details">
    <div class="product-info" v-if="product">
      <h1>{{ product.name }}</h1>  
      <p>{{ product.description }}</p>
      <img :src="product.image" alt="product image">
      <p>价格: {{ product.price }}</p>
      <button @click="addToCart">添加到购物车</button>
    </div>
    <div v-else>
      <el-empty description="商品为空"></el-empty>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      product: null
    };
  },
  created() {
    this.fetchProduct();
  },
  methods: {
    fetchProduct() {
      axios.get(`http://192.168.84.216:8080/products/1/details`)
        .then(response => {
          this.product = response.data.data;
        })
        .catch(error => {
          console.error('Error fetching product', error);
        });
    },
    addToCart() {
          axios.post('http://192.168.84.216:8080/carts/add_to_cart', 
            { 
              productId: this.product.id, 
              quantity: 1 
            },
            {
              headers: {
                'token': localStorage.getItem('token')
              }
            }
          )
          .then(response => {
            console.log('Product added to cart', response.data);
          })
          .catch(error => {
            console.error('Error adding product to cart', error);
          });
        }

  }
};
</script>

<style>
/* 在style标签中添加以下样式 */

.product-details {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* 垂直方向对齐方式 */
}

.product-info {
  flex: 1;
  margin-right: 20px;
  border: 1px solid #ccc; /* 添加一个边框以突出显示产品信息区域 */
  padding: 20px; /* 增加内边距 */
  text-align: center; /* 让内容居中显示 */
}

.product-info img {
  max-width: 100%; /* 图片宽度最大为父容器宽度 */
  height: auto; /* 图片高度自适应 */
  margin-bottom: 15px; /* 底部留白 */
}

button {
  background-color: #4CAF50; /* 设置按钮背景颜色 */
  color: white; /* 设置按钮文字颜色 */
  padding: 10px 20px; /* 按钮内边距 */
  border: none; /* 移除按钮边框 */
  cursor: pointer; /* 鼠标悬停时显示指针形状 */
  border-radius: 5px; /* 圆角 */

}
</style>
