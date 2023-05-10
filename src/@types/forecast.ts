import { weatherConditionIcons } from "../utils/forecast";

export type WeatherConditions = keyof typeof weatherConditionIcons;

export type Condition = {
  code: WeatherConditions;
  text: string;
};

export type CurrentInformation = {
  condition: Condition;
  feelslike_c: number;
  feelslike_f: number;
  temp_c: number;
  temp_f: number;
  precip_in: number;
  precip_mm: number;
  wind_kph: number;
  wind_mph: number;
  humidity: number;
  is_day: 0 | 1;
};

export type Location = {
  country: string;
  text: string;
  lat: number;
  lon: number;
  localtime: Date;
  name: string;
};

export type Forecastday = {
  date: Date;
  day: {
    condition: Condition;
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
  };
};

export type ForecastApiData = {
  current: CurrentInformation;
  forecast: {
    forecastday: Forecastday[];
  };
  location: Location;
};
