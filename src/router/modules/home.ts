
import type { MyRoute } from '@/config/type';
const routes: MyRoute[] = [
    {
        path: 'home',
        lazy: async () => ({ Component: (await import('@/views/home/index.tsx')).default }),
        meta: {
            title: 'Home Page'
        },
        children: [
            {
                path: 'add',
                lazy: async () => ({ Component: (await import('@/views/home/add.tsx')).default }),
                meta: {
                    title: 'Home Add Page'
                }
            }
        ] as MyRoute[]
    },

];
export default routes