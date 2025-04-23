// app/profile/page.js
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for user data in localStorage
    const storedData = localStorage.getItem("data");
    const storedRole = localStorage.getItem("user");
    setUserRole(storedRole);
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setUserData(parsedData);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-800"></div>
      </div>
    );
  }
  if (!userData && userRole) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Please sign in with google to see details.
          </h2>

          <Link
            href="/login"
            className="px-6 py-2 bg-red-400 text-white rounded hover:bg-red-500 transition-colors inline-block"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No User Data Found
          </h2>
          <p className="text-gray-600 mb-6">
            Please sign in to view your profile.
          </p>
          <Link
            href="/login"
            className="px-6 py-2 bg-red-400 text-white rounded hover:bg-red-500 transition-colors inline-block"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Profile Content */}
      <main className="max-w-4xl mx-auto p-4 md:p-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          {/* Profile Header */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-200">
              <img
                src={userData?.picture}
                alt="Profile"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-800">
                {userData?.name}
              </h2>
              <p className="text-gray-600">{userData?.email}</p>
              <p className="text-gray-500 mt-1">
                {userData?.email_verified
                  ? "Verified account"
                  : "Unverified account"}
              </p>
            </div>

            <button
              className="px-4 py-2 bg-red-400 text-white rounded hover:bg-red-500 transition-colors duration-300"
              onClick={() => {
                // Add your edit functionality here
                console.log("Edit profile clicked");
              }}
            >
              Edit Profile
            </button>
          </div>

          {/* Personal Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  First Name
                </label>
                <p className="text-gray-800">{userData?.given_name}</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Last Name
                </label>
                <p className="text-gray-800">{userData?.family_name}</p>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-gray-500 mb-1">
                  Email
                </label>
                <p className="text-gray-800">{userData?.email}</p>
              </div>
            </div>
          </div>

          {/* Style Preferences */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Your Style Preferences
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Favorite Categories
                </label>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    Jackets
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    Jeans
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    Sweaters
                  </span>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Preferred Colors
                </label>
                <div className="flex gap-2 mt-2">
                  <div className="w-6 h-6 rounded-full bg-blue-500"></div>
                  <div className="w-6 h-6 rounded-full bg-black"></div>
                  <div className="w-6 h-6 rounded-full bg-gray-500"></div>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Size Preference
                </label>
                <p className="text-gray-800">Medium (M)</p>
              </div>
              <div>
                <label className="block text-sm text-gray-500 mb-1">
                  Newsletter
                </label>
                <p className="text-gray-800">Subscribed</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-800">Order #12345 shipped</p>
                  <p className="text-sm text-gray-500">2 days ago</p>
                </div>
              </div>
              <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-800">Added item to wishlist</p>
                  <p className="text-sm text-gray-500">1 week ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
