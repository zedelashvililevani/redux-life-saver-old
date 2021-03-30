import produce from "immer";
import { Action, InitialState } from "./types";
import { ActionsEnum } from "./enums";
// This must be enum, but whatever

interface RegisterReducerParams<T> {
  reducerName: string;
  onFetch?: (payload: T | null) => T | null;
  onFetchMore?: (newData: T | null, prevData: T | null) => T | null;
  onError?: (payload: T | null) => string | null;
}

const initialState: InitialState<null> = {
  isLoading: false,
  isRefetching: false,
  isFetchMore: false,
  data: null,
  error: null,
};

interface ReducerResult<T> {
  [x: string]: (
    state: InitialState<T | null>,
    action: Action<T>
  ) => InitialState<T | null>;
}

export function registerReducer<TData = any>({
  reducerName,
  onFetch,
  onFetchMore,
  onError,
}: RegisterReducerParams<TData>): ReducerResult<TData> {
  const reducer = (
    state: InitialState<TData | null> = initialState,
    action: Action<TData>
  ) => {
    // this will provide O(n) instead of O(n * cases)
    if (action.reducer !== reducerName) return state;
    return produce(state, (draft: InitialState<TData | null>) => {
      switch (action.type) {
        case reducerName + ActionsEnum.error: {
          if (onError) draft.error = onError(action.payload);
          else draft.error = action.error;
          break;
        }
        case reducerName + ActionsEnum.request: {
          draft.isLoading = true;
          break;
        }
        case reducerName + ActionsEnum.refetch: {
          draft.isRefetching = true;
          break;
        }
        case reducerName + ActionsEnum.fetch: {
          draft.isLoading = false;
          draft.isRefetching = false;
          if (onFetch) draft.data = onFetch(action.payload);
          else draft.data = action.payload;
          break;
        }
        case reducerName + ActionsEnum.fetchMoreRequest: {
          draft.isFetchMore = true;
          break;
        }
        case reducerName + ActionsEnum.fetchMore: {
          draft.isFetchMore = false;
          if (onFetchMore) draft.data = onFetchMore(action.payload, state.data);
          break;
        }
        case reducerName + ActionsEnum.writeCache: {
          draft.data = action.payload;
          break;
        }
        default: {
          draft = state;
        }
      }
    });
  };
  return {
    [reducerName]: reducer,
  };
}
