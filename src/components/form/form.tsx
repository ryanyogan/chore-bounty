import { toast } from "sonner";
import { useActionFeedback } from "./hooks/use-action-feedback";
import type { ActionState } from "./utils/to-action-state";

type FormProps = {
  action: (payload: FormData) => void;
  actionState: ActionState;
  children: React.ReactNode;
  onSuccess?: (actionState: ActionState) => void;
  onError?: (actionState: ActionState) => void;
};

export function Form(props: FormProps) {
  useActionFeedback(props.actionState, {
    onSuccess: ({ actionState }) => {
      if (actionState.message) {
        toast.success(actionState.message);
      }

      props.onSuccess?.(actionState);
    },
    onError: ({ actionState }) => {
      if (actionState.message) {
        toast.error(actionState.message);
      }

      props.onError?.(actionState);
    },
  });

  return (
    <form action={props.action} className="flex flex-col gap-y-2">
      {props.children}
    </form>
  );
}
