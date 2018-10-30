import Home from './pages/Home.vue';
import Design from './pages/Design.vue';
import ViewPage from './pages/ViewPage.vue';
import ErrorPage from './pages/404.vue';

const routes = [
    {
      name: '/', path: '/page', component: Design
    },
    {
      name: 'design', path: '/page/design', component: Design
    },
    {
      name: 'view', path: '/page/view/:pageId', component: ViewPage
    },
    {
      path: '*', component: ErrorPage
    }
];

export default routes;
