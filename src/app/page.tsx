import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { ChoreList } from "@/features/chore/components/chore-list";
import { searchParamsCache } from "@/features/chore/search-params";
import { SearchParams } from "nuqs/server";
import { Suspense } from "react";

type HomePageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Home(props: HomePageProps) {
  return (
    <div className="flex-1 flex-col flex gap-y-8">
      <Heading title="All Chores" description="Chores created for everyone!" />

      <Suspense fallback={<Spinner />}>
        <ChoreList
          searchParams={searchParamsCache.parse(await props.searchParams)}
        />
      </Suspense>
    </div>
  );
}
