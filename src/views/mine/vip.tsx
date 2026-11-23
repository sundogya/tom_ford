import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import css from "./mine.module.less";

interface TierBenefit {
    title: string;
    desc: string;
    tag: string;
}

interface VipTier {
    key: string;
    name: string;
    threshold: string;
    isCurrent?: boolean;
    benefits: TierBenefit[];
}

const vipTiers: VipTier[] = [
    {
        key: "member",
        name: "尊享会员",
        threshold: "注册即享 · 无消费门槛",
        benefits: [
            { title: "基础消费积分", desc: "实付每满 ¥1 累计 1 积分，可用于积分兑礼。", tag: "1x 积分" },
            { title: "星品体验优先知", desc: "第一时间接收新品发布与限定香氛上新资讯。", tag: "新品礼遇" },
            { title: "官网标准礼盒包装", desc: "每笔正装订单均享经典黑金品牌礼盒包装。", tag: "随单尊享" },
        ],
    },
    {
        key: "silver",
        name: "银熠会员",
        threshold: "年累计消费满 ¥1,000（当前等级）",
        isCurrent: true,
        benefits: [
            { title: "1.2 倍积分加速", desc: "单笔订单实付金额享 1.2 倍积分累计，加速兑换心仪礼遇。", tag: "1.2x 积分" },
            { title: "生日月专属臻礼", desc: "生日当月任意消费可获赠私人调香体验礼盒一份。", tag: "生日礼遇" },
            { title: "星品小样每月申领", desc: "每月可享 2 份热门香氛或彩妆星品试用装免费申领。", tag: "试用特权" },
            { title: "免费定制礼卡", desc: "礼盒定制支持免费附赠烫金手写祝福礼卡。", tag: "高定礼赠" },
        ],
    },
    {
        key: "gold",
        name: "鎏金会员",
        threshold: "年累计消费满 ¥2,500 升级",
        benefits: [
            { title: "1.5 倍积分加速", desc: "全品类消费享 1.5 倍积分累计，快速解锁限量高定周边。", tag: "1.5x 积分" },
            { title: "专属铭牌刻字免费", desc: "每年享 3 次高定礼盒与香水瓶身专属刻字免工费权益。", tag: "免费刻字" },
            { title: "顺丰次日达优先发货", desc: "订单进入贵宾极速履约通道，优先打包发出。", tag: "极速配送" },
            { title: "线下专柜私享试香", desc: "可预约全国精品店一对一私人调香顾问体验服务。", tag: "专柜尊享" },
        ],
    },
    {
        key: "obsidian",
        name: "黑曜会员",
        threshold: "年累计消费满 ¥8,000 升级",
        benefits: [
            { title: "2 倍尊贵积分", desc: "所有消费双倍积分回馈，积分有效期延长至 24 个月。", tag: "2x 积分" },
            { title: "年度限定正装礼赠", desc: "每年获赠 TOM FORD 私人调香系列限量正装礼遇。", tag: "年度臻礼" },
            { title: "私人管家一对一服务", desc: "专属客户顾问全程跟进定制、礼赠及售后需求。", tag: "专属顾问" },
            { title: "品牌私享活动受邀", desc: "优先受邀出席新品预览会及线下高定香氛品鉴晚宴。", tag: "VIP 邀约" },
        ],
    },
];

const CURRENT_POINTS = 1750;
const NEXT_LEVEL_POINTS = 2500;

export default function MineVip() {
    const navigate = useNavigate();
    const [activeTierKey, setActiveTierKey] = useState<string>("silver");

    const activeTier = vipTiers.find((tier) => tier.key === activeTierKey) ?? vipTiers[1];
    const progressPercent = Math.min(100, Math.round((CURRENT_POINTS / NEXT_LEVEL_POINTS) * 100));

    return (
        <div className={css.pageContainer}>
            <PageHeader title="会员权益" />

            <div className={css.heroStrip}>
                <span className={css.heroSub}>TOM FORD PRIVÉ MEMBERSHIP</span>
                <span className={css.heroTitle}>银熠会员 · {CURRENT_POINTS} 积分</span>
                <div className={css.vipProgressWrap}>
                    <div className={css.vipMetaRow}>
                        <span>距离升级鎏金会员还差 {NEXT_LEVEL_POINTS - CURRENT_POINTS} 消费积分</span>
                        <span>{progressPercent}%</span>
                    </div>
                    <div className={css.progressTrack}>
                        <div className={css.progressFill} style={{ width: `${progressPercent}%` }} />
                    </div>
                </div>
            </div>

            <div className={css.content}>
                <div className={css.tierTabBar}>
                    {vipTiers.map((tier) => (
                        <span
                            key={tier.key}
                            className={`${css.tierTab} ${activeTierKey === tier.key ? css.active : ""}`}
                            onClick={() => setActiveTierKey(tier.key)}
                        >
                            {tier.name}
                        </span>
                    ))}
                </div>

                <div className={css.tierSummaryCard}>
                    <div className={css.tierHeader}>
                        <span className={css.tierName}>{activeTier.name}</span>
                        {activeTier.isCurrent ? <span className={css.currentBadge}>当前等级</span> : null}
                    </div>
                    <span className={css.tierThreshold}>{activeTier.threshold}</span>
                </div>

                <div className={css.benefitList}>
                    {activeTier.benefits.map((item) => (
                        <div key={item.title} className={css.benefitItem}>
                            <div className={css.benefitLeft}>
                                <span className={css.benefitTitle}>{item.title}</span>
                                <span className={css.benefitDesc}>{item.desc}</span>
                            </div>
                            <span className={css.benefitTag}>{item.tag}</span>
                        </div>
                    ))}
                </div>

                <div className={css.actionRow}>
                    <button className={css.outlineBtn} onClick={() => navigate("/gift/try")}>
                        星品试用
                    </button>
                    <button className={css.primaryBtn} onClick={() => navigate("/gift/redeem")}>
                        积分兑礼
                    </button>
                </div>
            </div>
        </div>
    );
}
