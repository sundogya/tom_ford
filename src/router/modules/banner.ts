import type { MyRoute } from '@/config/type';

const routes: MyRoute[] = [
    {
        path: 'banner/resource',
        lazy: async () => ({ Component: (await import('@/views/banner/resource.tsx')).default }),
        meta: {
            title: '社群私享好礼'
        }
    },
];

export default routes;
