export interface VipInfo {
    vipLevel: string;
    points: number;
    nextLevelName: string;
    nextLevelPoints: number;
}

export interface OrderInfo {
    pendingPayment: number;
    toBeShipped: number;
    shipped: number;
    completed: number;
}

export interface NavItem {
    name: string;
    path: string;
    desc?: string;
}
