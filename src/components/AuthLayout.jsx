import React from 'react';

/**
 * AuthLayout Component
 * Reusable layout for authentication pages with consistent styling
 * 
 * @param {string} icon - Emoji or icon to display
 * @param {string} title - Page title
 * @param {string} subtitle - Page subtitle
 * @param {React.ReactNode} children - Page content
 */
const AuthLayout = ({ icon, title, subtitle, children }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-primary/10 via-white to-primary/20">
      <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl flex flex-col items-center">
        {/* Header Section */}
        <div className="mb-6 flex flex-col items-center">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-2 shadow-lg">
            <span className="text-white text-3xl font-bold">{icon}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-primary tracking-tight mb-1">Mini Dashboard</h1>
          <p className="text-gray-400 text-sm">{subtitle}</p>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout; 