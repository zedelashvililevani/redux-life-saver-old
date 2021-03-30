// your param name must be same as {same} in uri

export const paramsToUri = (uri: string, params: any): string => {
  return Object.keys(params).reduce((prev, current) => {
    return prev.replace(new RegExp(`{${current}}`, 'g'), params[current]);
  }, uri);
};

export const fetcher = async <T>(url: string, options: object): Promise<T> => {
  const resp = await fetch(url, options);
  const response = (await resp.clone().json()) as Promise<T>;
  return response;
};
