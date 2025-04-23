"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

async function fetchProduct(id) {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  return res.json();
}

export default function ProductDetailPage({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for interactive elements
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("#000000");
  const [user, setuser] = useState(null);
  const [picture, setPicture] = useState(null);

  const { cart, addToCart } = useCart();

  const route = useRouter();

  // Available options
  const sizes = ["XS", "S", "M", "L", "XL"];
  const colors = [
    { name: "Black", value: "#000000" },
    { name: "White", value: "#FFFFFF" },
    { name: "Red", value: "#FF0000" },
    { name: "Blue", value: "#1E40AF" },
    { name: "Green", value: "#166534" },
    { name: "Gray", value: "#6B7280" },
  ];

  useEffect(() => {
    const storeduser = localStorage.getItem("user");
    setuser(storeduser);
    const picture = localStorage.getItem("picture");
    setPicture(picture);

    const loadProduct = async () => {
      try {
        const data = await fetchProduct(id);
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const handleAddToCart = (product) => {
    if (user || picture) {
      addToCart({ ...product, size: selectedSize, color: selectedColor });

      Swal.fire({
        title: "Product has been added successfully!",
        icon: "success",
        draggable: true,
      });
    } else {
      route.push("/login");
    }
  };

  if (loading)
    return <div className="text-center p-10 min-h-screen">Loading...</div>;
  if (error)
    return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  if (!product)
    return <div className="text-center p-10">Product not found</div>;

  return (
    <div className="bg-white max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-gray-500 hover:text-gray-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </Link>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </li>
            <li>
              <Link
                href="/products"
                className="text-gray-500 hover:text-gray-700"
              >
                Products
              </Link>
            </li>
            <li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </li>
            <li className="text-black font-bold">{product.title}</li>
          </ol>
        </nav>
      </div>

      {/* Product Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
        {/* Product Image */}
        <div className="bg-white p-4 rounded-lg ">
          <img
            src={product.image}
            alt={product.title}
            className="w-[80%] sm:w-full h-96 object-contain mx-auto"
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.title}
          </h1>
          <p className="text-gray-500 mb-6">{product.description}</p>

          <div className="flex items-center mb-6">
            <span className="text-2xl font-bold text-gray-900 mr-3">
              ${product.price}
            </span>
            {product.price > 50 && (
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                Free Shipping
              </span>
            )}
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`w-10 h-10 flex justify-center items-center px-4 py-2 
                    bg-white shadow text-black rounded-full text-sm font-medium transition-colors
                    ${selectedSize === size && "text-red-500 "}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
            <div className="flex items-center gap-2">
              {colors.map((color) => (
                <button
                  key={color.value}
                  type="button"
                  onClick={() => setSelectedColor(color.value)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all
                    ${color.value === "#FFFFFF" ? "border border-gray-300" : ""}
                    ${
                      selectedColor === color.value
                        ? "ring-2 ring-offset-1 ring-gray-500"
                        : "hover:ring-1 hover:ring-gray-300"
                    }`}
                  style={{ backgroundColor: color.value }}
                  title={color.name}
                >
                  <span className="sr-only">{color.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="w-full ">
            <button
              onClick={() => handleAddToCart(product)}
              className="w-[63%] sm:w-[55%] bg-red-400 text-white py-3 px-4 rounded-md font-medium hover:bg-red-500 transition-colors mb-8"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
