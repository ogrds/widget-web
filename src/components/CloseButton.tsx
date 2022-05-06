import { Popover } from "@headlessui/react";
import { X } from "phosphor-react";

const CloseButton: React.FC = () => {
  return (
    <Popover.Button
      className="top-5 right-5 absolute text-zinc-400 hover:text-zinc-100"
      title="Fechar formulário de feedback"
    >
      <X className="h-4 w-4" weight="bold" />
    </Popover.Button>
  );
};

export { CloseButton };
