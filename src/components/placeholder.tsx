import { LucideMessageSquareWarning } from "lucide-react";
import { cloneElement } from "react";

type PlaceholderProps = {
  label: string;
  icon?: React.ReactElement;
  button?: React.ReactElement;
};

export function Placeholder(props: PlaceholderProps) {
  const icon = props.icon ?? <LucideMessageSquareWarning />;
  const button = props.button ?? <div />;

  return (
    <div className="flex-1 self-center flex flex-col items-center justify-center gap-y-2">
      {cloneElement(icon, {
        className: "w-16 h-16",
      })}
      <h2 className="text-lg text-center">{props.label}</h2>
      {cloneElement(button, {
        className: "h-10",
      })}
    </div>
  );
}
