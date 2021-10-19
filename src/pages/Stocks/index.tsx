//import { useState } from "react"
import { FC, useState } from "react";
import Select from "react-select";

import { getStockInfo } from "../../api";
import Loader from "react-loader-spinner";
import { useSearch } from "../../components/hooks";
import StocksChart from "./StocksChart";
import { List, AutoSizer } from "react-virtualized";
import "react-virtualized/styles.css";
import { Tab } from "../../components/Tab";
import { useTabs } from "../../components/hooks/useTabs";
import { TabTypes } from "../../definitions";
//import {MeasuredCellParent} from 'react-virtualized/dist/es/CellMeasurer'
//create enum for chattypes
const Stocks: FC = () => {
  const [showResults, setShowResults] = useState(true);
  const { onTabClick, tab } = useTabs<TabTypes>(TabTypes.performance);
  console.log(showResults);
  const renderTabDetails = (currentTab: TabTypes) => {
    switch (currentTab) {
      case TabTypes.performance:
        return (
          <>
            <div className="w-40 pb-3">
              <Select
                placeholder="Chart Type"
                className=" text-gray-600"
                options={[
                  { value: "CandleStick", label: "CandleStick" },
                  { value: "Line", label: "Line" },
                  { value: "Area", label: "Area" },
                ]}
                isSearchable={false}
              />
            </div>
            <section className="border-t">
              <p className="text-center text-xl pt-6 md:pt-12 ">
                Stocks Search
              </p>
              <div className=" w-full lg:w-2/3 mx-auto bg-white rounded flex items-center pr-2 mt-2 shadow-2xl">
                <input
                  className="w-full  mx-auto text-black py-1.5 pl-2 rounded outline-none "
                  placeholder="Search..."
                  onChange={handleChange}
                  value={searchQuery}
                />

                {isLoading ? (
                  <Loader
                    type="TailSpin"
                    color="#000000"
                    height={25}
                    width={30}
                  />
                ) : null}
              </div>
              {searchQuery && showResults ? (
                <ul className="mt-2 w-full lg:w-2/3 mx-auto h-full bg-white flex flex-col divide-y rounded relative z-20 border">
                  {stockData?.data ? (
                    <div className="w-full h-64  bg-white z-30">
                      <AutoSizer>
                        {({ width, height }) => {
                          return (
                            <List
                              width={width}
                              height={height}
                              rowCount={stockData!.data.length}
                              rowHeight={30}
                              rowRenderer={rowRenderer}
                              className="w-full"
                            />
                          );
                        }}
                      </AutoSizer>
                    </div>
                  ) : null}
                </ul>
              ) : null}
              {selectedStock ? <StocksChart ticker={selectedStock} /> : null}
            </section>
          </>
        );
      case TabTypes.dailyMatchTrend:
        return <p>Daily Match Trend</p>;
      case TabTypes.correlation:
        return <p>Correlation</p>;
      case TabTypes.sameMonthCorrelation:
        return <p>Same Month Correlation</p>;
      case TabTypes.linearRegression:
        return <p>Linear Regression</p>;
      case TabTypes.equations:
        return <p>Equations</p>;
    }
  };
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
  const rowRenderer = ({
    key,
    index,
    // isScrolling,
    //isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
  }: {
    index: number;
    //isVisible: boolean
    //parent: MeasuredCellParent
    key: any;
    style: React.CSSProperties;
    // isScrolling: boolean
  }) => {
    return (
      <li
        key={key}
        style={style}
        onClick={() => handleStockSelect(stockData?.data[index]?.symbol)}
        className="pl-2.5 py text-xs md:text-lg text-black p hover:bg-blue-600  hover:text-gray-200    absolute  t0p-0 z-50 border-b  flex"
      >
        {stockData?.data[index]?.symbol}
      </li>
    );
  };

  return (
    <div className="flex-grow  relative  ">
      <nav className="flex mb-8 py-3 md:py-4 flex-wrap justify-center w-full mx-auto border  px-1 md:px-2 ">
        <Tab
          onClick={() => onTabClick(TabTypes.performance)}
          width="1/6"
          current={tab === TabTypes.performance}
        >
          Perfomance
        </Tab>
        <Tab
          onClick={() => onTabClick(TabTypes.dailyMatchTrend)}
          width="1/6"
          current={tab === TabTypes.dailyMatchTrend}
        >
          Daily Match Trend
        </Tab>
        <Tab
          onClick={() => onTabClick(TabTypes.correlation)}
          width="1/6"
          current={tab === TabTypes.correlation}
        >
          Correlation
        </Tab>
        <Tab
          onClick={() => onTabClick(TabTypes.sameMonthCorrelation)}
          width="1/6"
          current={tab === TabTypes.sameMonthCorrelation}
        >
          Same Month Corellation
        </Tab>
        <Tab
          onClick={() => onTabClick(TabTypes.linearRegression)}
          width="1/6"
          current={tab === TabTypes.linearRegression}
        >
          Linear Regression
        </Tab>
        <Tab
          onClick={() => onTabClick(TabTypes.equations)}
          width="1/6"
          current={tab === TabTypes.equations}
        >
          Equations
        </Tab>
      </nav>
      {renderTabDetails(tab)}
    </div>
  );
};

export default Stocks;
