import PageHeader from "@/components/PageHeader";
import css from "./mine.module.less";

const privacySections = [
    {
        title: "一、我们如何收集您的个人信息",
        paragraphs: [
            "在您注册会员、浏览商品、下单结算、申领星品试用及使用售后服务过程中，我们会基于最小必要原则收集您主动提供的信息，包括姓名、手机号、收货地址、订单信息及会员偏好。",
        ],
    },
    {
        title: "二、我们如何使用您的个人信息",
        paragraphs: [
            "您的信息将用于完成订单履约与物流配送、管理会员等级与积分礼遇、提供个性化礼盒定制及客户咨询服务，以及履行法律法规要求的安全审计义务。",
        ],
    },
    {
        title: "三、信息存储与安全保护",
        paragraphs: [
            "我们采用加密传输、分级访问控制及脱敏展示等安全措施保护您的个人数据，防止信息遭到未经授权的访问、披露、篡改或丢失。",
        ],
    },
    {
        title: "四、您的个人信息权利",
        paragraphs: [
            "您可随时在「个人资料」「我的地址」中查阅、更正或删除您的相关信息，亦可前往「账号注销」页面申请注销账号并清除相关个人数据。",
        ],
    },
    {
        title: "五、联系我们",
        paragraphs: [
            "如您对本隐私政策有任何疑问、意见或建议，可通过在线客服或拨打官方服务热线与我们的隐私保护专员取得联系。",
        ],
    },
];

export default function MinePrivacy() {
    return (
        <div className={css.pageContainer}>
            <PageHeader title="隐私政策" />

            <div className={css.content}>
                <span className={css.docMeta}>生效日期：2026 年 1 月 1 日 · TOM FORD BEAUTY</span>
                {privacySections.map((section) => (
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
