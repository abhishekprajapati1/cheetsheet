const generateQuery = ({ query, existingState, newState }) => {
    let newquery = {};
    if (typeof newState === 'object') {
        newquery = {
            ...existingState,
            [query]: JSON.stringify({ ...(existingState[query] && JSON.parse(existingState[query])), ...newState })
        }
    } else {
        newquery = {
            ...existingState,
            [query]: newState
        }
    }
    console.log("see existing state:", existingState[query]);
    console.log("see this", { ...(existingState[query] && JSON.parse(existingState[query])), ...newState });

    return newquery;
}

export default generateQuery;