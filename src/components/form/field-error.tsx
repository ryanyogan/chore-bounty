import type { ActionState } from "./utils/to-action-state";

type FieldErrorProps = {
  actionState: ActionState;
  name: string;
};

export function FieldError(props: FieldErrorProps) {
  const message = props.actionState.fieldErrors[props.name]?.[0];

  if (!message) return null;

  return <span className="text-xs text-red-500">{message}</span>;
}
