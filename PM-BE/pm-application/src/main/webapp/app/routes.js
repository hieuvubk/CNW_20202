import { authenticated, authorized } from './shared/guard/auth';
import { ADMIN, USER } from './config/authority';

const notAuthenticated = {
    name: 'Not authenticated',
    component: 'app-not-authenticated',
    resolve: () => import('./pages/auth/NotAuthenticated')
};
const notAuthorized = {
    name: 'Not authorized',
    component: 'app-not-authorized',
    resolve: () => import('./pages/auth/NotAuthorized')
};

const routes = [
    {
        name: 'intro',
        pattern: '',
        data: {},
        component: 'app-intro',
        resolve: () => import('./pages/intro/Intro')
    },
    {
        name: 'profile',
        pattern: 'profile',
        data: {},
        component: 'app-profile',
        resolve: () => import('./pages/profile/Profile')
    },
    {
        name: 'not-found',
        pattern: '*',
        data: {},
        component: 'app-not-found',
        resolve: () => import('./pages/not-found/NotFound')
    }
];

export default routes;
