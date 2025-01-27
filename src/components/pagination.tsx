import { PaginatedData } from "@/types/pagination";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

type PageAndSize = {
  page: number;
  size: number;
};

type PaginationProps = {
  pagination: PageAndSize;
  onPagination: (pagination: PageAndSize) => void;
  paginatedMetadata: PaginatedData<unknown>["metadata"];
};

export function Pagination(props: PaginationProps) {
  const startOffset = props.pagination.page * props.pagination.size + 1;
  const endOffset = startOffset - 1 + props.pagination.size;
  const actualEndOffset = Math.min(
    endOffset,
    props.paginatedMetadata.count ?? 0
  );

  const label = `${startOffset}-${actualEndOffset} of ${props.paginatedMetadata.count}`;

  function handlePreviousPage() {
    props.onPagination({
      ...props.pagination,
      page: props.pagination.page - 1,
    });
  }

  function handleNextPage() {
    props.onPagination({
      ...props.pagination,
      page: props.pagination.page + 1,
    });
  }

  function handleChangeSize(size: string) {
    props.onPagination({
      page: 0,
      size: parseInt(size),
    });
  }

  const previousButton = (
    <Button
      variant="outline"
      size="sm"
      disabled={props.pagination.page < 1}
      onClick={handlePreviousPage}
    >
      Previous
    </Button>
  );

  const nextButton = (
    <Button
      variant="outline"
      size="sm"
      disabled={!props.paginatedMetadata.hasNextPage}
      onClick={handleNextPage}
    >
      Next
    </Button>
  );

  const sizeButton = (
    <Select
      onValueChange={handleChangeSize}
      defaultValue={props.pagination.size.toString()}
    >
      <SelectTrigger className="h-[36px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="5">5</SelectItem>
        <SelectItem value="10">10</SelectItem>
        <SelectItem value="25">25</SelectItem>
        <SelectItem value="50">50</SelectItem>
        <SelectItem value="100">100</SelectItem>
      </SelectContent>
    </Select>
  );

  return (
    <div className="flex justify-between items-center">
      <p className="text-sm text-muted-foreground">{label}</p>
      <div className="flex gap-x-2">
        {sizeButton}
        {previousButton}
        {nextButton}
      </div>
    </div>
  );
}
