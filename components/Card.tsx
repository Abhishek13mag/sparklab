import React from 'react';

// FIX: Extend standard div attributes to allow `style` and other props.
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = ({ children, className, onClick, ...props }) => {
  const interactiveClasses = onClick 
    ? 'cursor-pointer transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-1 hover:border-sky-500' 
    : '';

  return (
    <div
      // FIX: Spread remaining props to allow 'style' and other attributes to be passed down.
      {...props}
      className={`bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 p-6 ${interactiveClasses} ${className || ''}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;