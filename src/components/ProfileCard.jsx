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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    onSave?.({ ...formData, avatar });
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
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          min={0}
        />
        <Button type="submit" className="w-full">
          Save
        </Button>
      </form>
    </Card>
  );
};

export default ProfileCard; 