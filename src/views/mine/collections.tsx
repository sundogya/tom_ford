import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import css from "./mine.module.less";

const policySections = [
    {
        title: "一、7 天无理由退换货服务",
        paragraphs: [
            "您在 TOM FORD 官方精品商城购买的正装商品，自签收次日起 7 日内，在确保商品未经拆封、塑封及防伪封签完好、不影响二次销售的前提下，可申请无理由退换货。",
            "随单附赠的礼盒、定制礼卡、星品试用装及积分兑换礼遇需随主商品一并完整退回。",
        ],
    },
    {
        title: "二、不支持无理由退换货的情形",
        paragraphs: [
            "1. 已拆封、已试用或外包装塑封破损的美妆、香氛类商品（存在质量问题除外）；",
            "2. 带有专属刻字、定制铭牌或个性化祝福礼盒等私人定制商品；",
            "3. 超过退换货申请时效或无有效购买凭证的商品。",
        ],
    },
    {
        title: "三、商品破损与质量问题处理",
        paragraphs: [
            "如您在签收时发现包裹破损、漏液、错发或漏发，请于签收后 48 小时内拍摄外包装、快递面单及商品细节照片，并联系在线客服，我们将为您优先安排补发或全额退款，运费由品牌承担。",
        ],
    },
    {
        title: "四、退款时效说明",
        paragraphs: [
            "仓库收到退回包裹并完成质检后，将在 1-3 个工作日内按原支付路径发起退款，实际到账时间以各支付渠道或发卡银行规则为准。",
        ],
    },
];

export default function MineCollections() {
    const navigate = useNavigate();

    return (
        <div className={css.pageContainer}>
            <PageHeader title="退换货政策" />

            <div className={css.content}>
                <span className={css.docMeta}>更新日期：2026 年 1 月 1 日 · TOM FORD 官方商城</span>
                {policySections.map((section) => (
                    <div key={section.title} className={css.docSection}>
                        <span className={css.docTitle}>{section.title}</span>
                        {section.paragraphs.map((text) => (
                            <p key={text} className={css.docParagraph}>
                                {text}
                            </p>
                        ))}
                    </div>
                ))}
                <button className={css.primaryBtn} onClick={() => navigate("/mine/contact")}>
                    联系在线客服协助处理
                </button>
            </div>
        </div>
    );
}
