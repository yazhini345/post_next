import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';  // Import Tailwind CSS
import { UserProvider } from './UserContext';

import Home from './Home';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import Post from './Post';

function App() {
  return (
    <div>
    <UserProvider>

      <Router>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/" element={<Login />} />
          <Route path="/Profile" element={<Profile/>}/>
          <Route path="/Post" element={<Post/>}/>
        </Routes>
        

      </Router>
    </UserProvider>

    </div>

  );
}

export default App;
