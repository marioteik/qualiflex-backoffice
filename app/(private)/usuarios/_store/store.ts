import { createStore } from "zustand/vanilla";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/table-core";

export type UsersState = {
  sorting: SortingState;
  columnFilters: ColumnFiltersState;
  columnVisibility: VisibilityState;
  rowSelection: any;
};

export type UsersActions = {
  setSorting: (sorting: SortingState) => void;
  setColumnFilters: (filters: ColumnFiltersState) => void;
  setColumnVisibility: (visibility: VisibilityState) => void;
  setRowSelection: (selection: any) => void;
};

export type UsersStore = UsersState & UsersActions;

export const defaultInitState: UsersState = {
  sorting: [],
  columnFilters: [],
  columnVisibility: {},
  rowSelection: {},
};

export const initUsersStore = (): UsersState => {
  return {
    ...defaultInitState,
  };
};

export const createUsersStore = (initState: UsersState = defaultInitState) => {
  return createStore<UsersStore>()((set) => ({
    ...initState,
    setSorting: (sorting) => set({ sorting }),
    setColumnFilters: (filters) => set({ columnFilters: filters }),
    setColumnVisibility: (visibility) => set({ columnVisibility: visibility }),
    setRowSelection: (selection: any) => set({ rowSelection: selection }),
  }));
};
