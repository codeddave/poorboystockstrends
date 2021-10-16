import React, { useState } from "react";

import debounce from "lodash.debounce";

export const useSearch = (
  apiFn: (searchQuery: string) => any,
  setShowResults?: any
): {
  searchQuery: string;
  isLoading: boolean;
  selectedItem: string;
  handleSelectedItem: (item: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fetchedData: null | { data: any[] };
} => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fetchedData, setFetchedData] = useState<null | { data: any[] }>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const test = React.useMemo(
    () =>
      debounce(async (value: any) => {
        if (value === "") return;
        setIsLoading(true);

        const response = await apiFn(value);
        console.log(searchQuery);
        setIsLoading(false);

        setFetchedData(response);
        setShowResults(true);
      }, 800),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);

    test(e.target.value);
  };

  const handleSelectedItem = (item: string) => {
    setSelectedItem(item);
  };
  return {
    searchQuery,
    isLoading,
    selectedItem,
    handleSelectedItem,
    handleChange,
    fetchedData,
  };
};
