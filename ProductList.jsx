import { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "./navbar";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input

  useEffect(() => {
    const url = 'http://localhost:3000/api/products'; // Correct URL
    const headers = {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    };

    axios
      .get(url, headers)
      .then(response => {
        console.log(response.data);
        setProducts(response.data); // Update state with fetched data
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const loggedInUser = localStorage.getItem("loggedInUser");

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      {/* Background styling */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>

      {/* Heading */}
      <h1 className="font-bold text-center text-2xl mt-3 ">{loggedInUser} Shop Products</h1>

      {/* Search Bar */}
      <div className="flex justify-center mt-6 mb-6">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full max-w-lg px-4 py-2 border rounded-lg shadow-md focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
        />
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {filteredProducts.map(product => (
          <div key={product.id} className="border text-white rounded-lg shadow-md p-4 bg-slate-700">
            {/* Product Name */}
            <h2 className="text-2xl font-bold text-yellow-400 mb-2">{product.name}</h2>
            {/* Product Details */}
            <p><strong>Actual Price:</strong> ₹{product.actualPrice}</p>
            <p><strong>Selling Price:</strong> ₹{product.sellingPrice}</p>
            <p><strong>Quantity:</strong> {product.quantity}</p>
            <p><strong>Reorder Level:</strong> {product.reorderLevel}</p>
            <p><strong>Expiration Date:</strong> {new Date(product.expirationDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductList;




