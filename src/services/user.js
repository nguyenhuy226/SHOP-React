import { USER_API } from "@/config/api";
import { http } from "@/utils";

export const userService = {
  register(data) {
    return http.post(`${USER_API}/register`, data);
  },
  getUser() {
    return http.get(`${USER_API}`);
  },
};
