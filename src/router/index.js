import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

const routes = [
    {
        path: '/letra/:userId',
        name: 'paymentLetters',
        component: () => import('../components/PaymentLetters')
    },
    {
        path: '/operacion/:userId/:paymentLetterId',
        name: 'Operation',
        component: () => import('../components/Operation')
    },
    {
        path: '/',
        name: 'login-form',
        component: () => import('../components/login-form')
    },
    {
        path: '/register',
        name: 'register-form',
        component: () => import('../components/register-form')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router