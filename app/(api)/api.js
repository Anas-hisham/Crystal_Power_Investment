// src/apiConfig.js
export const API_BASE_URL = "https://full-stack-xi-three.vercel.app/api/";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/users/login`,
    REGISTER: `${API_BASE_URL}/users/register`,
  },
  COURSES: {
    LIST: `${API_BASE_URL}/courses`,
    DETAIL: (id) => `${API_BASE_URL}/courses/${id}`,
    /*
     const DETAIL = function(id) {
        return `${API_BASE_URL}/courses/${id}`;
    };
    */
  },
};

// Alternatively, for simpler cases:
export const API_URLS = {
  LOGIN: `${API_BASE_URL}/users/login`,
  REGISTER: `${API_BASE_URL}/users/register`,
};
