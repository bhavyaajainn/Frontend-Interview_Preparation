import React, { useEffect, useRef, useState } from "react";

const STATE = {
  LOADING: "LOADING",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
};

const ReactSearchBar = () => {
  const [query, setQuery] = useState("");
  const [result, setResults] = useState([]);
  const [status, setStatus] = useState(STATE.LOADING);
  const cache = useRef({});

  const abortController = new AbortController();
  const { signal } = abortController;
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (cache.current[query]) {
          setResults(cache.current[query]);
          setStatus(STATE.SUCCESS);
          return;
        }
        setStatus(STATE.LOADING);
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${query}&limit=10`,
          { signal },
        );
        const data = await res.json();
        setStatus(STATE.SUCCESS);
        cache.current[query] = data.products;
        setResults(data.products);
      } catch (e) {
        if (e.name != "AbortError") {
          setStatus(STATE.ERROR);
        }
      }
    };

    const timerId = setTimeout(fetchData, 1000);
    return () => {
      clearTimeout(timerId);
      abortController.abort();
    };
  }, [query]);
  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {status == STATE.LOADING && <div>Loading...</div>}
      {status == STATE.ERROR && <div>Something went wrong!</div>}
      {status == STATE.SUCCESS && (
        <ul>
          {result.map((product) => {
            return <li key={product.id}>{product.title}</li>;
          })}
        </ul>
      )}
    </div>
  );
};

export default ReactSearchBar;
