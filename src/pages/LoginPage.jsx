import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, setError, setLoading } from '../redux/authSlice';
import { addNotification } from '../redux/notificationsSlice';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import { showToast } from '../utils/toaster';
import dashboardIcon from '../assets/dashboard.svg';
/**
 * LoginPage Component
 * Handles user authentication with email and password
 * Features: Form validation, error handling, and navigation to signup
 */
const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector((state) => state.auth.error);
  const isLoading = useSelector((state) => state.auth.isLoading);

  // Function to add default notifications
  const addDefaultNotifications = () => {
    // Add "New comment" notification (2 minutes ago)
    dispatch(addNotification({
      type: 'INFO',
      customTitle: 'New comment',
      timestamp: new Date(Date.now() - 2 * 60 * 1000).toISOString()
    }));

    // Add "System update" notification (1 hour ago)
    dispatch(addNotification({
      type: 'WARNING',
      customTitle: 'System update',
      timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString()
    }));

    // Add "Password changed" notification (5 hours ago)
    dispatch(addNotification({
      type: 'SUCCESS',
      customTitle: 'Password changed',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
    }));
  };

  /**
   * Validates the login form
   * @returns {boolean} True if form is valid, false otherwise
   */
  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    
    // Clear auth error when user starts typing
    if (authError) dispatch(setError(null));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    dispatch(setLoading(true));
    
    try {
      dispatch(login({ email: form.email, name: form.email.split('@')[0] }));
      
      // Add default notifications after successful login
      addDefaultNotifications();
      
      showToast({
        type: 'SUCCESS',
        message: 'Login successful'
      });
      navigate('/dashboard');
    } catch (err) {
      dispatch(setError('Login failed. Please try again.'));
    }
  };

  return (
    <AuthLayout 
      icon={<img src={dashboardIcon} alt="Dashboard" className="w-10 h-10" />}
      subtitle="Sign in to your account"
    >
      {/* Login Form */}
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <h2 className="page-heading text-center">
          Welcome Back
        </h2>
        
        {/* Email Field */}
        <Input
          label="Email Address"
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          disabled={isLoading}
        />

        {/* Password Field */}
        <Input
          label="Password"
          id="password"
          name="password"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          disabled={isLoading}
        />

        {/* Auth Error Display */}
        {authError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {authError}
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          loading={isLoading}
          className="w-full"
        >
          Sign In
        </Button>
      </form>

      {/* Sign Up Link */}
      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm">
          Don't have an account?{' '}
          <Link 
            to="/signup" 
            className="text-primary hover:text-primary-dark font-semibold hover:underline transition-colors"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default LoginPage; 