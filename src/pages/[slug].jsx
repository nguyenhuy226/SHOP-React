import { Breadcrumb } from "@/components/Breadcrumb";
import { Button } from "@/components/Button";
import Field from "@/components/Field";
import Paginate from "@/components/Paginate";
import { Rating } from "@/components/Rating";
import { ListReview } from "@/components/ReviewItem";
import { ShortContent } from "@/components/ShortContent";
import { Tab } from "@/components/Tab";
import { PATH } from "@/config";
import { useAction } from "@/hooks/useAction";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import { useCategory } from "@/hooks/useCategories";
import { useForm } from "@/hooks/useForm";
import { useQuery } from "@/hooks/useQuery";
import { productService } from "@/services/product";
import { reviewService } from "@/services/review";
import { updateCartItemAction } from "@/stories/cart";
import { currency, handleError, required } from "@/utils";
import { message, Image } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function ProductDetailPage() {
  const [star, setStar] = useState(5);
  const { slug } = useParams();
  const [, id] = slug.split("-p");
  const navigate = useNavigate();
  const [openImageModal, setOpenImageModal] = useState(false);
  const [curentImage, setCurrentImage] = useState(0);
  const dispatch = useDispatch();
  const { cart, loading: productLoading } = useCart();
  const { user } = useAuth();
  const _addCartLoading = productLoading[id];
  const { state } = useLocation();

  const { reFetch: reviewAction, loading: reviewLoading } = useQuery({
    enable: false,
    queryFn: ({ params }) => reviewService.addReview(...params),
  });

  const reviewForm = useForm({
    content: [required()],
  });
  const { data: detail, loading } = useQuery({
    queryFn: () => productService.getProductDetail(id),
    enable: !!id,
    onError: () => {
      message.error("Sản phẩm không tồn tại");
      navigate(PATH.Product);
    },
  });

  const {
    data: reivews,
    loading: listReivewLoading,
    reFetch: reFetchReview,
  } = useQuery({
    queryFn: () => reviewService.getReview(id),
  });
  console.log(reivews);

  const category = useCategory(detail?.data?.categories);
  const onAddWishlist = useAction({
    service: () => productService.addWishlist(id),
    loadingMessage: `Đang thêm sản phẩm ${detail?.data?.name} vào yêu thích`,
    successMessage: `thêm sản phẩm ${detail?.data?.name} vào yêu thích thành công`,
  });
  if (loading) return null;
  const { data: product } = detail;
  const { listItems } = cart;

  const onActiveImageModalCurry = (i) => () => {
    setCurrentImage(i);
    setOpenImageModal(true);
  };

  const onAddCartItem = () => {
    if (user) {
      dispatch(
        updateCartItemAction({
          productId: product.id,
          quantity: listItems.find((e) => e.productId === product.id)
            ? listItems.find((e) => e.productId === product.id).quantity + 1
            : 1,
          showPopover: true,
        })
      );
    } else {
      navigate(PATH.Account);
    }
  };

  const onSubmitReview = async () => {
    try {
      if (reviewForm.validate()) {
        await reviewAction(product.id, {
          orderId: state.orderId,
          content: reviewForm.values.content,
          star: star,
        });
        message.success("Viết đánh giá sản phẩm thành công");
        navigate(window.location.pathname + window.location.search, {
          replace: true,
        }); // replace là không lưu lần chuyển trang này vào history
        reFetchReview();
      }
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <>
      <div>
        <nav className="py-5">
          <div className="container">
            <div className="row">
              <div className="col-12">
                {/* Breadcrumb */}
                <Breadcrumb>
                  <Breadcrumb.Item to={PATH.Home}>Home</Breadcrumb.Item>
                  <Breadcrumb.Item to={PATH.Product}>Sản phẩm</Breadcrumb.Item>
                  <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </div>
          </div>
        </nav>
        {/* PRODUCT */}
        <section>
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-12 col-md-6">
                    {/* Card */}
                    <div className="card">
                      {/* Badge */}
                      <div className="badge badge-primary card-badge text-uppercase">
                        Sale
                      </div>
                      {/* Slider */}
                      <div className="mb-4">
                        <img
                          onClick={onActiveImageModalCurry(0)}
                          src={product.images[0].thumbnail_url}
                          alt="..."
                          className="card-img-top cursor-pointer"
                        />
                      </div>
                      <div style={{ display: "none" }}>
                        <Image.PreviewGroup
                          preview={{
                            current: curentImage,
                            visible: openImageModal,
                            onVisibleChange: (vis) => setOpenImageModal(vis),
                            countRender: (current, total) =>
                              `${product.name} - ${current} / ${total}`,
                          }}
                        >
                          {product.images.map((e, i) => (
                            <Image key={i} src={e.thumbnail_url} />
                          ))}
                        </Image.PreviewGroup>
                      </div>
                    </div>
                    {/* Slider */}
                    <div className="flickity-nav mx-n2 mb-10 mb-md-0 flex">
                      {product.images.slice(0, 4).map((e, i) => (
                        <div
                          className="col-12 px-2 cursor-pointer"
                          style={{ maxWidth: 113 }}
                          key={e.thumbnail_url}
                          onClick={onActiveImageModalCurry(i)}
                        >
                          <div
                            className="embed-responsive embed-responsive-1by1 bg-cover"
                            style={{
                              backgroundImage: `url(${e.thumbnail_url})`,
                            }}
                          />
                        </div>
                      ))}
                      {product.images.length === 5 && (
                        <div
                          className="col-12 px-2 cursor-pointer"
                          style={{ maxWidth: 113 }}
                          onClick={onActiveImageModalCurry(5)}
                        >
                          <div
                            className="embed-responsive embed-responsive-1by1 bg-cover"
                            style={{
                              backgroundImage: `url(${product.images[5]?.thumbnail_url})`,
                            }}
                          />
                        </div>
                      )}
                      {product.images.length > 5 && (
                        <div
                          className="col-12 px-2 cursor-pointer"
                          style={{ maxWidth: 113 }}
                          onClick={onActiveImageModalCurry(5)}
                        >
                          <div
                            className="embed-responsive embed-responsive-1by1 text-center bg-cover flex items-center justify-center"
                            style={{
                              background: "#eee",
                            }}
                          >
                            + {product.images.length - 4} ảnh
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-12 col-md-6 pl-lg-10">
                    {/* Header */}
                    <div className="row mb-1">
                      <div className="col">
                        {/* Preheading */}
                        <a className="text-muted" href="shop.html">
                          {category?.title}
                        </a>
                      </div>
                      <div className="col-auto flex items-center">
                        {/* Rating */}
                        <Rating value={product.rating_average} />
                        <a
                          className="font-size-sm text-reset ml-2"
                          href="#reviews"
                        >
                          Reviews ({product.review_count})
                        </a>
                      </div>
                    </div>
                    {/* Heading */}
                    <h3 className="mb-2">{product.name}</h3>
                    {/* Price */}
                    <div className="mb-7">
                      {product.real_price < product.price ? (
                        <>
                          <span className="font-size-lg font-weight-bold text-gray-350 text-decoration-line-through">
                            {currency(product.real_price)}
                          </span>
                          <span className="ml-1 font-size-h5 font-weight-bolder text-primary">
                            {currency(product.price)}
                          </span>
                        </>
                      ) : (
                        <span className="ml-1 font-size-h5 font-weight-bolder text-primary">
                          {currency(product.price)}
                        </span>
                      )}
                      <span className="font-size-sm ml-1">(In Stock)</span>
                    </div>
                    {/* Form */}

                    <div className="form-row mb-7">
                      <p className="col-12">{product.short_description} </p>

                      <div className="col-12 col-lg">
                        {/* Submit */}
                        <Button
                          loading={_addCartLoading}
                          onClick={onAddCartItem}
                          className="col-12"
                        >
                          Add to Cart <i className="fe fe-shopping-cart ml-2" />
                        </Button>
                      </div>
                      <div className="col-12 col-lg-auto">
                        {/* Wishlist */}
                        <Button onClick={onAddWishlist} outline>
                          Wishlist <i className="fe fe-heart ml-2" />
                        </Button>
                      </div>
                    </div>
                    <p className="mb-0 flex gap-2">
                      <span className="mr-4">Share:</span>
                      <a
                        className="btn btn-xxs btn-circle btn-light font-size-xxxs text-gray-350"
                        href="#!"
                      >
                        <i className="fab fa-twitter" />
                      </a>
                      <a
                        className="btn btn-xxs btn-circle btn-light font-size-xxxs text-gray-350"
                        href="#!"
                      >
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a
                        className="btn btn-xxs btn-circle btn-light font-size-xxxs text-gray-350"
                        href="#!"
                      >
                        <i className="fab fa-pinterest-p" />
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* DESCRIPTION */}
        <section className="pt-11">
          <div className="container">
            <Tab defaultAcitve="description" removeOnDeActive>
              <div className="row">
                <div className="col-12">
                  {/* Nav */}
                  <div className="nav nav-tabs nav-overflow justify-content-start justify-content-md-center border-bottom">
                    <Tab.Title value="description">Description</Tab.Title>
                    <Tab.Title value="size">Size &amp; Fit</Tab.Title>
                    <Tab.Title value="shipping-return">
                      Shipping &amp; Return
                    </Tab.Title>
                  </div>
                  {/* Content */}
                  <div className="tab-content">
                    <Tab.Content value="description">
                      <ShortContent
                        className="py-10"
                        dangerouslySetInnerHTML={{
                          __html: product.description,
                        }}
                      />
                    </Tab.Content>
                    <Tab.Content value="size">
                      <div className="row justify-content-center py-9">
                        <div className="col-12">
                          <div className="row">
                            <div className="col-12 col-md-6">
                              {/* Text */}
                              <p className="mb-4">
                                <strong>Fitting information:</strong>
                              </p>
                              {/* List */}
                              <ul className="mb-md-0 text-gray-500">
                                <li>
                                  Upon seas hath every years have whose subdue
                                  creeping they're it were.
                                </li>
                                <li>Make great day bearing.</li>
                                <li>For the moveth is days don't said days.</li>
                              </ul>
                            </div>
                            <div className="col-12 col-md-6">
                              {/* Text */}
                              <p className="mb-4">
                                <strong>Model measurements:</strong>
                              </p>
                              {/* List */}
                              <ul className="list-unstyled text-gray-500">
                                <li>Height: 1.80 m</li>
                                <li>Bust/Chest: 89 cm</li>
                                <li>Hips: 91 cm</li>
                                <li>Waist: 65 cm</li>
                                <li>Model size: M</li>
                              </ul>
                              {/* Size */}
                              <p className="mb-0">
                                <img
                                  src="./img/icons/icon-ruler.svg"
                                  alt="..."
                                  className="img-fluid"
                                />
                                <a
                                  className="text-reset text-decoration-underline ml-3"
                                  data-toggle="modal"
                                  href="#modalSizeChart"
                                >
                                  Size chart
                                </a>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Tab.Content>
                    <Tab.Content value="shipping-return">
                      <div className="row justify-content-center py-9">
                        <div className="col-12">
                          {/* Table */}
                          <div className="table-responsive">
                            <table className="table table-bordered table-sm table-hover">
                              <thead>
                                <tr>
                                  <th>Shipping Options</th>
                                  <th>Delivery Time</th>
                                  <th>Price</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Standard Shipping</td>
                                  <td>Delivery in 5 - 7 working days</td>
                                  <td>$8.00</td>
                                </tr>
                                <tr>
                                  <td>Express Shipping</td>
                                  <td>Delivery in 3 - 5 working days</td>
                                  <td>$12.00</td>
                                </tr>
                                <tr>
                                  <td>1 - 2 day Shipping</td>
                                  <td>Delivery in 1 - 2 working days</td>
                                  <td>$12.00</td>
                                </tr>
                                <tr>
                                  <td>Free Shipping</td>
                                  <td>
                                    Living won't the He one every subdue meat
                                    replenish face was you morning firmament
                                    darkness.
                                  </td>
                                  <td>$0.00</td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          {/* Caption */}
                          <p className="mb-0 text-gray-500">
                            May, life blessed night so creature likeness their,
                            for.{" "}
                            <a
                              className="text-body text-decoration-underline"
                              href="#!"
                            >
                              Find out more
                            </a>
                          </p>
                        </div>
                      </div>
                    </Tab.Content>
                  </div>
                </div>
              </div>
            </Tab>
          </div>
        </section>
        {/* REVIEWS */}
        <section className="pt-9 pb-11" id="reviews">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h4 className="mb-10 text-center">Customer Reviews</h4>
                {state?.orderId && (
                  <div className="mb-10">
                    {/* Divider */}
                    <hr className="my-8" />
                    {/* Form */}

                    <div className="row">
                      <div className="col-12 mb-6 text-center">
                        {/* Text */}
                        <p className="mb-1 font-size-xs">Score:</p>
                        {/* Rating form */}
                        <div className="rating-form">
                          {/* Input */}
                          {/* Rating */}
                          <div
                            className="rating h5 text-dark"
                            data-value={star}
                          >
                            <div className="rating-item cursor-pointer">
                              <i
                                className="fas fa-star"
                                onClick={() => setStar(1)}
                              />
                            </div>
                            <div className="rating-item cursor-pointer">
                              <i
                                className="fas fa-star"
                                onClick={() => setStar(2)}
                              />
                            </div>
                            <div className="rating-item cursor-pointer">
                              <i
                                className="fas fa-star"
                                onClick={() => setStar(3)}
                              />
                            </div>
                            <div className="rating-item cursor-pointer">
                              <i
                                className="fas fa-star"
                                onClick={() => setStar(4)}
                              />
                            </div>
                            <div className="rating-item cursor-pointer">
                              <i
                                className="fas fa-star"
                                onClick={() => setStar(5)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        {/* Name */}
                        <div className="form-group">
                          <Field
                            {...reviewForm.register("content")}
                            label="Review:"
                            renderField={(props) => (
                              <textarea
                                {...props}
                                onChange={(ev) =>
                                  props?.onChange(ev.target.value)
                                }
                                className="form-control form-control-sm"
                                rows={5}
                                placeholder="Review *"
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="col-12 text-center flex justify-center">
                        {/* Button */}
                        <Button
                          loading={reviewLoading}
                          outline
                          onClick={onSubmitReview}
                        >
                          Post Review
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Header */}
                <div className="row align-items-center">
                  {/* <div className="col-12 col-md-auto">
                    <div className="dropdown mb-4 mb-md-0">
                      <a
                        className="dropdown-toggle text-reset"
                        data-toggle="dropdown"
                        href="#"
                      >
                        <strong>Sort by: Newest</strong>
                      </a>

                      <div className="dropdown-menu mt-3">
                        <a className="dropdown-item" href="#!">
                          Newest
                        </a>
                        <a className="dropdown-item" href="#!">
                          Oldest
                        </a>
                      </div>
                    </div>
                  </div> */}
                  <div className="col-12 col-md text-md-right">
                    {/* Rating */}
                    {/* <div
                      className="rating text-dark h6 mb-4 mb-md-0"
                      data-value={4}
                    >
                      <div className="rating-item">
                        <i className="fas fa-star" />
                      </div>
                      <div className="rating-item">
                        <i className="fas fa-star" />
                      </div>
                      <div className="rating-item">
                        <i className="fas fa-star" />
                      </div>
                      <div className="rating-item">
                        <i className="fas fa-star" />
                      </div>
                      <div className="rating-item">
                        <i className="fas fa-star" />
                      </div>
                    </div> */}
                    {/* Count */}
                    <strong className="font-size-sm ml-2">
                      Reviews ({reivews?.paginate?.count})
                    </strong>
                  </div>
                </div>
                {/* Reviews */}
                <div className="mt-8">
                  <ListReview
                    loading={listReivewLoading}
                    data={reivews?.data}
                    loadingCount={5}
                  />
                </div>
                <Paginate totalPage={reivews?.paginate?.totalPage} />
              </div>
            </div>
          </div>
        </section>
        {/* FEATURES */}
        <section className="bg-light py-9">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-6 col-lg-3">
                {/* Item */}
                <div className="d-flex mb-6 mb-lg-0">
                  {/* Icon */}
                  <i className="fe fe-truck font-size-lg text-primary" />
                  {/* Body */}
                  <div className="ml-6">
                    {/* Heading */}
                    <h6 className="heading-xxs mb-1">Free shipping</h6>
                    {/* Text */}
                    <p className="mb-0 font-size-sm text-muted">
                      From all orders over $100
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                {/* Item */}
                <div className="d-flex mb-6 mb-lg-0">
                  {/* Icon */}
                  <i className="fe fe-repeat font-size-lg text-primary" />
                  {/* Body */}
                  <div className="ml-6">
                    {/* Heading */}
                    <h6 className="mb-1 heading-xxs">Free returns</h6>
                    {/* Text */}
                    <p className="mb-0 font-size-sm text-muted">
                      Return money within 30 days
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                {/* Item */}
                <div className="d-flex mb-6 mb-md-0">
                  {/* Icon */}
                  <i className="fe fe-lock font-size-lg text-primary" />
                  {/* Body */}
                  <div className="ml-6">
                    {/* Heading */}
                    <h6 className="mb-1 heading-xxs">Secure shopping</h6>
                    {/* Text */}
                    <p className="mb-0 font-size-sm text-muted">
                      You're in safe hands
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-3">
                {/* Item */}
                <div className="d-flex">
                  {/* Icon */}
                  <i className="fe fe-tag font-size-lg text-primary" />
                  {/* Body */}
                  <div className="ml-6">
                    {/* Heading */}
                    <h6 className="mb-1 heading-xxs">Over 10,000 Styles</h6>
                    {/* Text */}
                    <p className="mb-0 font-size-sm text-muted">
                      We have everything you need
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
