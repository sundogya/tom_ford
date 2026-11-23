import { useRef, useState } from "react";
import PageHeader from "@/components/PageHeader";
import css from "./mine.module.less";

interface ChatMessage {
    id: string;
    sender: "agent" | "user";
    content: string;
}

const quickQuestions = ["查询订单物流", "如何申请退换货", "礼盒刻字需要多久", "会员积分有效期"];

const replyMap: Record<string, string> = {
    查询订单物流: "您可前往「我的 - 全部订单」查看最新物流单号及配送进度；如需加急核实，请发送您的订单编号。",
    如何申请退换货: "签收后 7 日内且商品未拆封支持无理由退换货，您可先查阅「退换货政策」或直接发送订单号由专员为您登记。",
    礼盒刻字需要多久: "专属铭牌刻字与定制礼盒服务通常需额外 1-2 个工作日完成制作，完成后即刻安排顺丰发出。",
    会员积分有效期: "会员积分自入账之日起 12 个月内有效，可在「积分兑礼」页面兑换精选星品与高定周边。",
};

export default function MineContact() {
    const nextIdRef = useRef<number>(1);
    const [input, setInput] = useState<string>("");
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: "welcome",
            sender: "agent",
            content: "您好，欢迎致讯 TOM FORD 专属在线顾问。请问有什么可以为您效劳？",
        },
    ]);

    const sendQuestion = (text: string) => {
        const trimmed = text.trim();
        if (!trimmed) return;

        const userId = nextIdRef.current++;
        const agentId = nextIdRef.current++;
        const userMsg: ChatMessage = {
            id: `u-${userId}`,
            sender: "user",
            content: trimmed,
        };
        const replyText =
            replyMap[trimmed] ??
            "已收到您的咨询，专属客服顾问正在为您核实处理，请稍候（服务时间：周一至周日 09:00-22:00）。";
        const agentMsg: ChatMessage = {
            id: `a-${agentId}`,
            sender: "agent",
            content: replyText,
        };

        setMessages((prev) => [...prev, userMsg, agentMsg]);
        setInput("");
    };

    return (
        <div className={css.pageContainer} style={{ paddingBottom: 0 }}>
            <PageHeader title="在线客服" />

            <div className={css.chatContainer}>
                <div className={css.serviceBar}>
                    <span>TOM FORD 专属美妆顾问在线</span>
                    <span>周一到周日 09:00-22:00</span>
                </div>

                <div className={css.quickQuestions}>
                    {quickQuestions.map((item) => (
                        <span key={item} className={css.quickChip} onClick={() => sendQuestion(item)}>
                            {item}
                        </span>
                    ))}
                </div>

                <div className={css.messageList}>
                    {messages.map((msg) => (
                        <div key={msg.id} className={`${css.messageRow} ${css[msg.sender]}`}>
                            <span className={css.senderLabel}>
                                {msg.sender === "agent" ? "TOM FORD 顾问" : "我"}
                            </span>
                            <div className={css.bubble}>{msg.content}</div>
                        </div>
                    ))}
                </div>

                <div className={css.chatInputBar}>
                    <input
                        placeholder="请输入您想咨询的问题..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                sendQuestion(input);
                            }
                        }}
                    />
                    <button onClick={() => sendQuestion(input)}>发送</button>
                </div>
            </div>
        </div>
    );
}
