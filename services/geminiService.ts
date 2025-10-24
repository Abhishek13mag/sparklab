import { GoogleGenAI, Type } from "@google/genai";
// FIX: Import ChatMessage type for getAIResponse function.
import type { Language, CommunityHubData, ChatMessage } from '../types';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  // This will be caught by the app, but ensures we don't proceed without a key.
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const geocode = async (address: string): Promise<{ lat: number; lon: number }> => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Provide the latitude and longitude for the following address: "${address}". Respond in JSON format like {"lat": 19.0760, "lon": 72.8777}. If you cannot find the location, return {"lat": 0, "lon": 0}.`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    lat: { type: Type.NUMBER },
                    lon: { type: Type.NUMBER },
                },
                required: ["lat", "lon"]
            }
        }
    });
    
    const data = JSON.parse(response.text);
    if (data.lat === 0 && data.lon === 0) {
        throw new Error(`Could not find coordinates for "${address}". Please try a different location.`);
    }
    return data;
};

export const reverseGeocode = async (lat: number, lon: number): Promise<string> => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Provide a simple, common street address for the latitude ${lat} and longitude ${lon}.`,
    });
    return response.text.trim();
};

export const getCommunityHubInfo = async (location: string | { lat: number, lon: number }, language: Language): Promise<CommunityHubData> => {
    const locationString = typeof location === 'string' ? location : `latitude ${location.lat}, longitude ${location.lon}`;
    
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Generate mock disaster-related community hub information for "${locationString}" in ${language}. 
        Provide a JSON object with three keys: "alerts", "updates", and "resources".
        - "alerts" should be an array of 2-3 objects, each with "title", "source", "summary", and an optional "link".
        - "updates" should be an array of 2-3 objects, each with "update", "location", and "timestamp".
        - "resources" should be an array of 3-4 objects, each with "name", "type" (e.g., Shelter, Hospital, Food Bank), and "address".
        Ensure the addresses are plausible for the given location.`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    alerts: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                title: { type: Type.STRING },
                                source: { type: Type.STRING },
                                summary: { type: Type.STRING },
                                // FIX: Removed invalid 'nullable' property from response schema. Optionality is handled by the 'required' array.
                                link: { type: Type.STRING }
                            },
                             required: ["title", "source", "summary"]
                        }
                    },
                    updates: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                update: { type: Type.STRING },
                                location: { type: Type.STRING },
                                timestamp: { type: Type.STRING }
                            },
                            required: ["update", "location", "timestamp"]
                        }
                    },
                    resources: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING },
                                type: { type: Type.STRING },
                                address: { type: Type.STRING }
                            },
                            required: ["name", "type", "address"]
                        }
                    }
                },
                required: ["alerts", "updates", "resources"]
            }
        }
    });

    return JSON.parse(response.text);
};


export const formatReportForAuthorities = async (report: { type: string; description: string; location: string; }, language: Language): Promise<string> => {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: `Format the following user-submitted disaster report into a concise message for authorities. Language: ${language}.
        - Type: ${report.type}
        - Location: ${report.location}
        - Description: ${report.description}`,
    });
    return response.text.trim();
};

// FIX: Add missing getAIResponse function for the AIAssistant component.
export const getAIResponse = async (history: ChatMessage[]): Promise<string> => {
    const model = 'gemini-2.5-flash';
    
    // Create a prompt from the conversation history
    const contents = history.map(msg => `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.text}`).join('\n\n');
    
    const response = await ai.models.generateContent({
        model,
        contents,
        config: {
            systemInstruction: 'You are a helpful AI assistant specializing in disaster preparedness. Provide concise, actionable advice. Do not mention that you are an AI. Format your responses with markdown for clarity (e.g., using lists).'
        }
    });
    
    return response.text.trim();
};
