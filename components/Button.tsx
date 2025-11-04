import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  disabled,
  ...rest
}) => {
  const baseStyles = 'font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-75 transition-colors duration-200 ease-in-out';
  let variantStyles = '';
  let sizeStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500'; // Dark theme primary
      break;
    case 'secondary':
      variantStyles = 'bg-gray-700 text-gray-100 hover:bg-gray-600 focus:ring-gray-500'; // Dark theme secondary
      break;
    case 'danger':
      variantStyles = 'bg-red-700 text-white hover:bg-red-800 focus:ring-red-600'; // Dark theme danger
      break;
  }

  switch (size) {
    case 'sm':
      sizeStyles = 'px-3 py-1.5 text-sm';
      break;
    case 'md':
      sizeStyles = 'px-4 py-2 text-base';
      break;
    case 'lg':
      sizeStyles = 'px-5 py-2.5 text-lg';
      break;
  }

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${loading ? 'opacity-70 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? (
        <svg className="animate-spin h-5 w-5 text-white mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;