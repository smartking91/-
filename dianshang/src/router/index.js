import Vue from 'vue';
import VueRouter from 'vue-router';
import login from '../views/DengLu2.vue';
import home from '../views/ShouYe.vue';
import che from '../views/GouwuChe.vue';
import first from '../views/FirstYe.vue';
import xinxi from '../views/XinXi.vue';
import shangpin1 from '../views/ShangPin1.vue';
import shangpin2 from '../views/ShangPin2.vue';
import dingdan from '../views/DingDan.vue';
Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history', // 可以选择使用 'history' 模式或者 'hash' 模式
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/', // 当访问根路径时
      redirect: '/home/first' // 自动重定向到 /home 路径
    },
    {
      path: '/home',
      component: home,
      children: [  // 添加子路由
        {
          path: 'che',  // 子路由路径为 /home/che
          component: che
        },
        {
          path: 'xinxi',  // 子路由路径为 /home/xinxi
          component: xinxi
        },
        {
          path: 'shangpin1',  // 子路由路径为 /home/shangpin1
          component: shangpin1
        },
        {
          path: 'shangpin2',  // 子路由路径为 /home/shangpin1
          component: shangpin2
        },
        {
          path: 'dingdan',  // 子路由路径为 /home/shangpin1
          component: dingdan
        },
        {
          path: 'first',  // 子路由路径为 /home/first
          component: first
        },
        {
          path: '/login',
          component: login
        }
      ]
    },
   
  ]
});

export default router;
