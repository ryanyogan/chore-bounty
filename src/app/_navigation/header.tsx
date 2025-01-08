import { buttonVariants } from "@/components/ui/button";
import { LucideKanban } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <nav className="animate-header-from-top supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur-0 w-full flex py-2.5 px-5 justify-between">
      <div className="flex align-items gap-x-2">
        <Link href="/" className={buttonVariants({ variant: "ghost" })}>
          <LucideKanban />
          <h1 className="text-lg font-semibold">Chore Bounty</h1>
        </Link>
      </div>
    </nav>
  );
}
