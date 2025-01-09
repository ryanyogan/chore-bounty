"use client";

import { Placeholder } from "@/components/placeholder";

export default function Error(props: { error: Error }) {
  return <Placeholder label={props.error.message ?? "Something went wrong!"} />;
}
