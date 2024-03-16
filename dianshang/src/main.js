import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueRouter from 'vue-router'
//引入路由器
import router from './router'
//引入axios
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.prototype.$axios = axios;


new Vue({
  el:'#app',
  render: h => h(App),
  beforeCreate() {
		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
	},
  router:router
})
