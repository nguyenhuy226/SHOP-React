import { useEffect, useRef, useState } from "react";
import { localStorageCache, sessionStorageCache } from "../utils/cache";

const _cache = {
  localStorage: localStorageCache,
  sessionStorage: sessionStorageCache,
};
export const useQuery = (options = {}) => {
  const {
    queryFn,
    queryKey,
    cacheTime,
    enable = true,
    storeDriver = "localStorage",
    dependencyList = [],
  } = options;
  const cache = _cache[storeDriver];
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [status, setStatus] = useState("idle");
  const fetchRef = useRef();

  useEffect(() => {
    if (typeof fetchRef.current === "boolean") {
      fetchRef.current = true;
    }
  }, [dependencyList]);
  useEffect(() => {
    if (enable) {
      fetchData();
    }
  }, [queryKey, enable].concat(...dependencyList));
  const fetchData = async () => {
    try {
      setLoading(true);
      setStatus("pending");
      let res;
      if (queryKey && !fetchRef.current) {
        res = cache.get(queryKey);
      }
      if (!res) {
        res = await queryFn();
      }
      setStatus("success");
      setLoading(false);
      setData(res);

      if (queryKey) {
        let expired = cacheTime;
        if (cacheTime) {
          expired += Date.now();
        }
        cache.set(queryKey, res, expired);
      }
      fetchRef.current = false;
    } catch (error) {
      setError(error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };
  return {
    data,
    loading,
    error,
    status,
  };
};
