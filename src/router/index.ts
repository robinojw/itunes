import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/:media/:query',
    name: 'Home',
    component: Home,
    props: true,
    meta: {
      title: 'eyeTunes 🔊'
    }
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'eyeTunes 🔊'
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.afterEach(to => {
  Vue.nextTick(() => {
    document.title = to.meta.title;
  });
});

export default router;
