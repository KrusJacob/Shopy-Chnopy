"use client";
import useDebounce from "@/hooks/useDebounce";
import { useSortStore } from "@/store/sorting/storeSort";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [temp, setTemp] = useState("");
  const changeTemp = useSortStore((state) => state.changeTemp);
  const debouncedTemp = useDebounce(temp);

  useEffect(() => {
    changeTemp(debouncedTemp);
  }, [debouncedTemp]);

  return (
    <div>
      <input
        value={temp}
        onChange={(e) => setTemp(e.target.value)}
        type="search"
        placeholder="search product"
        className="w-full px-4 py-2 text-xl"
      />
    </div>
  );
};

export default Search;
