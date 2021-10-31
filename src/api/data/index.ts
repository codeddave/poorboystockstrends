import axios from "axios";
//import { GraphValues } from "../../definitions";

const apiUrl = "https://pbstbackend.herokuapp.com/v2";
/* type dmtData = {
  graphValue: GraphValues;
  numberOfDays: number;
  percentageChange: string;
  change_choice: string;
}; */
export const getDmtInfo = async (dmtdata: any): Promise<any> => {
  try {
    const res = await axios.post(`${apiUrl}/DMT`, dmtdata);
    return res;
  } catch (error) {
    console.log(error);
  }
};
