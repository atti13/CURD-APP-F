import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import the edit and delete icons
import Header from "./Header";

// Optional: Import date-fns for formatting (or you can use native JS Date methods)
import { format } from 'date-fns';

const hostUrl = process.env.REACT_APP_URL;

const ProfileView = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    firstName: '',
    lastName: '',
    age: '',
    email: ''
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${hostUrl}/user/${userId}`);
        setUser(response.data);
        setFormData({
          displayName: response.data.displayName,
          firstName: response.data.firstName,
          lastName: response.data.lastName,
          age: response.data.age,
          email: response.data.email,
        });
        setLoading(false);
      } catch (error) {
        setError("Error fetching user data");
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Clear error for the specific field being edited
    setFormErrors({
      ...formErrors,
      [name]: ''
    });

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const errors = {};
    for (let key in formData) {
      if (formData[key] === '') {
        errors[key] = 'This field is required';
      }
    }
    if (isNaN(formData.age)) {
      errors.age = 'Please enter a valid age';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    try {
      await axios.patch(`${hostUrl}/user/update`, { userId, ...formData });
      alert('Profile updated successfully');
      setIsEditing(false);
    } catch (error) {
      setError('Error updating profile');
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`${hostUrl}/user/delete/${userId}`);
        navigate('/');
      } catch (error) {
        setError('Error deleting user');
      }
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen">{error}</div>;
  }

  // User registration timestamp
  const registrationDate = user.createdAt ? new Date(user.createdAt) : null;
  const formattedDate = registrationDate ? format(registrationDate, 'MMMM dd, yyyy HH:mm:ss') : '';

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-3xl relative">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="absolute top-4 left-4 bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-blue-50 transition duration-300"
          >
            <FaEdit size={24} />
          </button>
          <button
            onClick={handleDelete}
            className="absolute top-4 right-4 bg-white text-red-600 p-2 rounded-full shadow-md hover:bg-red-50 transition duration-300"
          >
            <FaTrash size={24} />
          </button>
          <h1 className="text-3xl font-bold mb-6 text-center text-white">User Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-white font-semibold mb-1">Username</label>
                <input
                  type="text"
                  value={user.username}
                  readOnly
                  className="w-full px-4 py-2 border rounded-lg bg-white text-gray-700"
                />
              </div>
              <div>
                <label className="block text-white font-semibold mb-1">Display Name</label>
                <input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg ${formErrors.displayName ? 'border-red-500' : 'border-gray-300'} bg-white`}
                />
                {formErrors.displayName && <p className="text-red-500 text-sm mt-1">{formErrors.displayName}</p>}
              </div>
              <div>
                <label className="block text-white font-semibold mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg ${formErrors.firstName ? 'border-red-500' : 'border-gray-300'} bg-white`}
                />
                {formErrors.firstName && <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>}
              </div>
              <div>
                <label className="block text-white font-semibold mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg ${formErrors.lastName ? 'border-red-500' : 'border-gray-300'} bg-white`}
                />
                {formErrors.lastName && <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>}
              </div>
              <div>
                <label className="block text-white font-semibold mb-1">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg ${formErrors.age ? 'border-red-500' : 'border-gray-300'} bg-white`}
                />
                {formErrors.age && <p className="text-red-500 text-sm mt-1">{formErrors.age}</p>}
              </div>
              <div>
                <label className="block text-white font-semibold mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`w-full px-4 py-2 border rounded-lg ${formErrors.email ? 'border-red-500' : 'border-gray-300'} bg-white`}
                />
                {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
              </div>
            </div>
            <div className="flex mt-6">
              <p className="text-white mb-2 mr-1">Registered on:</p>
              <p className="text-green-500">{formattedDate}</p>
            </div>
            {isEditing && (
              <button
                type="submit"
                className="w-full bg-green-300 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Update Profile
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
