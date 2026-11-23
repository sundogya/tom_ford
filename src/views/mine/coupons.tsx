import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import css from "./mine.module.less";

type CouponStatus = "available" | "used" | "expired";

interface CouponItem {
    id: string;
    value: string;
    condition: string;
    name: string;
    scope: string;
    expireAt: string;
    status: CouponStatus;
    targetPath: string;
}

const statusTabs: Array<{ key: CouponStatus; label: string }> = [
    { key: "available", label: "可使用" },
    { key: "used", label: "已使用" },
    { key: "expired", label: "已过期" },
];

const initialCoupons: CouponItem[] = [
    {
        id: "cp-1",
        value: "¥200",
        condition: "满 ¥1,500 可用",
        name: "银熠会员私香专享礼券",
        scope: "适用于私人调香系列 50ML 及以上正装香水",
        expireAt: "有效期至 2026-12-31",
        status: "available",
        targetPath: "/index/category",
    },
    {
        id: "cp-2",
        value: "赠礼",
        condition: "任意订单可用",
        name: "高定勃艮第定制礼盒兑换券",
        scope: "下单勾选礼盒定制即可免费升级勃艮第限定礼盒",
        expireAt: "有效期至 2026-12-15",
        status: "available",
        targetPath: "/gift/custom",
    },
    {
        id: "cp-3",
        value: "¥100",
        condition: "满 ¥800 可用",
        name: "彩妆星品礼遇券",
        scope: "适用于唇膏、眼影及底妆全系列正装商品",
        expireAt: "已于 2026-10-18 使用",
        status: "used",
        targetPath: "/index/category",
    },
    {
        id: "cp-4",
        value: "免邮",
        condition: "顺丰专递可用",
        name: "会员限时免运费券",
        scope: "适用于官方商城全场订单",
        expireAt: "已于 2026-09-30 过期",
        status: "expired",
        targetPath: "/index/category",
    },
];

export default function MineCoupons() {
    const navigate = useNavigate();
    const nextCouponIdRef = useRef<number>(10);
    const [activeStatus, setActiveStatus] = useState<CouponStatus>("available");
    const [coupons, setCoupons] = useState<CouponItem[]>(initialCoupons);
    const [redeemCode, setRedeemCode] = useState<string>("");
    const [notice, setNotice] = useState<string>("");

    const filteredCoupons = coupons.filter((item) => item.status === activeStatus);

    const handleRedeemCode = () => {
        const trimmed = redeemCode.trim().toUpperCase();
        if (!trimmed) {
            setNotice("请输入有效的礼券兑换码。");
            return;
        }
        const id = `cp-${nextCouponIdRef.current++}`;
        setCoupons((prev) => [
            {
                id,
                value: "¥150",
                condition: "满 ¥1,000 可用",
                name: `专属兑换礼券（${trimmed}）`,
                scope: "适用于 TOM FORD 官方商城正装商品",
                expireAt: "有效期至 2026-12-31",
                status: "available",
                targetPath: "/index/category",
            },
            ...prev,
        ]);
        setActiveStatus("available");
        setRedeemCode("");
        setNotice(`兑换码 ${trimmed} 已成功兑换，礼券已发放至「可使用」列表。`);
    };

    return (
        <div className={css.pageContainer}>
            <PageHeader title="我的礼券" />

            <div className={css.content}>
                <div className={css.redeemBar}>
                    <input
                        placeholder="请输入礼券兑换码（如 TF2026）"
                        value={redeemCode}
                        onChange={(e) => setRedeemCode(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleRedeemCode();
                            }
                        }}
                    />
                    <button onClick={handleRedeemCode}>立即兑换</button>
                </div>

                {notice ? <div className={css.toastNotice}>{notice}</div> : null}

                <div className={css.tierTabBar}>
                    {statusTabs.map((tab) => {
                        const count = coupons.filter((item) => item.status === tab.key).length;
                        return (
                            <span
                                key={tab.key}
                                className={`${css.tierTab} ${activeStatus === tab.key ? css.active : ""}`}
                                onClick={() => setActiveStatus(tab.key)}
                            >
                                {tab.label}({count})
                            </span>
                        );
                    })}
                </div>

                <div className={css.couponList}>
                    {filteredCoupons.length > 0 ? (
                        filteredCoupons.map((item) => {
                            const isAvailable = item.status === "available";
                            return (
                                <div
                                    key={item.id}
                                    className={`${css.couponCard} ${!isAvailable ? css.disabledCoupon : ""}`}
                                >
                                    <div className={css.couponLeft}>
                                        <span className={css.couponValue}>{item.value}</span>
                                        <span className={css.couponCondition}>{item.condition}</span>
                                    </div>
                                    <div className={css.couponRight}>
                                        <div className={css.couponTop}>
                                            <span className={css.couponName}>{item.name}</span>
                                            <span className={css.couponScope}>{item.scope}</span>
                                        </div>
                                        <div className={css.couponBottom}>
                                            <span className={css.couponExpire}>{item.expireAt}</span>
                                            {isAvailable ? (
                                                <button
                                                    className={css.useBtn}
                                                    onClick={() => navigate(item.targetPath)}
                                                >
                                                    立即使用
                                                </button>
                                            ) : (
                                                <span className={css.statusLabel}>
                                                    {item.status === "used" ? "已使用" : "已过期"}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className={css.emptyState}>暂无相关礼券</div>
                    )}
                </div>
            </div>
        </div>
    );
}
