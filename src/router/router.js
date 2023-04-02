import Main from '@/pages/Main';
import Comment from '@/pages/CommentPage';
import About from '@/pages/AboutPage';
import CommentDetails from '@/pages/CommentDetails';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        component: Main,
    },
    {
        path: '/comment',
        component: Comment,
    },
    {
        path: '/about',
        component: About,
    },
    {
        path: '/comment/:id',
        component: CommentDetails,
    },
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;