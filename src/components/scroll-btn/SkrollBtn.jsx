import React, { useState } from "react";
import { ArrowUpOutlined } from "@ant-design/icons";
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <button
      className={`mb-4  pl-6 fixed bottom-6 right-2 w-14 h-14  cursor-pointer ${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-opacity hover:bg-gray-300/25`}
      onClick={handleScrollToTop}
    >
      <ArrowUpOutlined style={{ fontSize: "26px" }} />
    </button>
  );
}

export default ScrollToTopButton;
