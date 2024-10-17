import { classNames } from '@/lib/utils';
import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

const Button = ({ children, onClick, className, type = 'button' }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(
        'px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md',
        'hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75',
        'active:scale-95 transition-transform',
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;