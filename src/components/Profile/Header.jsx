import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">MyApp</h1>
      <div>
        <button
          onClick={handleHomeClick}
          className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg mr-2"
        >
          Home
        </button>
        <button
          onClick={handleRegisterClick}
          className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg"
        >
          Add New User
        </button>
      </div>
    </header>
  );
};

export default Header;
