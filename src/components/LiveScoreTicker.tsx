import React from 'react';

const LiveScoreTicker: React.FC = () => {
  const scores = [
    { home: "ARG", away: "BRA", score: "2 - 1", time: "82'", status: "LIVE" },
    { home: "FRA", away: "ENG", score: "0 - 0", time: "24'", status: "LIVE" },
    { home: "GER", away: "ITA", score: "3 - 3", time: "FT", status: "FINISHED" },
    { home: "ESP", away: "POR", score: "1 - 2", time: "65'", status: "LIVE" },
    { home: "USA", away: "MEX", score: "1 - 0", time: "15'", status: "LIVE" },
    { home: "JPN", away: "KOR", score: "2 - 0", time: "FT", status: "FINISHED" },
    { home: "MAR", away: "SEN", score: "0 - 1", time: "40'", status: "LIVE" },
    { home: "RMAD", away: "MCITY", score: "2 - 2", time: "70'", status: "LIVE", competition: "UCL" },
    { home: "LIV", away: "BAR", score: "4 - 0", time: "FT", status: "FINISHED", competition: "UCL" }
  ];

  return (
    <div className="bg-primary text-black py-2 overflow-hidden border-b-2 border-black relative z-[60]">
      <div className="flex animate-marquee whitespace-nowrap items-center">
        {/* Duplicate scores for infinite loop */}
        {[...scores, ...scores].map((match, idx) => (
          <div key={idx} className="flex items-center gap-4 px-8 border-r border-black/20">
            <span className="text-[10px] font-black bg-black text-primary px-1.5 py-0.5 rounded italic">
              {match.competition || 'WC26'}
            </span>
            <div className="flex items-center gap-2 font-heading text-sm uppercase">
              <span>{match.home}</span>
              <span className={`px-2 py-0.5 rounded font-jersey text-lg ${match.status === 'LIVE' ? 'bg-black text-primary animate-pulse' : 'bg-gray-800 text-white'}`}>
                {match.score}
              </span>
              <span>{match.away}</span>
            </div>
            <span className={`text-[10px] font-bold ${match.status === 'LIVE' ? 'text-black' : 'text-gray-600'}`}>
              {match.time}
            </span>
            {match.status === 'LIVE' && (
              <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveScoreTicker;
