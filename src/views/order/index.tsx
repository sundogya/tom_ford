import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import css from "./style/index.module.less";
interface OrderGift {
    id: string;
    name: string;
    thumb: string;
    amount: number;
    unit?: string;
    unitNum?: number;
}
interface Order {
    id: string;
    status: string;
    amount: number;
    name: string;
    price: number;
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
const statusMap: Record<string, string> = {
    pendingPayment: '待付款',
    toBeShipped: '待发货',
    shipped: '已发货',
    completed: '已完成',
    cancel: '已取消',
};
export default function Home() {
    let [orderType, setOrderType] = useState<string>();
    let [orderList, setOrderList] = useState<Order[]>([]);
    const [total,setTotal] = useState<number>(0);
    const tabList = [
        { title: '全部订单', type: 'all' },
        { title: '待付款', type: 'pendingPayment' },
        { title: '待发货', type: 'toBeShipped' },
        { title: '已发货', type: 'shipped' },
        { title: '已完成', type: 'completed' }
    ];
    const [searchParams] = useSearchParams();
    useEffect(() => {
        return () => { };
    }, []);
    useEffect(() => {
        if (orderType && ['all', 'pendingPayment'].includes(orderType)) {
            setOrderList([
                {
                    id: '1234567890',
                    status: 'pendingPayment',
                    name: '「烟熏樱桃」暗樱撩情香水',
                    amount: 1,
                    price: 3250,
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
                    status: 'pendingPayment',
                    name: '「烟熏樱桃」暗樱撩情香水',
                    amount: 1,
                    price: 3250,
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
            ]);
            setTotal(2);
            console.log("Order mounted", orderType);
        } else {
            setTotal(0);
            setOrderList([]);
        }
    }, [orderType]);
    useEffect(() => {
        const type = searchParams.get('type') || 'all';
        setOrderType(type);
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
                    <div key={order.id} className={css.orderItem}>
                        <div className={css.orderInfo}>
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
                        </div>
                        <div className={css.giftList}>
                            <div className={css.giftItem}>
                                <div className={css.giftThumb}>
                                    <img src={order.thumb} alt={order.name} />
                                </div>
                                <div className={css.giftInfo}>
                                    <div className={css.left}>
                                        <span>{order.name}</span>
                                        {order.unitNum ? <span>{order.unitNum}{order.unit}</span> : null}
                                        <span>数量：{order.amount}</span>
                                    </div>
                                    <div className={css.right}>
                                        &yen;{order.price}
                                    </div>
                                </div>
                            </div>
                            {(order.isExpand ? order.giftList : order.giftList.slice(0, 1)).map(gift => (
                                <div className={css.giftItem} key={gift.id}>
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
                                            礼赠
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {order.giftList.length > 1 && !order.isExpand ? (
                            <div className={css.expandButton} onClick={() => {
                                setOrderList(prevList => prevList.map(o => o.id === order.id ? { ...o, isExpand: true } : o));
                            }}>
                                <span>展开共{order.giftList.length + 1}件商品</span>
                            </div>
                        ) : null}
                    </div>
                )) : (<div className={css.emptyOrder}>暂无订单</div>)}
                {total > 0 && orderList.length === total ? (<div className={css.noMoreOrder}>没有更多了</div>) : null}
            </div>
        </div>

    </>);
}