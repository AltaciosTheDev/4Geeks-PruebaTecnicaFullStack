import React, { useState } from 'react';
import '../../styles/modal.css'; // Make sure to create this CSS file for modal styling

const PostModal = ({ isOpen, onClose, onSubmit }) => {
  const [message, setMessage] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState('published'); // Default status

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the onSubmit prop with the form data
    onSubmit({ message, location, status });
    // Close the modal after submitting
    onClose();
  };

  if (!isOpen) return null; // Do not render if the modal is not open

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Add New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="drafted">Drafted</option>
              <option value="published">Published</option>
              <option value="deleted">Deleted</option>
            </select>
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default PostModal;
