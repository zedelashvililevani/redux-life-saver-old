import { NetworkStatusEnum } from './enums';
import { UseSelector } from './types';
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
    cacheOptions?: object;
}
interface RefetchParams {
    fetchUrl?: string;
    fetchParams?: object;
}
export declare const initUseData: ({ serverUrl, fetchOptions, customFetch, useSelector, useDispatch, }: initParams) => {
    useData: <TData>(reducerName: string, { url, params, cacheOnly, cacheOptions }: useDataParams) => {
        data: TData;
        fetch: ({ fetchParams, fetchUrl }?: RefetchParams) => Promise<any>;
        reFetch: () => Promise<any>;
        fetchMore: (params?: object) => Promise<any>;
        networkStatus: NetworkStatusEnum;
    };
    useReadCache: <TData_1>(reducerName: string, cacheOptions?: object | undefined) => TData_1;
    useWriteCache: () => <T>(reducerName: string, cache: T, cacheOptions?: object | undefined) => void;
};
export {};
//# sourceMappingURL=useData.d.ts.map