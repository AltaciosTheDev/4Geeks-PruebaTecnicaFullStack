import React from 'react';
import '../../styles/post.css';

const Post = ({ post }) => {
  const { image, message, likes, name, created_at, location, status, author_name } = post;

  // Default image URLs
  const defaultImage = 'https://via.placeholder.com/600x400';
  const defaultAvatar = 'https://via.placeholder.com/40';

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-author">
          <img src={defaultAvatar} alt={`${author_name || 'Unknown'} Author`} className="author-avatar" />
          <div className="author-info">
            <p className="author-name">{author_name ? `${author_name}` : 'Unknown Author'}</p>
            <p className="post-location">{location}</p>
          </div>
        </div>
        <p className="post-date">{new Date(created_at).toLocaleDateString()}</p>
      </div>
      <img src={image || defaultImage} alt={message} className="post-image" />
      <p className="post-message">{message}</p>
      <div className="post-footer">
        <button className="like-button">
          ❤️ {Array.isArray(likes) ? likes.length : 0}
        </button>
        <span className="post-status">{status}</span>
      </div>
    </div>
  );
};

export default Post;