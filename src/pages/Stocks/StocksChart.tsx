import { FC, useCallback, useEffect, useRef, useState } from "react";
import Loader from "react-loader-spinner";
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
  console.log(chartData);
  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);
  const handleStockChartInfo = useCallback(async () => {
    setIsLoading(true);

    const response = await getStockChartInfo(ticker, startDate, endDate);
    if (!chartData) {
      setChartData(response.values);
    }
    chartPush(chartData);
    setIsLoading(false);
  }, [ticker, chartData]);

  useEffect(() => {
    handleStockChartInfo();
  }, [ticker, handleStockChartInfo]);
  const options = {
    charts: [
      {
        title: {
          text: `${ticker}`,
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
    <div className="mt-6 w-11/12 mx-auto ">
      {isLoading || !chartData ? (
        <div className="flex justify-center mt-6">
          <Loader type="TailSpin" color="#fff" height={70} width={50} />
        </div>
      ) : (
        <CanvasJsStockChart options={options} onRef={test} />
      )}
    </div>
  );
};

export default StocksChart;
