import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import Typewriter from 'react-typewriter-effect';

import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [error, setError] = useState(null);

  const handlePredict = () => {
    window.location.href = '/predict';
  };

  const handleResults = () => {
    window.location.href = '/results';
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/logout",
        {},
        { withCredentials: true }
      );
      // Redirect to login or home page after successful logout
      window.location.href = "/login";
    } catch (error) {
      setError(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    
    <div className='flex flex-col justify-center items-center min-h-screen w-screen bg-home'>
      {/* <h1  className='text-4xl text-white font-bold'>HOME</h1>
       */}
            <Typewriter
        text="Home"
        textStyle={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "white"
        }}
        typeSpeed={100}
        deleteSpeed={50}
        delay={500}
        cursorColor="transparent" // Makes the cursor invisible
        loop={true} // Enables infinite looping
      />
      <button 
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3 hover:scale-x-105'
        onClick={handlePredict} // Pass function reference here
      >
        Predict
      </button>
      <button 
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-3 hover:scale-x-105'
        onClick={handleResults} // Pass function reference here
      >
        Results
      </button>
      <button 
        className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-3 hover:scale-x-105'
        onClick={handleLogout} // Pass function reference here
      >
        Logout
      </button>
      
      {error && <p className='text-red-500 font-bold mt-2'>{error}</p>}
    </div>
  );
};

export default Home;
