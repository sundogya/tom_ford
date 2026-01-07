
import type { MyRoute } from '@/config/type';
const routes: MyRoute[] = [
    {
        path: 'mine',
        lazy: async () => ({ Component: (await import('@/views/mine/index.jsx')).default }),
        meta: {
            title: 'Mine Page'
        }
    },

];
export default routes