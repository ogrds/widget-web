import { Thermometer } from "phosphor-react";
import { Popover } from "@headlessui/react";
import { WeatherWidget } from "./WeatherWidget";

export const Widget = () => {
  return (
    <Popover className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex flex-col items-end">
      <Popover.Panel>
        <WeatherWidget />
      </Popover.Panel>
      <Popover.Button className="flex items-center bg-background-500 rounded-full px-5 h-20 text-white group">
        <Thermometer className="w-10 h-10" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear">
          <span className="pl-2 text-2xl font-semibold font-weather">Weather</span>
        </span>
      </Popover.Button>
    </Popover>
  );
};
