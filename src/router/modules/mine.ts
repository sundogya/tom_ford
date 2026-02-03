
import type { MyRoute } from '@/config/type';
const routes: MyRoute[] = [
    {
        path: 'mine',
        lazy: async () => ({ Component: (await import('@/views/mine/index.jsx')).default }),
        meta: {
            title: 'Mine Page'
        }
    },
    {
        path: 'mine/information',
        lazy: async () => ({ Component: (await import('@/views/mine/infomartion.tsx')).default }),
        meta: {
            title: 'Mine Information Page'
        }
    },

];
export default routes