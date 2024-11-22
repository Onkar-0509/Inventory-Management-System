import {React,useEffect} from 'react';
import Card from "./card";
import Navbar from "./navbar";
import Footer from "./footer";
import { ToastContainer } from 'react-toastify';
import { handleSuccess,handleError } from '../utils';

const Dashboard = () => {
  
  // useEffect(() => {

  //   handleError("for notifications update the profile")

  // }, [])
  
  
  return (
    <div className="flex flex-col h-screen">
      <div className="relative flex-grow">
     <div className="absolute top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>    
     <Navbar /> 
        <div className="flex">
          <div className="Cards flex gap-10 m-10 mx-48">
            <Card title="Bill Generator" image="billgen.png" />
            <Card title="Add Products" image="addproduct.png" />
            <Card title="Shop Products" image="productlist.png" />
            <Card title="Show Bills" image="showbill.png" />
            <Card title="Stock Analysis" image="sales.png" />           
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer/>
    </div>
  );
}

export default Dashboard;


