import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative bg-white min-h-[calc(100vh-64px)] flex items-center justify-center px-6 py-12 overflow-hidden">
      <main className="text-center max-w-3xl z-10">
        <h1 className=" text-3xl sm:text-5xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6 animate-fadeIn">
          Welcome to the <span className="text-red-400">Product Store</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8">
          Discover handpicked items made to elevate your lifestyle.
        </p>

        <Link
          href="/products"
          className="inline-block bg-red-400 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-red-500 hover:scale-105 transition-all duration-300"
        >
          View Products
        </Link>
      </main>

      {/* Decorative glowing circles */}
      <div className="absolute -top-10 -left-10 w-60 h-60 bg-red-300 opacity-20 rounded-full filter blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-purple-300 opacity-20 rounded-full filter blur-3xl animate-pulse"></div>
    
    </div>

  );
}
