//import { useState } from "react"
import { FC, useState } from "react";
import { getCryptoInfo } from "../../api";
import Loader from "react-loader-spinner";
import { useSearch } from "../../components/hooks";
import { useTabs } from "../../components/hooks/useTabs";
import { TabTypes } from "../../definitions";
import { List, AutoSizer } from "react-virtualized";
import { Tab } from "../../components/Tab";

const Crypto: FC = () => {
  const [showResults, setShowResults] = useState(true);

  const { onTabClick, tab } = useTabs<TabTypes>(TabTypes.performance);

  const {
    fetchedData: cryptoData,
    isLoading,
    // selectedItem: selectedcryptoPair,
    searchQuery,
    handleChange,
    handleSelectedItem: handleSelectedCryptoCurrency,
  } = useSearch(getCryptoInfo, setShowResults);
  console.log(cryptoData);
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
        onClick={() =>
          handleCryptoCurrencySelect(cryptoData?.data[index]?.symbol)
        }
        className="px-3 text-xs md:text-lg text-black p hover:bg-blue-600  hover:text-gray-200  border-b   flex"
      >
        {cryptoData?.data[index]?.symbol}
      </li>
    );
  };

  const renderTabDetails = (currentTab: TabTypes) => {
    switch (currentTab) {
      case TabTypes.performance:
        return (
          <>
            <p className="text-center text-xl pt-6 md:pt-12 ">Crypto Search</p>
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
            {searchQuery && showResults && cryptoData?.data.length ? (
              <ul className="mt-4 w-full lg:w-2/3 mx-auto h-64 bg-white flex flex-col divide-y rounded relative z-20">
                {cryptoData?.data ? (
                  <div className="w-full h-64  bg-white z-30">
                    <AutoSizer>
                      {({ width, height }) => {
                        return (
                          <List
                            width={width}
                            height={height}
                            rowCount={cryptoData!.data.length}
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

  const handleCryptoCurrencySelect = (symbol: string) => {
    handleSelectedCryptoCurrency(symbol);
    setShowResults(false);
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

export default Crypto;
