
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
//import { FaSearch } from 'react-icons/fa'; // Import search icon (from react-icons)

const getDefaultAvatar = (username) => {
  const initials = username.split(' ').map(name => name[0]).join('');
  const backgroundColors = ['#4CAF50', '#FF9800', '#2196F3', '#E91E63', '#9C27B0'];
  const randomColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
  return `https://ui-avatars.com/api/?name=${initials}&background=${randomColor.slice(1)}&color=fff&size=128`;
};

function Home() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }

    // Fetch posts data
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3001/posts');
        if (response.ok) {
          const data = await response.json();
          setPosts(data);
        } else {
          console.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    // Fetch users data (assuming users have `id`, `username`, and `profilePicture` fields)
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/users');
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchPosts();
    fetchUsers();
  }, [setUser]);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/');
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Find user by ID
  const findUserById = (userId) => {
    return users.find((user) => user.id === userId);
  };

  return (
    <div className="bg-gradient-to-r from-black via-grey-800 to-purple-900 min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="flex justify-between items-center py-8 px-6">
        <div className="text-center flex-1 ml-40">
          {user && <h2 className="text-4xl text-white mb-6 ml-40 font-semibold tracking-wider">Welcome, {user.username}!</h2>}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts..."
            className="p-3 pr-40 rounded-sm bg-black text-white ml-40 "
          />
        
        </div>

        {/* Buttons aligned to the right */}
        <div className="flex items-center space-x-4 mr-10 mb-20 ">
          <button
            onClick={() => navigate('/Post')}
            className="px-2 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition mr-2"
          >
            Upload Post
          </button>
          {user ? (
            <>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition mr-2"
              >
                Logout
              </button>
              <div
                className="w-14 h-14 bg-gray-300 rounded-full cursor-pointer flex items-center justify-center"
                onClick={() => navigate('/Profile')}
                title="Go to Profile"
              >
                <img
                  src={user.profilePicture || getDefaultAvatar(user.username)}
                  alt="Profile"
                  className="w-14 h-14 object-cover rounded-full"
                />
              </div>
            </>
          ) : (
            <>
              
              <button
                onClick={() => navigate('/')}
                className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/Signup')}
                className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>

      {/* Posts Section */}
      <div className="flex justify-center items-center bg-gradient-to-r from-black via-grey-800 to-purple-900 text-white py-8">
        <div className="posts w-1/3 max-w-4xl px-4 ">
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => {
              const postUser = findUserById(post.userId); // Find user by userId
              return (
                <div key={post.id} className="post bg-black mb-5 p-6 rounded-md text-white shadow-md">
                  {/* Profile Picture and Username next to the title */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={postUser?.profilePicture || getDefaultAvatar(postUser?.username || 'User')}
                      alt="Profile"
                      className="w-20 h-30 ml-2 mt-9 mb-4 border"
                    />
                    <div className='mt-5 '>
                      <h2 className="text-2xl font-semibold ml-3">{post.title}</h2>
                      {/*<p className="text-gray-400">{new Date(post.date).toLocaleDateString()}</p>
                      */}
                      <h2 className="text-2xl  mt-4 ml-3">{post.content}</h2>

                    </div>
                  </div>

                  {/* Post Image */}
                  {post.imageUrl && <img src={post.imageUrl} alt="Post" className="mt-4 w-full h-auto rounded" />}
                  <p className="mt-4 text-lg">{post.content}</p>
                </div>
              );
            })
          ) : (
            <p>No posts found matching your search.</p>
          )}
        </div>
      </div>

      {/* Upload Post Button at the Bottom */}
      <div className="flex justify-center items-center mt-auto py-4">
 
      </div>
    </div>
  );
}

export default Home;
