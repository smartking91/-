<template>
<div class="content">
    <el-card class="product-card" style="background-color: rgba(255, 255, 255, 0);">
      <!-- 商品推送内容 -->
      <!-- 导航栏 -->



      
     <el-menu mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-submenu index="1">
          <template slot="title">商品信息</template>
          <router-link to="/home/shangpin1">
          <el-menu-item index="1-1">商品1</el-menu-item>
            </router-link>
             <router-link to="/home/shangpin2">
               <el-menu-item index="1-2">商品2</el-menu-item>
                   </router-link>
          
        </el-submenu>
        <el-menu-item index="2">推荐</el-menu-item>
        <el-menu-item index="3">3折疯抢</el-menu-item>
        <el-menu-item index="4">奢品</el-menu-item>
        <el-menu-item index="5">女装</el-menu-item>
        <el-menu-item index="6">美妆</el-menu-item>
        <el-menu-item index="7">运动</el-menu-item>
        <el-menu-item index="8">鞋包</el-menu-item>
        <el-menu-item index="9">母婴</el-menu-item>
        <el-menu-item index="10">电器</el-menu-item>
        <el-menu-item index="11">男装</el-menu-item>
        <el-menu-item index="12">内衣</el-menu-item>
        <el-menu-item index="13">百货</el-menu-item>
        <el-menu-item index="14">首饰</el-menu-item>
        <el-menu-item index="15">食品</el-menu-item>
        <el-menu-item index="16">家纺</el-menu-item>
        <el-menu-item index="17">
        <el-input placeholder="春装女2024" v-model="searchText" style="width: 150px; position: relative;">
          <template slot="suffix">
            <i class="el-input__icon el-icon-search" style="position: absolute; right: 10px; top: 50%; transform: translateY(-50%);"></i>
          </template>
        </el-input>
       </el-menu-item>
        

      </el-menu>

      <!-- 轮播图 -->
      <el-carousel :interval="4000" type="card" height="200px" style="width: 100%">
      <el-carousel-item v-for="item in carouselItems" :key="item.id" style="text-align: center;">
        <img :src="item.image" alt="carousel-item" style="width: auto;display: inline-block;"/>
        <h3 class="custom-carousel-title">{{ item.title }}</h3>
      </el-carousel-item>
    </el-carousel>

 

      </el-card>
    </div>
  
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      carouselItems: [],
      newProducts: [],
      hotProducts: []
    };
  },
  created() {
    this.fetchCarouselData();
    this.fetchNewProducts();
    this.fetchHotProducts();
    
  },
  methods: {
    async fetchCarouselData() {
      try {
        const response = await axios.get('http://192.168.84.216:8080/products/hot_list');
        this.carouselItems = response.data.data;
      } catch (error) {
        console.error('Failed to fetch carousel data', error);
      }
    },
    async fetchNewProducts() {
      try {
        const response = await axios.get('http://192.168.84.216:8080/products/hot_list');
        this.newProducts = response.data.data;
      } catch (error) {
        console.error('Failed to fetch new products', error);
      }
    },
    async fetchHotProducts() {
      try {
        const response = await axios.get('http://192.168.84.216:8080/products/hot_list');
        this.hotProducts = response.data.data;
        
      } catch (error) {
        console.error('Failed to fetch hot products', error);
      }
    }
  }
};
</script>
<style>



/* 轮播图 */
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: white;

}

.el-carousel__item:nth-child(2n+1) {
  background-color: white;
}

/* 为面板标题添加样式 */
.el-card__header {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}


/* 导航栏样式 */
.el-menu {
  margin-bottom: 20px;
}

/* 修改导航栏中的下拉菜单样式 */
.el-submenu__title {
  font-weight: bold;
}

/* 调整链接的样式 */
.el-menu-item {
  margin-right: 20px;
}



.el-carousel__item img {
  width: 300px; /* 根据实际情况调整图片的大小 */
  height: 200px; /* 根据实际情况调整图片的大小 */
  object-fit: cover; /* 确保图片不会拉伸变形 */
  margin-right: 10px;
}


</style>