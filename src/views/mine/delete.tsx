import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import css from "./mine.module.less";

const reasons = [
    "不再使用本商城服务",
    "已有其他 TOM FORD 会员账号",
    "担心个人隐私或信息安全",
    "其他原因",
];

export default function MineDelete() {
    const [selectedReason, setSelectedReason] = useState<string>(reasons[0]);
    const [agreed, setAgreed] = useState<boolean>(false);
    const [submitted, setSubmitted] = useState<boolean>(false);

    const handleConfirmDelete = () => {
        if (!agreed) return;
        setSubmitted(true);
    };

    return (
        <div className={css.pageContainer}>
            <PageHeader title="账号注销" />

            <div className={css.content}>
                <div className={css.warningCard}>
                    <span className={css.warningTitle}>注销前请务必仔细阅读</span>
                    <span className={css.warningItem}>
                        1. 账号注销为不可逆操作，注销后您的银熠会员等级及当前 1750 可用积分将被永久清空。
                    </span>
                    <span className={css.warningItem}>
                        2. 所有未使用的礼遇券、星品试用资格及历史订单记录将无法找回。
                    </span>
                    <span className={css.warningItem}>
                        3. 请确保当前账号下无未完成订单、待处理退款或售后维权申请。
                    </span>
                </div>

                <div className={css.reasonList}>
                    <span className={css.sectionTitle}>请选择注销原因</span>
                    {reasons.map((reason) => (
                        <div
                            key={reason}
                            className={`${css.reasonItem} ${selectedReason === reason ? css.active : ""}`}
                            onClick={() => setSelectedReason(reason)}
                        >
                            {reason}
                        </div>
                    ))}
                </div>

                <label className={css.formPanel} style={{ borderColor: "#e0e0e0" }}>
                    <div className={css.checkboxRow}>
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                        />
                        <span>我已充分阅读并知晓账号注销带来的全部后果</span>
                    </div>
                </label>

                {submitted ? (
                    <div className={css.toastNotice}>
                        您的账号注销申请已提交（原因：{selectedReason}）。我们将在 7 个工作日内完成审核并短信通知您，期间如需撤销请联系在线客服。
                    </div>
                ) : null}

                <button
                    className={css.dangerBtn}
                    disabled={!agreed || submitted}
                    onClick={handleConfirmDelete}
                >
                    {submitted ? "已提交注销申请" : "确认申请注销账号"}
                </button>
            </div>
        </div>
    );
}
