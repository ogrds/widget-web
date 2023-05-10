import { useEffect, useState } from "react";

import { CaretLeft, Check, MapPin } from "phosphor-react";
import classnames from "classnames";
import { InformationText } from "./InformationText";
import { DailyTemperature } from "./DailyTemperature";

import Skeleton from "react-loading-skeleton";
import { getConditionIcon } from "../../utils/forecast";
import { IconType } from "react-icons/lib";
import { weatherAPI } from "../../lib/api";
import type { ForecastApiData } from "../../@types/forecast";
import { Footer } from "./Footer";
import { useRecoilValue } from "recoil";
import {
  defaultLocation,
  selectedLocationData,
  temperatureMeasurement,
} from "../../atom/forecast";
import { dateFormat } from "../../utils/dateFormat";

export const WeatherWidget = () => {
  const [showExtraContent, setShowExtraContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<ForecastApiData | null>(null);
  const [ConditionIcon, setConditionIcon] = useState<IconType>();

  const selectedLocation = useRecoilValue(selectedLocationData);
  const location = useRecoilValue(defaultLocation);
  const temperature = useRecoilValue(temperatureMeasurement);

  const currentTemperatureKey = {
    min:
      temperature === "c"
        ? "mintemp_c"
        : ("mintemp_f" as "mintemp_c" | "mintemp_f"),
    max:
      temperature === "c"
        ? "maxtemp_c"
        : ("maxtemp_f" as "maxtemp_c" | "maxtemp_f"),
    current: temperature === "c" ? "temp_c" : ("temp_f" as "temp_c" | "temp_f"),
  };

  useEffect(() => {
    setIsLoading(true);
    weatherAPI
      .get("/forecast.json", {
        params: {
          q: `${selectedLocation.lat}, ${selectedLocation.lon}`,
          lang: location,
          days: 4,
        },
      })
      .then((response) => {
        const data = response.data as ForecastApiData;
        setWeatherData(data);
        setConditionIcon(() =>
          getConditionIcon(data.current.condition.code, data.current.is_day)
        );
      })
      .finally(() => setIsLoading(false));
  }, [selectedLocation, location]);

  return (
    <section className="flex items-center">
      <div className="text-white mb-4 z-50 font-weather py-12 px-8 flex flex-col justify-between min-w-[493px] min-h-[666px] rounded-lg relative before:absolute before:content-[' '] before:bg-[url('/images/background.png')] before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:opacity-20 bg-gradient-to-br from-background-300 from-2% to-background-500">
        <button
          className="absolute z-50 right-4 bottom-1/2 hover:right-3 transition-all ease-linear"
          onClick={() => setShowExtraContent((prev) => !prev)}
        >
          <CaretLeft
            size={32}
            weight="bold"
            className={classnames("transition-all duration-500 ease-in-out", {
              "rotate-180": showExtraContent,
            })}
          />
        </button>
        <header className="z-50">
          {!isLoading && weatherData ? (
            <>
              <h2 className="font-bold text-[37px]">
                {dateFormat(
                  new Date(weatherData?.location.localtime),
                  "EEEE",
                  location
                )}
              </h2>
              <p className="font-medium text-[22px] mb-3">
                {dateFormat(
                  new Date(weatherData?.location.localtime),
                  "dd MMM yyyy",
                  location
                )}
              </p>

              <span className="flex">
                <MapPin size={27} />
                <p className="ml-2 font-medium text-xl">
                  {weatherData.location.name}, {weatherData.location.country}
                </p>
              </span>
            </>
          ) : (
            <>
              <Skeleton width={150} height={37} />
              <Skeleton className="my-3" width={150} height={22} />
              <Skeleton width={150} height={20} />
            </>
          )}
        </header>

        <footer className="z-50">
          {!isLoading && weatherData && ConditionIcon ? (
            <>
              <ConditionIcon className="w-[95px] h-[95px] -ml-4" />
              <h2 className="font-bold text-[50px]">
                {weatherData.current[currentTemperatureKey.current].toFixed(0)}{" "}
                º{temperature.toUpperCase()}
              </h2>
              <p className="font-bold text-[30px]">
                {weatherData.current.condition.text}
              </p>
            </>
          ) : (
            <>
              <Skeleton width={95} height={95} />
              <Skeleton width={150} height={50} />
              <Skeleton width={150} height={30} />
            </>
          )}
        </footer>
      </div>

      <div
        className={classnames(
          "font-weather flex flex-col justify-between pl-16 py-10 pr-8 min-w-[calc(520px-2rem)] h-[623px] z-1 bg-background-900 mb-4 rounded-r-lg transition-all duration-500 linear",
          {
            "-ml-8 opacity-100": showExtraContent,
            "-ml-[493px] opacity-0": !showExtraContent,
          }
        )}
      >
        <header className="flex flex-col gap-y-4">
          {!isLoading && weatherData ? (
            <>
              <InformationText
                label="PRECIPITATION"
                value={`${weatherData.current.precip_mm}mm`}
              />
              <InformationText
                label="HUMIDITY"
                value={`${weatherData.current.humidity}%`}
              />
              <InformationText
                label="WIND"
                value={`${weatherData.current.wind_kph} km/h`}
              />
            </>
          ) : (
            <Skeleton height={28} count={3} className="flex flex-col gap-y-4" />
          )}
        </header>

        <main className="grid grid-cols-4">
          {!isLoading && weatherData ? (
            <>
              {weatherData.forecast.forecastday.map((forecast, i) => (
                <DailyTemperature
                  key={i}
                  icon={getConditionIcon(forecast.day.condition.code, 0)}
                  day={forecast.date}
                  min={forecast.day[currentTemperatureKey.min]}
                  max={forecast.day[currentTemperatureKey.max]}
                  localTime={weatherData?.location.localtime}
                />
              ))}
            </>
          ) : (
            <>
              <Skeleton height={170} />
              <Skeleton height={170} />
              <Skeleton height={170} />
              <Skeleton height={170} />
            </>
          )}
        </main>
        <Footer />
      </div>
    </section>
  );
};
