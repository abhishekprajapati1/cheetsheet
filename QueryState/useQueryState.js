import qs from "qs"
import { useCallback, useState, useEffect } from "react"
import { useRouter } from 'next/router';

const useQueryState = ({ query, defaultValue, options = {} }) => {
    const router = useRouter();
    const [newQueryObj, setNewQueryObj] = useState({});
    const [pathname, setPathname] = useState("");

    const setQuery = useCallback(
        value => {
            if (Object.keys(newQueryObj).length > 0) {
                const href = {
                    pathname: pathname,
                    query: {
                        ...newQueryObj,
                        ...(!options.removeQuery && { [query]: value }),
                    }
                }
                if (options.replaceQuery) router.replace(href, href, { shallow: true })
                else router.push(href, href, { shallow: true })
            } else {
                const href = {
                    pathname: pathname,
                    query: {
                        ...(!options.removeQuery && { [query]: value }),
                    }
                }

                if (options.replaceQuery) router.replace(href, href, { shallow: true });
                else router.push(href, href, { shallow: true })
            }
        },
        [pathname, newQueryObj]
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
        state: newQueryObj[query] ? newQueryObj[query] : defaultValue,
        setter: setQuery,
    }
}

export default useQueryState;