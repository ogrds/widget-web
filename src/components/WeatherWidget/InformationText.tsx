import { ReactNode } from "react";

type InformationTextProps = {
  label: string;
  value: ReactNode;
};

export const InformationText = ({ label, value }: InformationTextProps) => {
  return (
    <p className="flex justify-between text-[28px]">
      <span className="font-bold">{label}</span> {value}
    </p>
  );
};
