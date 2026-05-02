import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Trophy, Users, Timer, TrendingUp, ChevronRight } from 'lucide-react';

const LiveScores: React.FC = () => {
  const activeMatches = [
    { 
      competition: "FIFA World Cup 2026 - Qualifiers", 
      home: "Argentina", away: "Brazil", 
      homeScore: 2, awayScore: 1, 
      time: "82'", 
      status: "LIVE",
      stadium: "Estádio do Maracanã",
      stats: { homePos: "52%", awayPos: "48%", homeShots: 12, awayShots: 9 }
    },
    { 
      competition: "UEFA Champions League - Quarter Finals", 
      home: "Real Madrid", away: "Man City", 
      homeScore: 2, awayScore: 2, 
      time: "70'", 
      status: "LIVE",
      stadium: "Santiago Bernabéu",
      stats: { homePos: "45%", awayPos: "55%", homeShots: 8, awayShots: 15 }
    },
    { 
      competition: "FIFA World Cup 2026 - Qualifiers", 
      home: "France", away: "England", 
      homeScore: 0, awayScore: 0, 
      time: "24'", 
      status: "LIVE",
      stadium: "Stade de France",
      stats: { homePos: "50%", awayPos: "50%", homeShots: 4, awayShots: 3 }
    }
  ];

  const finishedMatches = [
    { competition: "WC Qualifiers", home: "Germany", away: "Italy", score: "3 - 3", date: "TODAY" },
    { competition: "UCL", home: "Liverpool", away: "Barcelona", score: "4 - 0", date: "YESTERDAY" },
    { competition: "WC Qualifiers", home: "Japan", away: "South Korea", score: "2 - 0", date: "TODAY" }
  ];

  return (
    <Layout>
      <div className="bg-gray-100 min-h-screen pb-24">
        {/* Live Header */}
        <div className="bg-black text-white pt-24 pb-16 px-6 lg:px-12 border-b-8 border-primary relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 transform translate-x-20"></div>
          <div className="max-w-[1400px] mx-auto relative z-10 flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-red-600 text-white px-3 py-1 font-bold text-xs uppercase tracking-widest animate-pulse flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full"></span> LIVE NOW
                </span>
              </div>
              <h1 className="text-6xl md:text-9xl font-heading uppercase tracking-tighter">
                Match <span className="text-primary">Center</span>
              </h1>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-6 border-l-4 border-primary">
              <div className="flex items-center gap-4 text-primary mb-2">
                <Timer className="w-6 h-6" />
                <span className="font-heading text-2xl uppercase">Global Kickoff</span>
              </div>
              <p className="font-bold text-gray-400 uppercase tracking-widest text-sm">Real-time stats from around the world.</p>
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mt-12 grid lg:grid-cols-12 gap-12">
          
          {/* Main Matches */}
          <div className="lg:col-span-8 space-y-8">
            <h2 className="text-3xl font-heading uppercase border-b-4 border-black pb-4">Current Fixtures</h2>
            
            {activeMatches.map((match, idx) => (
              <div key={idx} className="bg-white border-4 border-black sport-shadow overflow-hidden">
                <div className="bg-gray-50 px-6 py-3 border-b-2 border-gray-100 flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{match.competition}</span>
                  <span className="text-xs font-bold text-red-600 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></span> {match.time}
                  </span>
                </div>
                
                <div className="p-8 grid md:grid-cols-3 items-center gap-8">
                  <div className="text-center md:text-right">
                    <h3 className="text-3xl md:text-4xl font-heading uppercase mb-2">{match.home}</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Home Team</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="bg-black text-primary px-8 py-4 font-jersey text-6xl md:text-7xl skew-x-[-10deg] shadow-[6px_6px_0px_0px_#D4FF00]">
                      <div className="skew-x-[10deg]">{match.homeScore} - {match.awayScore}</div>
                    </div>
                  </div>

                  <div className="text-center md:text-left">
                    <h3 className="text-3xl md:text-4xl font-heading uppercase mb-2">{match.away}</h3>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Away Team</p>
                  </div>
                </div>

                {/* Mini Stats */}
                <div className="bg-black text-white p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center border-t-4 border-primary">
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Possession</p>
                    <p className="font-jersey text-xl">{match.stats.homePos} / {match.stats.awayPos}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Total Shots</p>
                    <p className="font-jersey text-xl">{match.stats.homeShots + match.stats.awayShots}</p>
                  </div>
                  <div className="col-span-2 hidden md:block">
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Stadium</p>
                    <p className="font-bold text-xs uppercase text-primary">{match.stadium}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white border-4 border-black p-6 sport-shadow">
              <h3 className="text-2xl font-heading uppercase mb-6 flex items-center gap-3">
                <Trophy className="w-6 h-6 text-primary bg-black p-1" /> Recent Results
              </h3>
              <div className="space-y-4">
                {finishedMatches.map((match, idx) => (
                  <div key={idx} className="flex justify-between items-center p-4 bg-gray-50 border-2 border-transparent hover:border-black transition-colors group">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-bold text-gray-400 uppercase">{match.competition}</span>
                      <span className="font-bold text-sm uppercase">{match.home} vs {match.away}</span>
                    </div>
                    <div className="font-jersey text-2xl group-hover:text-primary transition-colors">{match.score}</div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 py-3 border-2 border-black font-bold uppercase text-xs hover:bg-black hover:text-white transition-all">
                View All Results
              </button>
            </div>

            <div className="bg-primary p-8 border-4 border-black sport-shadow-sm rotate-2">
              <TrendingUp className="w-10 h-10 mb-4 text-black" />
              <h4 className="text-2xl font-heading uppercase mb-4 leading-tight">Win Your Own Match</h4>
              <p className="text-sm font-bold uppercase mb-6 leading-relaxed">Gear up like the pros. Get your team's official kit and dominate the pitch.</p>
              <Link to="/shop" className="inline-block bg-black text-white px-6 py-2 font-bold uppercase text-xs hover:bg-white hover:text-black transition-colors">
                Shop Kits
              </Link>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default LiveScores;
