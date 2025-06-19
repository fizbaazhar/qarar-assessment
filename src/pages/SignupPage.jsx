import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { signup, setError, setLoading } from '../redux/authSlice';
import AuthLayout from '../components/AuthLayout';
import Input from '../components/Input';
import Button from '../components/Button';
import { showToast } from '../utils/toaster';
import dashboardIcon from '../assets/dashboard.svg';

const SignupPage = () => {
  const [form, setForm] = useState({ 
    name: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [errors, setErrors] = useState({});
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authError = useSelector((state) => state.auth.error);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (form.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(form.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!form.password) {
      newErrors.password = 'Password is required';
    } else if (form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!form.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    
    // Clear specific field error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
    
    // Clear auth error when user starts typing
    if (authError) dispatch(setError(null));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    dispatch(setLoading(true));
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch(signup({ 
        email: form.email, 
        name: form.name.trim() 
      }));
      showToast({
        type: 'SUCCESS',
        message: 'Registration successful'
      });
      navigate('/dashboard');
    } catch (err) {
      dispatch(setError('Registration failed. Please try again.'));
    }
  };

  return (
    <AuthLayout 
      icon={<img src={dashboardIcon} alt="Dashboard" className="w-10 h-10" />}
      subtitle="Create your account"
    >
      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="w-full space-y-6">
        <h2 className="page-heading text-center">
          Join Us Today
        </h2>
        
        {/* Name Field */}
        <Input
          label="Full Name"
          id="name"
          name="name"
          type="text"
          placeholder="Enter your full name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          disabled={isLoading}
        />

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
          placeholder="Create a password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          disabled={isLoading}
        />

        {/* Confirm Password Field */}
        <Input
          label="Confirm Password"
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="Confirm your password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
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
          Create Account
        </Button>
      </form>

      {/* Login Link */}
      <div className="mt-6 text-center">
        <p className="text-gray-600 text-sm">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="text-primary hover:text-primary-dark font-semibold hover:underline transition-colors"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignupPage; 