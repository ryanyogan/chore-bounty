"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export type SortSelectOption = {
  sortKey: string;
  sortValue: string;
  label: string;
};

type SortObject = {
  sortKey: string;
  sortValue: string;
};

type SortSelectProps = {
  value: SortObject;
  onChange: (sort: SortObject) => void;
  options: SortSelectOption[];
};

export function SortSelect(props: SortSelectProps) {
  const handleSort = (compositeKey: string) => {
    const [sortKey, sortValue] = compositeKey.split("_");

    props.onChange({
      sortKey,
      sortValue,
    });
  };

  return (
    <Select
      onValueChange={handleSort}
      defaultValue={props.value.sortKey + "_" + props.value.sortValue}
    >
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {props.options.map((option) => (
          <SelectItem
            key={option.sortKey + option.sortValue}
            value={option.sortKey + "_" + option.sortValue}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
