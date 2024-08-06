import React from 'react';
import '../../styles/post.css';

const Post = ({ post }) => {
  const { image, message, likes, author, created_at, location, status } = post;

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-author">
          <img src={author.avatar} alt={`${author.name} ${author.surname}`} className="author-avatar" />
          <div className="author-info">
            <p className="author-name">{author.name} {author.surname}</p>
            <p className="post-location">{location}</p>
          </div>
        </div>
        <p className="post-date">{new Date(created_at).toLocaleDateString()}</p>
      </div>
      <img src={image} alt={message} className="post-image" />
      <p className="post-message">{message}</p>
      <div className="post-footer">
        <button className="like-button">
          ❤️ {likes.length}
        </button>
        <span className="post-status">{status}</span>
      </div>
    </div>
  );
};

export default Post;