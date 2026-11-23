import type { MyRoute } from '@/config/type';

const routes: MyRoute[] = [
    {
        path: 'gift/custom',
        lazy: async () => ({ Component: (await import('@/views/gift/custom.tsx')).default }),
        meta: {
            title: '礼盒定制'
        }
    },
    {
        path: 'gift/try',
        lazy: async () => ({ Component: (await import('@/views/gift/try.tsx')).default }),
        meta: {
            title: '星品试用'
        }
    },
    {
        path: 'gift/redeem',
        lazy: async () => ({ Component: (await import('@/views/gift/redeem.tsx')).default }),
        meta: {
            title: '积分兑礼'
        }
    },
];

export default routes;
