import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import css from "./gift.module.less";

type GiftCategory = "all" | "fragrance" | "makeup" | "accessory";

interface RedeemItem {
    id: string;
    category: Exclude<GiftCategory, "all">;
    tag: string;
    name: string;
    spec: string;
    points: number;
    thumb: string;
}

const categoryTabs: Array<{ key: GiftCategory; label: string }> = [
    { key: "all", label: "全部" },
    { key: "fragrance", label: "香氛" },
    { key: "makeup", label: "彩妆" },
    { key: "accessory", label: "周边" },
];

const redeemItems: RedeemItem[] = [
    {
        id: "rd-01",
        category: "fragrance",
        tag: "私人调香礼遇",
        name: "暗麝心魄香水体验装",
        spec: "4ML 精巧喷雾装",
        points: 800,
        thumb: "https://sdcdn.io/tf/tf_sku_T94101_2000x2000_0.png?height=700px&width=700px",
    },
    {
        id: "rd-02",
        category: "makeup",
        tag: "唇部彩妆",
        name: "迷你黑管唇膏 #19",
        spec: "1G 经典正装色号",
        points: 1200,
        thumb: "https://sdcdn.io/tf/tf_sku_T94101_2000x2000_0.png?height=700px&width=700px",
    },
    {
        id: "rd-03",
        category: "accessory",
        tag: "高定限量周边",
        name: "高定勃艮第晚宴手拿包",
        spec: "品牌会员限定款",
        points: 1500,
        thumb: "https://sdcdn.io/tf/tf_sku_T94101_2000x2000_0.png?height=700px&width=700px",
    },
    {
        id: "rd-04",
        category: "fragrance",
        tag: "鎏金臻享",
        name: "乌木沉香旅行香氛套装",
        spec: "10ML 便携瓶 + 皮革保护套",
        points: 2600,
        thumb: "https://sdcdn.io/tf/tf_sku_T94101_2000x2000_0.png?height=700px&width=700px",
    },
];

export default function GiftRedeem() {
    const [points, setPoints] = useState<number>(1750);
    const [category, setCategory] = useState<GiftCategory>("all");
    const [redeemedIds, setRedeemedIds] = useState<string[]>([]);
    const [notice, setNotice] = useState<string>("");

    const filteredList =
        category === "all" ? redeemItems : redeemItems.filter((item) => item.category === category);

    const handleRedeem = (item: RedeemItem) => {
        if (redeemedIds.includes(item.id) || points < item.points) return;
        setPoints((prev) => prev - item.points);
        setRedeemedIds((prev) => [...prev, item.id]);
        setNotice(`已消耗 ${item.points} 积分成功兑换「${item.name}」，礼遇将在 3 个工作日内安排发出。`);
    };

    return (
        <div className={css.pageContainer}>
            <PageHeader title="积分兑礼" />

            <div className={css.heroBanner}>
                <span className={css.heroTag}>TOM FORD REWARDS</span>
                <span className={css.heroTitle}>会员积分臻享兑礼</span>
                <div className={css.pointsSummary}>
                    <div className={css.pointsValue}>
                        {points}
                        <span>可用积分</span>
                    </div>
                    <span className={css.tierLabel}>当前等级：银熠会员</span>
                </div>
            </div>

            <div className={css.content}>
                <div className={css.filterBar}>
                    {categoryTabs.map((tab) => (
                        <span
                            key={tab.key}
                            className={`${css.filterTab} ${category === tab.key ? css.active : ""}`}
                            onClick={() => setCategory(tab.key)}
                        >
                            {tab.label}
                        </span>
                    ))}
                </div>

                {notice ? <div className={css.toastBanner}>{notice}</div> : null}

                <div className={css.itemList}>
                    {filteredList.map((item) => {
                        const isRedeemed = redeemedIds.includes(item.id);
                        const notEnough = points < item.points;
                        return (
                            <div key={item.id} className={css.productCard}>
                                <div className={css.thumb}>
                                    <img src={item.thumb} alt={item.name} />
                                </div>
                                <div className={css.info}>
                                    <span className={css.tag}>{item.tag}</span>
                                    <span className={css.name}>{item.name}</span>
                                    <span className={css.spec}>{item.spec}</span>
                                    <div className={css.bottomRow}>
                                        <span className={css.cost}>
                                            {item.points}
                                            <span>积分</span>
                                        </span>
                                        <button
                                            className={`${css.actionBtn} ${isRedeemed ? css.claimed : ""}`}
                                            disabled={isRedeemed || notEnough}
                                            onClick={() => handleRedeem(item)}
                                        >
                                            {isRedeemed ? "已兑换" : notEnough ? "积分不足" : "立即兑换"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
