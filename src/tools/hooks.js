import {useCallback, useState} from "react";

export function useISOState(defaultValue){
  const [value, setValue] = useState(defaultValue);

  const setState = useCallback((newValue) => {
    setValue(prevValue => ({
      ...prevValue,
      ...newValue
    }))
  }, [setValue]);

  return [value, setState];
}
