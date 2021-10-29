import axios from "axios";
//import {toast} from "react-toastify"
//export const baseUrl = "https://cloud.iexapis.com/stable";
const twelveDataUrl = "https://api.twelvedata.com";
//const url = "http://pbstbackend.herokuapp.com/v2";

/* export const getStockInfo = async (symbol: string) => {
  try {
    const res = await axios.get(`${twelveDataUrl}/stocks?symbol=${symbol}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}; */
export const getStockInfo = async (
  symbol: string,
  country?: string,
  exchange?: string
): Promise<any> => {
  try {
    const handleApi = () => {
      if (country && exchange) {
        return `https://pbstbackend.herokuapp.com/v2/search_stock?country=${country}&name=${symbol}&exchange=${exchange}`;
      } else if (country) {
        return `https://pbstbackend.herokuapp.com/v2/search_stock?country=${country}&name=${symbol}`;
      } else {
        return `https://pbstbackend.herokuapp.com/v2/search_stock?name=${symbol}`;
      }
    };

    const res = await axios.get(handleApi());
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getStockChartInfo = async (
  symbol: string,
  startDate: string,
  endDate: string
) => {
  try {
    const res = await axios.get(
      `${twelveDataUrl}/time_series?symbol=${symbol}&interval=1day&previous_close=True&start_date=${startDate}&end_date=${endDate}&apikey=${process.env.REACT_APP_TWELVEDATATOKEN}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getExchangeList = async () => {
  try {
    const res = await axios.get(`${twelveDataUrl}/exchanges`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
