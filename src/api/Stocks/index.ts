import axios from "axios";

export const baseUrl = "https://cloud.iexapis.com/stable";
const twelveDataUrl = "https://api.twelvedata.com";

export const getStockInfo = async (symbol: string) => {
  try {
    const res = await axios.get(`${twelveDataUrl}/stocks?symbol=${symbol}`);
    return res.data;
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
      `${twelveDataUrl}/time_series?symbol=${symbol}&interval=1day&previous_close=True&start_date=${startDate}2&end_date=${endDate}&apikey=ad0616c2df184d679b0b9ff1833456c1`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getCryptoInfo = async (cryptoSymbol: string) => {
  try {
    const res = await axios.get(
      `${twelveDataUrl}/cryptocurrencies?symbol=${cryptoSymbol}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
