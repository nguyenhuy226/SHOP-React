import { useEffect, useRef, useState } from "react";
import { localStorageCache, sessionStorageCache } from "../utils/cache";
import { CanceledError } from "axios";
import { delay } from "@/utils/delay";

const _cache = {
  localStorage: localStorageCache,
  sessionStorage: sessionStorageCache,
};

const _asyncFunction = {};

export const useQuery = ({
  queryFn,
  queryKey,
  cacheTime,
  enable = true,
  storeDriver = "localStorage",
  dependencyList = [],
  limitDuration,
  keepPrevousData = false,
}) => {
  const dataRef = useRef({});
  const cache = _cache[storeDriver];
  const fetchRef = useRef();
  const cacheName = Array.isArray(queryKey) ? queryKey[0] : queryKey;
  const controllerRef = useRef(new AbortController());
  const [data, setData] = useState();
  const [loading, setLoading] = useState(enable);
  const [error, setError] = useState();
  const [status, setStatus] = useState("idle");
  // useEffect(() => {
  //   if (typeof fetchRef.current === "boolean") {
  //     fetchRef.current = true;
  //   }
  // }, [dependencyList]);
  useEffect(() => {
    return () => {
      controllerRef.current.abort();
    };
  }, []);
  useEffect(() => {
    if (enable) {
      fetchData();
    }
  }, [enable].concat(queryKey));

  const getCacheDataOrPrivousData = () => {
    if (cacheName) {
      if (keepPrevousData && dataRef[cacheName]) {
        return dataRef[cacheName];
      }
      if (_asyncFunction[cacheName]) {
        return _asyncFunction[cacheName];
      }
      // lấy dữ liệu từ trong cache
      return cache.get(queryKey);
    }
  };

  const setCacheDataOrPrivousData = (data) => {
    if (keepPrevousData) {
      dataRef[cacheName] = data;
    }
    if (cacheName && cacheTime) {
      let expired = cacheTime;
      if (cacheTime) {
        expired += Date.now();
      }
      cache.set(cacheName, data, expired);
    }
  };
  const fetchData = async (...args) => {
    controllerRef.current.abort();
    controllerRef.current = new AbortController();
    const startTime = Date.now();
    let res;
    let error;
    try {
      setLoading(true);
      setStatus("pending");
      res = getCacheDataOrPrivousData();
      if (!res) {
        res = await queryFn({
          signal: controllerRef.current.signal,
          params: args,
        });
        if (cacheName) {
          _asyncFunction[cacheName] = res;
        }
      }

      if (res instanceof Promise) {
        res = await res;
      }
    } catch (err) {
      console.log(err);
      error = err;
    }
    const endTime = Date.now();
    if (limitDuration) {
      let timeout = endTime - startTime;
      if (timeout < limitDuration) {
        await delay(limitDuration - timeout);
      }
    }
    if (res) {
      setStatus("success");
      setData(res);
      setCacheDataOrPrivousData(res);
      fetchRef.current = false;
      setLoading(false);
      return res;
    }
    if (error instanceof CanceledError) {
    } else {
      setError(error);
      setStatus("err");
      setLoading(false);
      throw error;
    }
  };
  return {
    data,
    loading,
    error,
    status,
    reFetch: fetchData,
  };
};
