import { Breadcrumbs } from "@/components/breadcrumbs";
import { CardCompact } from "@/components/card-compact";
import { Separator } from "@/components/ui/separator";
import { ChoreUpsertForm } from "@/features/chore/components/chore-upsert-form";
import { getChore } from "@/features/chore/queries/get-chore";
import { chorePath, choresPath } from "@/paths";
import { notFound } from "next/navigation";

type ChoreEditPageProps = {
  params: Promise<{
    choreId: string;
  }>;
};

export default async function ChoreEditPage(props: ChoreEditPageProps) {
  const { choreId } = await props.params;
  const chore = await getChore(choreId);

  const isChoreFound = !!chore;

  if (!isChoreFound || !chore.isOwner) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Chores", href: choresPath },
          { title: chore.title, href: chorePath(chore.id) },
          { title: "Edit" },
        ]}
      />

      <Separator />

      <div className="flex-1 flex flex-col justify-center items-center">
        <CardCompact
          title="Edit Chore"
          description="Edit a chore."
          className="w-full max-w-[420px] animate-fade-from-top"
          content={<ChoreUpsertForm chore={chore} />}
        />
      </div>
    </div>
  );
}
