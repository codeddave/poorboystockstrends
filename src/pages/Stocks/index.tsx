//import { useState } from "react"
import { FC } from "react";
import { getStockInfo } from "../../api";
import Loader from "react-loader-spinner";
import { useSearch } from "../../components/hooks";

const Stocks: FC = () => {
  const {
    fetchedData: stockData,
    isLoading,
    selectedItem: selectedStock,
    searchQuery,
    handleChange,
    handleSelectedItem: handleSelectedStock,
  } = useSearch(getStockInfo);

  console.log(selectedStock);

  return (
    <div className="flex-grow">
      <p className="text-center text-xl">Search</p>
      <div className=" w-full lg:w-2/3 mx-auto bg-white rounded flex items-center pr-2 mt-2">
        <input
          className="w-full  mx-auto text-black py-1.5 pl-2 rounded outline-none "
          placeholder="Search..."
          onChange={handleChange}
          value={searchQuery}
        />

        {isLoading ? (
          <Loader type="TailSpin" color="#000000" height={20} width={30} />
        ) : null}
      </div>
      {searchQuery ? (
        <ul className="mt-2 w-full lg:w-2/3 mx-auto bg-white  divide-y rounded">
          {stockData?.data?.map((stock: any) => (
            <li
              key={stock.name}
              onClick={() => handleSelectedStock(stock.symbol)}
              className=" px-3 text-xs md:text-lg text-black py-1 hover:bg-blue-600 hover:text-gray-200  flex"
            >
              <span className=" text-sm lg:text-lg ">{stock.name}</span>
              {/* ,
              <span className=" text-sm lg:text-lg ">
                &nbsp; {stock.country}
              </span>
              ,
              <span className=" text-sm lg:text-lg ">
                &nbsp; {stock.exchange}
              </span> */}
            </li>
          ))}
        </ul>
      ) : null}

      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod vitae
        laborum laudantium saepe ab, atque quos, rerum tempora autem porro
        voluptate iure quae eum. Totam minus sed consequuntur autem pariatur.
      </p>
    </div>
  );
};

export default Stocks;