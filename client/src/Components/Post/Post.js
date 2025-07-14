import React, { useState } from 'react';
import './Post.css';
import Comment from '../../Img/comment.png';
import Share from '../../Img/share.png';
import Like from '../../Img/like.png';
import Notlike from '../../Img/notlike.png';
import { useSelector } from 'react-redux';
import { likePost } from '../../api/PostRequest';
import { Link } from 'react-router-dom';

const Post = ({ data }) => {

  const { user } = useSelector((state) => state.authReducer.authData)
  const [liked, setLiked] = useState(data.likes.includes(user._id))
  const [likes, setLikes] = useState(data.likes.length)
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleLike = () => {
    setLiked((prev) => !prev)
    likePost(data._id, user._id)
    liked ? setLikes((prev) => prev - 1) : setLikes((prev) => prev + 1)
  }

  return (
    <div className='Post'>
      <div className="post-header">
        <div className="post-user-info">
          <img 
            src={data.userProfilePicture ? serverPublic + data.userProfilePicture : serverPublic + "defaultProfile.png"} 
            alt="" 
            className="post-user-avatar"
          />
          <div className="post-user-details">
            <Link to={`/profile/${data.userId}`} className="post-user-name">
              {data.name}
            </Link>
            <span className="post-time">
              {new Date(data.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <img src={data.image ? process.env.REACT_APP_PUBLIC_FOLDER + data.image : " "} alt="" />

      <div className="postReact">
        <img src={liked ? Like : Notlike} alt="" style={{ cursor: "pointer" }} onClick={handleLike} />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>

      <span style={{ color: "var(--gray)", fontSize: '14px' }}>{likes} likes</span>

      <div className="detail">
        <span> <b>{data.name}</b> </span>
        <span>{data.desc}</span>
      </div>

    </div>
  )
}

export default Post
