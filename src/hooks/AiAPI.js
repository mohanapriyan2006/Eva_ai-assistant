import { GoogleGenerativeAI } from "@google/generative-ai";

const YOUR_API_KEY = import.meta.env.VITE_API_KEY;

const ai = new GoogleGenerativeAI(YOUR_API_KEY);

async function gemini(prompt) {
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }],
    });

    const response = result.response.candidates[0].content.parts[0].text;
    return response;
}

export default gemini;
