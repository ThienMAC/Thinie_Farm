'use client';

import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  decimals?: number;
}

export default function AnimatedCounter({ 
  end, 
  duration = 2000, 
  suffix = '',
  decimals = 0 
}: CounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            animateCounter();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [hasAnimated]);

  const animateCounter = () => {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateCounter = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function (easeOutExpo)
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      const currentCount = easeProgress * end;
      setCount(currentCount);

      if (now < endTime) {
        requestAnimationFrame(updateCounter);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  return (
    <div ref={counterRef} className="inline-block">
      <span className="tabular-nums">
        {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      </span>
      {suffix && <span>{suffix}</span>}
    </div>
  );
}
