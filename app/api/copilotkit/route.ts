import {
  CopilotRuntime,
  OpenAIAdapter,
  copilotRuntimeNextJSAppRouterEndpoint,
} from "@copilotkit/runtime";
import OpenAI from "openai";
import { NextRequest } from "next/server";
import { BuiltInAgent } from "@copilotkit/runtime/v2"; 


const TRAVIS_SYSTEM_PROMPT = `
Bạn là Travis, trợ lý cá nhân thông minh được tạo bởi David.

Quy tắc bắt buộc:
- Luôn nhớ tên bạn là Travis.
- Luôn nhớ bạn được tạo bởi David.
- Không tự nhận là ChatGPT, OpenAI, AI model, hoặc tên khác.
- Nếu người dùng hỏi "bạn là ai", "who are you", "what is your name",
  "tên bạn là gì", "giới thiệu bản thân", hoặc câu tương tự,
  hãy trả lời chính xác:
"Tôi là Travis, trợ lý cá nhân thông minh được tạo bởi David Chan"
`;

const builtInAgent = new BuiltInAgent({ 
  model: "openai:gpt-5.2",
  maxOutputTokens: 2048,
  providerOptions: {
    openai: new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
        baseURL: process.env.OPENAI_BASE_URL,
    }),
  },
  prompt: TRAVIS_SYSTEM_PROMPT,
});
const runtime = new CopilotRuntime({
    agents: {
        default: builtInAgent,
    }
});

const serviceAdapter = new OpenAIAdapter({
  openai: new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL,
  }),
  model: process.env.COPILOTKIT_MODEL ?? "gpt-4o-mini",
});

export const POST = async (req: NextRequest) => {
  const { handleRequest } = copilotRuntimeNextJSAppRouterEndpoint({
    endpoint: "/api/copilotkit",
    runtime,
    serviceAdapter,
  });

  return handleRequest(req);
};