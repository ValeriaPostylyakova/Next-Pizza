import { create } from 'zustand';

export interface SortState {
    value: string;
    fetchSortValue?: (value: string) => Promise<void>;
}

export const useSortStore = create<SortState>((set) => ({
    value: 'Популярности',
    fetchSortValue: async () => {
        try {
        } catch (err) {
            console.log(err);
        }
    },
}));
