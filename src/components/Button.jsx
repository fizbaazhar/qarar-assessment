import React from 'react';

/**
 * Button Component
 * 
 * @param {string} variant - 'primary', 'secondary', 'danger'
 * @param {string} size - 'sm', 'md', 'lg'
 * @param {boolean} loading - Shows loading spinner
 * @param {boolean} disabled - Disables the button
 * @param {string} className - Additional CSS classes
 * @param {React.ReactNode} children - Button content
 * @param {Object} props - All other button props
 */
const Button = ({ 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  disabled = false, 
  className = '', 
  children, 
  ...props 
}) => {
  // Base button classes
  const baseClasses = 'font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap';
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary text-white border-2 border-transparent hover:bg-white hover:text-primary hover:border-primary focus:ring-primary active:scale-95',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500 active:scale-95',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500 active:scale-95',
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'px-2.5 sm:px-3 py-1 sm:py-1 text-[12px] sm:text-sm',
    md: 'px-3 sm:px-4 py-1.5 sm:py-1.5 text-xs sm:text-base',
    lg: 'px-4 sm:px-6 py-2 sm:py-2 text-xs sm:text-base md:text-lg',
  };
  
  // Combine all classes
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  return (
    <button 
      className={buttonClasses}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-current"></div>
          <span className="whitespace-nowrap">Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button; 