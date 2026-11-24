import { useEffect, lazy, Suspense } from "react";
import { IndexContext, useIndexContext, useIndexValue } from "@/context/IndexContext";
import NavBar, { type NavTabItem } from "@/components/NavBar";
import PageLoading from "@/components/PageLoading";
import css from "./style/index.module.less";
import { AccountCircle, ShoppingBagOutlined, RedeemOutlined, Reorder, HomeFilled } from '@mui/icons-material';
const Home = lazy(() => import('./home'));
const Category = lazy(() => import('./category'));
const ShoppingCart = lazy(() => import('./shoppingcart'));
const Mine = lazy(() => import('./mine'));
import { useLocation, useNavigate } from 'react-router-dom';

function HomeContent() {
    const { cartCount } = useIndexContext();
    const tabs: NavTabItem[] = [
        { title: '首页', icon: <HomeFilled />, content: (
            <Suspense fallback={<PageLoading />}>
                <Home />
            </Suspense>
        ) },
        { title: '全部产品', icon: <Reorder />, content: (
            <Suspense fallback={<PageLoading />}>
                <Category />
            </Suspense>
        ) },
        { title: '星品试用', icon: <RedeemOutlined /> },
        { title: '购物车', icon: <ShoppingBagOutlined />, badge: cartCount, content: (
            <Suspense fallback={<PageLoading />}>
                <ShoppingCart />
            </Suspense>
        ) },
        { title: '个人中心', icon: <AccountCircle />, content: (
            <Suspense fallback={<PageLoading />}>
                <Mine />
            </Suspense>
        ) },
    ];
    useEffect(() => {
        console.log("Home mounted");
        return () => {
            console.log("Home unmounted");
        };
    }, []);

    return (
        <div className={css.indexModule}>
            {/* 将路由与底部导航关联：currentTab 从路径派生，点击通过 onTabChange 导航 */}
            <NavWrapper tabs={tabs} />
        </div>
    );
}

function NavWrapper({ tabs }: { tabs: NavTabItem[] }) {
    const navigate = useNavigate();
    const location = useLocation();
    const paths = ['/index/home', '/index/category', '/gift/try', '/index/shoppingcart', '/index/mine'];
    const idx = paths.indexOf(location.pathname);
    const currentIndex = idx === -1 ? 0 : idx;

    const handleTabChange = (newIndex: number) => {
        const to = paths[newIndex] || paths[0];
        navigate(to);
    }

    return <NavBar tabs={tabs} currentTab={currentIndex} onTabChange={handleTabChange} />
}

export default function Index() {
    const value = useIndexValue();
    return (
        <IndexContext.Provider value={value}>
            <HomeContent />
        </IndexContext.Provider>
    );
}
