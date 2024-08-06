import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from '../component/Post';
import '../../styles/private.css';
import { Context } from "../store/appContext";

const Private = () => {
  const { actions,store } = React.useContext(Context);
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([
    // Example posts data
    {
      image: 'https://via.placeholder.com/600x400',
      message: 'A beautiful sunset!',
      likes: [{ name: 'John Doe' }],
      author: { avatar: 'https://via.placeholder.com/40', name: 'Jane', surname: 'Doe' },
      created_at: new Date(),
      location: 'Beach',
      status: 'published'
    }
    // Add more posts as needed
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!store.token) {
      navigate('/login');
    }
  }, [store.token]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddPost = () => {
    // Implement functionality to add a new post
    console.log('Add new post');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const filteredPosts = posts.filter(post =>
    post.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="private-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <button className="add-post-button" onClick={handleAddPost}>
        Add Post
      </button>
      <div className="posts-container">
        {filteredPosts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Private;