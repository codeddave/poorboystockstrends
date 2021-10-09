import { FC, useCallback, useEffect, useRef, useState } from "react";
import { getStockChartInfo } from "../../api";
import CanvasJSReact from "../../canvasjs.stock.react";

const CanvasJsStockChart = CanvasJSReact.CanvasJSStockChart;

type Props = {
  ticker: string;
};
let dataPoints1: any = [];

const StocksChart: FC<Props> = ({ ticker }) => {
  const StockChartRef = useRef();
  const test = StockChartRef.current;

  const [chartData, setChartData] = useState<Array<any>>();
  const startDate = "2006-01-0";
  const endDate = "2006-01-30";
  const [isLoading, setIsLoading] = useState(false);
  const chartPush = (chartData: any) => {
    if (chartData) {
      for (let i = 0; i < chartData.length; i++) {
        dataPoints1.push({
          x: new Date(chartData![i].datetime),
          y: [
            Number(chartData![i].open),
            Number(chartData![i].high),
            Number(chartData![i].low),
            Number(chartData![i].close),
          ],
        });
      }
    }
  };
  const handleStockChartInfo = useCallback(async () => {
    setIsLoading(true);

    const response = await getStockChartInfo(ticker, startDate, endDate);
    if (isLoading && !chartData?.length) {
      setChartData(response.values);
    }
    setIsLoading(false);

    chartPush(chartData);
  }, [ticker, chartData, isLoading]);
  useEffect(() => {
    handleStockChartInfo();
  }, [ticker, handleStockChartInfo]);
  const options = {
    charts: [
      {
        title: {
          text: "HLOC",
        },
        data: [
          {
            type: "candlestick",
            dataPoints: dataPoints1,
          },
        ],
      },
    ],

    navigator: {
      slider: {
        minimum: new Date(startDate),
        maximum: new Date(endDate),
      },
    },
  };

  return (
    <div>
      <CanvasJsStockChart options={options} onRef={test} />
    </div>
  );
};

export default StocksChart;
