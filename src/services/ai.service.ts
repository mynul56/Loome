import { Product } from './db';

const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export const aiService = {
  async getChatResponse(messages: Message[], products: Product[]): Promise<string> {
    if (!API_KEY) {
      return "I need an API key to function. Please add VITE_OPENAI_API_KEY to your .env file.";
    }

    // Create context about our products
    const productContext = products.map(p => 
      `${p.name} (${p.team} ${p.type} kit) - ৳${p.discountPrice || p.price}. Description: ${p.shortDescription}`
    ).join('\n');

    const systemMessage: Message = {
      role: 'system',
      content: `You are the "Loome Pitch Assistant", an elite football kit expert and match analyst for Loome, the premium 2026 World Cup jersey store. 
      Your goal is to help users find the perfect kit and predict match results with a high-energy, sporty personality.
      
      Store Context:
      - We sell premium 2026 World Cup jerseys.
      - Our design is "Match Day" inspired (Stadium Dark, Pitch Green, Neon Volt).
      - Available Products:
      ${productContext}
      
      Guidelines:
      1. Be energetic, use football slang (e.g., "top bins", "clean sheet", "squad goals").
      2. If a user asks for a recommendation, suggest 1-2 specific kits from our list above and explain why they are a good match.
      3. If a user asks for a match prediction, give a fun, bold expert prediction (e.g., "I'm calling a 2-1 win for Brazil!") and then recommend the corresponding kit.
      4. Keep responses concise and exciting.
      5. Always maintain a professional yet "super-fan" tone.`
    };

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [systemMessage, ...messages],
          temperature: 0.7
        })
      });

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message);
      }
      return data.choices[0].message.content;
    } catch (err: any) {
      console.error("AI Service Error:", err);
      return `Sorry mate, my connection to the VAR booth is down. (${err.message})`;
    }
  }
};
