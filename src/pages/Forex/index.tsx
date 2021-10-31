//import { useState } from "react"
import { FC, useState } from "react";
import { getForexInfo, getStockChartInfo } from "../../api";
import Loader from "react-loader-spinner";
import { useSearch } from "../../components/hooks";
import { useTabs } from "../../components/hooks/useTabs";
import { List, AutoSizer } from "react-virtualized";
import { Tab } from "../../components/Tab";
import { ChartTypes, TabTypes } from "../../definitions";
import { toast } from "react-toastify";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import StocksChart from "../Stocks/StocksChart";
import DailyMatchTrend from "../../components/Data/DailyMatchTrend";

//move all chart related logic to a hook
const Forex: FC = () => {
  const [isChartLoading, setIsChartLoading] = useState(false);

  const [showResults, setShowResults] = useState(false);
  const [startDate, setStartDate] = useState("2021-01-01");
  const [endDate, setEndDate] = useState("2021-01-30");
  const [chartData, setChartData] = useState<Array<any>>();
  const [tick, setTick] = useState("");
  const [chartType, setChartType] = useState<ChartTypes>(
    ChartTypes.candleStick
  );
  const [graphValue, setGraphValue] = useState<any>("close");

  const { onTabClick, tab } = useTabs<TabTypes>(TabTypes.performance);
  const handlePlotData = async (e?: any) => {
    setChartData([]);
    setTick("");
    if (e) e.preventDefault();
    const ticker = searchQuery || selectedForexPair;
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

  const handleChanges = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setChartType(e.target.value as ChartTypes);
    if (tick) handlePlotData();
  };
  const handleGraphValue = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGraphValue(e.target.value);
    handlePlotData();
  };

  const handleStartDateChange = (day: any) => {
    setStartDate(new Date(day).toISOString().split("T")[0]);
  };

  const handleEndDateChange = (day: any) => {
    setEndDate(new Date(day).toISOString().split("T")[0]);
  };

  const {
    fetchedData: forexData,
    isLoading,
    selectedItem: selectedForexPair,
    searchQuery,
    setSearchQuery,

    handleChange,
    handleSelectedItem: handleSelectedForexPair,
  } = useSearch(getForexInfo, setShowResults);
  console.log(forexData);
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
        onClick={() => handleForexPairSelect(forexData?.data[index]?.symbol)}
        className="px-3 text-xs md:text-lg text-black p hover:bg-blue-600  hover:text-gray-200  border-b   flex"
      >
        {forexData?.data[index]?.symbol}
      </li>
    );
  };

  const renderTabDetails = (currentTab: TabTypes) => {
    switch (currentTab) {
      case TabTypes.performance:
        return (
          <>
            <form onSubmit={handlePlotData}>
              <div className=" mb-4 ">
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

                {chartType !== "CandleStick" ? (
                  <select
                    name="grapghValue"
                    id="grapghValue"
                    value={graphValue}
                    onChange={handleGraphValue}
                    placeholder="Chart Type"
                    className="text-gray-600 py-1 px-1 rounded bg-gray-50 ml-5"
                  >
                    <option value="high">High</option>
                    <option value="low">Low</option>
                    <option value="open">Open</option>
                    <option value="close">Close</option>
                  </select>
                ) : null}
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
              </div>

              <p className="text-center text-xl pt-6 md:pt-12 ">Forex Search</p>
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
              {showResults &&
              !isLoading &&
              !forexData?.data.length &&
              searchQuery ? (
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
              {searchQuery && showResults && forexData?.data.length ? (
                <ul className="mt-4 w-full lg:w-2/3 mx-auto h-64 bg-white flex flex-col divide-y rounded relative z-20">
                  {forexData?.data ? (
                    <div className="w-full h-64  bg-white z-30">
                      <AutoSizer>
                        {({ width, height }) => {
                          return (
                            <List
                              width={width}
                              height={height}
                              rowCount={forexData!.data.length}
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
              {(selectedForexPair || searchQuery) && chartData?.length ? (
                <StocksChart
                  chartType={chartType}
                  ticker={tick || selectedForexPair}
                  startDate={startDate}
                  endDate={endDate}
                  chartData={chartData}
                  isLoading={isChartLoading}
                  graphValue={graphValue}
                />
              ) : null}
            </form>
          </>
        );
      case TabTypes.dailyMatchTrend:
        return <DailyMatchTrend />;
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

  const handleForexPairSelect = (symbol: string) => {
    handleSelectedForexPair(symbol);
    setShowResults(false);
    setSearchQuery(symbol);
  };
  return (
    <div className="flex-grow">
      <div>
        <nav className="flex mb-8 pb-2 flex-wrap w-full mx-auto border  px-1 md:px-2">
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
      </div>
      {renderTabDetails(tab)}
    </div>
  );
};

export default Forex;
