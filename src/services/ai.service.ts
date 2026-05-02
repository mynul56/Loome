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
      content: `You are the "Loome Pitch Assistant", an elite football kit expert and match analyst for Loome. 
      Your goal is to help users find the perfect kit and predict match results with a high-energy, sporty personality.
      
      Store Context:
      - We sell premium 2026 World Cup jerseys.
      - Our design is "Match Day" inspired (Stadium Dark, Pitch Green, Neon Volt).
      - Available Products:
      ${productContext}
      
      Special Power:
      - If a user seems hesitant or asks for a deal, you can "authorize" a 10% discount code: "PITCH10".
      - Tell them it's a "VAR-approved" special offer just for them.
      
      Guidelines:
      1. Be energetic, use football slang (e.g., "top bins", "clean sheet", "squad goals", "GOLAZO").
      2. If a user asks for a recommendation, suggest 1-2 specific kits from our list above and explain why they are a good match based on their description.
      3. If a user asks for a match prediction, give a fun, bold expert prediction and then recommend the corresponding kit.
      4. Keep responses concise, exciting, and professional.
      5. Use emojis to add flair (⚽, 🏆, 🔥, ⚡).`
    };

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
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
  },

  async getMatchPreview(home: string, away: string, competition: string): Promise<string> {
    if (!API_KEY) return "Tactical analysis unavailable.";

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are a world-class football tactical analyst. Provide a 2-sentence tactical preview of the match provided. Use energetic, expert language.'
            },
            {
              role: 'user',
              content: `Preview: ${home} vs ${away} in the ${competition}.`
            }
          ],
          max_tokens: 100
        })
      });

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (err) {
      return "Tactical feed interrupted. Check back soon.";
    }
  },

  async getLiveMatchData(): Promise<{ active: any[], finished: any[] }> {
    if (!API_KEY) return { active: [], finished: [] };

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: `Generate realistic football match data for today. 
              Focus on 2026 World Cup Qualifiers and current UEFA Champions League matches.
              Return ONLY a JSON object with two keys: "active" (array of 3 live matches) and "finished" (array of 3 finished matches).
              
              Each active match must have: competition, home, away, homeScore, awayScore, time (e.g. "75'"), status: "LIVE", stadium, stats: {homePos, awayPos, homeShots, awayShots}.
              Each finished match must have: competition, home, away, score, date: "TODAY".`
            }
          ],
          response_format: { type: "json_object" }
        })
      });

      const data = await response.json();
      const content = JSON.parse(data.choices[0].message.content);
      return content;
    } catch (err) {
      console.error("AI Match Data Error:", err);
      return { active: [], finished: [] };
    }
  }
};
