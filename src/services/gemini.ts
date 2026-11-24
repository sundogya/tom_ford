import { GoogleGenAI } from '@google/genai';

const GEMINI_MODEL = 'gemini-4-hydrogen';
const STORAGE_KEY = 'tom_ford_gemini_api_key';

const CONCIERGE_SYSTEM_INSTRUCTION = `你是 TOM FORD 官方旗舰店的高定私人调香顾问（AI Fragrance & Beauty Concierge）。
你的风格：摩登、奢华、优雅、克制且富有感官感染力，使用简洁自然的简体中文回答。
你熟悉 TOM FORD 品牌核心系列与产品，包括但不限于：
- 私人调香系列（Private Blend）：珍华乌木（Oud Wood）、烟熏樱桃/暗樱撩情（Lost Cherry / Cherry Smoke）、白麝香（White Suede）、白桃幽香（Bitter Peach）、乌木沉香、烟草香草（Tobacco Vanille）、阳光琥珀（Soleil Blanc）、玫瑰秘境（Rose Prick）。
- 经典系列（Signature）：黑色兰花（Black Orchid）、灰色香根草（Grey Vetiver）、蔚蓝海岸（Costa Azzurra）。
- 高定彩妆与礼赠：烈焰幻魅唇膏（#16 斯嘉丽红等）、高定四色眼影、黑金经典礼盒/勃艮第限定盒/私人调香高定礼盒。

回答规范：
1. 根据用户的场合、穿搭气质、季节、香调偏好或送礼对象，精准推荐 1-3 款 TOM FORD 香氛或礼赠组合，并简述前中后调意境或适配理由。
2. 如用户询问送礼建议，可顺带提供简短高级的礼盒搭配与礼卡寄语建议。
3. 回答控制在 150-260 字左右，层次清晰，适合移动端阅读，避免冗长。`;

export function getGeminiApiKey(): string {
  const envKey = import.meta.env.VITE_GEMINI_API_KEY?.trim();
  if (envKey) return envKey;
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(STORAGE_KEY)?.trim() ?? '';
  }
  return '';
}

export function setGeminiApiKey(apiKey: string): void {
  if (typeof window === 'undefined') return;
  const trimmed = apiKey.trim();
  if (trimmed) {
    window.localStorage.setItem(STORAGE_KEY, trimmed);
  } else {
    window.localStorage.removeItem(STORAGE_KEY);
  }
}

export function hasEnvGeminiApiKey(): boolean {
  return Boolean(import.meta.env.VITE_GEMINI_API_KEY?.trim());
}

function createClient(): GoogleGenAI {
  const apiKey = getGeminiApiKey();
  if (!apiKey) {
    throw new Error('请先配置 Gemini API Key（环境变量 VITE_GEMINI_API_KEY 或页面内临时密钥）。');
  }
  return new GoogleGenAI({ apiKey });
}

export interface StreamConciergeOptions {
  input: string;
  previousInteractionId?: string;
  onDelta: (chunk: string) => void;
}

export interface StreamConciergeResult {
  interactionId?: string;
  text: string;
}

/**
 * Streams a multi-turn response from Gemini using the Interactions API.
 */
export async function streamFragranceConcierge({
  input,
  previousInteractionId,
  onDelta,
}: StreamConciergeOptions): Promise<StreamConciergeResult> {
  const ai = createClient();

  const stream = await ai.interactions.create({
    model: GEMINI_MODEL,
    input,
    system_instruction: CONCIERGE_SYSTEM_INSTRUCTION,
    ...(previousInteractionId ? { previous_interaction_id: previousInteractionId } : {}),
    stream: true,
  });

  let fullText = '';
  let interactionId: string | undefined;

  for await (const event of stream) {
    if (event.event_type === 'interaction.created' || event.event_type === 'interaction.completed') {
      if (event.interaction?.id) {
        interactionId = event.interaction.id;
      }
    } else if (event.event_type === 'step.delta' && event.delta?.type === 'text') {
      const chunk = event.delta.text ?? '';
      if (chunk) {
        fullText += chunk;
        onDelta(chunk);
      }
    }
  }

  return { interactionId, text: fullText };
}

export interface GiftCardInspirationInput {
  boxName: string;
  ribbonName: string;
  engraving?: string;
  occasion?: string;
}

/**
 * Generates a short luxury gift card message tailored to the selected gift box.
 */
export async function generateGiftCardMessage({
  boxName,
  ribbonName,
  engraving,
  occasion,
}: GiftCardInspirationInput): Promise<string> {
  const ai = createClient();

  const prompt = [
    `请为 TOM FORD 高定礼盒撰写一段适合手写礼卡的中文寄语（40-70字，优雅、克制、有仪式感，不要加引号或多余说明）。`,
    `礼盒款式：${boxName}`,
    `缎带配色：${ribbonName}`,
    engraving ? `瓶身/礼盒镌刻内容：${engraving}` : '',
    occasion ? `赠礼场景：${occasion}` : '赠礼场景：挚爱珍藏 / 纪念日礼赠',
  ]
    .filter(Boolean)
    .join('\n');

  const interaction = await ai.interactions.create({
    model: GEMINI_MODEL,
    input: prompt,
    system_instruction: '你是 TOM FORD 高定礼赠文案顾问，只输出礼卡正文内容本身。',
    store: false,
  });

  return interaction.output_text?.trim() ?? '';
}
