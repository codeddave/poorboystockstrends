//import { useState } from "react"
import { FC } from "react";
import { getForexInfo } from "../../api";
import Loader from "react-loader-spinner";
import { useSearch } from "../../components/hooks";

const Forex: FC = () => {
  const {
    fetchedData: forexData,
    isLoading,
    selectedItem: selectedForexPair,
    searchQuery,
    handleChange,
    handleSelectedItem: handleSelectedForexPair,
  } = useSearch(getForexInfo);

  console.log(selectedForexPair);
  console.log(forexData);
  return (
    <div className="flex-grow">
      <p className="text-center text-xl ">Forex Search </p>
      <div className="w-full lg:w-2/3 mx-auto bg-white rounded flex items-center pr-2 mt-2">
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
          {forexData?.data?.map((forex: any) => (
            <li
              key={forex.currency_base}
              onClick={() => handleSelectedForexPair(forex.symbol)}
              className=" px-3 text-xs md:text-lg text-black py-1 hover:bg-blue-600 hover:text-gray-200  flex"
            >
              <span className=" text-sm lg:text-lg ">
                {forex.currency_base}
              </span>
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
    </div>
  );
};

export default Forex;
