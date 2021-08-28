export interface Action<T> {
    type: string;
    cacheName: string;
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
export declare type InitialState<T> = {
    [x: string]: IState<T | null>;
};
export declare type InitialCacheState<T> = IState<T>;
export interface SelectorState<T> {
    [x: string]: InitialState<T>;
}
//# sourceMappingURL=types.d.ts.map