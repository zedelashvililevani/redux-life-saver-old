import { useEffect } from "react";
import { NetworkStatusEnum, ActionsEnum } from "./enums";
import { InitialState, Action, SelectorState, UseSelector } from "./types";
import { fetcher, paramsToUri } from "./utils/fetch";
import { initReadCache } from "./readCache";
import { initWriteCache } from "./writeCache";

interface initParams {
  serverUrl: string;
  fetchOptions?: object;
  customFetch?: <T>(url: string, options: object) => Promise<T>;
  useSelector: UseSelector;
  useDispatch: any;
}
interface useDataParams {
  url: string;
  params?: object;
  cacheOnly?: boolean;
}

interface RefetchParams {
  fetchUrl?: string;
  fetchParams?: object;
}

export const initUseData = ({
  serverUrl,
  fetchOptions = {},
  customFetch = fetcher,
  useSelector,
  useDispatch,
}: initParams) => {
  // main thing to use xD
  const useReadCache = initReadCache(useSelector);
  const useWriteCache = initWriteCache(useDispatch);
  const useData = <TData>(
    reducerName: string,
    { url, params = {}, cacheOnly = false }: useDataParams
  ) => {
    const dispatch = useDispatch();
    const { isLoading, isRefetching, isFetchMore, error, data } = useSelector<
      SelectorState<TData>,
      InitialState<TData>
    >((data) => data[reducerName] as InitialState<TData>);
    useEffect(() => {
      if (!cacheOnly) fetch();
    }, []);

    const takeAction = (
      actionName: string,
      newData: TData | null = data,
      error: string | null = null
    ): Action<TData> => {
      return {
        type: actionName,
        payload: newData,
        error: error,
        reducer: reducerName,
      };
    };

    const fetchData = (uriParams = params, fetchUrl = url) => {
      const uri = paramsToUri(fetchUrl, uriParams);
      return customFetch<TData>(serverUrl + uri, fetchOptions);
    };

    const fetch = async ({
      fetchParams = params,
      fetchUrl = url,
    }: RefetchParams = {}) => {
      dispatch(takeAction(reducerName + ActionsEnum.request));
      try {
        const responseData = await fetchData(fetchParams, fetchUrl);
        return dispatch(
          takeAction(reducerName + ActionsEnum.fetch, responseData)
        );
      } catch (e) {
        return dispatch(takeAction(e));
      }
    };

    const reFetch = async () => {
      dispatch(takeAction(reducerName + ActionsEnum.refetch));
      try {
        const responseData = await fetchData(params, url);
        return dispatch(
          takeAction(reducerName + ActionsEnum.fetch, responseData)
        );
      } catch (e) {
        return dispatch(takeAction(e));
      }
    };

    const fetchMore = async (params: object = {}) => {
      dispatch(takeAction(reducerName + ActionsEnum.fetchMoreRequest));
      try {
        const responseData = await fetchData(params);
        return dispatch(
          takeAction(reducerName + ActionsEnum.fetchMore, responseData)
        );
      } catch (e) {
        return dispatch(takeAction(e));
      }
    };

    const getNetworkStatus = () => {
      if (isLoading) return NetworkStatusEnum.loading;
      if (isRefetching) return NetworkStatusEnum.refetch;
      if (error) return NetworkStatusEnum.error;
      if (isFetchMore) return NetworkStatusEnum.fetchMore;
      return NetworkStatusEnum.ready;
    };

    return {
      data,
      fetch,
      reFetch,
      fetchMore,
      networkStatus: getNetworkStatus(),
    };
  };

  return { useData, useReadCache, useWriteCache };
};
