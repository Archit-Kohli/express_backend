import { SYSTEM_PROMPT } from "../prompts/systemPrompt.js";
import { GoogleGenAI } from "@google/genai";
import dotenv from 'dotenv';

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY not in environment variables")
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

async function generateMeetingNotes(rawNotes) {
    if (!rawNotes || typeof rawNotes !== 'string' || rawNotes.trim().length === 0) {
        throw new Error("Missing input: raw meeting notes are required.");
    }
    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: rawNotes,
            config: {
                thinkingConfig: {
                    thinkingBudget: 0,
                },
                systemInstruction: SYSTEM_PROMPT,
            },
            temperature: 0.2
        });
        const output = response.candidates[0]?.content?.parts?.[0]?.text || "";
        if (output.length === 0) {
            throw new Error("No Output Returned");
        }
        const extractJSON = output.match(/\{[\s\S]*\}/);
        if (!extractJSON) {
            throw new Error("Invalid JSON!")
        }
        const parsedOutput = JSON.parse(extractJSON[0]);
        return parsedOutput;
    } catch (err) {
        if (err.message && err.message.includes('API key')) {
            err.message = "API key error: " + err.message;
        } else if (err.code === 'ETIMEDOUT' || err.message.includes('timeout')) {
            err.code = 'ETIMEDOUT';
            err.message = "AI service request timed out.";
        }
        throw err;
    }
}

export default generateMeetingNotes;