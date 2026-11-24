import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    getGeminiApiKey,
    hasEnvGeminiApiKey,
    setGeminiApiKey,
    streamFragranceConcierge,
} from '@/services/gemini';
import css from './style/home.module.less';

interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    text: string;
}

const PRESET_PROMPTS = [
    '秋冬季节适合约会夜的沉稳木质香调推荐',
    '送给喜欢清冷气质女生的私人调香礼盒',
    '珍华乌木与烟熏樱桃有什么区别？各自适合什么场合？',
    '职场日常通勤推荐哪款中性香氛？',
];

const Home = () => {
    const navigate = useNavigate();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [interactionId, setInteractionId] = useState<string | undefined>(undefined);
    const [isStreaming, setIsStreaming] = useState(false);
    const [error, setError] = useState('');
    const [showKeyPanel, setShowKeyPanel] = useState(() => !getGeminiApiKey());
    const [apiKeyInput, setApiKeyInput] = useState(() => getGeminiApiKey());

    const handleSaveKey = () => {
        setGeminiApiKey(apiKeyInput);
        setShowKeyPanel(false);
        setError('');
    };

    const handleSend = async (promptText?: string) => {
        const query = (promptText ?? input).trim();
        if (!query || isStreaming) return;

        if (!getGeminiApiKey()) {
            setShowKeyPanel(true);
            setError('请先配置 Gemini API Key 后再开启私人调香咨询。');
            return;
        }

        const userMsg: ChatMessage = {
            id: `user-${Date.now()}`,
            role: 'user',
            text: query,
        };
        const assistantId = `assistant-${Date.now()}`;

        setMessages((prev) => [
            ...prev,
            userMsg,
            { id: assistantId, role: 'assistant', text: '' },
        ]);
        if (!promptText) {
            setInput('');
        }
        setError('');
        setIsStreaming(true);

        try {
            const result = await streamFragranceConcierge({
                input: query,
                previousInteractionId: interactionId,
                onDelta: (chunk) => {
                    setMessages((prev) =>
                        prev.map((msg) =>
                            msg.id === assistantId ? { ...msg, text: msg.text + chunk } : msg
                        )
                    );
                },
            });

            if (result.interactionId) {
                setInteractionId(result.interactionId);
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : '请求 Gemini 服务失败，请检查密钥或网络。';
            setError(message);
            setMessages((prev) => prev.filter((msg) => msg.id !== assistantId || msg.text.length > 0));
        } finally {
            setIsStreaming(false);
        }
    };

    const handleReset = () => {
        if (isStreaming) return;
        setMessages([]);
        setInteractionId(undefined);
        setError('');
    };

    return (
        <div className={css.homePage}>
            <div className={css.hero}>
                <div className={css.heroTop}>
                    <span className={css.brandTag}>TOM FORD · GEMINI AI</span>
                    {!hasEnvGeminiApiKey() && (
                        <button
                            type="button"
                            className={css.iconAction}
                            onClick={() => setShowKeyPanel((v) => !v)}
                        >
                            {showKeyPanel ? '收起密钥' : 'API Key'}
                        </button>
                    )}
                </div>
                <div className={css.heroTitle}>AI 私人调香顾问</div>
                <div className={css.heroDesc}>
                    由 Gemini 驱动的奢华香氛与礼赠顾问。告诉我您的穿搭、场合、心境或赠礼对象，为您定制专属 TOM FORD 气息。
                </div>
                <div className={css.quickLinks}>
                    <button
                        type="button"
                        className={css.quickLinkBtn}
                        onClick={() => navigate('/index/category')}
                    >
                        浏览全部香氛
                    </button>
                    <button
                        type="button"
                        className={css.quickLinkBtn}
                        onClick={() => navigate('/gift/custom')}
                    >
                        高定礼盒定制
                    </button>
                </div>
            </div>

            {showKeyPanel && !hasEnvGeminiApiKey() && (
                <div className={css.keyPanel}>
                    <span className={css.keyTitle}>配置本地 Gemini API Key</span>
                    <span className={css.keyHint}>
                        也可在项目根目录 `.env.local` 中设置 `VITE_GEMINI_API_KEY`。当前密钥仅保存在浏览器本地存储用于调试；生产环境请通过后端代理转发请求。
                    </span>
                    <div className={css.keyRow}>
                        <input
                            type="password"
                            className={css.keyInput}
                            value={apiKeyInput}
                            onChange={(e) => setApiKeyInput(e.target.value)}
                            placeholder="粘贴您的 Gemini API Key"
                        />
                        <button type="button" className={css.keySaveBtn} onClick={handleSaveKey}>
                            保存
                        </button>
                    </div>
                </div>
            )}

            <div className={css.promptSection}>
                <span className={css.promptLabel}>灵感推荐</span>
                <div className={css.promptChips}>
                    {PRESET_PROMPTS.map((prompt) => (
                        <button
                            key={prompt}
                            type="button"
                            className={css.promptChip}
                            disabled={isStreaming}
                            onClick={() => handleSend(prompt)}
                        >
                            {prompt}
                        </button>
                    ))}
                </div>
            </div>

            <div className={css.chatList}>
                {messages.length === 0 ? (
                    <div className={css.emptyState}>
                        <span className={css.emptyTitle}>开启您的私人嗅觉沙龙</span>
                        <span className={css.emptyDesc}>
                            点击上方灵感标签，或在下方输入您偏爱的香调（如乌木、白麝香、烟熏樱桃）与使用场景。
                        </span>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`${css.messageRow} ${
                                msg.role === 'user' ? css.userRow : css.assistantRow
                            }`}
                        >
                            <span className={css.roleLabel}>
                                {msg.role === 'user' ? '您' : 'TOM FORD AI 顾问'}
                            </span>
                            <div
                                className={`${css.bubble} ${
                                    msg.role === 'user' ? css.userBubble : css.assistantBubble
                                }`}
                            >
                                {msg.text || (isStreaming ? '正在调香构思中...' : '')}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {error ? <div className={css.errorBanner}>{error}</div> : null}

            <div className={css.composer}>
                <input
                    type="text"
                    className={css.composerInput}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    placeholder="描述您的场合、偏好香调或送礼对象..."
                    disabled={isStreaming}
                />
                {messages.length > 0 && (
                    <button
                        type="button"
                        className={css.resetBtn}
                        onClick={handleReset}
                        disabled={isStreaming}
                    >
                        清空
                    </button>
                )}
                <button
                    type="button"
                    className={css.sendBtn}
                    onClick={() => handleSend()}
                    disabled={isStreaming || !input.trim()}
                >
                    {isStreaming ? '生成中' : '发送'}
                </button>
            </div>
        </div>
    );
};

export default Home;
