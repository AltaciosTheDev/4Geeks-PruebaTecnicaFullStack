import React, { useState } from 'react';
import Post from '../component/Post';
import '../../styles/private.css';

const Private = () => {
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAddPost = () => {
    // Implement functionality to add a new post
    console.log('Add new post');
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
