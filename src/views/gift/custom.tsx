import { useState } from "react";
import PageHeader from "@/components/PageHeader";
import { generateGiftCardMessage, getGeminiApiKey } from "@/services/gemini";
import css from "./gift.module.less";

interface BoxStyle {
    id: string;
    name: string;
    desc: string;
    price: string;
}

interface RibbonOption {
    id: string;
    name: string;
    color: string;
}

const boxStyles: BoxStyle[] = [
    { id: "classic", name: "黑金经典礼盒", desc: "哑光黑纹搭配烫金徽标", price: "免费尊享" },
    { id: "burgundy", name: "勃艮第限定盒", desc: "暗樱酒红丝绒质感礼盒", price: "¥80" },
    { id: "private", name: "私人调香高定", desc: "双层磁吸礼盒含丝巾衬垫", price: "¥150" },
];

const ribbonOptions: RibbonOption[] = [
    { id: "obsidian", name: "曜石黑", color: "#121212" },
    { id: "burgundy", name: "勃艮第红", color: "#8b001a" },
    { id: "champagne", name: "香槟金", color: "#c5a46d" },
];

export default function GiftCustom() {
    const [selectedBox, setSelectedBox] = useState<string>(boxStyles[0].id);
    const [selectedRibbon, setSelectedRibbon] = useState<string>(ribbonOptions[0].id);
    const [engraving, setEngraving] = useState<string>("");
    const [cardMessage, setCardMessage] = useState<string>("");
    const [submitted, setSubmitted] = useState<boolean>(false);
    const [generatingCard, setGeneratingCard] = useState<boolean>(false);
    const [aiError, setAiError] = useState<string>("");

    const currentBox = boxStyles.find((item) => item.id === selectedBox) ?? boxStyles[0];
    const currentRibbon = ribbonOptions.find((item) => item.id === selectedRibbon) ?? ribbonOptions[0];

    const handleSubmit = () => {
        setSubmitted(true);
    };

    const handleGenerateCardMessage = async () => {
        if (generatingCard) return;
        if (!getGeminiApiKey()) {
            setAiError("请先在首页「AI 私人调香顾问」或 .env.local 中配置 Gemini API Key。");
            return;
        }
        setGeneratingCard(true);
        setAiError("");
        try {
            const generated = await generateGiftCardMessage({
                boxName: currentBox.name,
                ribbonName: currentRibbon.name,
                engraving: engraving.trim() || undefined,
            });
            if (generated) {
                setCardMessage(generated.slice(0, 80));
                setSubmitted(false);
            }
        } catch (err) {
            setAiError(err instanceof Error ? err.message : "生成礼卡寄语失败，请稍后重试。");
        } finally {
            setGeneratingCard(false);
        }
    };

    return (
        <div className={css.pageContainer}>
            <PageHeader title="礼盒定制" />

            <div className={css.heroBanner}>
                <span className={css.heroTag}>TOM FORD BESPOKE GIFTING</span>
                <span className={css.heroTitle}>高定礼赠 · 专属印记</span>
                <span className={css.heroDesc}>
                    甄选标志性礼盒包装、缎带配色与手写定制礼卡，为挚爱呈献极具仪式感的奢华礼遇。
                </span>
            </div>

            <div className={css.content}>
                <div className={css.section}>
                    <span className={css.sectionTitle}>选择礼盒款式</span>
                    <div className={css.optionGrid}>
                        {boxStyles.map((item) => (
                            <div
                                key={item.id}
                                className={`${css.optionCard} ${selectedBox === item.id ? css.active : ""}`}
                                onClick={() => {
                                    setSelectedBox(item.id);
                                    setSubmitted(false);
                                }}
                            >
                                <span className={css.optionName}>{item.name}</span>
                                <span className={css.optionDesc}>{item.desc}</span>
                                <span className={css.optionPrice}>{item.price}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={css.section}>
                    <span className={css.sectionTitle}>选择缎带配色</span>
                    <div className={css.chipRow}>
                        {ribbonOptions.map((item) => (
                            <div
                                key={item.id}
                                className={`${css.chipItem} ${selectedRibbon === item.id ? css.active : ""}`}
                                onClick={() => {
                                    setSelectedRibbon(item.id);
                                    setSubmitted(false);
                                }}
                            >
                                <span className={css.colorDot} style={{ backgroundColor: item.color }} />
                                <span>{item.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={css.section}>
                    <span className={css.sectionTitle}>专属刻字（选填）</span>
                    <span className={css.sectionSub}>支持最多 10 个英文字母或数字，呈现于金属铭牌</span>
                    <input
                        className={css.inputField}
                        maxLength={10}
                        placeholder="例如：T.F / LOVE 2026"
                        value={engraving}
                        onChange={(e) => {
                            setEngraving(e.target.value);
                            setSubmitted(false);
                        }}
                    />
                </div>

                <div className={css.section}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span className={css.sectionTitle}>定制礼卡祝福语（选填）</span>
                        <button
                            type="button"
                            className={css.chipItem}
                            onClick={handleGenerateCardMessage}
                            disabled={generatingCard}
                        >
                            {generatingCard ? "AI 构思中..." : "AI 礼卡灵感"}
                        </button>
                    </div>
                    {aiError ? <span className={css.sectionSub} style={{ color: "#8b001a" }}>{aiError}</span> : null}
                    <textarea
                        className={css.textareaField}
                        maxLength={80}
                        placeholder="请输入您的专属祝福语（限 80 字以内）"
                        value={cardMessage}
                        onChange={(e) => {
                            setCardMessage(e.target.value);
                            setSubmitted(false);
                        }}
                    />
                </div>

                <div className={css.previewBox}>
                    <span className={css.previewHeader}>定制方案预览</span>
                    <div className={css.previewRow}>
                        <span>礼盒款式</span>
                        <span>{currentBox.name}（{currentBox.price}）</span>
                    </div>
                    <div className={css.previewRow}>
                        <span>缎带配色</span>
                        <span>{currentRibbon.name}</span>
                    </div>
                    <div className={css.previewRow}>
                        <span>铭牌刻字</span>
                        <span>{engraving.trim() || "暂不刻字"}</span>
                    </div>
                    <div className={css.previewQuote}>
                        礼卡留言：{cardMessage.trim() || "未填写祝福语，将附赠空白烫金礼卡"}
                    </div>
                </div>

                {submitted ? (
                    <div className={css.toastBanner}>
                        您的礼盒定制方案已保存，结算订单时将自动应用此礼赠配置。
                    </div>
                ) : null}

                <button className={css.primaryBtn} onClick={handleSubmit}>
                    保存定制方案
                </button>
            </div>
        </div>
    );
}
