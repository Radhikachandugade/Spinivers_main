import React from "react";
import RichText from "../Components/RichText";
import ContactForm from "../Components/ContactForm";
import { Stack } from "@chakra-ui/react";

const ContactScreen = () => {
  return (
    <>
      {/* Contact */}
      <Stack>
        <RichText
          title="CONTACT"
          heading="Get in Touch"
          description="Please reach out to us with any inquiries using the form below"
        />
        <ContactForm />
      </Stack>
    </>
  );
};

export default ContactScreen;
