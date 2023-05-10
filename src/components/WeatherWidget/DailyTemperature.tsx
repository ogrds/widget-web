import classNames from "classnames";
import { IconType } from "react-icons/lib";
import { dateFormat } from "../../utils/dateFormat";
import { useRecoilValue } from "recoil";
import { defaultLocation } from "../../atom/forecast";

type DailyTemperatureProps = {
  active?: boolean;
  icon: IconType;
  day: Date;
  localTime: Date;
  min: number;
  max: number;
};

export const DailyTemperature = ({
  icon,
  day,
  min,
  localTime,
  max,
}: DailyTemperatureProps) => {
  const location = useRecoilValue(defaultLocation);
  const Icon = icon;
  const date = new Date(`${day} 00:00:00`);
  const weekDay = dateFormat(date, "ccc", location);
  const active =
    dateFormat(new Date(localTime), "yyyy-MM-dd") ===
    dateFormat(date, "yyyy-MM-dd");

  return (
    <div
      className={classNames(
        "flex flex-col items-center justify-center gap-3 p-4 first:rounded-l-sm last:rounded-r-sm",
        {
          "bg-background-800 text-white": !active,
          "bg-white text-black": active,
        }
      )}
    >
      <Icon className="w-[55px] h-[55px]" />
      <p className="text-[20px]">{weekDay}</p>
      <span className="text-[20px] font-bold flex gap-2">
        <p>{max.toFixed(0)}º</p>
        <p
          className={classNames("opacity-50 border-l pl-2", {
            "border-gray-100": !active,
            "border-gray-900": active,
          })}
        >
          {min.toFixed(0)}º
        </p>
      </span>
    </div>
  );
};
