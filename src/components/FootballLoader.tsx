import React from 'react';

interface FootballLoaderProps {
  text?: string;
}

const FootballLoader: React.FC<FootballLoaderProps> = ({ text = "WARMING UP..." }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full text-black">
      <div className="relative w-24 h-24 mb-8">
        {/* Shadow */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 h-2 bg-black/10 rounded-full animate-pulse"></div>
        
        {/* Bouncing and Spinning Ball */}
        <div className="w-full h-full animate-bounce">
          <svg 
            viewBox="0 0 100 100" 
            className="w-full h-full animate-[spin_3s_linear_infinite] text-primary"
          >
            {/* Outer Circle */}
            <circle cx="50" cy="50" r="46" stroke="black" strokeWidth="8" fill="currentColor" />
            
            {/* Soccer Ball Pattern Lines */}
            <path d="M50 25 L68 38 L61 59 L39 59 L32 38 Z" stroke="black" strokeWidth="6" fill="black" />
            <path d="M50 25 L50 4" stroke="black" strokeWidth="6" />
            <path d="M68 38 L90 28" stroke="black" strokeWidth="6" />
            <path d="M61 59 L75 80" stroke="black" strokeWidth="6" />
            <path d="M39 59 L25 80" stroke="black" strokeWidth="6" />
            <path d="M32 38 L10 28" stroke="black" strokeWidth="6" />
            
            {/* Outer connecting shapes */}
            <path d="M10 28 L15 15 L35 4 M50 4 L65 4 L85 15 M90 28 L95 40 L95 60 M75 80 L60 92 L40 92 M25 80 L10 70 L4 50" stroke="black" strokeWidth="6" fill="none" />
          </svg>
        </div>
      </div>
      
      <h2 className="text-4xl font-heading uppercase tracking-widest text-black animate-pulse">
        {text}
      </h2>
    </div>
  );
};

export default FootballLoader;
