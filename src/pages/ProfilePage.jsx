import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileCard from '../components/ProfileCard';
import { updateProfile, setAvatar } from '../redux/profileSlice';
import { addNotification } from '../redux/notificationsSlice';
import { logout } from '../redux/authSlice';
import Header from '../components/Header';

const ProfilePage = () => {
  const profile = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const handleSave = (data) => {
    dispatch(updateProfile(data));
    // Create success notification for profile update
    dispatch(addNotification({
      type: 'SUCCESS',
      customTitle: 'Profile Updated Successfully'
    }));
  };

  const handleAvatarChange = (avatarDataUrl) => {
    dispatch(setAvatar(avatarDataUrl));
    // Create success notification for avatar update
    dispatch(addNotification({
      type: 'SUCCESS',
      customTitle: 'Profile Picture Updated Successfully'
    }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={handleLogout} />
      <div className="flex justify-center items-center min-h-[calc(100vh-4rem)]">
        <ProfileCard
          profile={profile}
          onSave={handleSave}
          onAvatarChange={handleAvatarChange}
        />
      </div>
    </div>
  );
};

export default ProfilePage; 