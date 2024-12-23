/*
import React, { useEffect, useState } from 'react';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';

// Function to generate a default avatar based on user's username or email
const getDefaultAvatar = (username) => {
  const initials = username.split(' ').map(name => name[0]).join('');
  const backgroundColors = ['#9C27B0'];
  const randomColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
  
  return `https://ui-avatars.com/api/?name=${initials}&background=${randomColor.slice(1)}&color=fff&size=128`;
};

// Function to generate a random views count
const generateRandomViews = () => {
  const randomNumber = Math.floor(Math.random() * 10000) + 100;
  return randomNumber > 1000 ? `${(randomNumber / 1000).toFixed(1)}k` : randomNumber;
};

const Profile = () => {
  const { user, setUser } = useUser();
  const [posts, setPosts] = useState([]);
  const [views, setViews] = useState(generateRandomViews()); // Initialize views only once
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }

    const fetchUserPosts = async () => {
      if (user && user.id) {
        try {
          const response = await fetch('http://localhost:3001/posts');
          const allPosts = await response.json();
          const userPosts = allPosts.filter(post => post.userId === user.id);
          setPosts(userPosts);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      }
    };

    fetchUserPosts();
  }, [user, setUser]);

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="profile p-5 rounded-lg shadow-lg flex flex-col items-center bg-gradient-to-r from-black via-grey-800 to-purple-900 min-h-screen flex items-center justify-center text-white">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <img
        src={user.profilePicture ? user.profilePicture : getDefaultAvatar(user.username)} // Default avatar based on username
        alt="Profile Logo"
        className="w-32 h-32 rounded-full mb-4"
      />

      <div className="user-info mb-6 ml-20 text-xl">
        <p><strong>Username : </strong> {user.username}</p>
        <p><strong>Email : </strong> {user.email}</p>
        <p><strong>Views: </strong> {views}</p>
      </div>

      <div>
        <button 
          onClick={() => navigate('/Home')} 
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mr-10 mt-1"
        >
          Go to Home
        </button>

        <button 
          onClick={() => navigate('/Post')} 
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Upload Post
        </button>
      </div>

      <h2 className="mt-5 text-xl font-bold">Your Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post p-4 mt-4 bg-black shadow-md rounded-md w-full max-w-2xl">
            <h3 className="font-semibold text-lg">{post.title}</h3>
            <p>{post.content}</p>
            <p className="text-gray-500 text-sm">Posted on {new Date(post.date).toLocaleDateString()}</p>
            {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="mt-3 w-full h-auto rounded" />}
          </div>
        ))
      ) : (
        <p>No posts found. You haven't uploaded any posts yet.</p>
      )}
    </div>
  );
};

export default Profile;
*/





import React, { useEffect, useState } from 'react';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';

// Function to generate a default avatar based on user's username or email
const getDefaultAvatar = (username) => {
  const initials = username.split(' ').map(name => name[0]).join('');
  const backgroundColors = ['#9C27B0'];
  const randomColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
  return `https://ui-avatars.com/api/?name=${initials}&background=${randomColor.slice(1)}&color=fff&size=128`;
};

// Function to generate a random views count
const generateRandomViews = () => {
  const randomNumber = Math.floor(Math.random() * 10000) + 100;
  return randomNumber > 1000 ? `${(randomNumber / 1000).toFixed(1)}k` : randomNumber;
};

const Profile = () => {
  const { user, setUser } = useUser();
  const [posts, setPosts] = useState([]);
  const [views] = useState(generateRandomViews());
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }

    const fetchUserPosts = async () => {
      if (user && user.id) {
        try {
          const response = await fetch('http://localhost:3001/posts');
          const allPosts = await response.json();
          const userPosts = allPosts.filter(post => post.userId === user.id);
          setPosts(userPosts);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      }
    };

    fetchUserPosts();
  }, [user, setUser]);

  if (!user) {
    return <p>Please log in to view your profile.</p>;
  }

  return (
    <div className="profile p-5 rounded-lg shadow-lg flex flex-col items-center bg-gradient-to-r from-purple-900 via-grey-800 to-black min-h-screen flex items-center justify-center text-white">
      {/*<h1 className="text-2xl font-bold mb-4">Profile</h1>

      <img
        src={user.profilePicture ? user.profilePicture : getDefaultAvatar(user.username)}
        alt="Profile Logo"
        className="w-32 h-32 rounded-full mb-4"
      />*/}

      <div className="user-info mb-6 ml-3 text-5xl font-semibold mt-10 tracking-wider">
        <p><strong> </strong> {user.username}</p>
        {/*<p><strong>Email : </strong> {user.email}</p>*/}
      </div>

      <div className="flex space-x-6 text-xl mt-3 text-2xl mb-10 ">
          
          <div className='mr-2'>
            <p className='ml-6 text-3xl  '>{posts.length}</p>
            <strong className='tracking-widest text-2xl mb-5 mt-5'>Posts </strong>  {/* Display post count */}
          </div>
          <div className='ml-20'>
            <p className='ml-6 mt-0 text-3xl mb-0 '>{views}</p>
            <strong className='tracking-widest text-2xl ml-4' >Views </strong> 
          </div>

      </div>
      

      <div className='ml-5'>
        <button 
          onClick={() => navigate('/Home')} 
          className="mb-4 px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mr-5 mt-1"
        >
          Home
        </button>

        <button 
          onClick={() => navigate('/Post')} 
          className="mb-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700"
        >
          Post
        </button>
        <button 
          onClick={() => navigate('/')} 
          className="mb-4 px-2 py-2 bg-red-500 ml-5 text-white rounded hover:bg-red-700 mr-5 mt-1"
        >
          Logout
        </button>
      </div>

      <h2 className="mt-5 ml-3 text-xl font-bold">Your Posts</h2>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post p-4 mt-4 bg-black shadow-md rounded-md w-full max-w-2xl">
            <div className='flex space-x-6'>
              <img
              src={user.profilePicture ? user.profilePicture : getDefaultAvatar(user.username)}
              alt="Profile Logo"
              className="w-20 h-30 ml-2 mt-2 mb-4 border"
            />
              <div>
                <h3 className="font-semibold text-2xl mt-3">{post.title}</h3>
                <p className="text-2xl text-gray-300 mt-2 ml-1">{user.username}</p>
              </div>

            </div>




            {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="mt-3 w-full h-auto rounded" />}
          </div>
        ))
      ) : (
        <p>No posts found. You haven't uploaded any posts yet.</p>
      )}
    </div>
  );
};

export default Profile;
