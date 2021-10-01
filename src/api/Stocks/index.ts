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
