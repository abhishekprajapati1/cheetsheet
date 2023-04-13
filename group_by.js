// this function takes and array of objects and the key you want to group them with.
// it returns a resultant object having keys as the keys you provided. Each key in resultant object will contain an array of objects.


const group_by = (activeFilters, key) => {
    const result = activeFilters.reduce(function (f, a) {
        f[a[key]] = f[a[key]] || [];
        f[a[key]].push(a);
        return f;
    }, Object.create(null));
    return result;
}