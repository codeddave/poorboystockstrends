import axios from "axios";

const apiUrl = "https://pbstbackend.herokuapp.com/v2";

export const getCryptoInfo = async (cryptoSymbol: string): Promise<any> => {
  try {
    const res = await axios.get(`${apiUrl}/search_crypto?name=${cryptoSymbol}`);
    return res;
  } catch (error) {
    console.log(error);
  }
};
