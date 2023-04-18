import qs from "qs"
import { useCallback, useState, useEffect } from "react"
import { useRouter } from 'next/router';
import generateQuery from './generateQuery';

const useQueryState = ({ query, defaultValue, options = {} }) => {
    const router = useRouter();
    const [newQueryObj, setNewQueryObj] = useState({});
    const [pathname, setPathname] = useState("");

    const setQuery = useCallback(
        value => {
            generateQuery({ query, existingState: newQueryObj, newState: value });
            if (Object.keys(newQueryObj).length > 0) {
                let href = {
                    pathname: pathname,
                    query: generateQuery({ query, existingState: newQueryObj, newState: value })
                };
                // if (typeof value === 'object') {
                //     href = {
                //         pathname: pathname,
                //         query: {
                //             ...newQueryObj,
                //             [query]: JSON.stringify(value),
                //         }
                //     }
                // } else {
                //     href = {
                //         pathname: pathname,
                //         query: {
                //             ...newQueryObj,
                //             [query]: value,
                //         }
                //     }
                // }


                if (options.replaceQuery) router.replace(href, href, { shallow: true })
                else router.push(href, href, { shallow: true })
            } else {
                let href = {
                    pathname: pathname,
                    query: generateQuery({ query, existingState: newQueryObj, newState: value })
                };

                // if (typeof value === 'object') {
                //     href = {
                //         pathname: pathname,
                //         query: {
                //             ...newQueryObj,
                //             [query]: JSON.stringify(value),
                //         }
                //     }
                // } else {
                //     href = {
                //         pathname: pathname,
                //         query: {
                //             ...newQueryObj,
                //             [query]: value,
                //         }
                //     }
                // }

                if (options.replaceQuery) router.replace(href, href, { shallow: true });
                else router.push(href, href, { shallow: true })
            }
        },
        [pathname, router]
    )

    useEffect(() => {
        if (router.asPath.indexOf("?") !== -1) {
            let actualQuery = "?" + router.asPath.split("?")[1];
            const existingQueries = qs.parse(actualQuery, {
                ignoreQueryPrefix: true,
            })
            setPathname(router.asPath.split("?")[0]);
            setNewQueryObj(existingQueries)
        } else {
            setPathname(router.asPath);
            setNewQueryObj({});
        }
    }, [router, setPathname, setNewQueryObj]);



    return {
        state: newQueryObj[query] ? JSON.parse(newQueryObj[query]) : defaultValue,
        setter: setQuery,
    }
}

export default useQueryState;