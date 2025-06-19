import React, { useState, useEffect, useRef } from 'react';
import Card from './Card';
import Input from './Input';
import Button from './Button';

const ProfileCard = ({ profile = {}, onSave, onAvatarChange }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
  });
  const [errors, setErrors] = useState({});
  const [avatar, setAvatar] = useState('');
  const fileInputRef = useRef();

  useEffect(() => {
    setFormData({
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      email: profile.email || '',
      age: profile.age || '',
    });
    setAvatar(profile.avatar || '');
  }, [profile]);

  const validateForm = () => {
    const newErrors = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    } else if (formData.firstName.length < 2) {
      newErrors.firstName = 'First name must be at least 2 characters';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    } else if (formData.lastName.length < 2) {
      newErrors.lastName = 'Last name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Age validation
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (isNaN(formData.age) || formData.age < 0) {
      newErrors.age = 'Please enter a valid age';
    } else if (formData.age > 120) {
      newErrors.age = 'Please enter a valid age below 120';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setAvatar(ev.target.result);
        onAvatarChange?.(ev.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave?.({ ...formData, avatar });
    }
  };

  return (
    <Card className="p-4 sm:p-6 max-w-md w-full">
      <div className="flex flex-col items-center mb-4 sm:mb-6">
      <h2 className="page-heading mb-4 lg:mt-2 lg:mb-6 ">Profile</h2>
        <div
          className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden cursor-pointer border-2 border-gray-300 hover:border-primary transition"
          onClick={handleAvatarClick}
          title="Upload profile picture"
        >
          {avatar ? (
            <img src={avatar} alt="Profile" className="object-cover w-full h-full" />
          ) : (
            <svg className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleAvatarChange}
          />
        </div>
        <span className="text-xs text-gray-500 mt-2">Click to upload</span>
      </div>
      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <Input
          type="text"
          name="firstName"
          label="First Name"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />
        <Input
          type="text"
          name="lastName"
          label="Last Name"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />
        <Input
          type="email"
          name="email"
          label="Email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          type="number"
          name="age"
          label="Age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          error={errors.age}
          min={0}
          max={120}
        />
        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </Card>
  );
};

export default ProfileCard; 