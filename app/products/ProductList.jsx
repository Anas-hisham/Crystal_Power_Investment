"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";

export default function ProductList({ initialProducts }) {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: "",
    category: "",
    sortAsc: false,
    sortDesc: false,
  });

  const categories = ["Men's Clothing", "Women's Clothing"];

  // Initialize products with 'liked' property
  useEffect(() => {
    const updatedProducts = initialProducts.map((p) => ({
      ...p,
      liked: false,
    }));
    setProducts(updatedProducts);
  }, [initialProducts]);

  // Toggle like without using prev
  const toggleLike = (id) => {
    const updatedProducts = products.map((p) =>
      p.id === id ? { ...p, liked: !p.liked } : p
    );
    setProducts(updatedProducts);
  };

  // Filtering and sorting
  const filtered = products
    .filter((p) =>
      filters.search
        ? p.title.toLowerCase().includes(filters.search.toLowerCase())
        : true
    )
    .filter((p) =>
      filters.category
        ? p.category.toLowerCase() === filters.category.toLowerCase()
        : true
    )
    .sort((a, b) => {
      if (filters.sortAsc) return a.price - b.price;
      if (filters.sortDesc) return b.price - a.price;
      return 0;
    });

  return (
    <div className="p-6 max-w-6xl mx-auto bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Our Products
      </h1>

      {/* Filters */}
      <div className="p-4 rounded-xl flex flex-col gap-4 mb-8 justify-center items-center">
        {/* Search Input */}
        <div className="flex">
          <div className="flex items-center bg-white rounded-full px-4 py-2 shadow-sm">
            <input
              type="text"
              placeholder="Search"
              className="outline-none text-sm text-gray-600 bg-transparent"
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>
          <button
            onClick={() =>
              setFilters({
                search: "",
                category: "",
                sortAsc: false,
                sortDesc: false,
              })
            }
            className="ml-3 bg-red-400 rounded-full px-4 py-2 text-sm text-white hover:bg-red-500"
          >
            Reset Filters
          </button>
        </div>

        {/* Category Buttons */}
        <div className="flex flex-wrap gap-4 justify-center w-full flex-col sm:flex-row">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() =>
                setFilters({
                  ...filters,
                  category: filters.category === category ? "" : category,
                })
              }
              className={`rounded-2xl px-6 py-4 text-sm shadow-sm ${
                filters.category === category
                  ? "bg-red-400 text-white hover:bg-red-500 transition duration-300"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200 transition duration-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort Checkboxes */}
        <div className="flex space-x-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.sortAsc}
              onChange={() =>
                setFilters({
                  ...filters,
                  sortAsc: !filters.sortAsc,
                  sortDesc: false,
                })
              }
            />
            <span>Price: Low to High</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={filters.sortDesc}
              onChange={() =>
                setFilters({
                  ...filters,
                  sortDesc: !filters.sortDesc,
                  sortAsc: false,
                })
              }
            />
            <span>Price: High to Low</span>
          </label>
        </div>
      </div>

      {/* Products */}
      <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filtered
          .filter(
            (p) =>
              p.category === "men's clothing" ||
              p.category === "women's clothing"
          )
          .map((p) => (
            <div
              key={p.id}
              className="relative bg-white rounded-2xl p-4 transition-shadow shadow hover:shadow-xl duration-300 flex flex-col items-center sm:items-start"
            >
              {/* Like button */}
              <button
                onClick={() => toggleLike(p.id)}
                className="absolute top-4 right-4 bg-white shadow-sm w-9 h-9 rounded-full flex justify-center items-center hover:scale-105 transition duration-300"
              >
                {p.liked ? (
                  <FaHeart className="text-red-400 z-10" />
                ) : (
                  <FaRegHeart className="text-red-400 z-10" />
                )}
              </button>

              {/* Product Image */}
              <div className="w-full flex justify-center">
                <Link href={`/products/${p.id}`}>
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-40 sm:h-50 w-full object-cover rounded-xl mb-4 transition-transform hover:scale-105"
                  />
                </Link>
              </div>

              {/* Title */}
              <h2 className="text-lg font-semibold text-gray-900 line-clamp-2 text-center sm:text-left">
                {p.title}
              </h2>

              {/* Price */}
              <p className="mt-1 text-xl text-red-400 font-medium">
                ${p.price}
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
