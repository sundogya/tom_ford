
import type { MyRoute } from '@/config/type';
const routes: MyRoute[] = [
    {
        path: 'order',
        lazy: async () => ({ Component: (await import('@/views/order/index.tsx')).default }),
        meta: {
            title: 'Order Page'
        }
    },

];
export default routes