import type { MyRoute } from '@/config/type';

const routes: MyRoute[] = [
    {
        path: 'mine',
        lazy: async () => ({ Component: (await import('@/views/mine/index.tsx')).default }),
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
    {
        path: 'mine/vip',
        lazy: async () => ({ Component: (await import('@/views/mine/vip.tsx')).default }),
        meta: {
            title: '会员权益'
        }
    },
    {
        path: 'mine/coupons',
        lazy: async () => ({ Component: (await import('@/views/mine/coupons.tsx')).default }),
        meta: {
            title: '我的礼券'
        }
    },
    {
        path: 'mine/address',
        lazy: async () => ({ Component: (await import('@/views/mine/address.tsx')).default }),
        meta: {
            title: '我的地址'
        }
    },
    {
        path: 'mine/collections',
        lazy: async () => ({ Component: (await import('@/views/mine/collections.tsx')).default }),
        meta: {
            title: '退换货政策'
        }
    },
    {
        path: 'mine/privacy',
        lazy: async () => ({ Component: (await import('@/views/mine/privacy.tsx')).default }),
        meta: {
            title: '隐私政策'
        }
    },
    {
        path: 'mine/contract',
        lazy: async () => ({ Component: (await import('@/views/mine/contract.tsx')).default }),
        meta: {
            title: '条款条件'
        }
    },
    {
        path: 'mine/contact',
        lazy: async () => ({ Component: (await import('@/views/mine/contact.tsx')).default }),
        meta: {
            title: '在线客服'
        }
    },
    {
        path: 'mine/hotline',
        lazy: async () => ({ Component: (await import('@/views/mine/hotline.tsx')).default }),
        meta: {
            title: '电话热线'
        }
    },
    {
        path: 'mine/delete',
        lazy: async () => ({ Component: (await import('@/views/mine/delete.tsx')).default }),
        meta: {
            title: '账号注销'
        }
    },
];

export default routes;
