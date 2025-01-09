import { CardCompact } from "@/components/card-compact";
import { Heading } from "@/components/heading";
import { Spinner } from "@/components/spinner";
import { getAuth } from "@/features/auth/queries/get-auth";
import { ChoreList } from "@/features/chore/components/chore-list";
import { ChoreUpsertForm } from "@/features/chore/components/chore-upsert-form";
import { Suspense } from "react";

export default async function ChoresPage() {
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
        <ChoreList userId={user?.id} />
      </Suspense>
    </div>
  );
}
