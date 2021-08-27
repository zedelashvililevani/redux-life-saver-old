import { Action, InitialCacheState } from "./types";
interface RegisterCacheReducerParams<T> {
    reducerName: string;
    initCache: T;
    onError?: (payload: T | null) => string | null;
}
interface ReducerResult<T> {
    [x: string]: (state: InitialCacheState<T>, action: Action<T>) => InitialCacheState<T>;
}
export declare function registerCacheReducer<TData = any>({ reducerName, onError, initCache, }: RegisterCacheReducerParams<TData>): ReducerResult<TData>;
export {};
//# sourceMappingURL=registerCacheReducer.d.ts.map