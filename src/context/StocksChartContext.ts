import React from "react";
enum ChartTypes {
  candleStick = "CandleStick",
  area = "Area",
  line = "Line",
}

type StocksChartContextType = {
  ticker: string;
  chartType: ChartTypes;
};

export const StocksChartContext = React.createContext<
  StocksChartContextType | undefined
>(undefined);
