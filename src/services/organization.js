import { ORGANIZATION_API } from "@/config/api";
import { http } from "@/utils";

export const organizationService = {
  contact(data) {
    return http.post(`${ORGANIZATION_API}/contact`, data);
  },
};
