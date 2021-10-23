import { FC, useCallback, useEffect, useRef, useState } from "react";
import Loader from "react-loader-spinner";
import { getStockChartInfo } from "../../api";
import CanvasJSReact from "../../canvasjs.stock.react";

const CanvasJsStockChart = CanvasJSReact.CanvasJSStockChart;
enum ChartTypes {
  candleStick = "CandleStick",
  area = "Area",
  line = "Line",
}
type Props = {
  ticker: string;
  chartType: ChartTypes;
};

let dataPoints1: any = [];

const StocksChart: FC<Props> = ({ ticker, chartType }) => {
  //get access to ticker and the chart type from the context

  const StockChartRef = useRef();
  const test = StockChartRef.current;

  const [chartData, setChartData] = useState<Array<any>>();
  const startDate = "2006-01-01";
  const endDate = "2006-01-30";
  const [isLoading, setIsLoading] = useState(false);
  const candlestickChartPush = (chartData: any) => {
    dataPoints1 = [];
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
      console.log(dataPoints1);
    }
  };

  const lineChartPush = (chartData: any) => {
    dataPoints1 = [];
    if (chartData) {
      for (let i = 0; i < chartData.length; i++) {
        dataPoints1.push({
          x: new Date(chartData![i].datetime),
          y: Number(chartData![i].close),
        });
      }
      console.log(dataPoints1);
    }
  };

  useEffect(() => {
    console.log(isLoading);
  }, [isLoading]);

  const handleStockChartInfo = useCallback(async () => {
    setIsLoading(true);

    const response = await getStockChartInfo(ticker, startDate, endDate);
    if (!chartData) {
      setChartData(response.values);
    }
    console.log(chartType);
    if (chartType === ChartTypes.candleStick) {
      candlestickChartPush(chartData);
      console.log("candle");
    } else {
      lineChartPush(chartData);
      console.log("`lineeeeee");
    }

    setIsLoading(false);
  }, [ticker, chartData, chartType]);

  useEffect(() => {
    handleStockChartInfo();
    //makes the call everytime the ticker changes, need that to happen for chart type
  }, [ticker, handleStockChartInfo]);

  const handleChartOptions = useCallback(() => {
    if (chartType === ChartTypes.candleStick) {
      return {
        charts: [
          {
            title: {
              text: `${ticker}`,
            },
            data: [
              {
                type: chartType.toLowerCase(),
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
    } else {
      return {
        charts: [
          {
            title: {
              text: `${ticker}`,
            },
            data: [
              {
                type: chartType.toLowerCase(),
                dataPoints: dataPoints1,
              },
            ],
          },
        ],
       
      };
    }
  }, [chartType, ticker]);

  return (
    <div className="mt-6 w-11/12 mx-auto ">
      {isLoading || !chartData ? (
        <div className="flex justify-center mt-6">
          <Loader type="TailSpin" color="#fff" height={70} width={50} />
        </div>
      ) : (
        <CanvasJsStockChart options={handleChartOptions()} onRef={test} />
      )}
    </div>
  );
};

export default StocksChart;
