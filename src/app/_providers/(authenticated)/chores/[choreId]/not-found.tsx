import Link from "next/link";
import { Placeholder } from "@/components/placeholder";
import { Button } from "@/components/ui/button";
import { choresPath } from "@/paths";

export default function NotFound() {
  return (
    <Placeholder
      label="We could not find your chore"
      button={
        <Button asChild variant="outline">
          <Link href={choresPath}>Go to Chores</Link>
        </Button>
      }
    />
  );
}
