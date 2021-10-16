import axios from "axios";

const apiUrl = "https://pbstbackend.herokuapp.com/v2";

export const getForexInfo = async (forexPairSymbol: string): Promise<any> => {
  try {
    const res = await axios.get(
      `${apiUrl}/search_forex?name=${forexPairSymbol}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
