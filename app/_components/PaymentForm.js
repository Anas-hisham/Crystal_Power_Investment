"use client";
import React, { useEffect, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

const stripePromise = loadStripe(
    "pk_test_51QnE3jC7HhZ698AE3X8TCSiF2WCEKWnVmsVyuojWFEEKcW0nNFuPiEOKBzL5bYI5oJrUtBAk1uOUoXB9Xo41A3FP004M5mbjv4"
);

const PaymentForm = ({ amount }) => {
    const [loading, setLoading] = useState(false);
    const [paymentMessage, setPaymentMessage] = useState("");
    const cardElementRef = useRef(null);
    const elementsRef = useRef(null);
    const cardRef = useRef(null);

    const { clearCart } = useCart()
    const route = useRouter()
    useEffect(() => {
        const initializeStripe = async () => {
            const stripe = await stripePromise;
            const elements = stripe.elements();
            elementsRef.current = elements;
            const card = elements.create("card", {
                style: {
                    base: {
                        fontSize: "16px",
                        color: "#32325d",
                        "::placeholder": {
                            color: "#a0aec0",
                        },
                    },
                    invalid: {
                        color: "#fa755a",
                    },
                },
            });
            cardRef.current = card;
            card.mount(cardElementRef.current);
        };
        initializeStripe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setPaymentMessage("");

        try {
            const { data } = await axios.post("https://full-stack-xi-three.vercel.app/api/create-payment-intent", {
                amount: Math.round(amount * 100), // Stripe requires amount in cents
            });

            const { clientSecret } = data;
            const stripe = await stripePromise;

            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardRef.current,
                },
            });

            if (error) {
                setPaymentMessage(`❌ Payment failed: ${error.message}`);
            } else if (paymentIntent.status === "succeeded") {
                setPaymentMessage("✅ Payment successful!");

                setTimeout(() => {
                    route.push('/products')
                    clearCart()
                }, 1500)
            }
        } catch (err) {
            setPaymentMessage(`❌ Payment error: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" p-10 rounded-xl  bg-white mt-8 w-full">
            <h2 className="text-xl font-semibold mb-4">Pay with Card</h2>
            <form onSubmit={handleSubmit}>
                <div ref={cardElementRef} className="border p-3 rounded mb-4" />
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-red-400 text-white py-2 px-4 rounded hover:bg-red-500 transition-all duration-300"
                >
                    {loading ? "Processing..." : `Pay $${amount.toFixed(2)}`}
                </button>
            </form>
            {paymentMessage && (
                <p className={`mt-4 ${paymentMessage.includes("✅") ? "text-green-600" : "text-red-500"}`}>
                    {paymentMessage}
                </p>
            )}
        </div>
    );
};

export default PaymentForm;
