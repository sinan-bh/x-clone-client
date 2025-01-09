import Cookies from "js-cookie";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      const user = JSON.parse(userCookie);
      const token = user.token;
      console.log(token, "aa");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// axiosInstance.interceptors.response.use(
//   (response) => {
//     console.log(response);
//     return response;
//   },
//   async (error) => {
//     console.log("aaaa", error);
//     console.log("Full Error Object:", error);
//     console.log("Response Data:", error.response?.data);
//     console.log("Status Code:", error.response?.status);
//     console.log("Headers:", error.response?.headers);
//     const originalRequest = error.config;

//     // Check if token is expired
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       console.log("true");

//       try {
//         // Get new access token from refresh endpoint
//         const refreshResponse = await axios.post(
//           `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
//           {},
//           { withCredentials: true } // Include cookies for refreshToken
//         );
//         console.log(refreshResponse);

//         const newAccessToken = refreshResponse.data.data.accessToken;

//         // Update token in cookies and headers
//         const userCookie = Cookies.get("user");
//         if (userCookie) {
//           const user = JSON.parse(userCookie);
//           user.token = newAccessToken;
//           Cookies.set("user", JSON.stringify(user), {
//             expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
//           });

//           axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         }

//         // Retry original request
//         return axiosInstance(originalRequest);
//       } catch (refreshError) {
//         console.error("Refresh token failed:", refreshError);
//         // Cookies.remove("user"); // Clear cookies on failure
//         window.location.href = "/signin"; // Redirect to login
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosInstance;
