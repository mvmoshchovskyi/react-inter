import { useState, useEffect } from 'react'
import "./SortProducts.css";
import { products } from '../../data.js'

function SortProducts() {
  const sortProductOptions = [
    { key: 1, value: "default", name: 'За замовчуванням' },
    { key: 2, value: "asc", name: 'За назвою A–Z' },
    { key: 3, value: "desc", name: 'За назвою Z–A' },
  ] as const;

  type SortOrder = (typeof sortProductOptions)[number]['value'];

  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('default')
  const [pageSize, setPageSize] = useState(3);
  const filteredProducts = products.filter((product : typeof products[number]) => product.name.toLowerCase()
    .includes(debouncedSearch.toLowerCase()));

  const sortedProducts =
    sortOrder === 'default'
      ? filteredProducts
      : [...filteredProducts].sort((a, b) => {
        return sortOrder === 'asc'
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      });

  const pageCount = Math.ceil(sortedProducts.length / pageSize);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const visibleProducts = sortedProducts.slice(start, end);
  const buttons = Array.from({ length: pageCount }, (_, k) => k + 1);
  const selectedOptions = [3, 5, 10];


  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, pageSize, sortOrder]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
    }, 300)

    return () => clearTimeout(timer)
  }, [search])



 return (
  <div className="products">
    <div className="products-header">
      <h2>Products</h2>
      <span>{sortedProducts.length} products</span>
    </div>

    <div className="products-controls">
      <input
        className="products-input"
        name="search"
        value={search}
        placeholder="Search products..."
        onChange={(e) => setSearch(e.target.value)}
      />

      <label className="products-field">
        Products per page
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
        >
          {selectedOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className="products-field">
        Sort by
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value as SortOrder)}
        >
          {sortProductOptions.map((opt) => (
            <option key={opt.key} value={opt.value}>
              {opt.name}
            </option>
          ))}
        </select>
      </label>
    </div>

    {visibleProducts.length === 0 ? (
      <p className="products-empty">No products found</p>
    ) : (
      <ol className="products-list">
        {visibleProducts.map((product: typeof products[number]) => (
          <li className="product-item" key={product.id}>
            <span className="product-id">#{product.id}</span>
            <span>{product.name}</span>
          </li>
        ))}
      </ol>
    )}

    {pageCount > 0 && (
      <div className="products-pagination">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Previous
        </button>

        {buttons.map((btn) => (
          <button
            key={btn}
            type="button"
            className={currentPage === btn ? "active" : ""}
            aria-current={currentPage === btn ? "page" : undefined}
            onClick={() => setCurrentPage(btn)}
          >
            {btn}
          </button>
        ))}

        <button
          type="button"
          disabled={currentPage >= pageCount}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    )}
  </div>
);
}

export default SortProducts;
