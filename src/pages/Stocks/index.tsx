//import { useState } from "react"
import { FC, useState } from "react";
import { getStockInfo } from "../../api";
import Loader from "react-loader-spinner";
import { useSearch } from "../../components/hooks";
import StocksChart from "./StocksChart";
const Stocks: FC = () => {
  const [showResults, setShowResults] = useState(true);

  const {
    fetchedData: stockData,
    isLoading,
    selectedItem: selectedStock,
    searchQuery,
    handleChange,
    handleSelectedItem: handleSelectedStock,
  } = useSearch(getStockInfo, setShowResults);

  console.log(selectedStock);

  const handleStockSelect = (symbol: string) => {
    handleSelectedStock(symbol);
    setShowResults(false);
  };
  return (
    <div className="flex-grow relative">
      <p className="text-center text-xl">Stocks Search</p>
      <div className=" w-full lg:w-2/3 mx-auto bg-white rounded flex items-center pr-2 mt-2 shadow-2xl">
        <input
          className="w-full  mx-auto text-black py-1.5 pl-2 rounded outline-none "
          placeholder="Search..."
          onChange={handleChange}
          value={searchQuery}
        />

        {isLoading ? (
          <Loader type="TailSpin" color="#000000" height={25} width={30} />
        ) : null}
      </div>
      {searchQuery && showResults ? (
        <ul className="mt-2 w-full lg:w-2/3 mx-auto bg-white  divide-y rounded relative z-20">
          {stockData?.data?.map((stock: any, index) => (
            <li
              key={index}
              onClick={() => handleStockSelect(stock.symbol)}
              className=" px-3 text-xs md:text-lg text-black py-1 hover:bg-blue-600 hover:text-gray-200  flex"
            >
              <span className=" text-sm lg:text-lg ">{stock.name}</span>,
              <span className=" text-sm lg:text-lg ">
                &nbsp; {stock.country}.
              </span>
              {/* ,
              <span className=" text-sm lg:text-lg ">
                &nbsp; {stock.exchange}
              </span>  */}
            </li>
          ))}
        </ul>
      ) : null}
      {selectedStock ? <StocksChart ticker={selectedStock} /> : null}
    </div>
  );
};

export default Stocks;
