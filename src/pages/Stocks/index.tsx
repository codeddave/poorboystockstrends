//import { useState } from "react"
import { FC, useEffect, useState } from "react";
import { getStockInfo } from "../../api";
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

/* type chartDate = {
  startDate: string
  endDate: string
} */
const Stocks: FC = () => {
  const { onTabClick, tab } = useTabs<TabTypes>(TabTypes.performance);
  const [showResults, setShowResults] = useState(true);

  const [startDate, setStartDate] = useState("2006-01-01");
  const [endDate, setEndDate] = useState("2006-01-30");

  //const [day, setDay] = useState();
  const [chartType, setChartType] = useState<ChartTypes>(
    ChartTypes.candleStick
  );

  /*   const handleDayChange = (day: any) => {
    setDay(day);
  }; */
  useEffect(() => {
    console.log(chartType);
  }, [chartType]);

  useEffect(() => {
    console.log(startDate, "start");
    console.log(endDate);
  }, [startDate, endDate]);

  const handleChanges = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChartType(e.target.value as ChartTypes);
  };
  const handleStartDateChange = (day: any) => {
    setStartDate(new Date(day).toISOString().split("T")[0]);
    console.log(day);

    console.log(new Date(day));
  };

  const handleEndDateChange = (day: any) => {
    setEndDate(new Date(day).toISOString().split("T")[0]);
  };

  const renderTabDetails = (currentTab: TabTypes) => {
    switch (currentTab) {
      case TabTypes.performance:
        return (
          <>
            <div className="w-40 mb-4 ">
              <select
                name=""
                id=""
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
            <div className=" text-gray-700 mb-2 flex">
              <div>
                <p className="text-white pb-2 text-sm">Start Date</p>
                <DayPickerInput
                  onDayChange={handleStartDateChange}
                  inputProps={{ style: { width: 100, paddingLeft: 5 } }}
                />
              </div>

              <div className="ml-6  ">
                <p className="text-white  pb-2 text-sm">End Date</p>
                <DayPickerInput
                  onDayChange={handleEndDateChange}
                  inputProps={{ style: { width: 100, paddingLeft: 5 } }}
                />
              </div>
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
              {selectedStock ? (
                <StocksChart
                  chartType={chartType}
                  ticker={selectedStock}
                  startDate={startDate}
                  endDate={endDate}
                />
              ) : null}
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
  console.log(stockData);

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
