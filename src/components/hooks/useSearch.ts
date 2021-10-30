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
  handleExchangeChange: any;
  setCountry: any;
  country: string;
  exchange: string;
} => {
  const [searchQuery, setSearchQuery] = useState("");
  const [fetchedData, setFetchedData] = useState<null | { data: any[] }>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");
  const [country, setCountry] = useState("");
  const [exchange, setExchange] = useState("");

  const test = React.useMemo(
    () =>
      debounce(async (symbol: any, country?: string, exchange?: string) => {
        if (symbol === "") return;
        setIsLoading(true);
        console.log(country);

        const response = await apiFn(symbol, country, exchange);

        setFetchedData(response);
        if (setShowResults) setShowResults(true);
        setIsLoading(false);
      }, 800),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchQuery(e.target.value);

    if (country && exchange) {
      test(e.target.value, country, exchange);
    } else if (country) {
      test(e.target.value, country);
    } else if (exchange) {
      test(e.target.value, undefined, exchange);
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

  const handleExchangeChange = (selectedOption: any) => {
    setExchange(selectedOption.value);
    test(searchQuery, country, selectedOption.value);
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
    setSearchQuery,
    handleCountryChange,
    setCountry,
    country,
    exchange,
    handleExchangeChange,
  };
};
