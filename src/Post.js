import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext'; // Access user context

const Post = () => {
  const { user } = useUser(); // Get user data from context
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleContentChange = (event) => setContent(event.target.value);
  const handleImageUrlChange = (event) => setImageUrl(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear previous messages
    setError('');
    setSuccessMessage('');

    // Validation checks
    if (!title || !content || !imageUrl) {
      setError('Please provide title, content, and image URL for the post.');
      return;
    }

    if (!user) {
      setError('You need to be logged in to create a post.');
      return;
    }

    // Create the new post object with userId
    const newPost = {
      title,
      content,
      imageUrl,
      userId: user.id,  // Attach user ID to the post
      authorEmail: user.email, // Include email for filtering on profile page
      date: new Date().toISOString(),
    };

    try {
      // POST request to save the post
      const response = await fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      const data = await response.json();
      console.log('Post created successfully:', data); // Use the data variable

      setSuccessMessage('Post created successfully!');
      setTitle('');
      setContent('');
      setImageUrl('');

      // Navigate to the home page after success
      setTimeout(() => {
        navigate('/Home'); // Redirect to home page after success
      }, 1000); // Delay before redirect
    } catch (error) {
      console.error('Error:', error);
      setError('Error creating post. Please try again.');
    }
  };

  return (
    <div className='bg-gradient-to-r from-black via-grey-800 to-purple-900 min-h-screen flex items-center justify-center'>
      <div className="mt-20 text-2xl flex flex-col items-center border p-10 rounded-lg shadow-lg max-w-md mx-auto text-white ">
        <h1>Create Post</h1>

        {error && <p className="text-red-500 mt-2 text-xl">{error}</p>}
        {successMessage && <p className="text-green-500 mt-2 text-xl">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="w-full">
          <label className="mt-5 mb-3">Title:</label>
          <input
            type="text"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter post title"
            className="w-full p-2 border rounded text-black"
          />

          <label className="mt-5 mb-2">Content:</label>
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder="Enter post content"
            className="w-full p-2 border rounded text-black"
          />

          <label className="mt-5 mb-2">Image URL:</label>
          <input
            type="url"
            value={imageUrl}
            onChange={handleImageUrlChange}
            placeholder="Enter image URL"
            className="w-full p-2 border rounded text-black"
          />

          <button type="submit" className="border p-1 rounded bg-green-600 mt-7 text-white ">
            Submit Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
