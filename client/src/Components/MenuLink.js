import { Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const MenuLink = ({ url, label }) => {
  return (
    <Link
      as={RouterLink}
      to={url}
      _hover={{ textDecoration: "none" }}
      onClick={() => {
        window.scrollTo({ top: "0", behavior: "auto" });
      }}
    >
      {label}
    </Link>
  );
};

export default MenuLink;
