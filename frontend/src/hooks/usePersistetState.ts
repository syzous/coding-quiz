import { useState } from "react";

export const usePersistedState = (key: string, initialValue: string) => {
  const [value, setValue] = useState(
    () => sessionStorage.getItem(key) || initialValue
  );

  const setPersistedValue = (newValue: string) => {
    setValue(newValue);
    sessionStorage.setItem(key, newValue);
  };

  return [value, setPersistedValue] as const;
};
