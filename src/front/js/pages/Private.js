import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from '../component/Post';
import '../../styles/private.css';
import { Context } from "../store/appContext";
import PostModal from '../component/PostModal'; // Import the PostModal component

const Private = () => {
  const { actions, store } = useContext(Context);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.token) {
      navigate('/login');
    } else {
      actions.fetchAllPosts(); // Fetch all posts when the component is mounted
    }
  }, [store.token, store.posts]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddPost = () => {
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  const handleSubmitPost = (postData) => {
    actions.createPost(postData); // Use the createPost function from flux
    setIsModalOpen(false); // Close the modal after submitting
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const filteredPosts = store.posts.filter(post =>
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
      <PostModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitPost}
      />
    </div>
  );
};

export default Private;