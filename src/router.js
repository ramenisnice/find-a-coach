import { createRouter, createWebHistory } from 'vue-router';
import store from './store/index';

// import CoachDetail from './pages/coaches/CoachDetail.vue';
import CoachList from './pages/coaches/CoachList.vue';
// import CoachRegistration from './pages/coaches/CoachRegistration.vue';
// import ContactCoach from './pages/requests/ContactCoach.vue';
// import RequestsReceived from './pages/requests/RequestsReceived.vue';
// import UserAuth from './pages/auth/UserAuth.vue';
// import NotFound from './pages/NotFound.vue';

const CoachDetail = () => import('./pages/coaches/CoachDetail.vue');
const CoachRegistration = () => import('./pages/coaches/CoachRegistration.vue');
const ContactCoach = () => import('./pages/requests/ContactCoach.vue');
const RequestsReceived = () => import('./pages/requests/RequestsReceived.vue');
const UserAuth = () => import('./pages/auth/UserAuth.vue');
const NotFound = () => import('./pages/NotFound.vue');

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/find-a-coach/coaches' }, //CoachList
    { path: '/find-a-coach/coaches', component: CoachList }, //CoachList
    {
      path: '/find-a-coach/coaches/:id', //CoachDetail
      component: CoachDetail,
      props: true,
      children: [{ path: 'contact', component: ContactCoach }], //ContactCoach
    },
    {
      path: '/find-a-coach/register',
      component: CoachRegistration,
      meta: { requiresAuth: true },
    }, //CoachRegistration
    {
      path: '/find-a-coach/requests',
      component: RequestsReceived,
      meta: { requiresAuth: true },
    }, //RequestsReceived
    {
      path: '/find-a-coach/auth',
      component: UserAuth,
      meta: { requiresUnauth: true },
    }, //UserAuth
    { path: '/find-a-coach/:notFound(.*)', component: NotFound }, //NotFound
  ],
});

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters['isAuthenticated']) {
    next('/auth');
  } else if (to.meta.requiresUnauth && store.getters['isAuthnticated']) {
    next('/coaches');
  } else {
    next();
  }
});

export default router;
