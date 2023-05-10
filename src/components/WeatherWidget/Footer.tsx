import { Combobox, Transition } from "@headlessui/react";
import { Check, Gear, MapPin } from "phosphor-react";
import { SearchApiData } from "../../@types/search";
import { weatherAPI } from "../../lib/api";
import { Fragment, useState } from "react";
import { useRecoilState } from "recoil";
import { selectedLocationData } from "../../atom/forecast";
import { Config } from "./Config";

export const Footer = () => {
  const [selectedLocation, setSelectedLocation] =
    useRecoilState(selectedLocationData);

  const [options, setOptions] = useState<SearchApiData[]>([]);
  const [showSerchBox, setShowSearchBox] = useState(false);

  const autoCompleteOptions = (term: string) => {
    weatherAPI
      .get("/search.json", {
        params: {
          q: term.toLowerCase(),
        },
      })
      .then((response) => {
        console.log(response.data);
        setOptions(response.data);
      });
  };

  const displayValueOption = (option: SearchApiData) =>
    `${option.name}, ${option.region}, ${option.country}`;

  const handleChange = (option: SearchApiData) => {
    setSelectedLocation(option);
    setShowSearchBox(false);
  };

  return (
    <footer>
      {!showSerchBox ? (
        <div className="flex gap-2 relative">
          <button
            className="w-full flex items-center justify-center gap-2 py-[14px] text-[20px] rounded-sm text-white bg-gradient-to-r from-weather-300 from-2% to-weather-500"
            onClick={() => setShowSearchBox(true)}
          >
            <MapPin size={33} /> Change Location
          </button>
          <Config />
        </div>
      ) : (
        <div className="relative">
          <Combobox value={selectedLocation} onChange={handleChange}>
            <Combobox.Input
              className="w-full flex items-center justify-center gap-2 py-[14px] text-[20px] rounded-sm text-gray-700"
              onChange={(event) => autoCompleteOptions(event.target.value)}
              displayValue={displayValueOption}
            />
            <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {options.length === 0 ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nenhum local encontrado
                </div>
              ) : (
                options.map((location) => (
                  <Combobox.Option
                    key={location.id}
                    value={location}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-4 pr-4 ${
                        active ? "bg-weather-500 text-white" : "text-gray-900"
                      }`
                    }
                  >
                    <Check className="hidden ui-selected:block" />
                    {displayValueOption(location)}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Combobox>
        </div>
      )}
    </footer>
  );
};
