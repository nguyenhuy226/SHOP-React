import { PATH } from "@/config";
import { avatarDefault } from "@/config/assets";
import { useAuth } from "@/hooks/useAuth";
import { logoutAction } from "@/stories/auth";
import { Dropdown } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import SearchDrawer from "../SearchDrawer";

export default function Header() {
  const [onpenSearchDrawer, setOpenSearchDrawer] = useState(false);
  const { user } = useAuth();
  const dispatch = useDispatch();
  return (
    <>
      <SearchDrawer
        open={onpenSearchDrawer}
        onClose={() => setOpenSearchDrawer(false)}
      />
      {/* NAVBAR */}
      <div className="navbar navbar-topbar navbar-expand-xl navbar-light bg-light">
        <div className="container">
          {/* Promo */}
          <div className="mr-xl-8">
            <i className="fe fe-truck mr-2" />{" "}
            <span className="heading-xxxs">Vận chuyển toàn cầu</span>
          </div>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#topbarCollapse"
            aria-controls="topbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Collapse */}
          <div className="navbar-collapse" id="topbarCollapse">
            {/* Nav */}
            <ul className="nav nav-divided navbar-nav mr-auto">
              <li className="nav-item dropdown">
                {/* Toggle */}
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                >
                  <img
                    className="mb-1 mr-1"
                    src="/img/flags/usa.svg"
                    alt="..."
                  />{" "}
                  United States
                </a>
                {/* Menu */}
                <div className="dropdown-menu minw-0">
                  <a className="dropdown-item" href="#!">
                    <img
                      className="mb-1 mr-2"
                      src="/img/flags/usa.svg"
                      alt="USA"
                    />
                    United States
                  </a>
                  <a className="dropdown-item" href="#!">
                    <img
                      className="mb-1 mr-2"
                      src="/img/flags/canada.svg"
                      alt="Canada"
                    />
                    Canada
                  </a>
                  <a className="dropdown-item" href="#!">
                    <img
                      className="mb-1 mr-2"
                      src="/img/flags/germany.svg"
                      alt="Germany"
                    />
                    Germany
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                {/* Toggle */}
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                >
                  USD
                </a>
                {/* Menu */}
                <div className="dropdown-menu minw-0">
                  <a className="dropdown-item" href="#!">
                    USD
                  </a>
                  <a className="dropdown-item" href="#!">
                    EUR
                  </a>
                </div>
              </li>
              <li className="nav-item dropdown">
                {/* Toggle */}
                <a
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  href="#"
                >
                  English
                </a>
                {/* Menu */}
                <div className="dropdown-menu minw-0">
                  <a className="dropdown-item" href="#">
                    English
                  </a>
                  <a className="dropdown-item" href="#">
                    Tiếng Việt
                  </a>
                  <a className="dropdown-item" href="#">
                    China
                  </a>
                </div>
              </li>
            </ul>
            {/* Nav */}
            <ul className="nav navbar-nav mr-8">
              <li className="nav-item">
                <a className="nav-link" href="./shipping-and-returns.html">
                  Quy định giao hàng
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="./faq.html">
                  Câu hỏi
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="./contact-us.html">
                  Liên hệ
                </a>
              </li>
            </ul>
            {/* Nav */}
            <ul className="nav navbar-nav flex-row">
              <li className="nav-item">
                <a className="nav-link text-gray-350" href="#!">
                  <i className="fab fa-facebook-f" />
                </a>
              </li>
              <li className="nav-item ml-xl-n4">
                <a className="nav-link text-gray-350" href="#!">
                  <i className="fab fa-twitter" />
                </a>
              </li>
              <li className="nav-item ml-xl-n4">
                <a className="nav-link text-gray-350" href="#!">
                  <i className="fab fa-instagram" />
                </a>
              </li>
              <li className="nav-item ml-xl-n4">
                <a className="nav-link text-gray-350" href="#!">
                  <i className="fab fa-medium" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* NAVBAR */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          {/* Brand */}
          <a className="navbar-brand" href="./index.html">
            <img style={{ width: 50 }} src="/img/logo.svg" />
            Shopper.
          </a>
          {/* Toggler */}
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Collapse */}
          <div className="navbar-collapse" id="navbarCollapse">
            {/* Nav */}
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" to={PATH.Home}>
                  Trang chủ
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={PATH.Product}>
                  Sản phẩm
                </Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link" href="./shop.html">
                  Laptop
                </a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link" href="./shop.html">
                  Máy tính
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="./shop.html">
                  Sản phẩm khuyến mãi
                </a>
              </li>
            </ul>
            {/* Nav */}
            <ul className="navbar-nav flex-row">
              <li className="nav-item">
                <a
                  className="nav-link"
                  data-toggle="modal"
                  href="#modalSearch"
                  onClick={(ev) => {
                    ev.preventDefault();
                    setOpenSearchDrawer(true);
                  }}
                >
                  <i className="fe fe-search" />
                </a>
              </li>
              <li className="nav-item ml-lg-n4">
                <a className="nav-link" href="./account-wishlist.html">
                  <i className="fe fe-heart" />
                </a>
              </li>
              <li className="nav-item ml-lg-n4">
                <a
                  className="nav-link"
                  data-toggle="modal"
                  href="#modalShoppingCart"
                >
                  <span data-cart-items={2}>
                    <i className="fe fe-shopping-cart" />
                  </span>
                </a>
              </li>
              {user ? (
                <Dropdown
                  arrow
                  placement="bottomRight"
                  menu={{
                    items: [
                      {
                        key: 1,
                        label: (
                          <Link to={PATH.Profile.Oder}>Đơn hàng của tôi</Link>
                        ),
                      },
                      {
                        key: 2,
                        label: (
                          <Link to={PATH.Profile.Index}>
                            Thông tin tài khoản
                          </Link>
                        ),
                      },
                      {
                        key: 3,
                        label: "Đăng xuất",
                        onClick: () => {
                          dispatch(logoutAction());
                        },
                      },
                    ],
                  }}
                >
                  <li className="nav-item ml-lg-n4">
                    <Link className="header-avatar nav-link" to={PATH.Account}>
                      <img src={user?.avatar || avatarDefault} />
                    </Link>
                  </li>
                </Dropdown>
              ) : (
                <li className="nav-item ml-lg-n4">
                  <Link className="nav-link" to={PATH.Account}>
                    <i className="fe fe-user" />
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
