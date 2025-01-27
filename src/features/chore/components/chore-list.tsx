import { Placeholder } from "@/components/placeholder";
import { getChores } from "../queries/get-chores";
import { ParsedSearchParams } from "../search-params";
import { ChoreItem } from "./chore-item";
import { ChorePagination } from "./chore-pagination";
import { ChoreSearchInput } from "./chore-search-input";
import { ChoreSortSelect } from "./chore-sort-select";

type ChoreListProps = {
  userId?: string;
  searchParams: ParsedSearchParams;
};

export async function ChoreList(props: ChoreListProps) {
  const choreQuery = await getChores(props.userId, props.searchParams);

  return (
    <div className="flex-1 flex flex-col items-center gap-y-4 animate-fade-from-top">
      <div className="w-full max-w-[420px] flex gap-x-2">
        <ChoreSearchInput placeholder="Search chores ..." />
        <ChoreSortSelect
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
        />
      </div>

      {choreQuery.list.length ? (
        choreQuery.list.map((chore) => (
          <ChoreItem key={chore.id} chore={chore} />
        ))
      ) : (
        <Placeholder label="No chores found!" />
      )}

      <div className="w-full max-w-[420px]">
        <ChorePagination paginatedChoreMetadata={choreQuery.metadata} />
      </div>
    </div>
  );
}
