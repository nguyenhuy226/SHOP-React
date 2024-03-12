export const slugify = (str) => {
  // chuyển hết sang chữ thường
  str = str.toLowerCase();

  // xóa dấu
  str = str
    .normalize("NFD") // chuyển chuỗi sang inucode tổ hợp
    .replace(/[\u0300-\u036f]/g, ""); // xóa các ký tự dấu sau khi tách tổ hợp

  // thay ký tự dĐ
  str = str.replace(/[đĐ]/g, "d");

  // xóa ký tự đặc biệt
  str = str.replace(/([^0-9a-z-\s])/g, "");

  //xóa khoảng trắng thay bằng ký tự -
  str = str.replace(/(\s+)/g, "-");

  //xóa ký tự - liên tiếp
  str = str.replace(/-+/g, "-");

  // xóa phần dư - ở đầu & cuối
  str = str.replace(/^-+|-+$/g, "");

  //return
  return str;
};
