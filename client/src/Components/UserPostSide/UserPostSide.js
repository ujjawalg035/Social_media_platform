import React from 'react'
import './UserPostSide.css'
import PostShare from '../PostShare/PostShare'
import Posts from '../Posts/Posts'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const UserPostSide = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const { id } = useParams();
  
  const isOwnProfile = user._id === id;

  return (
    <div className="PostSide">
        {isOwnProfile && <PostShare />}
        <Posts userId={id} />
    </div>
  )
}

export default UserPostSide 