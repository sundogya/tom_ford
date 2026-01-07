import { useEffect } from "react";
import { IndexContext, useIndexValue } from "@/context/IndexContext";
import NavBar from "@/components/NavBar";
import css from "./style/index.module.less";
import { AccountCircle, ShoppingBagOutlined, RedeemOutlined, Reorder, HomeFilled } from '@mui/icons-material';
import Category from "./category";
import Home from "./home";
import Gift from "./gift";
import ShoppingCart from "./shoppingcart";
import Mine from "./mine";

function HomeContent() {
    const tabs = [
        { title: '首页', icon: <HomeFilled />, content: <Home /> },
        { title: '全部产品', icon: <Reorder />, content: <Category /> },
        { title: '星品试用', icon: <RedeemOutlined />, content: <Gift /> },
        { title: '购物车', icon: <ShoppingBagOutlined />, content: <ShoppingCart /> },
        { title: '个人中心', icon: <AccountCircle />, content: <Mine /> },
    ];

    useEffect(() => {
        console.log("Home mounted");
        return () => {
            console.log("Home unmounted");
        };
    }, []);

    return (
        <div className={css.indexModule}>
            <NavBar tabs={tabs} currentTab={1} />
        </div>
    );
}

export default function Index() {
    const value = useIndexValue();
    return (
        <IndexContext.Provider value={value}>
            <HomeContent />
        </IndexContext.Provider>
    );
}
