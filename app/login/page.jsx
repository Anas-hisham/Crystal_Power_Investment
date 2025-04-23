"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_ENDPOINTS } from "../(api)/api";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://full-stack-xi-three.vercel.app/api/users/login",
        formData
      );
      if (data.status === "success") {
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("user", data.user.userRole);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Welcome back! You’ve successfully logged in.",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          window.location.replace(window.location.href);
        }, 2200);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };
  const [SginInGoogle, setSginInGoogle] = useState(true);

  useEffect(() => {
    const picture = localStorage.getItem("picture");
    if (picture !== null && picture !== undefined && picture !== "") {
      setSginInGoogle(false);
    }
  }, []);

  return (
    <>
      <GoogleOAuthProvider clientId="978700491128-ugascieon7t7relueoprc213picrgohp.apps.googleusercontent.com">
        <div
          className="absolute left-8 top-20 text-black 
    "
        >
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1 text-sm text-black ">
              <li>
                <Link
                  href="/"
                  className="block transition-all duration-300  hover:opacity-70"
                  aria-label="Home"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>
              </li>

              <li className="rtl:rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m9 20.247 6-16.5"
                  />
                </svg>
              </li>

              <li>
                <Link href="/login" className="text-black font-bold">
                  Login
                </Link>
              </li>
            </ol>
          </nav>
        </div>

        <div
          className=" flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8"
          style={{ height: "calc(100vh )" }}
        >
          <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign in to your account
              </h2>
            </div>
            {error && (
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="rounded-md  space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 focus:ring-red-500 focus:border-red-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 border"
                  />
                </div>
              </div>

              <div>
                <button
                  style={{ cursor: "pointer" }}
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border
                   border-transparent text-sm font-medium rounded-md text-white bg-red-400 transition-all duration-300
                    hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Sign in
                </button>
              </div>
              {SginInGoogle && (
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const decoded = jwtDecode(credentialResponse?.credential);
                    console.log(decoded);
                    localStorage.setItem("picture", decoded.picture);
                    localStorage.setItem("data", JSON.stringify(decoded));
                    window.location.reload();
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  useOneTap
                  size="large"
                />
              )}
            </form>
          </div>
        </div>
      </GoogleOAuthProvider>
    </>
  );
};

export default Login;
