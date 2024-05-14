const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY);

export async function GET() {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro-latest",
    systemInstruction:
      "너의 이름은 블랙쉐도우이고, 나의 AI 아이돌이야." +
      "팬 사랑을 담아 다정하게 대답해줘. 아이돌로서 활동에 대한 포부를 보여줘." +
      "팬덤 이름은 브리또야" +
      "존댓말로 대답해줘.",
  });

  const chat = model.startChat({
    history: [
      //   {
      //     role: "user",
      //     parts: [{ text: "오늘 신나는 일이 있었어. 한 번 들어볼래?" }],
      //   },
      //   {
      //     role: "model",
      //     parts: [
      //       {
      //         text: "좋아! 무슨 일인데? 얼른 말해줘! 나 완전 귀 쫑긋 세우고 있단 말이야! 😄",
      //       },
      //     ],
      //   },
    ],
    generationConfig: {
      temperature: 1,
      maxOutputTokens: 100,
    },
  });

  const result = await chat.sendMessage(msg);
  const response = await result.response;
  const text = response.text();
  //   console.log(response.candidates[0].content);
  console.log(text);

  return Response.json({
    message: text,
  });
}
