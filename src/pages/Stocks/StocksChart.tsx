import { FC, useCallback, useEffect, useRef } from "react";
import Loader from "react-loader-spinner";
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
  startDate: string;
  endDate: string;
  chartData: any;
  isLoading: boolean;
  graphValue?: string;
};

let dataPoints1: any = [];

const StocksChart: FC<Props> = ({
  ticker,
  chartType,
  startDate,
  endDate,
  chartData,
  isLoading,
  graphValue,
}) => {
  //get access to ticker and the chart type from the context would implement this later
  const StockChartRef = useRef();
  const test = StockChartRef.current;

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
  const lineChartPush = useCallback(
    (chartData: any) => {
      dataPoints1 = [];
      if (chartData) {
        for (let i = 0; i < chartData.length; i++) {
          dataPoints1.push({
            x: new Date(chartData![i].datetime),
            y: Number(chartData![i][graphValue!]),
          });
        }
      }
    },
    [graphValue]
  );

  useEffect(() => {
    if (chartType === ChartTypes.candleStick) {
      candlestickChartPush(chartData);
      console.log("candle");
    } else {
      lineChartPush(chartData);
      console.log("`lineeeeee");
    }
    //makes the call everytime the ticker changes, need that to happen for chart type
  }, [chartData, chartType, lineChartPush]);

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
        navigator: {
          slider: {
            minimum: new Date(startDate),
            maximum: new Date(endDate),
          },
        },
      };
    }
  }, [chartType, ticker, startDate, endDate]);

  return (
    <div className="mt-6 w-11/12 mx-auto ">
      {isLoading ? (
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
