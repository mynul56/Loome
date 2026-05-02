import React, { useState, useEffect, useRef } from 'react';
import { Message, aiService } from '@/services/ai.service';
import { productService } from '@/services/product.service';
import { Product } from '@/services/db';
import { MessageSquare, X, Send, Zap, Bot, User } from 'lucide-react';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadProducts = async () => {
      const data = await productService.getAllProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    const response = await aiService.getChatResponse(newMessages, products);
    setMessages([...newMessages, { role: 'assistant', content: response }]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[100] bg-black text-primary p-4 rounded-full border-4 border-primary shadow-[0_0_20px_rgba(212,255,0,0.3)] hover:scale-110 transition-transform active:scale-95 group"
      >
        {isOpen ? <X className="w-8 h-8" /> : <Zap className="w-8 h-8 animate-pulse" />}
        {!isOpen && (
          <span className="absolute -top-12 right-0 bg-black text-white text-[10px] font-bold uppercase px-3 py-1 border-2 border-primary whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
            Ask the Pitch Assistant
          </span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[350px] md:w-[400px] h-[500px] bg-white z-[100] border-4 border-black sport-shadow flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-black text-white p-4 flex items-center justify-between border-b-4 border-primary">
            <div className="flex items-center gap-3">
              <div className="bg-primary p-1.5 rounded-full">
                <Bot className="w-5 h-5 text-black" />
              </div>
              <div>
                <h3 className="font-heading text-lg uppercase leading-none">Pitch Assistant</h3>
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Live Analysis</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            </div>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50 custom-scrollbar"
          >
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <Zap className="w-12 h-12 text-primary bg-black p-2 rounded-lg" />
                <h4 className="font-heading text-xl uppercase">Game Day?</h4>
                <p className="text-xs font-bold text-gray-500 uppercase leading-relaxed">
                  Ask me for match predictions, kit styling advice, or find your perfect 2026 squad.
                </p>
                <div className="grid grid-cols-1 gap-2 w-full mt-4">
                  <button onClick={() => setInput("Who will win the World Cup 2026?")} className="text-[10px] font-bold border-2 border-gray-200 p-2 hover:border-black hover:bg-white transition-colors uppercase">"Who will win World Cup 2026?"</button>
                  <button onClick={() => setInput("What kit should I wear for a stadium match?")} className="text-[10px] font-bold border-2 border-gray-200 p-2 hover:border-black hover:bg-white transition-colors uppercase">"Best kit for a stadium match?"</button>
                </div>
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 border-2 font-bold text-xs uppercase tracking-tight
                  ${m.role === 'user' 
                    ? 'bg-black text-white border-black rounded-tl-xl rounded-tr-xl rounded-bl-xl shadow-[4px_4px_0px_0px_#D4FF00]' 
                    : 'bg-white text-black border-black rounded-tl-xl rounded-tr-xl rounded-br-xl shadow-[4px_4px_0px_0px_#000]'}`}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border-2 border-black p-3 rounded-xl flex gap-1">
                  <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t-4 border-black">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="ASK THE PITCH ASSISTANT..."
                className="flex-grow p-3 bg-gray-100 border-2 border-transparent focus:border-black focus:bg-white focus:outline-none font-bold uppercase text-xs"
              />
              <button 
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
                className="bg-black text-primary p-3 border-2 border-black hover:bg-primary hover:text-black transition-colors disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
