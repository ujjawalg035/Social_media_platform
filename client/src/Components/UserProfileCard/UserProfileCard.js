import React, { useState, useEffect } from 'react';
import './UserProfileCard.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import FollowersList from '../FollowersList/FollowersList';
import { Link } from 'react-router-dom';

const UserProfileCard = ({ location }) => {
    const [profileUser, setProfileUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [followersOpen, setFollowersOpen] = useState(false);
    const [followingOpen, setFollowingOpen] = useState(false);
    const { user } = useSelector((state) => state.authReducer.authData);
    const posts = useSelector((state) => state.postReducer.posts);
    const { id } = useParams();
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        if (id) {
            fetchUserProfile();
        }
    }, [id]);

    const fetchUserProfile = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/users/${id}`);
            setProfileUser(response.data);
        } catch (error) {
            console.error('Error fetching user profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFollow = async () => {
        try {
            await axios.put(`/api/users/${id}/follow`, { _id: user._id });
            // Refresh the profile to get updated follower count
            fetchUserProfile();
        } catch (error) {
            console.error('Error following user:', error);
        }
    };

    const handleUnfollow = async () => {
        try {
            await axios.put(`/api/users/${id}/unfollow`, { _id: user._id });
            // Refresh the profile to get updated follower count
            fetchUserProfile();
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    };

    if (loading) {
        return (
            <div className='ProfileCard'>
                <div className="loading-profile">Loading profile...</div>
            </div>
        );
    }

    if (!profileUser) {
        return (
            <div className='ProfileCard'>
                <div className="error-profile">User not found</div>
            </div>
        );
    }

    const isOwnProfile = user._id === profileUser._id;
    const isFollowing = user.following.includes(profileUser._id);

    return (
        <>
            <div className='ProfileCard'>
                <div className="ProfileImages">
                    <img 
                        src={profileUser.coverPicture ? serverPublic + profileUser.coverPicture : serverPublic + "defaultCover.jpg"} 
                        alt="" 
                    />
                    <img 
                        src={profileUser.profilePicture ? serverPublic + profileUser.profilePicture : serverPublic + "defaultProfile.png"} 
                        alt="" 
                    />
                </div>

                <div className="ProfileName">
                    <span>{profileUser.firstname} {profileUser.lastname}</span>
                    <span>{profileUser.worksAt ? profileUser.worksAt : "No workplace specified"}</span>
                </div>

                <div className="ProfileInfo">
                    {profileUser.about && (
                        <div className="about-section">
                            <span>{profileUser.about}</span>
                        </div>
                    )}
                    
                    <div className="location-info">
                        {profileUser.livesin && (
                            <span>📍 Lives in {profileUser.livesin}</span>
                        )}
                        {profileUser.country && (
                            <span>🌍 {profileUser.country}</span>
                        )}
                        {profileUser.relationship && (
                            <span>💕 {profileUser.relationship}</span>
                        )}
                    </div>
                </div>

                <div className="followStatus">
                    <hr />
                    <div>
                        <div className="follow" onClick={() => setFollowersOpen(true)}>
                            <span>{profileUser.followers.length}</span>
                            <span>Followers</span>
                        </div>
                        <div className="vl"></div>
                        <div className="follow" onClick={() => setFollowingOpen(true)}>
                            <span>{profileUser.following.length}</span>
                            <span>Following</span>
                        </div>

                        {location === "profilePage" && (
                            <>
                                <div className="vl"></div>
                                <div className="follow">
                                    <span>{posts.filter((post) => post.userId === profileUser._id).length}</span>
                                    <span>Posts</span>
                                </div>
                            </>
                        )}
                    </div>
                    <hr />
                </div>

                {!isOwnProfile && (
                    <div className="follow-button-container">
                        <button 
                            className={`follow-button ${isFollowing ? 'unfollow' : 'follow'}`}
                            onClick={isFollowing ? handleUnfollow : handleFollow}
                        >
                            {isFollowing ? 'Unfollow' : 'Follow'}
                        </button>
                    </div>
                )}

                {isOwnProfile && location !== "profilePage" && (
                    <span>
                        <Link style={{ textDecoration: "none", color: "inherit" }} to={`/profile/${user._id}`}>
                            My Profile
                        </Link>
                    </span>
                )}
            </div>

            <FollowersList 
                type="followers" 
                isOpen={followersOpen} 
                onClose={() => setFollowersOpen(false)} 
            />
            
            <FollowersList 
                type="following" 
                isOpen={followingOpen} 
                onClose={() => setFollowingOpen(false)} 
            />
        </>
    );
};

export default UserProfileCard; 