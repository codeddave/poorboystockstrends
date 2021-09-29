import axios from "axios";

const twelveDataUrl = "https://api.twelvedata.com";

export const getForexInfo = async (forexPairSymbol: string) => {
  try {
    const res = await axios.get(
      `${twelveDataUrl}/forex_pairs?symbol=${forexPairSymbol}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
