import { useDebounce } from "@/hooks/useDebounce";
import { useQuery } from "@/hooks/useQuery";
import { productService } from "@/services/product";
import { currency, slugify } from "@/utils";
import { Drawer } from "antd";
import querystring from "query-string";
import Skeleton from "../Skeleton";
import { PATH } from "@/config";
import { Link, generatePath } from "react-router-dom";
import { useCategories, useCategory } from "@/hooks/useCategories";

export default function SearchDrawer({ open, onClose }) {
  const [value, setValue] = useDebounce("");
  const { data: categories } = useCategories();
  const [categoryId, setCategoryId] = useDebounce(0);

  const category = useCategory(parseInt(categoryId));

  const qsString = querystring.stringify({
    fields: "thumbnail_url,name,real_price,price",
    limit: 5,
    name: value,
    categories: categoryId || undefined,
  });
  const {
    data,
    loading,
    reFetch: searchService,
  } = useQuery({
    queryKey: [qsString],
    queryFn: ({ signal }) => productService.getProduct(`?${qsString}`, signal),
    enable: !!value,
  });

  const qs = querystring.stringify({
    search: value,
  });
  const linkViewAll =
    (category
      ? generatePath(PATH.Category, {
          slug: slugify(category.title),
          id: category.id,
        })
      : PATH.Product) + `?${qs}`;

  const onSearch = async () => {
    if (value.trim()) {
      searchService();
    }
  };
  return (
    <Drawer
      open={open}
      onClose={onClose}
      headerStyle={{ display: "none" }}
      bodyStyle={{ padding: 0 }}
      width={470}
      // style={{
      //   body: { padding: 0 }, // Kiểu cho phần body
      //   header: { display: "none" }, // Kiểu cho phần header
      // }}
    >
      <div className="modal-content">
        {/* Close */}
        <button
          type="button"
          className="close !outline-none"
          data-dismiss="modal"
          aria-label="Close"
          onClick={onClose}
        >
          <i className="fe fe-x" aria-hidden="true" />
        </button>
        {/* Header*/}
        <div className="modal-header line-height-fixed font-size-lg">
          <strong className="mx-auto">Search Products</strong>
        </div>
        {/* Body: Form */}
        <div className="modal-body">
          <div className="form-group">
            <label className="sr-only" htmlFor="modalSearchCategories">
              Categories:
            </label>
            <select
              className="custom-select"
              onChange={(ev) => setCategoryId(ev.target.value)}
            >
              <option value={0}>All Categories</option>
              {categories?.data?.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.title}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group input-group-merge">
            <input
              onChange={(ev) => setValue(ev.target.value)}
              className="form-control"
              type="search"
              placeholder="Search"
            />
            <div className="input-group-append">
              <button
                onClick={onSearch}
                className="btn btn-outline-border"
                type="submit"
              >
                <i className="fe fe-search" />
              </button>
            </div>
          </div>
        </div>
        {/* Body: Results (add `.d-none` to disable it) */}
        <div className="modal-body border-top font-size-sm">
          {/* Heading */}
          <p>Search Results:</p>
          {/* Items */}
          {!loading && !data && (
            <div className=" modal-body border">
              {/* Text */}
              <p className="mb-3 font-size-sm text-center">
                Tìm kiếm sản phẩm bạn yêu thích
              </p>
              <p className="mb-0 font-size-sm text-center">😃</p>
            </div>
          )}
          {loading ? (
            Array.from(Array(5)).map((_, i) => <SearchItemLoading key={i} />)
          ) : data?.data?.length === 0 ? (
            <div className=" modal-body border">
              {/* Text */}
              <p className="mb-3 font-size-sm text-center">
                Không tìm thấy sản phẩm
              </p>
              <p className="mb-0 font-size-sm text-center">😞</p>
            </div>
          ) : (
            data?.data?.map((e) => <SearchItem key={e.id} {...e} />)
          )}

          {/* Button */}
          <Link
            onClick={onClose}
            className="btn btn-link px-0 text-reset"
            to={linkViewAll}
          >
            Tất cả sản phẩm <i className="fe fe-arrow-right ml-2" />
          </Link>
        </div>
      </div>
    </Drawer>
  );
}

const SearchItem = ({ name, real_price, price, thumbnail_url }) => {
  return (
    <div className="row align-items-center position-relative mb-5">
      <div className="col-4 col-md-3">
        {/* Image */}
        <img className="img-fluid" src={thumbnail_url} alt={name} />
      </div>
      <div className="col position-static">
        {/* Text */}
        <p className="mb-0 font-weight-bold">
          <a className="stretched-link text-body" href="./product.html">
            {name}
          </a>{" "}
          <br />
        </p>
        <div className="card-product-price">
          {real_price < price ? (
            <>
              <span className="sale text-primary">{currency(real_price)}</span>
              <span className="text-muted line-through ml-1 inline-block">
                {currency(price)}
              </span>
            </>
          ) : (
            <span className="text-muted ml-1 inline-block">
              {currency(price)}
            </span>
          )}
        </div>
        <p />
      </div>
    </div>
  );
};

const SearchItemLoading = () => {
  return (
    <div className="row align-items-center position-relative mb-5">
      <div className="col-4 col-md-3">
        {/* Image */}
        <Skeleton height={86.81} />
      </div>
      <div className="col position-static">
        {/* Text */}
        <p className="mb-0 font-weight-bold">
          <a className="stretched-link text-body" href="#">
            <Skeleton width={250} height={20} />
          </a>{" "}
        </p>
        <div className="card-product-price">
          <Skeleton width={150} height={43} />
        </div>
        <p />
      </div>
    </div>
  );
};
