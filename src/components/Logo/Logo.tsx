import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/luminexus-logo.png';

interface LogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  clickable?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showSubtitle = false,
  clickable = true,
  className = '',
}) => {
  const sizeClasses = {
    xs: 'h-7',
    sm: 'h-9',
    md: 'h-12',
    lg: 'h-16',
    xl: 'h-24',
  };

  const content = (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div className="relative flex items-center justify-center p-1 rounded-xl bg-white/95 dark:bg-white/90 shadow-sm border border-slate-200/60 dark:border-brand-cyan/30 transition-all duration-300 hover:shadow-glow-cyan-sm">
        <img
          src={logoImg}
          alt="LumiNexus Logo"
          className={`${sizeClasses[size]} w-auto object-contain transition-transform duration-300 hover:scale-105`}
        />
      </div>
      {showSubtitle && (
        <div className="flex flex-col text-left">
          <span className="text-xs uppercase tracking-wider font-semibold text-brand-cyan">
            Smart City Grid
          </span>
          <span className="text-[10px] text-slate-400 dark:text-slate-400 font-mono">
            Infra-OS v2.4
          </span>
        </div>
      )}
    </div>
  );

  if (clickable) {
    return (
      <Link to="/" className="inline-flex items-center transition-opacity hover:opacity-95 focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
};

export default Logo;
