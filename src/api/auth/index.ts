import axios from "axios";

export const logIn = async (loginData: {
  username: string;
  password: string;
}) => {
  try {
    const res = await axios.post(`/authentication/api/auth/login`, loginData);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const register = async (loginData: {
  username: string;
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post(
      `/authentication/api/auth/register`,
      loginData
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
