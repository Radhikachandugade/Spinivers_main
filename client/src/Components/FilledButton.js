import { Button, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const FilledButton = ({ title, src }) => {
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
          color="rgb(242, 240, 245)"
          border=" 1px solid rgb(140, 65, 245)"
          backgroundColor="rgb(59, 9, 128)"
          borderRadius="16px"
          boxShadow="rgba(140, 65, 245, 0.4) 0px 2px 4px, rgba(140, 65, 245, 0.3) 0px 7px 13px -3px, rgba(140, 65, 245, 0.2) 0px -3px 0px inset;"
          opacity="1"
          _hover={{ boxShadow: "0 0 21px 0 #4479e2", bgColor: "transparent" }}
          _active="none"
          fontSize="1.2rem"
          size={{ base: "md", md: "md", lg: "lg" }}
          w="fit-content"
          my={5}
        >
          {title}
        </Button>
      </Link>
    </>
  );
};

export default FilledButton;
