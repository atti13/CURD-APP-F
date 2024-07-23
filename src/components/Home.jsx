import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "@fontsource/roboto";
import Header from "./Profile/Header";

const hostUrl = process.env.REACT_APP_URL;

const Home = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${hostUrl}/user`);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (userId) => {
    navigate(`/${userId}`);
  };

  return (
    <div>
      <Header />
      <div className="p-4 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Registered Users
        </h1>
        {users.length ? (
          <div className="flex flex-wrap">
            {users.map((user) => (
              <div
                key={user._id}
                className="bg-green-200 text-green-800 text-center h-10 w-auto p-4 m-2 rounded-lg cursor-pointer transform transition-transform duration-300 hover:scale-110 flex items-center justify-center"
                onClick={() => handleUserClick(user._id)}
              >
                <h2 className="text-xl font-medium">{user.username}</h2>
              </div>
            ))}
          </div>
        ) : (
          <div className="font-semibold text-lg text-orange-600">
            No users to show, please add one!
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
