"use client";
import Input from "@/components/UI/input/Input";
import useDebounce from "@/hooks/useDebounce";
import { useSortStore } from "@/store/sorting/storeSort";
import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [temp, setTemp] = useState("");
  const changeTemp = useSortStore((state) => state.changeTemp);
  const debouncedTemp = useDebounce(temp);

  useEffect(() => {
    changeTemp(debouncedTemp);
  }, [debouncedTemp]);

  return (
    <div className="w-full">
      <label htmlFor="search" className="text-xl font-medium mb-2">
        Search
      </label>
      <div className="relative mt-2">
        <SearchIcon className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-black" />
        <Input
          type="search"
          placeholder="search product..."
          value={temp}
          onChange={(e) => setTemp(e.target.value)}
          className="pl-8 w-full text-lg"
          name="search"
        />
      </div>
    </div>
  );
};

export default Search;
