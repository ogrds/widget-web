import axios from "axios";

export const weatherAPI = axios.create({
  baseURL: "https://api.weatherapi.com/v1",
});

weatherAPI.interceptors.request.use((config) => {
  config.params = {
    key: import.meta.env.VITE_WEATHER_API_KEY,
    ...config.params,
  };
  return config;
});
