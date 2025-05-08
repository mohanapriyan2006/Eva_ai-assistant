import { GoogleGenerativeAI } from "@google/generative-ai";
import { evaInstructions } from "./hooks/eva-config";

const YOUR_API_KEY =__API_URL__;
const ai = new GoogleGenerativeAI(YOUR_API_KEY);

async function gemini(history) {

    const model = ai.getGenerativeModel({ model: "gemini-2.0-flash" });


    try {
        const result = await model.generateContent({
            contents: [{
                role: 'model',
                parts: [{
                    text: `You are EVA, an AI assistant created by MOHANAPRIYAN M.Follow these core behavior rules defined in JSON:\n\n${evaInstructions}`
                }]
            }, ...history],
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

