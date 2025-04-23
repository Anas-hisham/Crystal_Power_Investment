"use client";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { GoogleOAuthProvider } from "@react-oauth/google";
const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  //   const navigate = useNavigate();
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
      const { data } = await axios.post('https://full-stack-xi-three.vercel.app/api/users/register', formData);
      if (data.status === "success") {
        console.log(data);

        localStorage.setItem("token", data.data.user.token);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Welcome back! You’ve successfully Registered.",
          showConfirmButton: false,
          timer: 1500,
        });
        setTimeout(() => {
          router.push("login");
        }, 2200);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };


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
              <Link
                href="/register"
                className="text-black font-bold"
              >
                Register
              </Link>
            </li>
          </ol>
        </nav>
      </div>

      <div
        className="flex items-center justify-center bg-white"
        style={{ height: "calc(100vh )" }}
      >
        <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg ">
          <h1 className="text-2xl font-bold mb-4">Register</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm p-2 border"
                required
              />
            </div>
            <button
              style={{ cursor: "pointer" }}
              type="submit"
              className="w-full bg-red-400 text-white px-4 py-2 rounded transition-all duration-300 hover:bg-red-500"
            >
              Register
            </button>
            
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
          </form>
        </div>
      </div>
      </GoogleOAuthProvider>

    </>
  );
};

export default Register;
