import { useState, useEffect } from "react";
import { Button, IconButton, Image } from "@chakra-ui/react";
import { FaAngleDoubleUp } from "react-icons/fa";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <>
      {isVisible && (
        <Button
          onClick={scrollToTop}
          position="fixed"
          bottom="30px"
          right="30px"
          zIndex="1000"
          variant="outline"
          size="lg"
          borderRadius="full"
          border=" 1px solid rgba(140, 65, 245, 1)"
          backgroundImage="url('../assets/top.png')"
          backgroundSize="28px 28px"
          backgroundRepeat="no-repeat"
          backgroundPosition="center"
          _hover={{ boxShadow: "0 0 21px 0 #4479e2" }}
          _active={{ bgColor: "none" }}
        ></Button>
      )}
    </>
  );
};

export default ScrollToTop;
