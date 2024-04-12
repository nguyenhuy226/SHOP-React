import { useQuery } from "@/hooks/useQuery";
import { orderService } from "@/services/order";
import React from "react";
import OrderCard from "../OrderCard";

export const ListOrder = ({ status }) => {
  const { data: data } = useQuery({
    queryFn: () =>
      orderService.getOrder(status ? `?status=${status}` : undefined),
  });
  return <>{data && data.data?.map((e) => <OrderCard key={e._id} {...e} />)}</>;
};
