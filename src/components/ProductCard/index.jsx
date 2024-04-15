import { PATH } from "@/config";
import { useAction } from "@/hooks/useAction";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useCategory } from "@/hooks/useCategories";
import { productService } from "@/services/product";
import { updateCartItemAction } from "@/stories/cart";
import { currency } from "@/utils";
import { withListLoading } from "@/utils/withListLoading";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Popconfirm } from "../Popcomfirm";
import { Rating } from "../Rating";
import Skeleton from "../Skeleton";
export default function ProductCard({
  images,
  name,
  price,
  real_price,
  slug,
  discount_rate,
  rating_average,
  review_count,
  categories,
  id,
  showWishlist,
  showRemove,
  onRemoveWishlistSuccess,
}) {
  const img1 = images?.[0].thumbnail_url;
  const img2 = images?.[1] ? images?.[1]?.thumbnail_url : img1;
  const category = useCategory(categories);
  const navigate = useNavigate();
  const { user } = useAuth();
  const dispatch = useDispatch();
  const { cart } = useCart();
  // const flagWishlistRef = useRef(false);

  // const onAddWishlist = async () => {
  //   if (flagWishlistRef.current) return;
  //   flagWishlistRef.current = true;
  //   const key = `add-wishlist-${id}`;
  //   try {
  //     message.loading({
  //       key,
  //       content: `Đang thêm sản phẩm ${name} vào yêu thích`,
  //       duration: 0,
  //     });
  //     await productService.addWishlist(id);
  //     message.success({
  //       key,
  //       content: `thêm sản phẩm ${name} vào yêu thích thành công`,
  //     });
  //   } catch (error) {
  //     handleError(error, key);
  //   }
  //   flagWishlistRef.current = false;
  // };

  const onAddWishlist = useAction({
    service: () => productService.addWishlist(id),
    loadingMessage: `Đang thêm sản phẩm ${name} vào yêu thích`,
    successMessage: `thêm sản phẩm ${name} vào yêu thích thành công`,
  });

  const onRemoveWishlist = useAction({
    service: () => productService.removeWishlist(id),
    loadingMessage: `Đang xóa sản phẩm ${name} khỏi yêu thích`,
    successMessage: `Xóa sản phẩm ${name} khỏi yêu thích thành công`,
    onSuccess: onRemoveWishlistSuccess,
  });

  // const onRemoveWishlist = async () => {
  //   const key = `remove-wishlist-${id}`;
  //   try {
  //     message.loading({
  //       key,
  //       content: `Đang xóa sản phẩm ${name} khỏi yêu thích`,
  //       duration: 0,
  //     });
  //     await productService.removeWishlist(id);
  //     message.success({
  //       key,
  //       content: `Xóa sản phẩm ${name} khỏi yêu thích thành công`,
  //     });
  //     onRemoveWishlistSuccess?.();
  //   } catch (error) {
  //     handleError(error, key);
  //   }
  // };
  const onAddCartItem = () => {
    if (user) {
      const { listItems } = cart;
      const product = listItems.find((e) => e.productId === id);
      dispatch(
        updateCartItemAction({
          productId: id,
          quantity: product ? product.quantity + 1 : 1,
          showPopover: true,
        })
      );
    } else {
      navigate(PATH.Account);
    }
  };
  return (
    <div className="col-6 col-md-4">
      {/* Card */}
      <div className="product-card card mb-7">
        {/* Badge */}
        {discount_rate > 0 && (
          <div className="card-sale badge badge-dark card-badge card-badge-left text-uppercase">
            - {discount_rate}%
          </div>
        )}
        {/* Image */}
        <div className="card-img">
          {/* Image */}
          <Link className="card-img-hover" to={`/${slug}`}>
            <img className="card-img-top card-img-back" src={img1} alt="..." />
            <img className="card-img-top card-img-front" src={img2} alt="..." />
          </Link>
          {/* Actions */}
          <div className="card-actions">
            <span className="card-action"></span>
            <span className="card-action">
              <button
                onClick={onAddCartItem}
                className="btn btn-xs btn-circle btn-white-primary"
                data-toggle="button"
              >
                <i className="fe fe-shopping-cart" />
              </button>
            </span>
            {showWishlist && (
              <Popconfirm
                disabled={!!user}
                title="Thông báo"
                description="Vui lòng đăng nhập trước khi đưa sản phẩm vào yêu thích"
                onConfirm={() => navigate(PATH.Account)}
                okText="Đăng nhập"
                showCancel={false}
              >
                <span className="card-action">
                  <button
                    onClick={user ? onAddWishlist : undefined}
                    className="btn btn-xs btn-circle btn-white-primary"
                    data-toggle="button"
                  >
                    <i className="fe fe-heart" />
                  </button>
                </span>
              </Popconfirm>
            )}
            {showRemove && (
              <span className="card-action">
                <button
                  onClick={onRemoveWishlist}
                  className="btn btn-xs btn-circle btn-white-primary"
                  data-toggle="button"
                >
                  <i className="fe fe-x" />
                </button>
              </span>
            )}
          </div>
        </div>
        {/* Body */}
        <div className="card-body px-0">
          {/* Category */}
          <div className="card-product-category font-size-xs">
            {category && (
              <a className="text-muted" href="shop.html">
                {category.title}
              </a>
            )}
          </div>
          {/* Title */}
          <div className="card-product-title font-weight-bold">
            <a className="text-body card-product-name" href="product.html">
              {name}
            </a>
          </div>
          <div className="card-product-rating">
            {review_count > 0 && (
              <>
                {rating_average}
                <Rating value={rating_average} />({review_count} review)
              </>
            )}
          </div>

          {/* Price */}
          <div className="card-product-price">
            {real_price < price ? (
              <>
                <span className="text-primary sale">
                  {currency(real_price)}
                </span>
                <span className="font-size-xs text-gray-350 text-decoration-line-through ml-1">
                  {currency(price)}
                </span>
              </>
            ) : (
              <span className="text-xl flex h-full items-end">
                {currency(price)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const ProductCardLoading = () => {
  return (
    <div className="col-6 col-md-4">
      {/* Card */}
      <div className="product-card card mb-7">
        {/* Badge */}
        {/* Image */}
        <div className="card-img">
          {/* Image */}
          <a className="card-img-hover" href="product.html">
            <Skeleton height={300} />
          </a>
          {/* Actions */}
        </div>
        {/* Body */}
        <div className="card-body px-0">
          {/* Category */}
          <div className="card-product-category font-size-xs">
            <a className="text-muted" href="shop.html">
              <Skeleton width={150} height="100%" />
            </a>
          </div>
          {/* Title */}
          <div className="card-product-title font-weight-bold">
            <a className="text-body card-product-name" href="product.html">
              <Skeleton height="100%" />
            </a>
          </div>
          <div className="card-product-rating">
            <Skeleton width={150} height="100%" />
          </div>

          {/* Price */}
          <div className="card-product-price">
            <Skeleton width={100} height="100%" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const ListProductCard = withListLoading(ProductCard, ProductCardLoading);
