export interface Action<T> {
  type: string;
  payload: T | null;
  error: string | null;
  reducer: string;
}

export interface IState<T> {
  isLoading?: boolean;
  isRefetching?: boolean;
  isFetchMore?: boolean;
  error: string | null;
  data: T;
}

export type InitialState<T> = IState<T | null>;
export type InitialCacheState<T> = IState<T>;

export interface SelectorState<T> {
  [x: string]: InitialState<T>;
}

export type UseSelector = <TState = {}, TSelected = unknown>(
  selector: (state: TState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean
) => TSelected;
