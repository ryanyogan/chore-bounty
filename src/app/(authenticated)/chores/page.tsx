import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { getAuth } from "@/features/auth/queries/get-auth";
import { ChoreList } from "@/features/chore/components/chore-list";
import { ChoreUpsertForm } from "@/features/chore/components/chore-upsert-form";
import { searchParamsCache } from "@/features/chore/search-params";
import { SearchParams } from "nuqs";
import { Suspense } from "react";

export default async function ChoresPage(props: {
  searchParams: Promise<SearchParams>;
}) {
  const { user } = await getAuth();

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading title="My Chores" description="All your chores in one place!" />

      <CardCompact
        title="Create Chore"
        description="Create a new chore for the house"
        className="w-full max-w-[420px] self-center"
        content={<ChoreUpsertForm />}
      />

      <Suspense fallback={<Spinner />}>
        <ChoreList
          searchParams={searchParamsCache.parse(await props.searchParams)}
          userId={user?.id}
        />
      </Suspense>
    </div>
  );
}
