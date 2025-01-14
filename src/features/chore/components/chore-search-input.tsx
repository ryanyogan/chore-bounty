"use client";

import { SearchInput } from "@/components/search-input";
import { useQueryState } from "nuqs";
import { searchParser } from "../search-params";

type SearchInputProps = {
  placeholder: string;
};

export function ChoreSearchInput(props: SearchInputProps) {
  const [search, setSearch] = useQueryState("search", searchParser);

  return (
    <SearchInput
      value={search}
      onChange={setSearch}
      placeholder={props.placeholder}
    />
  );
}
