import React, { useState, useEffect } from 'react';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const launchDate = new Date('2025-09-20T00:00:00').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = launchDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-card border border-border/50 rounded-lg p-8 elegant-shadow">
      <h3 className="text-2xl font-heading font-medium text-center mb-6 text-balance">
        Launching September 20, 2025
      </h3>
      
      <div className="grid grid-cols-4 gap-4 text-center">
        <div className="space-y-1">
          <div className="text-3xl font-heading font-bold text-primary">
            {timeLeft.days.toString().padStart(2, '0')}
          </div>
          <div className="text-sm text-muted-foreground font-medium">Days</div>
        </div>
        
        <div className="space-y-1">
          <div className="text-3xl font-heading font-bold text-primary">
            {timeLeft.hours.toString().padStart(2, '0')}
          </div>
          <div className="text-sm text-muted-foreground font-medium">Hours</div>
        </div>
        
        <div className="space-y-1">
          <div className="text-3xl font-heading font-bold text-primary">
            {timeLeft.minutes.toString().padStart(2, '0')}
          </div>
          <div className="text-sm text-muted-foreground font-medium">Minutes</div>
        </div>
        
        <div className="space-y-1">
          <div className="text-3xl font-heading font-bold text-primary">
            {timeLeft.seconds.toString().padStart(2, '0')}
          </div>
          <div className="text-sm text-muted-foreground font-medium">Seconds</div>
        </div>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-muted-foreground">
          Be the first to experience timeless elegance
        </p>
      </div>
    </div>
  );
};

export default CountdownTimer;