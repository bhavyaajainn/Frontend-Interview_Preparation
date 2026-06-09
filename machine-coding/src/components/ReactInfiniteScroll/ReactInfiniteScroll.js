import React, { useEffect, useState } from "react";
import "./ReactInfiniteScroll.css";
import Post from "./Post";

const ReactInfiniteScroll = () => {
  const [data, setData] = useState([]);
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    fetch(`https://picsum.photos/v2/list?page=${pageNo}&limit=3`)
      .then((res) => res.json())
      .then((arr) => setData((prev) => [...prev, ...arr]));
  }, [pageNo]);

  return <Post data={data} setPageNo={setPageNo} pageNo={pageNo} />;
};

export default ReactInfiniteScroll;
