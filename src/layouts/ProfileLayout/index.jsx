import { NavLink, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAction } from "@/stories/auth";
import { PATH } from "@/config";
export default function ProfileLayout() {
  const dispatch = useDispatch();
  return (
    <section className="pt-7 pb-12">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            {/* Heading */}
            <h3 className="mb-10" id="profile-title"></h3>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-3">
            {/* Nav */}
            <nav className="mb-10 mb-md-0">
              <div className="list-group list-group-sm list-group-strong list-group-flush-x">
                <NavLink
                  className="list-group-item list-group-item-action dropright-toggle "
                  to="account-orders.html"
                >
                  Theo dõi đơn hàng
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action dropright-toggle "
                  to={PATH.Profile.Index}
                  end
                >
                  Thông tin cá nhân
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action dropright-toggle"
                  to={PATH.Profile.Wishlist}
                >
                  Sản phẩm yêu thích
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action dropright-toggle "
                  to={PATH.Profile.Address}
                >
                  Sổ địa chỉ
                </NavLink>
                <NavLink
                  className="list-group-item list-group-item-action dropright-toggle "
                  to={PATH.Profile.Payment}
                >
                  Sổ thanh toán
                </NavLink>
                <a
                  className="list-group-item list-group-item-action dropright-toggle"
                  href="#!"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(logoutAction());
                  }}
                >
                  Đăng xuất
                </a>
              </div>
            </nav>
          </div>
          <div className="col-12 col-md-9 col-lg-8 offset-lg-1">
            {/* Form */}
            <Outlet />
          </div>
        </div>
      </div>
    </section>
  );
}
