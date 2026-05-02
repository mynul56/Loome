import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { ChevronRight, Globe } from 'lucide-react';

const Nations: React.FC = () => {
  const nations = [
    { name: "Argentina", color: "87CEEB", flag: "🇦🇷" },
    { name: "Brazil", color: "FFD700", flag: "🇧🇷" },
    { name: "France", color: "00008B", flag: "🇫🇷" },
    { name: "England", color: "FFFFFF", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { name: "Germany", color: "FFFFFF", flag: "🇩🇪" },
    { name: "Spain", color: "FF0000", flag: "🇪🇸" },
    { name: "Portugal", color: "8B0000", flag: "🇵🇹" },
    { name: "Italy", color: "0000FF", flag: "🇮🇹" },
    { name: "Netherlands", color: "FFA500", flag: "🇳🇱" },
    { name: "Belgium", color: "FF0000", flag: "🇧🇪" },
    { name: "Croatia", color: "FFFFFF", flag: "🇭🇷" },
    { name: "Uruguay", color: "87CEEB", flag: "🇺🇾" },
    { name: "Mexico", color: "006400", flag: "🇲🇽" },
    { name: "USA", color: "FFFFFF", flag: "🇺🇸" },
    { name: "Japan", color: "00008B", flag: "🇯🇵" },
    { name: "South Korea", color: "FF0000", flag: "🇰🇷" },
    { name: "Morocco", color: "FF0000", flag: "🇲🇦" },
    { name: "Senegal", color: "008000", flag: "🇸🇳" },
    { name: "Colombia", color: "FFFF00", flag: "🇨🇴" },
    { name: "Switzerland", color: "FF0000", flag: "🇨🇭" }
  ].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen pb-24">
        {/* Nations Header */}
        <div className="bg-black text-white pt-24 pb-16 px-6 lg:px-12 border-b-8 border-primary relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <Globe className="w-[600px] h-[600px] absolute -right-20 -top-20" />
          </div>
          
          <div className="max-w-[1400px] mx-auto relative z-10">
            <h1 className="text-6xl md:text-9xl font-heading uppercase tracking-tighter mb-4">
              Pick Your <span className="text-primary">Nation</span>
            </h1>
            <p className="text-xl md:text-2xl font-bold uppercase text-gray-400 tracking-widest max-w-2xl">
              Select a team to view their official 2026 kit collection and support your squad.
            </p>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {nations.map((nation) => (
              <Link
                key={nation.name}
                to={`/shop?team=${nation.name}`}
                className="group relative bg-white border-4 border-black sport-shadow overflow-hidden transition-all hover:-translate-y-2"
              >
                {/* Background color block that expands on hover */}
                <div 
                  className="absolute inset-0 transition-transform duration-500 transform translate-y-full group-hover:translate-y-0 opacity-10 group-hover:opacity-100"
                  style={{ backgroundColor: `#${nation.color}` }}
                ></div>

                <div className="relative z-10 p-8 flex flex-col items-center text-center">
                  <span className="text-6xl mb-6 transform group-hover:scale-125 transition-transform duration-500 block">
                    {nation.flag}
                  </span>
                  <h3 className="text-3xl font-heading uppercase tracking-tight mb-4 group-hover:text-black">
                    {nation.name}
                  </h3>
                  <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">
                    Explore Kits <ChevronRight className="w-4 h-4" />
                  </div>
                </div>

                {/* Corner accent */}
                <div 
                  className="absolute bottom-0 right-0 w-12 h-12 bg-black transform rotate-45 translate-x-6 translate-y-6 group-hover:bg-primary transition-colors"
                ></div>
              </Link>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mt-20 text-center">
          <div className="bg-black text-white p-12 border-4 border-primary sport-shadow">
            <h2 className="text-4xl font-heading uppercase mb-6 tracking-tighter">Cant find your team?</h2>
            <p className="text-gray-400 font-bold uppercase tracking-widest mb-10">We are adding more nations every week for the 2026 World Cup.</p>
            <Link to="/contact" className="bg-primary text-black px-12 py-4 font-heading text-2xl uppercase border-4 border-black hover:bg-white transition-colors">
              Request a Kit
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Nations;
