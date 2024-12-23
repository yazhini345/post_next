
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useUser();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError('');
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/users');
      const users = await response.json();
      const user = users.find(user => user.email === email && user.password === password);

      if (user) {
        const userData = {
          id: user.id,
          username: user.username,
          email: user.email,
          profilePicture: user.profilePicture || null
        };

        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/Home');
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error logging in. Please try again later.');
    }
  };

  return (
    <div className='bg-gradient-to-r from-black via-grey-800 to-purple-900 min-h-screen flex items-center justify-center'>
      {/* Login form content */}
      <div className="mt-1 text-2xl flex flex-col items-center border p-10 rounded-lg shadow-lg max-w-md mx-auto text-white">
        <label className="mt-5 mb-2">Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded text-black"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="mt-5 mb-2">Password:</label>
        <div className="relative">
          <input
            type={passwordVisible ? "text" : "password"} // Toggle between text and password type
            placeholder="Enter your password"
            className="w-full p-2 border rounded text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            className="absolute right-2 top-2 cursor-pointer mt-1 mr-2"
            onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility on click
          >
            {passwordVisible ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />} 
          </span>
        </div>

        {error && <p className="text-red-500 mt-2">{error}</p>}

        <button
          className="border p-1 rounded bg-green-600 mt-7 text-white"
          onClick={handleSubmit}
        >
          Submit
        </button>

        <p className="mt-4 text-xl">
          Don't have an account?{' '}
          <button 
            onClick={() => navigate('/Signup')} 
            className="text-blue-500 hover:underline"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
