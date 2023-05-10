import { Popover, Switch } from "@headlessui/react";
import { Gear } from "phosphor-react";
import { useState } from "react";
import { SwitchGroup } from "./SwitchGroup";
import { useRecoilState } from "recoil";
import { defaultLocation, temperatureMeasurement } from "../../atom/forecast";

export const Config = () => {
  const [location, setLocation] = useRecoilState(defaultLocation);
  const [temperature, setTemperature] = useRecoilState(temperatureMeasurement);

  return (
    <Popover>
      <Popover.Panel className="absolute bg-gray-500 rounded-sm border border-gray-600 shadow-xl p-3 min-w-[200px] bottom-0 right-16 flex flex-col gap-3">
        <SwitchGroup
          label="Temperature in ºF?"
          enabled={temperature === "f"}
          setEnabled={() =>
            setTemperature((prev) => (prev === "f" ? "c" : "f"))
          }
        />
        <SwitchGroup
          label="Date in portuguese?"
          enabled={location === "pt"}
          setEnabled={() =>
            setLocation((prev) => (prev === "en" ? "pt" : "en"))
          }
        />
      </Popover.Panel>
      <Popover.Button className="h-full flex items-center justify-center rounded-sm text-white bg-gray-500 w-16">
        <Gear size={33} />
      </Popover.Button>
    </Popover>
  );
};
