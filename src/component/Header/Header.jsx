import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./header.css";
import { Button } from "antd";
const Navbar = () => {
  const nav = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const [navScroll, setNav] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setNav(window.scrollY >= 200);
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // services mobile
  const [isOpenService, setIsOpenService] = useState(false);
  const handleService = () => {
    setIsOpenService(!isOpenService);
  };

  return (
    <header
      className={`${
        navScroll
          ? "fixed top-0 w-full z-50 bg-[#F1F5F9] p-2 transition-colors duration-500 ease"
          : "bg-[#f0f6fb] p-3"
      }`}>
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <img
            src=".src/assets/favicon-32x32.png"
            alt=""
            width={60}
            height={60}
            onClick={() => nav("/")}
            className="max-[1200px]:hidden"
          />
        </div>
        <div className="md:hidden">
          <button
            className={`${
              navScroll
                ? "text-black focus:outline-none"
                : "text-black focus:outline-none"
            }`}
            onClick={toggleMenu}>
            <svg
              className="h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              {isOpen ? (
                ""
              ) : (
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M4 6a1 1 0 0 1 1-1h14a1 1 0 0 1 0 2H5a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 0 2H5a1 1 0 0 1-1-1zm0 5a1 1 0 0 1 1-1h14a1 1 0 0 1 0 2H5a1 1 0 0 1-1-1z"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
      <div className={`md:hidden ${isOpen ? "" : "hidden"}`}>
        <div
          className="fixed inset-0 z-50 bg-black opacity-70"
          onClick={toggleMenu}></div>
        <div className="fixed inset-y-0 right-0 z-50 w-64 bg-white">
          <ul className="py-4 text-center font-Lexend-title">
            <li className="mb-2 p-4">
              <a href="/">Trang Chủ</a>
            </li>
            <li className="mb-2 p-4">
              <p
                className="flex justify-center items-center cursor-pointer ml-3"
                onClick={handleService}>
                Dịch Vụ
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1"
                  viewBox="0 0 24 24"
                  width="18"
                  height="18"
                  fill="currentColor">
                  <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                </svg>
              </p>
              {isOpenService ? (
                <ul className="p-2 mt-4 text-center font-Lexend-content">
                  <li className="mb-2 p-2">
                    <Link to={"/to-chuc-su-kien"}>Tổ Chức Sự Kiện</Link>
                  </li>
                  <li className="mb-2 p-2">
                    <Link to={"/thiet-ke-website"}>Thiết Kế Website</Link>
                  </li>
                  <li className="mb-2 p-2">
                    <Link to={"/in-an"}>In Ấn - Quảng Cáo</Link>
                  </li>
                  <li className="pt-2">
                    <Link to={"/dao-tao-nghe-thuat"}>Đào Tạo Nghệ Thuật</Link>
                  </li>
                </ul>
              ) : (
                ""
              )}
            </li>
            <li className="mb-2 p-4">
              <a href="/all-news">Tin Tức</a>
            </li>
            <li className="mb-2 p-4">
              <a href="/tuyen-dung">Tuyển Dụng</a>
            </li>
            <li className="mb-2 p-4">
              <a href="/contact-us">Liên Hệ</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
