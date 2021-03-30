import { ActionsEnum } from "./enums";
import { Action } from "./types";

export const initWriteCache = (useDispatch: any) => {
  const useWriteCache = () => {
    const dispatch = useDispatch();
    const writeCache = <T>(reducerName: string, cache: T) => {
      const action: Action<T> = {
        type: reducerName + ActionsEnum.writeCache,
        payload: cache,
        error: "",
        reducer: reducerName,
      };

      dispatch(action);
    };
    return writeCache;
  };
  return useWriteCache;
};
