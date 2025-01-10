"use client";
/*
  INFO: this custom hook can be used to manage state straight in url bar. Tested in app directory using 'next/navigation'.
  NOTE: you will need to do some adjustment if using with page router in nextjs or if you are using react with cra or vite.
*/
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * A custom hook for managing state in the URL query parameters.
 *
 * This hook synchronizes a state value with a URL query parameter, allowing for
 * state persistence in the URL and enabling shareable URLs with state.
 *
 * @param name - The name of the query parameter to use in the URL
 * @param initialValue - Optional initial value for the state
 * @returns A tuple containing the current state value and a setter function
 *
 * @example
 * ```tsx
 * const [value, setValue] = useQueryState('filter', 'initial');
 * ```
 * OR if you just want to read the value...
 * ```tsx
 * const [value, setValue] = useQueryState('filter');
 * ```
 */
function useQueryState<T>(
  name: string,
  initialValue?: T | null,
): [
  T | null | undefined,
  React.Dispatch<React.SetStateAction<T | null | undefined>>,
] {
  const isClient = typeof window !== "undefined";
  const router = useRouter();
  const params = useSearchParams();

  const [value, setValue] = useState(initialValue);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const newParams = new URLSearchParams(params);
      const parsedValue = parseJson(value);
      if (parsedValue !== null) {
        newParams.set(name, value);
      } else {
        newParams.delete(name);
      }
      return newParams.toString();
    },
    [params],
  );

  useEffect(() => {
    if (isClient) {
      const item = params.get(name);
      setValue(item ? parseJson(item) : initialValue);
    }
  }, [name, initialValue, isClient, params]);

  useEffect(() => {
    const valueToSave = JSON.stringify(value);
    if (valueToSave) {
      const newQueryString = createQueryString(name, valueToSave);
      router.push("?" + newQueryString);
    }
  }, [name, value, createQueryString, router]);

  return [value, setValue];
}

const parseJson = (str: string) => {
  try {
    return JSON.parse(str);
  } catch (error) {
    console.log({ error });
    return null;
  }
};

export default useQueryState;
