import {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleError, handleSuccess } from '../utils';
import axios from "axios"

const Signup = () => {
  const [signinfo, setsigninfo] = useState({
    name:"",
    email:"",
    password:""
  })

  const handlechange=(e)=>{
    setsigninfo({...signinfo,[e.target.name]:e.target.value});
  }
  const navigate=useNavigate();

  const handleSignup=async(e)=>{
    e.preventDefault();  //prevent rendering page at the time of submitting form
    const {name,email,password}=signinfo;

    if(!name || !email || !password){
      return handleError("All fields are required")  //client side validation using toastify lib show on right top side of fronted
    }
    
    try {
      const response = await axios.post("http://localhost:3000/api/sign-up", signinfo);
      const { success, message, error } = response.data;
    
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } 

      else if (error) {
        const details = error?.message; // Extract error message directly
        handleError(details); // Handle the error with the extracted message
      }
      else if (!success){
        handleError(message)
      }

    } catch (err) {
      handleError(err)

    }
  }    

  console.log(signinfo)
  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-100 pt-28">
      <div className="bg-white border border-gray-300 shadow-lg rounded-lg p-8 w-full max-w-lg">
        <h1 className="text-4xl font-bold text-center mb-6 text-indigo-600">Sign Up</h1>
        <form onSubmit={handleSignup}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input 
              type="text" 
              name="name" 
              value={signinfo.name}
              placeholder="Enter your Name"
              onChange={handlechange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input 
              type="email" 
              name="email" 
              value={signinfo.email}
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
              value={signinfo.password}
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
              Signup
            </button>
          </div>
          <div className="text-center text-sm text-gray-600">
            <span>Already have an account?{' '}
              <Link to="/login" className="text-indigo-600 hover:underline">Login</Link>
            </span>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Signup;




