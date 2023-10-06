"use client"
import { useState, useEffect } from "react";

export const parseJson = (data) => {
    try {
        return JSON.parse(data);
    } catch (error) {
        return data;
    }
};

export const stringifyJson = (data: any) => {
    try {
        if(typeof data === "string") {
            return data;
        }
        return JSON.stringify(data);
    } catch (error) {
        return null;
    }
};
const useLocalStorage = (name: string, initialValue: any) => {
    const isClient = typeof window !== "undefined";
    const [value, setValue] = useState(initialValue);


    useEffect(() => {
        if (isClient) {
            const item = window.localStorage.getItem(name);
            setValue(item ? parseJson(item) : initialValue);
        }
    }, [name, initialValue, isClient]);

    useEffect(() => {
        localStorage.setItem(name, stringifyJson(value));
    }, [name, value]);

    return [value, setValue];
};

export default useLocalStorage;
