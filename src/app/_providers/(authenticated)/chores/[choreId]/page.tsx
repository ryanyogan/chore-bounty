import { Breadcrumbs } from "@/components/breadcrumbs";
import { Separator } from "@/components/ui/separator";
import { ChoreItem } from "@/features/chore/components/chore-item";
import { getChore } from "@/features/chore/queries/get-chore";
import { homePath } from "@/paths";
import { notFound } from "next/navigation";

type ChorePageProps = {
  params: Promise<{
    choreId: string;
  }>;
};

export default async function TicketPage(props: ChorePageProps) {
  const { choreId } = await props.params;
  const ticketPromise = getChore(choreId);

  const [chore] = await Promise.all([ticketPromise]);

  if (!chore) {
    notFound();
  }

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Breadcrumbs
        breadcrumbs={[
          { title: "Chores", href: homePath },
          { title: chore.title },
        ]}
      />

      <Separator />

      <div className="flex justify-center animate-fade-from-top">
        <ChoreItem chore={chore} isDetail />
      </div>
    </div>
  );
}
