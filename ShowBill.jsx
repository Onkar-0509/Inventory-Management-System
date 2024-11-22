import { useState, useEffect } from "react";
import axios from "axios";
import Show from "./Show"; // Assuming Show is in the same directory
import { FaBars } from "react-icons/fa"; // Importing the FaBars icon
import Navbar from "./navbar";

const Dashboard = () => {
  const [bill, setBill] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("day"); // 'day' or 'month'
  const [totalSales, setTotalSales] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month

  // Fetch bills from API
  useEffect(() => {
    const fetchBill = async () => {
      const url = 'http://localhost:3000/api/bill/getbill'; // Correct URL
      const headers = {
        headers: {
          Authorization: localStorage.getItem('token'),
        },
      };

      try {
        const response = await axios.get(url, headers);
        setBill(response.data);
      } catch (error) {
        console.log('Failed to fetch data:', error);
      }
    };

    fetchBill(); // Call the async function
  }, []);

  // Handle sidebar toggle
  const handleHamburgerClick = () => {
    setIsOpen(!isOpen);
  };

  // Change view between day and month
  const handleViewChange = (type) => {
    setView(type);
    setIsOpen(false);
  };

  // Calculate total sales
  const calculateTotalSales = (filteredBills) => {
    return filteredBills.reduce((acc, curr) => acc + curr.grandTotal, 0);
  };

  // Filter bills based on view
  const filteredBills = view === "day"
    ? bill.filter(item => new Date(item.date).toLocaleDateString() === new Date().toLocaleDateString())
    : bill.filter(item => new Date(item.date).getMonth() + 1 === selectedMonth);

  // Update total sales when bills change
  useEffect(() => {
    setTotalSales(calculateTotalSales(filteredBills));
  }, [filteredBills]);

  return (
    <>
      <Navbar />
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>
      <div className="flex">
        <div className={`bg-gray-800 text-white w-64 h-full fixed transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Menu</h2>
            <button 
              onClick={() => handleViewChange("day")} 
              className="block text-left py-2 px-4 hover:bg-gray-700 rounded"
            >
              Day Wise Bill
            </button>
            <button 
              onClick={() => handleViewChange("month")} 
              className="block text-left py-2 px-4 hover:bg-gray-700 rounded"
            >
              Monthly Bill
            </button>
            {view === "month" && (
              <div className="mt-2">
                {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month, index) => (
                  <button 
                    key={month} 
                    onClick={() => setSelectedMonth(index + 1)} // Update to use month index + 1
                    className={`block text-left py-1 px-3 hover:bg-gray-700 rounded ${selectedMonth === index + 1 ? "bg-gray-700" : ""}`} // Optional: Highlight selected month
                  >
                    {month}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex-1 ml-64 p-4">
          <button 
            onClick={handleHamburgerClick} 
            className="mb-4 p-2 bg-blue-500 text-white rounded"
          >
            <FaBars />
          </button>
          <h1 className="text-2xl font-bold mb-2">{view === "day" ? "Day Wise Bills" : "Monthly Bills"}</h1>
          <h2 className="text-lg mb-4">Total Sales: {totalSales}</h2>
          <Show bills={filteredBills} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;





