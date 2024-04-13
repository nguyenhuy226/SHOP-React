import { useQuery } from "@/hooks/useQuery";
import { orderService } from "@/services/order";
import { ListOrderCard } from "../OrderCard";
import Paginate from "../Paginate";
import queryString from "query-string";
import { useSearch } from "@/hooks/useSearch";

export const ListOrder = ({ status }) => {
  const [search] = useSearch({
    page: 1,
  });
  const qs = queryString.stringify({
    page: search.page,
    status,
  });

  const { data: data, loading } = useQuery({
    queryKey: [qs],
    queryFn: () => orderService.getOrder(`?${qs}`),
  });
  return (
    <>
      <ListOrderCard
        data={data?.data}
        loading={loading}
        loadingCount={5}
        emtty={
          <div className="flex items-center flex-col gap-5 text-center">
            <img width={200} src="/img/empty-order.png" alt />
            <p>Chưa có đơn hàng nào</p>
          </div>
        }
      />
      <Paginate totalPage={data?.paginate?.totalPage} />
    </>
  );
};
