/*
  INFO: this custom hook can be used to manage state straight in url bar. Tested in app directory using 'next/navigation'.
  NOTE: you will need to do some adjustment if using with page router in nextjs or if you are using react with cra or vite.
*/


"use client"
import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { parseJson, stringifyJson } from './useLocalStorage';


function useQueryState(name: string, initialValue?: any) {
    const isClient = typeof window !== "undefined";
    const router = useRouter();
    const params = useSearchParams();

    const [value, setValue] = useState(initialValue);


    const createQueryString = useCallback((name: string, value: string) => {
        const newParams = new URLSearchParams(params);
        newParams.set(name, value);
        return newParams.toString();
    }, [params]);

    useEffect(() => {
        if (isClient) {
            const item = params.get(name);
            setValue(item ? parseJson(item) : initialValue);
        }
    }, [name, initialValue, isClient, params]);



    useEffect(() => {
        const valueToSave = stringifyJson(value);
        if (valueToSave) {
            let newQueryString = createQueryString(name, valueToSave);
            router.replace("?" + newQueryString);
        }
    }, [name, value, createQueryString, router]);

    return [value, setValue];
}

export default useQueryState;
