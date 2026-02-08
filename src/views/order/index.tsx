import { memo, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import css from "./style/index.module.less";
import { useToNav } from "../../tools/common";
interface OrderGift {
    id: string;
    name: string;
    thumb: string;
    amount: number;
    unit?: string;
    unitNum?: number;
    [keys: string]: unknown;
}
interface Order {
    id: string;
    status: OrderStatus;
    amount: number;
    name: string;
    price: number;
    productId: string;
    thumb: string;
    discount: number;
    totalPrice: number;
    orderTime: string;
    orderSn: string;
    timeLeft?: number;
    unit?: string;
    unitNum?: number;
    giftList: OrderGift[];
    isExpand?: boolean;
}
const statusMap = {
    pendingPayment: '待付款',
    toBeShipped: '待发货',
    shipped: '已发货',
    completed: '已完成',
    cancel: '已取消',
} as const;
type OrderStatus = keyof typeof statusMap;
type OrderType = OrderStatus | 'all';

const tabList: Array<{ title: string; type: OrderType }> = [
    { title: '全部订单', type: 'all' },
    { title: '待付款', type: 'pendingPayment' },
    { title: '待发货', type: 'toBeShipped' },
    { title: '已发货', type: 'shipped' },
    { title: '已完成', type: 'completed' }
];
const orderTypeSet = new Set<OrderType>(tabList.map(item => item.type));

const mockOrders: { list: Order[], total: number } = {
    list: [
        {
            id: '1234567890',
            status: 'cancel',
            name: '「烟熏樱桃」暗樱撩情香水',
            amount: 1,
            price: 3250,
            productId: '94101',
            thumb: 'https://sdcdn.io/tf/tf_sku_T94101_2000x2000_0.png?height=700px&width=700px',
            discount: 10,
            totalPrice: 2925,
            orderTime: '2024-06-01 12:00:00',
            orderSn: 'SN1234567890',
            unit: 'ML',
            unitNum: 40,
            isExpand: false,
            giftList: [
                {
                    id: '123456789001',
                    name: '暗麝心魄',
                    thumb: 'https://sdcdn.io/tf/tf_sku_T94101_2000x2000_0.png?height=700px&width=700px',
                    amount: 1,
                    unitNum: 2,
                    unit: 'ML'
                },
                {
                    id: '123456789002',
                    name: '珍华乌木香水',
                    thumb: 'https://sdcdn.io/tf/tf_sku_T94101_2000x2000_0.png?height=700px&width=700px',
                    amount: 1,
                    unitNum: 4,
                    unit: 'ML'
                },
                {
                    id: '123456789003',
                    name: '迷你唇膏19',
                    thumb: 'https://sdcdn.io/tf/tf_sku_T94101_2000x2000_0.png?height=700px&width=700px',
                    amount: 1,
                },
                {
                    id: '123456789004',
                    name: '高定勃艮第晚宴包',
                    thumb: 'https://sdcdn.io/tf/tf_sku_T94101_2000x2000_0.png?height=700px&width=700px',
                    amount: 1,
                }
            ]
        },
        {
            id: '1234567891',
            status: 'cancel',
            name: '「烟熏樱桃」暗樱撩情香水',
            amount: 1,
            price: 3250,
            productId: '94101',
            thumb: 'https://sdcdn.io/tf/tf_sku_T94101_2000x2000_0.png?height=700px&width=700px',
            discount: 10,
            totalPrice: 2925,
            orderTime: '2024-06-01 12:00:00',
            orderSn: 'SN1234567891',
            unit: 'ML',
            unitNum: 40,
            isExpand: false,
            giftList: [
                {
                    id: '123456789011',
                    name: '暗麝心魄',
                    thumb: 'https://sdcdn.io/tf/tf_sku_T94101_2000x2000_0.png?height=700px&width=700px',
                    amount: 1,
                    unitNum: 2,
                    unit: 'ML'
                },
                {
                    id: '1234567890012',
                    name: '珍华乌木香水',
                    thumb: 'https://sdcdn.io/tf/tf_sku_T94101_2000x2000_0.png?height=700px&width=700px',
                    amount: 1,
                    unitNum: 4,
                    unit: 'ML'
                },
                {
                    id: '123456789013',
                    name: '迷你唇膏19',
                    thumb: 'https://sdcdn.io/tf/tf_sku_T94101_2000x2000_0.png?height=700px&width=700px',
                    amount: 1,
                },
                {
                    id: '123456789014',
                    name: '高定勃艮第晚宴包',
                    thumb: 'https://sdcdn.io/tf/tf_sku_T94101_2000x2000_0.png?height=700px&width=700px',
                    amount: 1,
                }
            ]
        }
    ], total: 2
};

const GiftItem = memo(function GiftItem({ gift, isGift = true, onClick }: { gift: OrderGift, isGift?: boolean, onClick?: () => void }) {
    return (<div className={css.giftItem} onClick={onClick}>
        <div className={css.giftThumb}>
            <img src={gift.thumb} alt={gift.name} />
        </div>
        <div className={css.giftInfo}>
            <div className={css.left}>
                <span>{gift.name}</span>
                {gift.unitNum ? <span>{gift.unitNum}{gift.unit}</span> : null}
                <span>数量：{gift.amount}</span>
            </div>
            <div className={css.right}>
                {isGift ? '礼赠' : `¥${gift?.price}`}
            </div>
        </div>
    </div>);
});
const OrderInfo = memo(function OrderInfo({ order, onClick }: { order: Order, onClick?: () => void }) {
    return (<div className={css.orderInfo} onClick={onClick}>
        <div className={css.infoLine}>
            <div className={css.left}>
                <span>您的订单编号为</span>
                <span>{order.orderSn}</span>
            </div>
            <div className={css.right}>
                <span>{statusMap[order.status]}</span>
            </div>
        </div>
        <div className={css.infoLine}>
            <div className={css.left}>
                <span>下单时间</span>
                <span>{order.orderTime}</span>
            </div>
            <div className={css.right}></div>
        </div>
        <div className={css.infoLine}>
            <div className={css.left}>
                <span>订单金额</span>
                <span>&yen;{order.totalPrice}</span>
            </div>
            <div className={css.right}></div>
        </div>
    </div>);
});
const OrderItem = memo(function OrderItem({ order, toNav, expandOrder }: { order: Order, toNav: (path: string) => void, expandOrder: (order: Order) => void }) {
    return <div className={css.orderItem}>
        <OrderInfo order={order} onClick={() => toNav(`/order/detail?id=${order.id}`)} />
        <div className={css.giftList}>
            <GiftItem gift={{ ...order, price: order.price }} isGift={false} onClick={() => toNav(`/product?id=${order.productId}`)} />
            {(order.isExpand ? order.giftList : order.giftList.slice(0, 1)).map(gift => (
                <GiftItem key={gift.id} gift={gift} />
            ))}
        </div>
        
        {order.giftList.length > 1 && !order.isExpand ? (
            <div className={css.expandButton} onClick={() => expandOrder(order)}>
                <span>展开共{order.giftList.length + 1}件商品</span>
            </div>
        ) : null}
        {['pendingPayment'].includes(order.status) ? (
            <div className={css.optionsButton}>
                <span>取消订单</span>
                <span>亲密付</span>
                <span>去支付</span>
            </div>
        ) : null}
    </div>
});
export default function Home() {
    const toNav = useToNav();
    const [orderType, setOrderType] = useState<OrderType>('all');
    const [orderList, setOrderList] = useState<Order[]>([]);
    const [total, setTotal] = useState<number>(0);
    const [searchParams] = useSearchParams();
    const expandOrder = useCallback((order: Order) => {
        setOrderList(prevList => prevList.map(o => o.id === order.id ? { ...o, isExpand: true } : o));
    }, []);
    const fetchOrders = useCallback(() => {
        // 模拟接口请求，根据订单类型和页码获取订单数据
        // 这里可以替换为实际的接口请求逻辑
        if (['all'].includes(orderType)) {
            setOrderList(mockOrders.list);
            setTotal(mockOrders.total);
        } else {
            setTotal(0);
            setOrderList([]);
        }
    }, [orderType]);
    useEffect(() => {
        fetchOrders();
    }, [orderType, fetchOrders]);
    useEffect(() => {
        const rawType = searchParams.get('type') as OrderType | null;
        const nextType = rawType && orderTypeSet.has(rawType) ? rawType : 'all';
        setOrderType(nextType);
    }, [searchParams]);
    return (<>
        <div className={css.orderContainer}>
            <div className={css.tabList}>
                {tabList.map((tab) => (
                    <span
                        key={tab.type}
                        className={`${css.tabItem} ${orderType === tab.type ? css.active : ''}`}
                        onClick={() => setOrderType(tab.type)}
                    >
                        {tab.title}
                    </span>
                ))}
            </div>
            <div className={css.orderList}>
                {orderList.length > 0 ? orderList.map(order => (
                    <OrderItem key={order.id} order={order} toNav={toNav} expandOrder={() => expandOrder(order)} />
                )) : (<div className={css.emptyOrder}>暂无订单</div>)}
                {total > 0 && orderList.length === total ? (<div className={css.noMoreOrder}>没有更多了</div>) : null}
            </div>
        </div>
    </>);
}