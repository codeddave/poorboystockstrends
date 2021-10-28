//import { useState } from "react"
import React, { FC, useState } from "react";
import { getStockChartInfo, getStockInfo } from "../../api";
import Loader from "react-loader-spinner";
import { useSearch } from "../../components/hooks";
import StocksChart from "./StocksChart";
import { List, AutoSizer } from "react-virtualized";
import "react-virtualized/styles.css";
import { Tab } from "../../components/Tab";
import { useTabs } from "../../components/hooks/useTabs";
import { ChartTypes, TabTypes } from "../../definitions";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { toast } from "react-toastify";
import Select from "react-select";
import { countries } from "../../utils";

const Stocks: FC = () => {
  const [isChartLoading, setIsChartLoading] = useState(false);
  const { onTabClick, tab } = useTabs<TabTypes>(TabTypes.performance);
  const [showResults, setShowResults] = useState(true);

  const [startDate, setStartDate] = useState("2021-01-01");
  const [endDate, setEndDate] = useState("2021-01-30");
  const [chartData, setChartData] = useState<Array<any>>();
  const [tick, setTick] = useState("");

  const [chartType, setChartType] = useState<ChartTypes>(
    ChartTypes.candleStick
  );

  const actual = countries.map((country) => {
    return {
      value: country,
      label: country,
    };
  });

  const handleChanges = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChartType(e.target.value as ChartTypes);
    handlePlotData();
  };
  const handleStartDateChange = (day: any) => {
    setStartDate(new Date(day).toISOString().split("T")[0]);
  };

  const handleEndDateChange = (day: any) => {
    setEndDate(new Date(day).toISOString().split("T")[0]);
  };

  const handlePlotData = async (e?: any) => {
    setChartData([]);
    setTick("");
    if (e) e.preventDefault();
    const ticker = searchQuery || selectedStock;

    setIsChartLoading(true);
    const response = await getStockChartInfo(ticker, startDate, endDate);
    if (response.status === "error") {
      toast.error(response.message);
    }
    setChartData(response.values);
    setIsChartLoading(false);
    setShowResults(false);
    setTick(ticker);
  };

  const handleExchangeChange = (e: any) => {
    console.log(e);
  };
  const {
    fetchedData: stockData,
    isLoading,
    selectedItem: selectedStock,
    searchQuery,
    handleChange,
    setSearchQuery,
    handleSelectedItem: handleSelectedStock,
    handleCountryChange,
    country,
  } = useSearch(getStockInfo, setShowResults);
  console.log(country, ";klblj");
  console.log(countries);
  const renderTabDetails = (currentTab: TabTypes) => {
    switch (currentTab) {
      case TabTypes.performance:
        return (
          <>
            <form onSubmit={handlePlotData}>
              <div className="w-40 mb-4 ">
                <select
                  name="chartType"
                  id="chartType"
                  value={chartType}
                  onChange={handleChanges}
                  placeholder="Chart Type"
                  className="text-gray-600 py-1 px-1 rounded bg-gray-50"
                >
                  <option value="CandleStick">CandleStick</option>
                  <option value="Area">Area</option>
                  <option value="Line">Line</option>
                </select>
              </div>
              <div className=" text-gray-700 mb-2 grid  grid-cols-2 gap-4 md:gap-0 md:grid-cols-4  items-center w-full">
                <div className="">
                  <p className="text-white pb-2 text-sm">Start Date</p>
                  <DayPickerInput
                    onDayChange={handleStartDateChange}
                    inputProps={{ style: { width: 110, paddingLeft: 5 } }}
                  />
                </div>

                <div className="sm:ml-6  mt-3 sm:mt-0">
                  <p className="text-white  pb-2 text-sm">End Date</p>
                  <DayPickerInput
                    onDayChange={handleEndDateChange}
                    inputProps={{ style: { width: 110, paddingLeft: 5 } }}
                  />
                </div>
                <div>
                  <Select
                    options={actual}
                    onChange={handleCountryChange}
                    className="w-32 sm:w-40 mt-6"
                    placeholder="Country"
                  />
                  {/* <select
                    name="country"
                    id="country"
                    value={country}
                    onChange={handleCountryChange}
                    placeholder="Country"
                    className="text-gray-600 py-1 px-1 rounded bg-gray-50"
                  >
                    {}
                    <option value="united states">america</option>
                    <option value="france">france</option>
                    <option value="germany">germany</option>
                  </select> */}
                </div>

                <div>
                  <Select
                    options={[{ label: "", value: "" }]}
                    onChange={handleExchangeChange}
                    className="w-32 sm:w-40 mt-6"
                    placeholder="Exchange"
                  />
                </div>
              </div>

              <p className="text-center text-xl pt-6 md:pt-12 border-t ">
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
              {showResults && !isLoading && !stockData?.data.length ? (
                <p className="text-white pt-4 text-center">No results found</p>
              ) : null}
              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  className="border-white border py-2  rounded text-white mx-auto w-24  hover:bg-blue-50 hover:text-gray-600 "
                >
                  Plot
                </button>
              </div>
              {searchQuery && showResults && stockData?.data.length ? (
                <ul className="mt-2 w-full lg:w-2/3 mx-auto h-full bg-white flex flex-col divide-y rounded relative border">
                  {stockData?.data ? (
                    <div className="w-full h-64  bg-white ">
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
              {(selectedStock || searchQuery) && chartData?.length ? (
                <StocksChart
                  chartType={chartType}
                  ticker={tick || selectedStock}
                  startDate={startDate}
                  endDate={endDate}
                  chartData={chartData}
                  isLoading={isChartLoading}
                />
              ) : null}
            </form>
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

  console.log(selectedStock);
  console.log(stockData);

  const handleStockSelect = (symbol: string) => {
    handleSelectedStock(symbol);
    setShowResults(false);
    setSearchQuery(symbol);
  };
  const rowRenderer = ({
    key,
    index,
    style,
  }: {
    index: number;

    key: any;
    style: React.CSSProperties;
  }) => {
    return (
      <li
        key={key}
        style={style}
        onClick={() => handleStockSelect(stockData?.data[index]?.symbol)}
        className="pl-2.5 py text-xs md:text-lg text-black p hover:bg-blue-600  hover:text-gray-200   border-b  flex"
      >
        {stockData?.data[index]?.name}
      </li>
    );
  };

  return (
    <div className="flex-grow ">
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
