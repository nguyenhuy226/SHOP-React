import Paginate from "@/components/Paginate";
import { Portal } from "@/components/Portal";
import { ListProductCard } from "@/components/ProductCard";
import { PROFILE_TITLE_ID } from "@/config";
import { useQuery } from "@/hooks/useQuery";
import { useSearch } from "@/hooks/useSearch";
import { productService } from "@/services/product";
import queryString from "query-string";
import { Helmet } from "react-helmet";

export default function WishlistPage() {
  const [search] = useSearch({
    page: 1,
  });
  const qs = queryString.stringify({
    page: search.page,
  });

  const {
    loading,
    data,
    reFetch: fetchWishlist,
    clearPreviousData,
  } = useQuery({
    deleteAsyncFuncion: true,
    keepPrevousData: true,
    queryKey: [qs],
    queryFn: () => productService.getWishlist(`?${qs}`),
  });

  return (
    <>
      <Helmet>
        <title>Sản phẩm yêu thích</title>
      </Helmet>
      <div>
        <Portal selector={PROFILE_TITLE_ID}>Sản phẩm yêu thích</Portal>
        <div className="row">
          <ListProductCard
            loadingCount={15}
            loading={loading}
            data={data?.data}
            showRemove
            onRemoveWishlistSuccess={() => {
              clearPreviousData();
              fetchWishlist();
            }}
          />
          {/* {loading
            ? Array.from(Array(15)).map((_, i) => (
                <ProductCardLoading key={i} />
              ))
            : data?.data?.map((e) => (
                <ProductCard
                  showRemove
                  onRemoveWishlistSuccess={() => {
                    clearPreviousData();
                    fetchWishlist();
                  }}
                  key={e.id}
                  {...e}
                />
              ))} */}
        </div>
        {/* Pagination */}
        <Paginate totalPage={data?.paginate?.totalPage} />
      </div>
    </>
  );
}
