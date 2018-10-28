import Vue from 'vue';
import routes from './routes';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/common.css';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost/pagedesign-consumer';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.withCredentials=true;

//引入ElementUI
Vue.use(ElementUI);

//引入vue-router
Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  routes: routes
});

const app = new Vue({
    el: '#app',
    data: {
    },
    router: router
});
