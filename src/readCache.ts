import { UseSelector, InitialCacheState, SelectorState } from "./types";

export const initReadCache = (useSelector: UseSelector) => {
  const readCache = <TData>(reducerName: string) => {
    const { data } = useSelector<
      SelectorState<TData>,
      InitialCacheState<TData>
    >((data) => data[reducerName] as InitialCacheState<TData>);
    return data;
  };
  return readCache;
};
