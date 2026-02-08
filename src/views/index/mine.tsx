import { useEffect, useState } from "react";
import css from "./style/index.module.less";
import PersonInfo from "./components/PersonInfo";
import BannerResource from "./components/BannerResource";
import OrderTabs from "./components/OrderTabs";
import NavList from "./components/NavList";
import type { NavItem, OrderInfo, VipInfo } from "./mine.types";
import { useToNav } from "../../tools/common";
const Mine = () => {
    const toNav = useToNav();
    const [vipInfo, setVipInfo] = useState<VipInfo>({
        vipLevel: "",
        points: 0,
        nextLevelName: "",
        nextLevelPoints: 0,
    });
    const [orderInfo, setOrderInfo] = useState<OrderInfo>({
        pendingPayment: 0,
        toBeShipped: 0,
        shipped: 0,
        completed: 0,
    });
    const [navList, setNavList] = useState<Array<NavItem>>([]);
    useEffect(() => {
        setVipInfo({
            vipLevel: '银熠会员',
            points: 1750,
            nextLevelName: '鎏金会员',
            nextLevelPoints: 2500
        });
        setOrderInfo({
            pendingPayment: 2,
            toBeShipped: 0,
            shipped: 0,
            completed: 0
        });
        setNavList([
            { name: '礼盒定制', path: '/gift/custom' },
            { name: '星品试用', path: '/gift/try' },
            { name: '积分兑礼', path: '/gift/redeem' },
            { name: '我的地址', path: '/mine/address' },
            { name: '退换货政策', path: '/mine/collections' },
            { name: '隐私政策', path: '/mine/privacy' },
            { name: '条款条件', path: '/mine/contract' },
            { name: '在线客服', path: '/mine/contact', desc: '周一到周日 09:00-22:00' },
            { name: '电话热线', path: '/mine/hotline', desc: '周一到周五 09:00-18:00' },
            { name: '账号注销', path: '/mine/delete' },
        ]);
    }, [])
    return (
        <div className={css.mine}>
            <PersonInfo vipInfo={vipInfo} toNav={toNav} />
            <BannerResource toNav={toNav} />
            <OrderTabs toNav={toNav} orderInfo={orderInfo} />
            <NavList toNav={toNav} navList={navList} />
        </div>
    );
};
export default Mine;