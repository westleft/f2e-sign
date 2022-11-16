import { createRouter, RouterOptions, Router, RouteRecordRaw, createWebHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
 { path: '/', name: 'Home', component: () => import('@/views/Home.vue') },
 { path: '/sign', name: 'Sign', component: () => import('@/views/Sign.vue') },
 { path: '/:pathMatch(.*)*', name: 'NotFound', component: () => import('@/views/NotFound.vue') },
]

const options: RouterOptions = {
 history: createWebHistory("f2e-sign"),
 routes,
}

const router: Router = createRouter(options)

export default router