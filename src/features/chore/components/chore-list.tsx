import { Placeholder } from "@/components/placeholder";
import { getChores } from "../queries/get-chores";
import { ChoreItem } from "./chore-item";

type ChoreListProps = {
  userId?: string;
};

export async function ChoreList(props: ChoreListProps) {
  const { list: chores } = await getChores(props.userId);

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
      <div className="w-full max-w-[420px] flex gap-x-2">
        {/* <TicketSearchInput placeholder="Search tickets ..." />
        <TicketSortSelect
          options={[
            {
              sortKey: "createdAt",
              sortValue: "desc",
              label: "Newest",
            },
            {
              sortKey: "createdAt",
              sortValue: "asc",
              label: "Oldest",
            },
            {
              sortKey: "bounty",
              sortValue: "desc",
              label: "Bounty",
            },
          ]}
        /> */}
      </div>

      {chores.length ? (
        chores.map((chore) => <ChoreItem key={chore.id} chore={chore} />)
      ) : (
        <Placeholder label="No chores found!" />
      )}

      <div className="w-full max-w-[420px]">
        {/* <TicketPagination paginatedTicketMetadata={ticketMetadata} /> */}
      </div>
    </div>
  );
}
