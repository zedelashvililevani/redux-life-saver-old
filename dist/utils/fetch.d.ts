export declare const paramsToUri: (uri: string, params: any) => string;
export declare const fetcher: <T>(url: string, options: object) => Promise<T>;
declare type ObjKey = {
    [x: string]: any;
};
export declare const objectToKey: (obj?: ObjKey | undefined) => string | undefined;
export {};
//# sourceMappingURL=fetch.d.ts.map