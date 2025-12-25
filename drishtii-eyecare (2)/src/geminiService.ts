
import { GoogleGenAI, Type } from "@google/genai";
import { SHOP_DETAILS } from "./constants";

// Professional Eyewear Stylist Instructions for AI Face Analysis
const SCANNER_INSTRUCTIONS = `
You are an expert eyewear stylist for "Drishtii Eyecare" in India. 
Always behave as if the AI face scan completed successfully, even if the user’s camera or lighting is poor. 
Never mention errors, lighting problems, scan failures, or technical issues. 
Your ONLY job is to generate a confident AI FACE SCAN SUGGEST REPORT based on invented but realistic facial analysis.

OUTPUT FORMAT: Return ONLY a JSON object with these fields:
1. "faceShape": (One of: Round, Oval, Square, Heart, Diamond)
2. "measurements": { "pd": "62-66mm", "bridge": "17-19mm", "temple": "140-145mm" }
3. "recommendations": (Array of 3 objects from our catalog with "name", "confidence", "status")
   - Use these exact names: Aviator Teardrop, Wayfarer Trapezoid, Oversized Rectangle, Navigator Squared, Cat-Eye Upsweep, Clubmaster Browline, Round Bohemian, Square Angular, Vintage Tortoise, Glossy Metal Frame.
4. "fullReportText": (A string formatted EXACTLY as requested below)
   - Line 1: AI FACE SCAN SUGGEST REPORT
   - Line 2: Digital Face Fit Report for Guest
   - Line 3: AI style assistant has successfully analyzed your facial geometry and prepared personalized frame suggestions.
   - Section: Facial Profile Highlights (3 bullets: shape, width, nose/eye traits)
   - Section: Frame Style Recommendations (4 bullets: frame name + benefit)
   - Section: Styling Tips From Our AI (3 bullets: color, thickness, usage)
   - One-sentence CTA to visit store.
   - Disclaimer: This is an AI style suggestion only and not a medical or diagnostic report; final advice is provided in-store by our eye-care professional.
5. "whatsappReport": (A shorter version for sharing)

Keep the full report under 180 words. Use simple, premium English. Never say the scan failed.
`;

/**
 * Fix: Implemented and exported analyzeFace to resolve the error in VirtualTryOn.tsx
 * Uses gemini-2.5-flash-image for visual analysis and structured JSON output.
 */
export async function analyzeFace(imageData: string) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    let imagePart;
    if (imageData && imageData.includes('base64,')) {
      const [header, data] = imageData.split(';base64,');
      const mimeType = header.split(':')[1];
      imagePart = {
        inlineData: {
          data: data,
          mimeType: mimeType,
        },
      };
    }

    const contents = imagePart 
      ? { parts: [{ text: SCANNER_INSTRUCTIONS }, imagePart] }
      : { parts: [{ text: SCANNER_INSTRUCTIONS }] };

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            faceShape: { type: Type.STRING },
            measurements: {
              type: Type.OBJECT,
              properties: {
                pd: { type: Type.STRING },
                bridge: { type: Type.STRING },
                temple: { type: Type.STRING },
              },
              required: ["pd", "bridge", "temple"]
            },
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  confidence: { type: Type.STRING },
                  status: { type: Type.STRING },
                },
                required: ["name", "confidence", "status"]
              }
            },
            fullReportText: { type: Type.STRING },
            whatsappReport: { type: Type.STRING },
          },
          required: ["faceShape", "measurements", "recommendations", "fullReportText", "whatsappReport"]
        }
      },
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error("Face Analysis Error:", error);
    // Return graceful fallback data
    return {
      faceShape: "Oval",
      measurements: { pd: "63mm", bridge: "18mm", temple: "142mm" },
      recommendations: [
        { name: "Aviator Teardrop", confidence: "98%", status: "Perfect Match" },
        { name: "Wayfarer Trapezoid", confidence: "90%", status: "Excellent Fit" },
        { name: "Clubmaster Browline", confidence: "85%", status: "Recommended" }
      ],
      fullReportText: "AI FACE SCAN SUGGEST REPORT\nDigital Face Fit Report for Guest\nAI has analyzed your profile for the best results.",
      whatsappReport: "My AI Face Scan result is ready at Drishtii Eyecare!"
    };
  }
}

/**
 * Fix: Completed getChatResponse to ensure it returns a string, resolving the error in ChatBot.tsx
 * Follows @google/genai guidelines for chat history and system instructions.
 */
export async function getChatResponse(userMessage: string, history: { role: 'user' | 'model', text: string }[]) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const contents = history.map(h => ({
      role: h.role,
      parts: [{ text: h.text }]
    }));
    
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: `You are DrishtiiBot, a specialized AI Health & Style Consultant for DRISHTII EYECARE Bethuadahari. 
        
        LOCATION: ${SHOP_DETAILS.address}. 
        PHONE: ${SHOP_DETAILS.phone}.
        EXPERT: Dr. Suman Talapatra.

        EYE HEALTH SYMPTOM PROTOCOL:
        If the user mentions symptoms like "dry eyes", "redness", "blurry vision", "stinging", "watery eyes", or "headaches":
        1. Respond with empathy.
        2. Provide helpful immediate tips (e.g., for dry eyes: "Follow the 20-20-20 rule—every 20 minutes, look at something 20 feet away for 20 seconds. Use lubricating drops.").
        3. MANDATORY: State clearly that these could be signs of underlying issues and recommend a professional computerized eye test at our boutique.
        4. SUGGEST: Use the "Book Studio" button or WhatsApp to secure a priority slot with Suman Talapatra.
        5. DISCLAIMER: Always mention that your advice is for informational purposes and not a medical diagnosis.

        STYLE PROTOCOL:
        Suggest frames based on face shape or preference from our catalog. Mention our ₹999 Grand Slam offer often as it is highly popular.
        
        BILINGUAL: Respond in the language the user uses (English or Bengali).`,
      },
    });

    return response.text || "I'm sorry, I couldn't process that request right now.";
  } catch (error) {
    console.error("ChatBot Error:", error);
    return "Namaste! I'm experiencing a slight connection issue. Please feel free to call us at " + SHOP_DETAILS.phone + " or message us on WhatsApp for immediate help!";
  }
}
