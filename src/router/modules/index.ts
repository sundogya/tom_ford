
import type { MyRoute } from '@/config/type';
const routes: MyRoute[] = [
    {
        path: 'index',
        lazy: async () => ({ Component: (await import('@/views/index/index.tsx')).default }),
        children: [
            {
                path: 'home',
                lazy: async () => ({ Component: (await import('@/views/index/home.tsx')).default }),
                meta: {
                    title: 'Home Page'
                },
            },
            {
                path: 'category',
                lazy: async () => ({ Component: (await import('@/views/index/category.tsx')).default }),
                meta: {
                    title: 'Category Page'
                },
            },
            {
                path: 'gift',
                lazy: async () => ({ Component: (await import('@/views/index/gift.tsx')).default }),
                meta: {
                    title: 'Gift Page'
                },
            },
            {
                path: 'shoppingcart',
                lazy: async () => ({ Component: (await import('@/views/index/shoppingcart.tsx')).default }),
                meta: {
                    title: 'Shopping Cart Page'
                },
            },
            {
                path: 'mine',
                lazy: async () => ({ Component: (await import('@/views/index/mine.tsx')).default }),
                meta: {
                    title: 'Mine Page'
                },
            },
        ] as MyRoute[],
    },

];
export default routes