import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfileCard from '../components/ProfileCard';
import { updateProfile, setAvatar, initializeFromUser } from '../redux/profileSlice';
import { addNotification } from '../redux/notificationsSlice';
import MainLayout from '../components/MainLayout';
import { showToast } from '../utils/toaster';

const ProfilePage = () => {
  const profile = useSelector((state) => state.profile);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  // Initialize profile with user data when component mounts
  useEffect(() => {
    if (user && (!profile.firstName || !profile.email)) {
      dispatch(initializeFromUser(user));
    }
  }, [user, profile, dispatch]);

  const handleSave = (data) => {
    dispatch(updateProfile(data));
    // Create success notification for profile update
    dispatch(addNotification({
      type: 'SUCCESS',
      customTitle: 'Profile Updated Successfully'
    }));
    showToast({
      type: 'SUCCESS',
      message: 'Profile Updated Successfully'
    });
  };

  const handleAvatarChange = (avatarDataUrl) => {
    dispatch(setAvatar(avatarDataUrl));
    //  success notification for profile photo update
    dispatch(addNotification({
      type: 'SUCCESS',
      customTitle: 'Profile Picture Updated Successfully'
    }));
    showToast({
      type: 'SUCCESS',
      message: 'Profile Picture Updated Successfully'
    });
  };

  return (
    <MainLayout>
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-8rem)]">
        <ProfileCard
          profile={profile}
          onSave={handleSave}
          onAvatarChange={handleAvatarChange}
        />
      </div>
    </MainLayout>
  );
};

export default ProfilePage; 