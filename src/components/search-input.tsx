"use client";

import { useDebouncedCallback } from "use-debounce";
import { Input } from "./ui/input";

type SearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export function SearchInput(props: SearchInputProps) {
  const handleSearch = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      props.onChange(event.target.value);
    },
    250
  );

  return (
    <Input
      defaultValue={props.value}
      onChange={handleSearch}
      placeholder={props.placeholder}
    />
  );
}
