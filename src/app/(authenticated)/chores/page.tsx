import { Spinner } from "@/components/spinner";
import { getAuth } from "@/features/auth/queries/get-auth";
import { ChoreList } from "@/features/chore/components/chore-list";
import { Suspense } from "react";

export default async function ChoresPage() {
  const { user } = await getAuth();

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Suspense fallback={<Spinner />}>
        <ChoreList userId={user?.id} />
      </Suspense>
    </div>
  );
}
