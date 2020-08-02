import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

function lazyLoad(view) {
  return () => import(`../views/${view}.vue`);
}

const routes = [
  {
    path: '/',
    name: 'Zone Lookup',
    component: lazyLoad('ZoneLookup'),
  },
  {
    path: '/zone-edit',
    name: 'Zone Edit',
    component: lazyLoad('ZoneEdit'),
  },
];

const router = new VueRouter({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
