import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-gray-900 shadow-md py-3 z-10">
        <div className="container mx-auto flex justify-between items-center">
        <div className=" flex gap-2 justify-center items-center">
          <img className="rounded-full animate-spin-slow" src="logo.gif" width={30} height={30} alt="logo" />
          <span  className="font-bold text-white text-2xl tracking-widest hover:text-purple-400 transition-all duration-300 ease-in-out">Vyapar</span>
        </div>
          <div>
            <button
              onClick={handleLogin}
              className="bg-white text-red-800 px-4 py-2 rounded-md shadow hover:bg-gray-200 mr-4"
            >
              Log in
            </button>
            <button
              onClick={handleSignup}
              className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600"
            >
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gray-800 text-center py-12 mt-20">
        <h1 className="text-5xl font-bold text-white">Inventory Management</h1>
        <h2 className="text-2xl text-gray-100 mt-4">
          Manage your inventory efficiently with our advanced system.
        </h2>
        <p className="text-lg text-gray-100 mt-2">
          Explore our features and see how we can streamline your inventory process.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mt-6 flex justify-center">
        <input
          type="text"
          placeholder="Search for inventory features..."
          className="border border-gray-300 rounded-l-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-3/4"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-r-full hover:bg-blue-600">
          <i className="fas fa-search"></i>
        </button>
      </div>

      {/* Design Cards Section */}
      <section className="container mx-auto py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
            <img
              src="https://c8.alamy.com/comp/2EB0XJH/inventory-management-inscription-coming-out-from-an-open-book-creative-business-concept-2EB0XJH.jpg"
              className="w-full h-64 object-cover"
              alt="Design 1"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">Online Store Management</h3>
              <p className="text-gray-600">By Jordan Hughes</p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
            <img
              src="https://t4.ftcdn.net/jpg/05/50/14/63/360_F_550146337_826DHUXoFx18MRTMUauX3fyRw9R7S1BO.jpg"
              className="w-full h-64 object-cover"
              alt="Design 2"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">Data Lake</h3>
              <p className="text-gray-600">By Balkan Brothers</p>
            </div>
          </div>

          <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transform hover:scale-105 transition duration-300 ease-in-out">
            <img
              src="https://www.geckoboard.com/uploads/Warehouse-dashboard-example.png"
              className="w-full h-64 object-cover"
              alt="Design 3"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">Attractive Dashboards</h3>
              <p className="text-gray-600">By Jordan Hughes</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;


