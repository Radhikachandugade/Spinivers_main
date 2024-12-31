import React from "react";
import ListingForm from "../Components/ListingForm";
import { Stack } from "@chakra-ui/react";
import RichText from "../Components/RichText";

const ListingFormScreem = () => {
  return (
    <>
      {/* Contact */}
      <Stack>
        <RichText
          title="LISTING"
          heading="List your Meme Coin"
          description="Please reach out to us with any inquiries using the form below"
        />
        <ListingForm />
      </Stack>
    </>
  );
};

export default ListingFormScreem;
