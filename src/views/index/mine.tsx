import { useEffect, useState } from "react";
import css from "./style/index.module.less";
import { useNavigate } from 'react-router-dom';

import { KeyboardArrowRightSharp} from '@mui/icons-material';
interface VipInfo {
    vipLevel: string;
    points: number;
    nextLevelName: string;
    nextLevelPoints: number;
}
interface OrderInfo {
    pendingPayment: number;
    toBeShipped: number;
    shipped: number;
    completed: number;
}
interface NavItem {
    name: string;
    path: string;
    desc?: string;
}
const Mine = () => {
    const [vipInfo, setVipInfo] = useState<Partial<VipInfo>>({});
    const [orderInfo, setOrderInfo] = useState<Partial<OrderInfo>>({});
    const [navList, setNavList] = useState<Array<NavItem>>([]);
    const navigate = useNavigate();
    const toNav = (path: string) => {
        navigate(path);
    }
    useEffect(() => {
        setVipInfo({
            vipLevel: '银熠会员',
            points: 1750,
            nextLevelName: '鎏金会员',
            nextLevelPoints: 2500
        });
        setOrderInfo({
            pendingPayment: 2,
            toBeShipped: 1,
            shipped: 3,
            completed: 5
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
    return (<div className={css.mine}>
        <PersonInfo vipInfo={vipInfo} toNav={toNav} />
        <BannerResource toNav={toNav} />
        <OrderTabs toNav={toNav} orderInfo={orderInfo} />
        <NavList toNav={toNav} navList={navList} />
    </div>)
}
const PersonInfo = ({ vipInfo, toNav }: { vipInfo: Partial<VipInfo>, toNav: (path: string) => void }) => {
    return (<>
        <div className={css.personInfo}>
            <div className={css.info}>
                <span className={css.hello}>HELLO</span>
                <span className={css.toInformation} onClick={() => toNav(`/mine/information`)}>完善个人信息</span>
            </div>
            <div className={css.vipInfo}>
                <div className={css.vipLeft}>
                    <span className={css.currentLevel}>{vipInfo.vipLevel}</span>
                    <span className={css.currentPoints}>{vipInfo.points}积分</span>
                </div>
                <div className={css.vipRight}>
                    <span className={css.nextLevelName}>{vipInfo.nextLevelName}</span>
                    <span className={css.nextLevelPoints}>年累计消费{vipInfo.nextLevelPoints}即可升级</span>
                </div>
            </div>
            <div className={css.vipAdvantage}>
                <span onClick={() => toNav(`/mine/vip`)}>会员权益</span>
                <span onClick={() => toNav(`/mine/coupons`)}>我的礼券</span>
            </div>
        </div>
    </>)
}
const BannerResource = ({ toNav }: { toNav: (path: string) => void }) => {
    return (<>
        <div className={css.bannerResource}>
            <div className={css.bannerLeft}>
                <span>MEMBER BENEFIT</span>
                <span className={css.leftSmall}>社群私享好礼</span>
                <span>加入专属社群福利 解锁私享加赠礼</span>
                <span className={`${css.leftSmall} ${css.toResource}`} onClick={() => toNav(`/banner/resource`)}>立即前往</span>
            </div>
            <div className={css.bannerRight}>
                <img src="https://sdcdn.io/tf/tf_sku_T1XF01_2000x2000_0.png?height=1400px&width=1400px" alt="banner_resource" />
            </div>
        </div>
    </>)
}
const OrderTabs = ({ toNav, orderInfo }: { toNav: (path: string) => void, orderInfo: Partial<OrderInfo> }) => {
    return (<>
        <div className={css.orderTabs}>
            <span className={css.orderTitle}>我的订单</span>
            <div className={css.orderContent}>
                <span onClick={() => toNav(`/order/pendingPayment`)}>待付款({orderInfo.pendingPayment || 0})</span>
                <span onClick={() => toNav(`/order/toBeShipped`)}>待发货({orderInfo.toBeShipped || 0})</span>
                <span onClick={() => toNav(`/order/shipped`)}>已发货({orderInfo.shipped || 0})</span>
                <span onClick={() => toNav(`/order/completed`)}>已完成({orderInfo.completed || 0})</span>
            </div>
        </div>
    </>)
}
const NavList = ({ toNav, navList }: { toNav: (path: string) => void, navList: Array<NavItem> }) => {
    return (<>
        <div className={css.navList}>
            {navList.map((item, index) => (
                <div key={index} className={css.navItem} onClick={() => toNav(item.path)}>
                    <span>{item.name}</span>
                    <div className={css.navRight}>
                        <span>{item.desc}</span>
                        <KeyboardArrowRightSharp />
                    </div>
                </div>
            ))}
        </div>
    </>)
}
export default Mine;