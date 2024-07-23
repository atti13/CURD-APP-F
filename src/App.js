// App.js or main component file
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ProfileView from './components/Profile/ProfileView';
import RegisterUser from './components/Profile/RegisterUser';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route path="/:userId" element={<ProfileView />} />
      </Routes>
    </Router>
  );
};

export default App;
