import React, { FC, useState } from "react";
enum ChartTypes {
  candleStick = "CandleStick",
  area = "Area",
  line = "Line",
}

type StocksChartContextType = {
  ticker: string;
  chartType: ChartTypes;
  handleChartSelect: (chartType: ChartTypes) => void;
  handleTickerSelect: (ticker: string) => void;
};

const StocksChartContext = React.createContext<
  StocksChartContextType | undefined
>(undefined);

export const StocksChartProvider: FC = ({ children }) => {
  const [ticker, setTicker] = useState("");
  const [chartType, setChartType] = useState<ChartTypes>(
    ChartTypes.candleStick
  );
  const handleChartSelect = (chartType: ChartTypes) => {
    setChartType(chartType);
  };
  const handleTickerSelect = (ticker: string) => {
    setTicker(ticker);
  };

  return (
    <StocksChartContext.Provider
      value={{ ticker, chartType, handleChartSelect, handleTickerSelect }}
    >
      {children}
    </StocksChartContext.Provider>
  );
};
