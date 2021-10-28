import React, { useState } from "react";

import debounce from "lodash.debounce";

export const useSearch = (
  apiFn: (...args: any) => any,
  setShowResults?: any
): {
  searchQuery: string;
  isLoading: boolean;
  selectedItem: string;
  handleSelectedItem: (item: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fetchedData: null | { data: any[] };
  setSearchQuery: any;
  handleCountryChange: any;
  setCountry: any;
  country: string;
} => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fetchedData, setFetchedData] = useState<null | { data: any[] }>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [country, setCountry] = useState("");

  const test = React.useMemo(
    () =>
      debounce(async (symbol: any, country?: string) => {
        if (symbol === "") return;
        setIsLoading(true);
        console.log(country);

        const response = await apiFn(symbol, country);
        setIsLoading(false);

        setFetchedData(response);
        if (setShowResults) setShowResults(true);
      }, 800),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);

    if (country) {
      test(e.target.value, country);
    } else {
      test(e.target.value);
    }
  };
  console.log(country, ";klkvdkvlkdnvlkdbvdlkvbdlkvb");
  const handleCountryChange = (selectedOption: any) => {
    setCountry(selectedOption.value);
    test(searchQuery, selectedOption.value);

    console.log(country, "from stock test");
  };

  /* const handleCountryChange = (e: any) => {
    setCountry(e.target.value);
    test(searchQuery, e.target.value);

    console.log(country, "from stock test");
  }; */

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
    setSearchQuery,
    handleCountryChange,
    setCountry,
    country,
  };
};
