import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Importing eye icons from react-icons

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State to toggle password visibility

  const [error, setError] = useState(''); // For showing error message
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Reset error message on each submit attempt
    setError('');

    // Check if all required fields are filled
    if (!username || !email || !password) {
      setError('Please fill in all fields before submitting.');
      return;
    }

    // Check if email ends with @gmail.com
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid Gmail address (e.g., example@gmail.com)');
      return;
    }

    // Password condition: Must contain at least one letter, one number, and one special character, and be at least 6 characters long
    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!passwordPattern.test(password)) {
      setError('Password must be at least 6 characters long, contain at least one letter, one number, and one special character.');
      return;
    }

    const newUser = { username, email, password };

    try {
      // Fetch existing users from the server
      const response = await fetch('http://localhost:3001/users');
      const users = await response.json();

      // Check if email already exists
      const emailExists = users.some(user => user.email === email);
      if (emailExists) {
        setError('Email is already taken. Please choose another email.');
        return;
      }

      // Find the highest existing ID and increment it
      const highestId = users.length ? Math.max(...users.map(user => user.id)) : 0;
      newUser.id = highestId + 1; // Assign a new ID


      // Send POST request to add the new user to db.json
      const postResponse = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (postResponse.ok) {
        // Navigate to the login page on successful submission
        navigate('/');
      } else {
        setError('Failed to save user. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error saving user. Please check the server.');
    }
  };

  return (
    <div className='bg-gradient-to-r from-purple-900 via-grey-800 to-black min-h-screen flex items-center justify-center'>

      <div className="mt-20 text-2xl flex flex-col items-center border p-10 rounded-lg shadow-lg max-w-md mx-auto text-white">
        <label className="mb-2" required>Username:</label>
        <input 
          type="text" 
          placeholder="Enter text" 
          className="w-full p-2 border rounded text-black" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="mt-5 mb-2">Email:</label>
        <input 
          type="email" 
          placeholder="Enter text" 
          className="w-full p-2 border rounded text-black" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          pattern="[a-zA-Z0-9._%+-]+@gmail\.com$"
          title="Please enter a valid Gmail address (e.g., example@gmail.com)"
        />

  <label className="mt-5 mb-2">Password:</label>
        <div className="relative">
          <input 
            type={passwordVisible ? 'text' : 'password'} // Toggle input type based on state
            placeholder="Enter text" 
            className="w-full p-2 border rounded text-black" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$"
            title="Password must be at least 6 characters long, contain at least one letter, one number, and one special character."
          />
          <span
            className="absolute right-2 top-2 cursor-pointer mt-1 mr-2"
            onClick={() => setPasswordVisible(!passwordVisible)} // Toggle password visibility on click
          >
            {passwordVisible ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />} {/* Open/closed eye */}
          </span>
        </div>

        {error && <p className="text-red-500 mt-2 text-xl">{error}</p>}

        <button
          type="button"
          className="border p-3 rounded bg-green-600 mt-7 text-white"
          onClick={handleSubmit}>
            Submit
        </button>
        <h3 className='mt-2'>or</h3>
        <p className='text-xl  mt-2'>if you already have an account 
          <a href='/' className=' text-cyan-600 ml-1'> Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
