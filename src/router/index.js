import Vue from 'vue'
import Router from 'vue-router';

Vue.use(Router);


const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/popular',
            name: 'popular-movie',
            component: () => import('@/views/popular.vue')
        },
        {
            path: '/edited-movies',
            name: 'edited-movies',
            component: () => import('@/views/edited-movies.vue')
        },
        {
            path: '/search',
            name: 'search-movie',
            component: () => import('@/views/search.vue')
        },
        {
            path: '/:id',
            name: 'movie-one',
            component: () => import('@/views/movie.vue')
        },
    ],
});

export default router