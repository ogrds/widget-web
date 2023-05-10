import { atom } from "recoil";
import { SearchApiData } from "../@types/search";
import { ForecastApiData } from "../@types/forecast";

export const weatherLocationData = atom<ForecastApiData | null>({
  key: "weatherLocationData",
  default: null,
});

export const selectedLocationData = atom<SearchApiData>({
  key: "selectedLocationData",
  default: {
    country: "Brazil",
    id: 285189,
    lat: -15.62,
    lon: -47.67,
    name: "Planaltina",
    region: "Distrito Federal",
  },
});

export const defaultLocation = atom<"pt" | "en">({
  key: "defaultLocation",
  default: "en",
});

export const temperatureMeasurement = atom<"f" | "c">({
  key: "temperatureMeasurement",
  default: "c",
});
