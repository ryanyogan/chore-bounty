"use client";

import { SortSelect, SortSelectOption } from "@/components/sort-select";
import { useQueryStates } from "nuqs";
import { sortOptions, sortParser } from "../search-params";

type ChoreSortSelectProps = {
  options: SortSelectOption[];
};

export function ChoreSortSelect(props: ChoreSortSelectProps) {
  const [sort, setSort] = useQueryStates(sortParser, sortOptions);

  return <SortSelect value={sort} onChange={setSort} options={props.options} />;
}
