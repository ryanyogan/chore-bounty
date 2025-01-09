"use client";

import { FieldError } from "@/components/form/field-error";
import { Form } from "@/components/form/form";
import { SubmitButton } from "@/components/form/submit-button";
import {
  type ActionState,
  EMPTY_ACTION_STATE,
} from "@/components/form/utils/to-action-state";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";
import { createComment } from "../actions/create-comment";
import type { CommentWithMetadata } from "../types";

type CommentCreateFormProps = {
  choreId: string;
  onCreateComment?: (comment: CommentWithMetadata | undefined) => void;
};

export function CommentCreateForm(props: CommentCreateFormProps) {
  const [actionState, action] = useActionState(
    createComment.bind(null, props.choreId),
    EMPTY_ACTION_STATE
  );

  const handleSuccess = (
    actionState: ActionState<CommentWithMetadata | undefined>
  ) => {
    props.onCreateComment?.(actionState.data);
  };

  return (
    <Form action={action} actionState={actionState} onSuccess={handleSuccess}>
      <Textarea name="content" placeholder="What's on your mind ..." />
      <FieldError actionState={actionState} name="content" />

      <SubmitButton label="Comment" />
    </Form>
  );
}
