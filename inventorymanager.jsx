import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from "./navbar"


function InventoryManager() {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        sku: '',
        category: '',
        actualPrice: '',
        sellingPrice: '',
        quantity: '',
        reorderLevel: '',
        supplier: '',
        expirationDate: '',
    });
    const [quantityUpdate, setQuantityUpdate] = useState({
        sku: '',
        quantity: '',
        actualPrice: '',
        sellingPrice: '',
    });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const url ='http://localhost:3000/api/inventory/list';  // Correct URL
        const headers = {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    };
        axios.get(url,headers)
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const getCurrentDate = () => new Date().toLocaleDateString();

    const addProduct = () => {
        const productWithDate = {
            ...newProduct,
            dateAdded: getCurrentDate(),
        };
        
        const url ='http://localhost:3000/api/inventory/add';  // Correct URL
        const headers = {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    };
        axios.post(url, productWithDate,headers)
            .then(response => {
                setProducts([...products, response.data]);
                setNewProduct({
                    name: '',
                    sku: '',
                    category: '',
                    actualPrice: '',
                    sellingPrice: '',
                    quantity: '',
                    reorderLevel: '',
                    supplier: '',
                    expirationDate: '',
                });
            })
            .catch(error => console.error('Error adding product:', error));
    };

    const updateQuantity = () => {
        const { sku, quantity, actualPrice, sellingPrice } = quantityUpdate;
        const updatedProduct = {
            quantity: parseInt(quantity),
            actualPrice: parseFloat(actualPrice),
            sellingPrice: parseFloat(sellingPrice),
            dateUpdated: new Date().toLocaleDateString(),
        };
        const url =`http://localhost:3000/api/inventory/update-product/${sku}`;  // Correct URL
        const headers = {
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    };
        axios.put(url, updatedProduct,headers)
            .then(response => {
                setProducts(products.map(product =>
                    product.sku === response.data.sku ? response.data : product
                ));
                setQuantityUpdate({
                    sku: '',
                    quantity: '',
                    actualPrice: '',
                    sellingPrice: '',
                });
            })
            .catch(error => console.error('Error updating product:', error));
    };
    
    const deleteProduct = (sku) => {
        const url = `http://localhost:3000/api/inventory/delete/${sku}`;  // Correct URL
        const headers = {
            "Authorization": localStorage.getItem("token")  // Assuming Bearer token
        };
    
        axios.delete(url, { headers })  // Pass headers correctly
            .then(() => {
                // Update state to remove the deleted product
                setProducts(products.filter(product => product.sku !== sku));
            })
            .catch(error => {
                console.error('Error deleting product:', error);
                // Optionally set an error state or show a notification
            });
    };
    

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
        <Navbar/>
        <div class="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
        <div className="p-6 font-sans">
            <h1 className="text-2xl font-bold mb-4">Inventory Manager</h1>

            <div className="mb-6">
                <input 
                    type="text" 
                    placeholder="Search..." 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)} 
                    className="w-full p-2 border border-gray-300 rounded"
                />
            </div>

            <div className="mb-8 p-4 border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
                <form>
                    <input 
                        type="text" 
                        placeholder="Name" 
                        value={newProduct.name} 
                        onChange={e => setNewProduct({ ...newProduct, name: e.target.value })} 
                        className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <input 
                        type="text" 
                        placeholder="SKU" 
                        value={newProduct.sku} 
                        onChange={e => setNewProduct({ ...newProduct, sku: e.target.value })} 
                        className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <input 
                        type="text" 
                        placeholder="Category" 
                        value={newProduct.category} 
                        onChange={e => setNewProduct({ ...newProduct, category: e.target.value })} 
                        className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <input 
                        type="number" 
                        placeholder="Actual Price" 
                        value={newProduct.actualPrice} 
                        onChange={e => setNewProduct({ ...newProduct, actualPrice: e.target.value })} 
                        className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <input 
                        type="number" 
                        placeholder="Selling Price" 
                        value={newProduct.sellingPrice} 
                        onChange={e => setNewProduct({ ...newProduct, sellingPrice: e.target.value })} 
                        className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <input 
                        type="number" 
                        placeholder="Quantity" 
                        value={newProduct.quantity} 
                        onChange={e => setNewProduct({ ...newProduct, quantity: e.target.value })} 
                        className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <input 
                        type="number" 
                        placeholder="Reorder Level" 
                        value={newProduct.reorderLevel} 
                        onChange={e => setNewProduct({ ...newProduct, reorderLevel: e.target.value })} 
                        className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <input 
                        type="text" 
                        placeholder="Supplier" 
                        value={newProduct.supplier} 
                        onChange={e => setNewProduct({ ...newProduct, supplier: e.target.value })} 
                        className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <input 
                        type="date" 
                        placeholder="Expiration Date" 
                        value={newProduct.expirationDate} 
                        onChange={e => setNewProduct({ ...newProduct, expirationDate: e.target.value })} 
                        className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <button 
                        type="button" 
                        onClick={addProduct} 
                        className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Add Product
                    </button>
                </form>
            </div>

            <div className="mb-8 p-4 border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Update Product</h2>
                <form>
                    <input 
                        type="text" 
                        placeholder="SKU" 
                        value={quantityUpdate.sku} 
                        onChange={e => setQuantityUpdate({ ...quantityUpdate, sku: e.target.value })} 
                        className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <input 
                        type="number" 
                        placeholder="Quantity" 
                        value={quantityUpdate.quantity} 
                        onChange={e => setQuantityUpdate({ ...quantityUpdate, quantity: e.target.value })} 
                        className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <input 
                        type="number" 
                        placeholder="Actual Price" 
                        value={quantityUpdate.actualPrice} 
                        onChange={e => setQuantityUpdate({ ...quantityUpdate, actualPrice: e.target.value })} 
                        className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <input 
                        type="number" 
                        placeholder="Selling Price" 
                        value={quantityUpdate.sellingPrice} 
                        onChange={e => setQuantityUpdate({ ...quantityUpdate, sellingPrice: e.target.value })} 
                        className="w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                    <button 
                        type="button" 
                        onClick={updateQuantity} 
                        className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Update Product
                    </button>
                </form>
            </div>

            <div className="p-4 border border-gray-300 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4">Product List</h2>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="p-2 border-b">Name</th>
                            <th className="p-2 border-b">SKU</th>
                            <th className="p-2 border-b">Category</th>
                            <th className="p-2 border-b">Actual Price</th>
                            <th className="p-2 border-b">Selling Price</th>
                            <th className="p-2 border-b">Quantity</th>
                            <th className="p-2 border-b">Reorder Level</th>
                            <th className="p-2 border-b">Supplier</th>
                            <th className="p-2 border-b">Expiration Date</th>
                            <th className="p-2 border-b">Date Added</th>
                            <th className="p-2 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.sku} className="border-b">
                                <td className="p-2">{product.name}</td>
                                <td className="p-2">{product.sku}</td>
                                <td className="p-2">{product.category}</td>
                                <td className="p-2">{product.actualPrice}</td>
                                <td className="p-2">{product.sellingPrice}</td>
                                <td className="p-2">{product.quantity}</td>
                                <td className="p-2">{product.reorderLevel}</td>
                                <td className="p-2">{product.supplier}</td>
                                <td className="p-2">{new Date(product.expirationDate).toLocaleDateString()}</td>
                                <td className="p-2">{new Date(product.dateAdded).toLocaleDateString()}</td>
                                <td className="p-2">
                                    <button 
                                        onClick={() => deleteProduct(product.sku)} 
                                        className="text-red-500 hover:underline"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
}

export default InventoryManager;