import { memo } from "react";
import css from "../style/index.module.less";
import type { OrderInfo } from "../mine.types";

type OrderTabsProps = {
    toNav: (path: string) => void;
    orderInfo: OrderInfo;
};

const OrderTabs = ({ toNav, orderInfo }: OrderTabsProps) => {
    return (
        <>
            <div className={css.orderTabs}>
                <span className={css.orderTitle}>我的订单</span>
                <div className={css.orderContent}>
                    <span onClick={() => toNav(`/order?type=pendingPayment`)}>待付款({orderInfo.pendingPayment})</span>
                    <span onClick={() => toNav(`/order?type=toBeShipped`)}>待发货({orderInfo.toBeShipped})</span>
                    <span onClick={() => toNav(`/order?type=shipped`)}>已发货({orderInfo.shipped})</span>
                    <span onClick={() => toNav(`/order?type=completed`)}>已完成({orderInfo.completed})</span>
                </div>
            </div>
        </>
    );
};

export default memo(OrderTabs);
