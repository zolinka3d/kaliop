import axios from "axios";

export const getProfiles = async (number) => {
  const url =
    import.meta.env.VITE_API_URL +
    `?page=${number}` +
    "&seed=abc" +
    "&results=6";
  const response = await axios.get(url);
  return response.data;
};

export const getProfile = async (email) => {
  const url = import.meta.env.VITE_API_URL + "?email=" + email;
  const response = await axios.get(url);
  console.log(response.data.results[0]);
  return response.data.results[0];
};
