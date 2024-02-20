// import axios from "axios";
// import { getToken, setToken } from "../utils/token";
// import { authService } from "../services/auth";

// export const COURSE_API = import.meta.env.VITE_COURSE_API;
// export const ORGANIZATION_API = import.meta.env.VITE_ORGANIZATION_API;
// export const USER_API = import.meta.env.VITE_USER_API;
// export const AUTHENTICATION_API = import.meta.env.VITE_AUTHENTICATION_API;

// export const http = axios.create();

// http.interceptors.response.use(
//   (res) => {
//     return res.data;
//   },
//   async (err) => {
//     try {
//       if (
//         err.response.status === 403 &&
//         err.response.data.error_code === "TOKEN_EXPIRED"
//       ) {
//         console.log("refesh token");
//         //refreshToken:
//         const token = getToken();
//         const res = await authService.refreshToken({
//           refreshToken: token.refreshToken,
//         });
//         setToken(res.data);
//         // thực hiện lại api lỗi
//         return http(err.config);
//       }
//     } catch (error) {}
//     throw err;
//   }
// );
// http.interceptors.request.use((config) => {
//   const token = getToken();
//   if (token) {
//     config.headers["Authorization"] = `Bearer ${token.accessToken}`;
//   }
//   return config;
// });
