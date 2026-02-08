'use client';

import { useEffect, useRef, useState } from 'react';

interface ProcessStepProps {
  step: string;
  icon: string;
  number: number;
  color: 'green' | 'blue' | 'purple' | 'orange' | 'pink';
  isLast: boolean;
}

const colorMap = {
  green: {
    bg: 'from-green-50 to-emerald-100',
    border: 'border-green-200',
    text: 'text-green-700',
    iconBg: 'bg-green-100',
    number: 'bg-green-600',
    arrow: 'text-green-400'
  },
  blue: {
    bg: 'from-blue-50 to-cyan-100',
    border: 'border-blue-200',
    text: 'text-blue-700',
    iconBg: 'bg-blue-100',
    number: 'bg-blue-600',
    arrow: 'text-blue-400'
  },
  purple: {
    bg: 'from-purple-50 to-violet-100',
    border: 'border-purple-200',
    text: 'text-purple-700',
    iconBg: 'bg-purple-100',
    number: 'bg-purple-600',
    arrow: 'text-purple-400'
  },
  orange: {
    bg: 'from-orange-50 to-amber-100',
    border: 'border-orange-200',
    text: 'text-orange-700',
    iconBg: 'bg-orange-100',
    number: 'bg-orange-600',
    arrow: 'text-orange-400'
  },
  pink: {
    bg: 'from-pink-50 to-rose-100',
    border: 'border-pink-200',
    text: 'text-pink-700',
    iconBg: 'bg-pink-100',
    number: 'bg-pink-600',
    arrow: 'text-pink-400'
  }
};

export default function ProcessStep({ step, icon, number, color, isLast }: ProcessStepProps) {
  const [isVisible, setIsVisible] = useState(false);
  const stepRef = useRef<HTMLDivElement>(null);
  const colors = colorMap[color];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, number * 150); // Stagger animation
          }
        });
      },
      { threshold: 0.3 }
    );

    if (stepRef.current) {
      observer.observe(stepRef.current);
    }

    return () => {
      if (stepRef.current) {
        observer.unobserve(stepRef.current);
      }
    };
  }, [number]);

  return (
    <div className="flex items-center" ref={stepRef}>
      <div
        className={`
          relative bg-gradient-to-br ${colors.bg} rounded-2xl px-6 py-5 
          shadow-lg border-2 ${colors.border} 
          transition-all duration-700 ease-out
          hover:shadow-2xl hover:scale-105 group cursor-pointer
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
        style={{ transitionDelay: `${number * 100}ms` }}
      >
        {/* Number badge */}
        <div className={`absolute -top-3 -left-3 w-8 h-8 ${colors.number} text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg group-hover:scale-110 transition-transform`}>
          {number}
        </div>

        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className={`text-4xl ${colors.iconBg} p-3 rounded-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
            {icon}
          </div>
          
          {/* Content */}
          <div className="min-w-[140px]">
            <p className={`font-bold text-lg ${colors.text} group-hover:scale-105 transition-transform`}>
              {step}
            </p>
          </div>
        </div>

        {/* Decorative corner */}
        <div className={`absolute -bottom-1 -right-1 w-6 h-6 ${colors.iconBg} rounded-tl-2xl opacity-50`}></div>
      </div>

      {/* Animated Arrow */}
      {!isLast && (
        <div className={`
          mx-3 text-3xl ${colors.arrow} 
          transition-all duration-700
          ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
        `}
        style={{ transitionDelay: `${(number + 0.5) * 100}ms` }}
        >
          <span className="inline-block animate-pulse">→</span>
        </div>
      )}
    </div>
  );
}
