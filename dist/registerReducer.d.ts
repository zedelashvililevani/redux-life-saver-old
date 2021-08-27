import { Action, InitialState } from './types';
interface RegisterReducerParams<T> {
    reducerName: string;
    onFetch?: (payload: T | null) => T | null;
    onFetchMore?: (newData: T | null, prevData: T | null) => T | null;
    onError?: (payload: T | null) => string | null;
}
interface ReducerResult<T> {
    [x: string]: (state: InitialState<T | null>, action: Action<T>) => InitialState<T | null>;
}
export declare function registerReducer<TData = any>({ reducerName, onFetch, onFetchMore, onError, }: RegisterReducerParams<TData>): ReducerResult<TData>;
export {};
//# sourceMappingURL=registerReducer.d.ts.map