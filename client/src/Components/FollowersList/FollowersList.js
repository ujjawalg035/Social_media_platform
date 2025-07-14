import React, { useState, useEffect } from 'react';
import './FollowersList.css';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const FollowersList = ({ type, isOpen, onClose }) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const { user } = useSelector((state) => state.authReducer.authData);
    const { id } = useParams();
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        if (isOpen && id) {
            fetchUsers();
        }
    }, [isOpen, id, type]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`/api/users/${id}/${type}`);
            setUsers(response.data);
        } catch (error) {
            console.error(`Error fetching ${type}:`, error);
        } finally {
            setLoading(false);
        }
    };

    const handleFollow = async (userId) => {
        try {
            await axios.put(`/api/users/${userId}/follow`, { _id: user._id });
            // Refresh the list
            fetchUsers();
        } catch (error) {
            console.error('Error following user:', error);
        }
    };

    const handleUnfollow = async (userId) => {
        try {
            await axios.put(`/api/users/${userId}/unfollow`, { _id: user._id });
            // Refresh the list
            fetchUsers();
        } catch (error) {
            console.error('Error unfollowing user:', error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="followers-modal-overlay" onClick={onClose}>
            <div className="followers-modal" onClick={(e) => e.stopPropagation()}>
                <div className="followers-modal-header">
                    <h3>{type === 'followers' ? 'Followers' : 'Following'}</h3>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                
                <div className="followers-list">
                    {loading ? (
                        <div className="loading">Loading...</div>
                    ) : users.length === 0 ? (
                        <div className="no-users">
                            {type === 'followers' ? 'No followers yet' : 'Not following anyone yet'}
                        </div>
                    ) : (
                        users.map((userItem) => (
                            <div key={userItem._id} className="follower-item">
                                <div className="follower-info">
                                    <img 
                                        src={userItem.profilePicture ? serverPublic + userItem.profilePicture : serverPublic + "defaultProfile.png"} 
                                        alt="" 
                                        className="follower-avatar"
                                    />
                                    <div className="follower-details">
                                        <span className="follower-name">
                                            {userItem.firstname} {userItem.lastname}
                                        </span>
                                        <span className="follower-about">
                                            {userItem.about ? userItem.about.substring(0, 50) + '...' : 'No bio yet'}
                                        </span>
                                    </div>
                                </div>
                                
                                {userItem._id !== user._id && (
                                    <button 
                                        className={`follow-btn ${user.following.includes(userItem._id) ? 'unfollow' : 'follow'}`}
                                        onClick={() => user.following.includes(userItem._id) 
                                            ? handleUnfollow(userItem._id) 
                                            : handleFollow(userItem._id)
                                        }
                                    >
                                        {user.following.includes(userItem._id) ? 'Unfollow' : 'Follow'}
                                    </button>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default FollowersList; 