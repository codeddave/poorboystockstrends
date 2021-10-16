import { useState, useCallback } from "react";

export function useTabs<T>(initialValue: T): {
  tab: T;
  onTabClick: (_tab: T) => void;
} {
  const [tab, setTab] = useState(initialValue);

  const onTabClick = useCallback((_tab: T) => {
    setTab(_tab);
  }, []);

  return {
    tab,
    onTabClick,
  };
}
