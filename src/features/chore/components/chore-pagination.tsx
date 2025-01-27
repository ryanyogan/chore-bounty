"use client";

import { Pagination } from "@/components/pagination";
import { PaginatedData } from "@/types/pagination";
import { useQueryState, useQueryStates } from "nuqs";
import { useEffect, useRef } from "react";
import {
  paginationOptions,
  paginationParser,
  searchParser,
} from "../search-params";
import { ChoreWithMetadata } from "../types";

type ChorePaginationProps = {
  paginatedChoreMetadata: PaginatedData<ChoreWithMetadata>["metadata"];
};

export function ChorePagination(props: ChorePaginationProps) {
  const [pagination, setPagination] = useQueryStates(
    paginationParser,
    paginationOptions
  );
  const [search] = useQueryState("search", searchParser);
  const prevSearch = useRef(search);

  useEffect(() => {
    if (search === prevSearch.current) {
      return;
    }

    prevSearch.current = search;
    setPagination({ ...pagination, page: 0 });
  }, [search, pagination, setPagination]);

  return (
    <Pagination
      paginatedMetadata={props.paginatedChoreMetadata}
      pagination={pagination}
      onPagination={setPagination}
    />
  );
}
