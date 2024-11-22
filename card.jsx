import { useNavigate } from "react-router-dom";
import React from 'react';

const Card = (props) => {

  const navigate = useNavigate();

  const handleCardClick = () => {
    if (props.title === 'Bill Generator') {
      navigate('/billgenerator');
    } else if (props.title === "Add Products") {
      navigate("/inventorymanager")
    }
    else if (props.title === "Show Bills") {
      navigate("/showbills")
    }
    else if (props.title === "Stock Analysis") {
      navigate("/stockanalysis")
    }
    else if (props.title === "Shop Products") {
      navigate("/productlist")
    }
  
  
    
  };

  return (
    <>
      <div className="flex flex-col w-[200px] h-[250px] rounded-xl bg-slate-700 hover:bg-slate-600 hover:shadow-xl transition-all duration-300">
        <div className="flex justify-center bg-slate-100 items-center border border-spacing-6 rounded-md m-3">
          <img src={props.image} width={200} height={240} alt={props.title} />
        </div>
        <div className="flex justify-center items-center ">
          <button onClick={handleCardClick} className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xs font-semibold text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
            <span className="relative px-7 py-1.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              {props.title}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;

