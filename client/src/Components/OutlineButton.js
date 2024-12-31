import { Button, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const OutlineButton = ({ title, src }) => {
  return (
    <>
      <Link
        as={RouterLink}
        to={src}
        onClick={() => {
          window.scrollTo({ top: "0", behavior: "auto" });
        }}
      >
        <Button
          variant="solid"
          // border=" 1px solid rgb(42, 35, 53)"
          border=" 1px solid rgba(140, 65, 245, 0.8)"
          backgroundColor="rgba(0, 0, 0, 0)"
          borderRadius="16px"
          opacity="1"
          color="#f2f0f5"
          transition="ease"
          _hover={{ boxShadow: "0 0 21px 0  rgba(255, 255, 255, 0.5)" }}
          _active="none"
          fontSize="1.2rem"
          size={{ base: "md", md: "md", lg: "lg" }}
          w="fit-content"
          my={5}
          boxShadow="inset -3px -3px 9px rgba(255, 255, 255, 0.25), inset 0px 3px 9px rgba(255, 255, 255, 0.3), inset 0px 1px 1px rgba(255, 255, 255, 0.6), inset 0px -8px 36px rgba(0, 0, 0, 0.3), inset 0px 1px 5px rgba(255, 255, 255, 0.6), 2px 19px 31px rgba(0, 0, 0, 0.2);"
        >
          {title}
        </Button>
      </Link>
    </>
  );
};

export default OutlineButton;
