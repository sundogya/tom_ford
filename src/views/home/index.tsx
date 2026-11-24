import { useEffect, useState } from "react";
import { HomeContext, useHomeValue } from "../../context/HomeContext";
import NavBar from "@/components/NavBar";
import PageLoading from "@/components/PageLoading";
import { AccountCircle, ShoppingBagOutlined, RedeemOutlined, Reorder, HomeFilled } from '@mui/icons-material';

function HomeContent() {
    const [currentTab, setCurrentTab] = useState(0);
    const tabs = [
        { title: '首页', icon: <HomeFilled />, content: <PageLoading /> },
        { title: '全部产品', icon: <Reorder />, content: <PageLoading /> },
        { title: '星品试用', icon: <RedeemOutlined />, content: <PageLoading /> },
        { title: '购物车', icon: <ShoppingBagOutlined />, content: <PageLoading /> },
        { title: '个人中心', icon: <AccountCircle />, content: <PageLoading /> },
    ];
    
    useEffect(() => {
        console.log("Home mounted");
        return () => {
            console.log("Home unmounted");
        };
    }, []);

    return (
        <NavBar tabs={tabs} currentTab={currentTab} onTabChange={setCurrentTab} />
    );
}

export default function Home() {
    const value = useHomeValue();

    return (
        <HomeContext.Provider value={value}>
            <HomeContent />
        </HomeContext.Provider>
    );
}
