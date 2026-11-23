import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import css from "./banner.module.less";

const COMMUNITY_CODE = "TF-VIP-2026";

const communityPerks = [
    {
        badge: "礼遇 01",
        title: "入群私享加赠",
        desc: "首次加入品牌社群下单即赠私人调香 2ML 体验装一份。",
    },
    {
        badge: "礼遇 02",
        title: "限定满赠优先",
        desc: "不定期掉落社群专属满赠高定周边与礼盒升级名额。",
    },
    {
        badge: "礼遇 03",
        title: "新品抢先体验",
        desc: "热门限定彩妆与新香首发日提前锁定星品试用资格。",
    },
    {
        badge: "礼遇 04",
        title: "专属美妆顾问",
        desc: "一对一选香建议、妆容搭配指导及专柜预约绿色通道。",
    },
];

export default function BannerResource() {
    const navigate = useNavigate();
    const [copied, setCopied] = useState<boolean>(false);
    const [claimed, setClaimed] = useState<boolean>(false);
    const [notice, setNotice] = useState<string>("");

    const handleCopyCode = async () => {
        try {
            await navigator.clipboard.writeText(COMMUNITY_CODE);
        } catch {
            // Clipboard API may be unavailable in non-HTTPS contexts
        }
        setCopied(true);
        setNotice(`专属社群口令 ${COMMUNITY_CODE} 已复制，添加顾问时发送即可核验入群。`);
    };

    const handleClaimGift = () => {
        if (claimed) return;
        setClaimed(true);
        setNotice("已为您解锁社群私享加赠礼资格，可在「我的礼券」中查看并使用。");
    };

    return (
        <div className={css.pageContainer}>
            <PageHeader title="社群私享好礼" />

            <div className={css.heroBanner}>
                <div className={css.heroText}>
                    <span className={css.heroTag}>MEMBER BENEFIT</span>
                    <span className={css.heroTitle}>加入专属社群福利 解锁私享加赠礼</span>
                    <span className={css.heroDesc}>
                        成为 TOM FORD 贵宾社群成员，尊享定制加赠礼遇与新品首发特权。
                    </span>
                </div>
                <div className={css.heroImage}>
                    <img
                        src="https://sdcdn.io/tf/tf_sku_T1XF01_2000x2000_0.png?height=1400px&width=1400px"
                        alt="社群私享好礼"
                    />
                </div>
            </div>

            <div className={css.content}>
                <span className={css.sectionTitle}>社群专属四重礼遇</span>
                <div className={css.perkGrid}>
                    {communityPerks.map((item) => (
                        <div key={item.badge} className={css.perkCard}>
                            <span className={css.perkBadge}>{item.badge}</span>
                            <span className={css.perkTitle}>{item.title}</span>
                            <span className={css.perkDesc}>{item.desc}</span>
                        </div>
                    ))}
                </div>

                <div className={css.joinCard}>
                    <div className={css.joinTop}>
                        <div>
                            <div className={css.joinLabel}>专属入群核验口令</div>
                            <div className={css.joinCode}>{COMMUNITY_CODE}</div>
                        </div>
                        <button className={css.copyBtn} onClick={handleCopyCode}>
                            {copied ? "已复制" : "复制口令"}
                        </button>
                    </div>
                    <div className={css.joinHint}>
                        复制上方口令后，可前往「在线客服」发送口令获取专属顾问邀请码，核验成功后自动解锁入群加赠礼。
                    </div>
                </div>

                {notice ? <div className={css.toastNotice}>{notice}</div> : null}

                <div className={css.actionGroup}>
                    <button
                        className={css.primaryBtn}
                        disabled={claimed}
                        onClick={handleClaimGift}
                    >
                        {claimed ? "已解锁私享加赠礼" : "立即解锁私享加赠礼"}
                    </button>
                    {claimed ? (
                        <button className={css.outlineBtn} onClick={() => navigate("/mine/coupons")}>
                            前往我的礼券查看
                        </button>
                    ) : (
                        <button className={css.outlineBtn} onClick={() => navigate("/mine/contact")}>
                            联系在线顾问入群
                        </button>
                    )}
                </div>

                <div className={css.ruleCard}>
                    <span className={css.ruleTitle}>活动说明</span>
                    <span className={css.ruleItem}>1. 每位注册会员仅可领取一次社群私享加赠礼资格。</span>
                    <span className={css.ruleItem}>2. 解锁后的加赠礼遇需在 30 日内随商城订单一并使用。</span>
                    <span className={css.ruleItem}>3. 赠品数量有限，如遇缺货将替换为同价值星品体验装。</span>
                </div>
            </div>
        </div>
    );
}
