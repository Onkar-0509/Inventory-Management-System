import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import axios from "axios"

const Login = () => {
  const [Logininfo, setLogininfo] = useState({
    email:"",
    password:""
  })

  const handlechange=(e)=>{
    setLogininfo({...Logininfo,[e.target.name]:e.target.value});
  }
  const navigate=useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent rendering page at the time of submitting form
    const { email, password } = Logininfo;
  
    // Client-side validation
    if (!email || !password) {
      return handleError("All fields are required");
    }
  
    if (password.length < 4) {
      return handleError("Password must be at least 4 characters long");
    }
  
    try {
      const response = await axios.post("http://localhost:3000/api/login", Logininfo);
      const { success, message, jwttoken, name, error } = response.data;
  
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwttoken); //in jwttoken there is email and  _id
        console.log(jwttoken._id)
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message; // Extract error message directly
        handleError(details); // Handle the error with the extracted message
      } else if (!success) {
        handleError(message);
      }
    } catch (err) {
      handleError("Server error. Please try again later.");
    }
  };
  


  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 pt-28">
      <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-center mb-6 text-indigo-600">Login</h1>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              name="email" 
              value={Logininfo.email}
              placeholder="Enter your Email" 
              onChange={handlechange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              type="password" 
              name="password" 
              value={Logininfo.password}
              placeholder="Enter your Password" 
              onChange={handlechange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            />
          </div>
          <div className="flex justify-center mb-6">
            <button 
              type="submit" 
              className="w-full bg-indigo-600 text-white py-2 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Login
            </button>
          </div>
          <div className="text-center text-sm text-gray-600">
            <span>doesn't have an account?{' '}
              <Link to="/signup" className="text-indigo-600 hover:underline">signup</Link>
            </span>
          </div>
        </form>
        <ToastContainer />
      </div>
   
    </div>
  );
}

export default Login;