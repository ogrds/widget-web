import { Switch } from "@headlessui/react";

type SwitchGroupProps = {
  label: string;
  enabled: boolean;
  setEnabled: () => void;
};

export const SwitchGroup = ({
  label,
  enabled,
  setEnabled,
}: SwitchGroupProps) => {
  return (
    <Switch.Group>
      <div className="flex items-center justify-between gap-4">
        <Switch.Label className="mr-4">{label}</Switch.Label>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className={`${
            enabled ? "bg-blue-600" : "bg-gray-200"
          } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
        >
          <span
            className={`${
              enabled ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
};
