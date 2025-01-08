import { Spinner } from "@/components/spinner";
import { ChoreList } from "@/features/chore/components/chore-list";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex-1 flex-col flex gap-y-8">
      <Suspense fallback={<Spinner />}>
        <ChoreList />
      </Suspense>
    </div>
  );
}
