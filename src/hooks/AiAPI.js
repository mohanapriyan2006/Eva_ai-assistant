import { GoogleGenerativeAI } from "@google/generative-ai";

const YOUR_API_KEY = import.meta.env.VITE_API_KEY;

const ai = new GoogleGenerativeAI(YOUR_API_KEY);

async function gemini(history) {

    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });


    try {
        const result = await model.generateContent({
            contents: history,
        });
        const response = result.response.candidates[0].content.parts[0].text
            .replace(/\*\*(.*?)\*\*/g, '$1')
            .replace(/\*/g, '')
            .replace(/^\s*\d+\.\s*/gm, '')
            .replace(/\:\s*$/gm, '').trim();
        return response;
    } catch (err) {
        console.log("Error in API : ", err)
    }

}

export default gemini;
