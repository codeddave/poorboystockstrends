import { useCallback, useEffect, useState } from "react";

const useSearch = (
  apiFn: (searchQuery: string) => any
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = useCallback(async () => {
    setIsLoading(true);
    const response = await apiFn(searchQuery);

    setIsLoading(false);
    setFetchedData(response);

    //attempts to set search result empty when user clears input
    if (searchQuery === "") setFetchedData(null);
  }, [searchQuery, apiFn]);

  useEffect(() => {
    if (searchQuery) {
      handleSearch();
    }
  }, [searchQuery, handleSearch]);

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

export default useSearch;
