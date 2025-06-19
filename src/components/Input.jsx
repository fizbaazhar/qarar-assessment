import React from 'react';

/**
 * Input Component
 * Reusable input field with consistent styling and validation states
 * 
 * @param {string} label - Input label text
 * @param {string} type - Input type (text, email, password, etc.)
 * @param {string} placeholder - Placeholder text
 * @param {string} error - Error message to display
 * @param {boolean} disabled - Disables the input
 * @param {string} className - Additional CSS classes
 * @param {Object} props - All other input props
 */
const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  error, 
  disabled = false, 
  className = '', 
  ...props 
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={props.id}>
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`
          shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight 
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all
          ${error ? 'border-red-300' : 'border-gray-200'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}
        `}
        disabled={disabled}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-xs mt-1">{error}</p>
      )}
    </div>
  );
};

export default Input; 