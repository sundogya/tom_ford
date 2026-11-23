import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import css from "./gift.module.less";

interface TrialProduct {
    id: string;
    tag: string;
    name: string;
    spec: string;
    stock: number;
    thumb: string;
}

const trialProducts: TrialProduct[] = [
    {
        id: "try-01",
        tag: "私人调香系列",
        name: "「烟熏樱桃」暗樱撩情香水",
        spec: "试用装 2ML · 仅限银熠及以上会员",
        stock: 36,
        thumb: "https://sdcdn.io/tf/tf_sku_T94101_2000x2000_0.png?height=700px&width=700px",
    },
    {
        id: "try-02",
        tag: "经典木质香调",
        name: "珍华乌木香水 OUD WOOD",
        spec: "试用装 2ML · 每人限领 1 份",
        stock: 18,
        thumb: "https://sdcdn.io/tf/tf_sku_T94101_2000x2000_0.png?height=700px&width=700px",
    },
    {
        id: "try-03",
        tag: "星品彩妆体验",
        name: "烈焰幻魅唇膏 #16 斯嘉丽红",
        spec: "迷你体验装 1G · 随单配送",
        stock: 0,
        thumb: "https://sdcdn.io/tf/tf_sku_T94101_2000x2000_0.png?height=700px&width=700px",
    },
];

export default function GiftTry() {
    const [claimedIds, setClaimedIds] = useState<string[]>([]);
    const [notice, setNotice] = useState<string>("");

    const handleClaim = (item: TrialProduct) => {
        if (item.stock <= 0 || claimedIds.includes(item.id)) return;
        setClaimedIds((prev) => [...prev, item.id]);
        setNotice(`已成功申领「${item.name}」，将随您的下一笔订单一并寄出。`);
    };

    return (
        <div className={css.pageContainer}>
            <PageHeader title="星品试用" />

            <div className={css.heroBanner}>
                <span className={css.heroTag}>TOM FORD STAR SAMPLES</span>
                <span className={css.heroTitle}>星品奢宠试用礼遇</span>
                <span className={css.heroDesc}>
                    抢先体验 TOM FORD 热门私人调香与高定彩妆星品小样，探索专属于您的摩登气息。
                </span>
            </div>

            <div className={css.content}>
                {notice ? <div className={css.toastBanner}>{notice}</div> : null}

                <div className={css.itemList}>
                    {trialProducts.map((item) => {
                        const isClaimed = claimedIds.includes(item.id);
                        const isSoldOut = item.stock <= 0;
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
                                            免费申领<span>{isSoldOut ? "已领完" : `余 ${item.stock} 份`}</span>
                                        </span>
                                        <button
                                            className={`${css.actionBtn} ${isClaimed ? css.claimed : ""}`}
                                            disabled={isSoldOut || isClaimed}
                                            onClick={() => handleClaim(item)}
                                        >
                                            {isClaimed ? "已申领" : isSoldOut ? "已领完" : "立即申领"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className={css.ruleCard}>
                    <span className={css.ruleTitle}>试用申领规则</span>
                    <span className={css.ruleItem}>1. 每位会员自然月内最多可申领 2 件星品试用装。</span>
                    <span className={css.ruleItem}>2. 申领成功后需在 15 日内确认收货地址或随订单发货。</span>
                    <span className={css.ruleItem}>3. 试用装数量有限，领完即止，不支持退换或折现。</span>
                </div>
            </div>
        </div>
    );
}
