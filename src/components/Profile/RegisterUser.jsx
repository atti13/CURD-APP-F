import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const hostUrl = process.env.REACT_APP_URL;

const RegisterUser = () => {
  const [formData, setFormData] = useState({
    username: "",
    displayName: "",
    firstName: "",
    lastName: "",
    age: "",
    email: "",
  });
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear error when any field is changed
    if (error) {
      setError("");
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate that no fields are empty
    for (let key in formData) {
      if (formData[key] === "") {
        setError(`Please fill out the ${key} field.`);
        return;
      }
    }

    // Validate that age is a number
    if (isNaN(formData.age)) {
      setError("Please enter a valid age.");
      return;
    }

    // Clear any existing error
    setError("");

    try {
      // Attempt to register the user
      const response = await axios.post(`${hostUrl}/user/register`, formData);
      navigate("/");
      alert("User registered successfully");

    } catch (error) {
      const errorMessage = error?.response?.data?.message;
      setError(errorMessage);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-4xl">
          <h1 className="text-4xl font-bold mb-6 text-center text-white">
            Register User
          </h1>
          {error && <div className="mb-4 text-red-500">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-white font-semibold mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg bg-white text-gray-700"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg bg-white text-gray-700"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-1">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg bg-white text-gray-700"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg bg-white text-gray-700"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-1">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg bg-white text-gray-700"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg bg-white text-gray-700"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-green-300 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterUser;
