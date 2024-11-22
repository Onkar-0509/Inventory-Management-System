import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./navbar"

const Profile = () => {
  const [profile, setProfile] = useState({
    businessName: '',
    phoneNumber: '',
    otp: '',
  });
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
    e.preventDefault();
    const { phoneNumber } = profile;

    // Validate phone number format (simple regex)
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      return handleError('Please enter a valid 10-digit phone number.');
    }

    setLoading(true); // Start loading
    try {
      const url = 'http://localhost:3000/api/profile/send-otp';
      const headers = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };

      const response = await axios.post(url, { phoneNumber }, headers);
      handleSuccess(response.data.message);
      setOtpSent(true);
      setOtpTimer(60);
    } catch (error) {
      handleError(error.response?.data?.message || 'Error sending OTP');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const { phoneNumber, otp, businessName } = profile;

    setLoading(true); // Start loading
    try {
      const url = 'http://localhost:3000/api/profile/verify-otp';
      const headers = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };

      const response = await axios.post(url, { phoneNumber, otp, businessName }, headers);
      handleSuccess(response.data.message);
      // Optionally, clear the fields or redirect the user after successful update
      setProfile({ businessName: '', phoneNumber: '', otp: '' });
      setOtpSent(false); // Reset OTP sent state
    } catch (error) {
      handleError(error.response?.data?.message || 'Invalid OTP');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    if (otpSent && otpTimer > 0) {
      const timer = setInterval(() => {
        setOtpTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (otpTimer === 0) {
      setOtpSent(false); // Reset OTP input after timer expires
    }
  }, [otpSent, otpTimer]);

  return (
    <>
    <Navbar/>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
     <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Edit Profile</h2>

        <form onSubmit={otpSent ? handleVerifyOtp : handleSubmit} className="space-y-6">
          {/* Business Name Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Business Name</label>
            <input
              type="text"
              name="businessName"
              value={profile.businessName}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200"
              placeholder="Enter your business name"
              required
            />
          </div>

          {/* Phone Number Input */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={profile.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200"
              placeholder="Enter your phone number"
              required
              disabled={otpSent} // Disable phone input once OTP is sent
            />
          </div>

          {/* OTP Input (if OTP has been sent) */}
          {otpSent && (
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">
                Enter OTP ({otpTimer}s remaining)
              </label>
              <input
                type="text"
                name="otp"
                value={profile.otp}
                onChange={handleChange}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition duration-200"
                placeholder="Enter the OTP"
                required
              />
            </div>
          )}

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className={`w-full bg-indigo-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-indigo-700 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={loading} // Disable button while loading
            >
              {loading ? 'Processing...' : (otpSent ? 'Update Profile' : 'Send OTP')}
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
    </>
  );
};

export default Profile;

