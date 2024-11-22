import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Make sure axios is imported

const Home = () => {
  const [userinfo, setuserinfo] = useState("");
  const [product, setproduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setuserinfo(localStorage.getItem("loggedInUser"));
  }, []);

  const handleclick = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    navigate("/homepage");
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleAbout = () => {
    navigate('/about');
  };

  const handleHome = () => {
    navigate('/home');
  };

  const handleicon = () => {
    navigate('/dashboard');
  };

  return (
    <div>
      <nav className="bg-gray-900 h-14 flex justify-between items-center shadow-lg">
        <div className="px-5 flex gap-3 justify-center items-center">
          <img className="rounded-full animate-spin-slow" src="logo.gif" width={30} height={30} alt="logo" />
          <span onClick={handleicon} className="font-bold text-white text-2xl tracking-widest hover:text-purple-400 transition-all duration-300 ease-in-out">Vyapar</span>
        </div>
        <ul className="flex items-center justify-center gap-6 text-white px-8">
          <li onClick={handleHome} className="font-semibold text-sm cursor-pointer hover:text-purple-400 transition-colors duration-200 ease-in-out">Home</li>
          <li onClick={handleAbout} className="font-semibold text-sm cursor-pointer hover:text-purple-400 transition-colors duration-200 ease-in-out">About</li>
          <li onClick={handleProfile} className="font-semibold text-sm cursor-pointer hover:text-purple-400 transition-colors duration-200 ease-in-out">Profile</li>

          <li className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-bold text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="text-xs relative px-5 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Welcome {userinfo}
            </span>
          </li>

          <button onClick={handleclick} type="button" className="font-bold text-xs py-2 focus:outline-none text-white bg-red-700 hover:bg-gradient-to-r hover:from-red-700 hover:to-red-500 focus:ring-4 focus:ring-red-300 rounded-lg px-5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 transition-all duration-300 ease-in-out">
            Logout
          </button>
        </ul>
      </nav>
    </div>
  );
};

export default Home;

