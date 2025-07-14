import React from 'react';
import './Profile.css';
import ProfilePageLeft from '../../Components/ProfilePageLeft/ProfilePageLeft';
import UserProfileCard from '../../Components/UserProfileCard/UserProfileCard';
import UserPostSide from '../../Components/UserPostSide/UserPostSide';
import RightSide from '../../Components/RightSide/RightSide';


const Profile = () => {
  return (
    <div className='Profile'>
      <ProfilePageLeft />

      <div className="ProfilePage-Center">
        <UserProfileCard location="profilePage" />
        <UserPostSide />
      </div>


      <RightSide />

    </div>
  )
}

export default Profile
