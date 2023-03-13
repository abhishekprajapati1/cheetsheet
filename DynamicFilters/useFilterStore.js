import { create } from 'zustand';

const useFilterStore = create((set) => ({
    activeFilters: [],
    allFilters: [],
    actions: {
        setAllFilters: (data) => set((state) => {
            return { allFilters: data }
        }),
        updateActiveFilters: (data) => set((state) => {
            let comingFilters = []; // for bulk update
            let currentGroupNameFilter = [];
            let diffGroupFilters = []; // type is same
            let diffTypeFilter = [];

            // we need to check if the data is an array or an object i.e. for singular fields like range.
            if (Array.isArray(data)) {
                if (data.length > 0) {
                    diffTypeFilter = state.activeFilters.filter(f => f.type !== data[0].type);
                    diffGroupFilters = state.activeFilters.filter(f => f.group !== data[0].group && f.type === data[0].type);
                    comingFilters = data;
                }
            } else {
                if (data.type === 'range') {
                    currentGroupNameFilter = state.activeFilters.filter(f => f.group === data.group && f.name === data.name);
                    diffTypeFilter = state.activeFilters.filter(f => f.type !== data.type);
                    if (currentGroupNameFilter.length === 1) {
                        currentGroupNameFilter = [{ ...currentGroupNameFilter[0], value: data.value }]
                    } else {
                        currentGroupNameFilter = [data]
                    }
                } else {
                    diffGroupFilters = state.activeFilters.filter(f => f.group !== data.group);
                }

            }


            return {
                activeFilters: [...diffTypeFilter, ...currentGroupNameFilter, ...diffGroupFilters, ...comingFilters]
            };
        }),
        removeSingleFilter: (data) => set(state => {
            const diffGroupSameTypeFilters = state.activeFilters.filter(f => f.type === data.type && f.group !== data.group);
            const diffGroupTypeFilters = state.activeFilters.filter(f => f.group !== data.group && f.type !== data.type);
            let sameGroupAndTypeFilters = state.activeFilters.filter(f => f.group === data.group && f.type === data.type);
            let withoutCurrentElement = sameGroupAndTypeFilters.filter(f => f.name !== data.name);

            return {
                activeFilters: [...diffGroupSameTypeFilters, ...diffGroupTypeFilters, ...withoutCurrentElement]
            }
        }),
        clearActiveFilters: () => set({ activeFilters: [] })
    }
}));

export const useAllFilters = () => useFilterStore(state => state.allFilters);
export const useActiveFilters = () => useFilterStore(state => state.activeFilters);
export const useFilterActions = () => useFilterStore(state => state.actions);