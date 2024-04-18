import React, { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const handleFetch = async () => {
    const res = await fetch("https://dummyjson.com/products?limit=100");
    const data = await res.json();
    console.log("data:", data);
    if (data && data.products) setProducts(data.products);
  };

  const handlePageSelect = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= products.length / 10 &&
      selectedPage !== page
    )
      setPage(selectedPage);
  };

  useEffect(() => {
    handleFetch();
  }, []);
  return (
    <div>
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((product) => (
            <div className="single_product" key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <span>{product.title}</span>
            </div>
          ))}
        </div>
      )}
      {products.length > 0 && (
        <div className="pagination">
          <span
            className={page > 1 ? "" : "pagination-disable"}
            onClick={() => {
              handlePageSelect(page - 1);
            }}
          >
            ◀
          </span>
          {[...Array(products.length / 10)].map((_, i) => (
            <span
              className={page === i + 1 ? "selected-page" : ""}
              key={i}
              onClick={() => {
                handlePageSelect(i + 1);
              }}
            >
              {i + 1}
            </span>
          ))}
          <span
            onClick={() => {
              handlePageSelect(page + 1);
            }}
            className={page < products.length / 10 ? "" : "pagination-disable"}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
}
