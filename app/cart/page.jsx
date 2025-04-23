"use client";
import React from "react";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import { MdOutlineDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import PaymentForm from "../_components/PaymentForm";

const Page = () => {
  const { cart, removeFromCart } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0;
  const grandTotal = subtotal + shipping;
  const router = useRouter();

  return (
    <div className="my-12 px-4 md:px-10 max-w-4xl mx-auto">
      {cart.length === 0 ? (
        <div className="h-[calc(85vh)] flex flex-col items-center justify-center text-center">
          <h1 className="text-2xl font-semibold mb-6 text-gray-700">Your cart is empty</h1>
          <button
            onClick={() => router.back()}
            className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md transition-all"
          >
            Go Back
          </button>
        </div>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-6 text-gray-800">Shopping Cart</h2>
          <div className="space-y-10">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center gap-6 border-b pb-6"
              >
                <div className="relative w-36 h-36 flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title || "Product image"}
                    fill
                    className="object-contain rounded-lg"
                  />
                </div>
                <div className="flex-1 w-full flex flex-col sm:flex-row sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">${item.price}</p>
                    <p className="text-sm text-gray-500 mt-1">Quantity: {item.quantity}</p>
                    <div className="flex items-center gap-2 mt-3">
                      <span
                        className="w-6 h-6 rounded-full border"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded-full ">
                        {item.size}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end mt-4 sm:mt-0">
                    <button
                      onClick={() => removeFromCart(item)}
                      className="text-red-500 hover:text-red-600 transition"
                    >
                      <MdOutlineDelete size={22} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout section below cart */}
          <div className="mt-12 bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Order Summary</h2>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t border-gray-200 my-3" />
              <div className="flex justify-between font-semibold text-base text-gray-800">
                <span>Total:</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <PaymentForm amount={grandTotal} />
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
