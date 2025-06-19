import React from 'react';

/**
 * Button Component
 * Reusable button with different variants, sizes, and states
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
  const baseClasses = 'font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  // Variant classes
  const variantClasses = {
    primary: 'bg-primary text-white border-2 border-transparent hover:bg-white hover:text-primary hover:border-primary focus:ring-primary',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500',
    danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-500',
  };
  
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
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
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2"></div>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button; 