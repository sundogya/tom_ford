import PageHeader from "@/components/PageHeader";
import css from "./mine.module.less";

const contractSections = [
    {
        title: "一、适用范围",
        paragraphs: [
            "本条款与条件适用于您访问及使用 TOM FORD 官方商城提供的商品浏览、会员积分、礼盒定制、星品试用及线上购物等相关服务。",
        ],
    },
    {
        title: "二、会员账户与权益",
        paragraphs: [
            "会员账户仅限本人使用，请妥善保管登录凭证。会员等级及积分根据有效消费金额累计，如发生订单取消或退货，对应积分将同步扣减。",
        ],
    },
    {
        title: "三、订单成立与商品价格",
        paragraphs: [
            "页面展示的商品价格与库存以提交订单时的实时信息为准。订单支付成功且系统确认备货后，买卖合同正式成立。如遇限量商品缺货，我们将第一时间通知并为您办理全额退款。",
        ],
    },
    {
        title: "四、知识产权声明",
        paragraphs: [
            "本商城所展示的商标、品牌标识、商品图片、文案及界面设计均受知识产权法律法规保护，未经书面授权不得复制、传播或用于任何商业用途。",
        ],
    },
    {
        title: "五、法律适用与争议解决",
        paragraphs: [
            "本条款的订立、执行及解释均适用中华人民共和国法律。如双方因本条款发生争议，应优先友好协商解决；协商不成的，可依法向有管辖权的人民法院提起诉讼。",
        ],
    },
];

export default function MineContract() {
    return (
        <div className={css.pageContainer}>
            <PageHeader title="条款条件" />

            <div className={css.content}>
                <span className={css.docMeta}>版本号：v2026.01 · TOM FORD 官方商城服务协议</span>
                {contractSections.map((section) => (
                    <div key={section.title} className={css.docSection}>
                        <span className={css.docTitle}>{section.title}</span>
                        {section.paragraphs.map((text) => (
                            <p key={text} className={css.docParagraph}>
                                {text}
                            </p>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
