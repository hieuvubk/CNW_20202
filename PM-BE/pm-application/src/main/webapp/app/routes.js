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
        name: 'homepage',
        pattern: '',
        data: {},
        component: 'app-homepage',
        resolve: () => import('./pages/homepage/Homepage'),
        authentication: {
            authenticate: authenticated,
            unauthenticated: notAuthenticated
        }
    },
    {
        name: 'search-job',
        pattern:'search',
        data:{},
        component:'app-search-job',
        resolve:()=> import('./pages/search-job/searchJob')
    },
    {
        name:'applicant',
        pattern:'applicant',
        data:{},
        component:'app-recruiter-applicant',
        resolve:()=>import('./pages/recruiter-applicants/recruiter-applicants')
    },
    {
        name:'network',
        pattern:'network',
        data:{},
        component:'app-network',
        resolve:()=> import('./pages/network/network')
    },
    {
        name: 'create-company',
        pattern: 'create-company',
        data: {},
        component: 'app-create-company',
        resolve:()=> import('./pages/create-company/createCompany')
    },
    {
        name: 'update-company',
        pattern: 'update-company/:id',
        data: {},
        component: 'app-update-company',
        resolve:()=> import('./pages/update-company/UpdateCompany')
    },
    {
        name: 'company-page',
        pattern: 'company/:id',
        data:{},
        component:'app-company-page',
        resolve: ()=> import('./pages/company-page/CompanyPage'),
    },
    {
        name: 'account-setting',
        pattern: 'account',
        data: {},
        component: 'app-account-setting',
        resolve: () => import('./pages/account-setting/AccountSetting'),
        authentication: {
            authenticate: authenticated,
            unauthenticated: notAuthenticated
        }
    },
    {
        name: 'profile',
        pattern: 'profile/:id',
        data: {
            title: 'Profile'
        },
        component: 'app-profile',
        resolve: () => import('./pages/profile/Profile'),
        authentication: {
            authenticate: authenticated,
            unauthenticated: notAuthenticated
        }
    },
    {
        name: 'edit-profile',
        pattern: 'edit-profile',
        data: {
            title: 'Edit Profile'
        },
        component: 'app-edit-profile',
        resolve: () => import('./pages/edit-profile/EditProfile'),
        authentication: {
            authenticate: authenticated,
            unauthenticated: notAuthenticated
        }
    },
    {
        name: 'my-company',
        pattern: 'my-company',
        data: {
            title: 'My company'
        },
        component: 'app-my-company',
        resolve: () => import('./pages/my-company/MyCompany'),
        authentication: {
            authenticate: authenticated,
            unauthenticated: notAuthenticated
        }
    },
    {
        name: 'my-company-id',
        pattern: 'company-admin/:id',
        data: {
            title: 'My company by id'
        },
        component: 'app-my-company-id',
        resolve: () => import('./pages/my-company/MyCompanyID'),
        authentication: {
            authenticate: authenticated,
            unauthenticated: notAuthenticated
        }
    },
    {
        name: 'chat',
        pattern: 'chat/:conversationId',
        data: {
            title: 'Chat App'
        },
        component: 'app-chat',
        resolve: () => import('./pages/chat/Chat'),
        authentication: {
            authenticate: authenticated,
            unauthenticated: notAuthenticated
        }
    },
    {
        name: 'not-found',
        pattern: '*',
        data: {
            title: 'Not Found'
        },
        component: 'app-not-found',
        resolve: () => import('./pages/not-found/NotFound')
    }
];

export default routes;
