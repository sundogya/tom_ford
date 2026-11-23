import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import css from "./mine.module.less";

const HOTLINE_DISPLAY = "400-820-0000";
const HOTLINE_TEL = "4008200000";

const serviceScopes = [
    { name: "订单与配送咨询", desc: "查询物流状态、修改收货信息及开具电子发票" },
    { name: "退换货与售后", desc: "破损理赔、退换货进度跟进与专员回访" },
    { name: "会员专席礼遇", desc: "银熠 / 鎏金会员等级规则、积分及生日礼查询" },
    { name: "精品专柜指引", desc: "全国线下精品店地址、营业时间与预约试香" },
];

export default function MineHotline() {
    const navigate = useNavigate();
    const [copied, setCopied] = useState<boolean>(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(HOTLINE_DISPLAY);
            setCopied(true);
        } catch {
            setCopied(true);
        }
    };

    return (
        <div className={css.pageContainer}>
            <PageHeader title="电话热线" />

            <div className={css.heroStrip}>
                <span className={css.heroSub}>CLIENT CARE HOTLINE</span>
                <span className={css.heroTitle}>TOM FORD 贵宾服务热线</span>
                <span className={css.heroDesc}>专业客户关怀团队竭诚为您提供一对一电话咨询服务。</span>
            </div>

            <div className={css.content}>
                <div className={css.hotlineCard}>
                    <span className={css.hotlineLabel}>官方客服专线</span>
                    <span className={css.hotlineNumber}>{HOTLINE_DISPLAY}</span>
                    <span className={css.hotlineHours}>服务时间：周一到周五 09:00-18:00（法定节假日除外）</span>
                    <div className={css.hotlineBtns}>
                        <a className={css.primaryBtn} href={`tel:${HOTLINE_TEL}`}>
                            立即拨打
                        </a>
                        <button className={css.outlineBtn} onClick={handleCopy}>
                            {copied ? "已复制号码" : "复制号码"}
                        </button>
                    </div>
                </div>

                <div className={css.serviceGrid}>
                    {serviceScopes.map((item) => (
                        <div key={item.name} className={css.serviceItem}>
                            <span className={css.serviceName}>{item.name}</span>
                            <span className={css.serviceDesc}>{item.desc}</span>
                        </div>
                    ))}
                </div>

                <button className={css.outlineBtn} onClick={() => navigate("/mine/contact")}>
                    非热线时段？转至在线客服
                </button>
            </div>
        </div>
    );
}
