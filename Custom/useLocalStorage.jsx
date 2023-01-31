// custom hook to store key value pairs in localStorage.

import React from 'react';

export default useLocalStorage = (key, initialValue, prefix) => {
  const prefixedKey = prefix + key;
  const [value, setValue] = React.useState(()=>{
    const jsonValue = localStorage.getItem(prefixedKey);
    if(jsonValue != null) return JSON.parse(jsonValue);
    if(typeof initialValue === "function"){
      return initialValue();
    }else{
      return initialValue;
    }
  });
  
  React.useEffect(()=>{
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);
}  
