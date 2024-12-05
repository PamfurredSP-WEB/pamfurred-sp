import { createRouter, createWebHistory } from "vue-router";
import dashboard from '@/pages/master/dashboard.vue'
import login from "@/pages/login.vue";

const routes = [
 {
    name: 'Dashboard',
    path: '/dashboard',
    component: dashboard
 },
 {  
    name: 'Login',
    path: '/',
    component: login
 }
];

const router = Router();
export default router;
function Router(){
    const router = new createRouter({
        history: createWebHistory(),
        routes,
    });
    return router;
}
