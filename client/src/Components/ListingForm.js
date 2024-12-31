import {
  Textarea,
  FormControl,
  FormLabel,
  Input,
  Spacer,
  Flex,
  Button,
  RadioGroup,
  Radio,
  Stack,
  Grid,
} from "@chakra-ui/react";
import { React, useRef, useState } from "react";

const ListingForm = () => {
  const form = useRef();
  const [hasWhitepaper, setHasWhitepaper] = useState("No");
  const [hasRoadmap, setHasRoadmap] = useState("No");
  const [contractAudited, setContractAudited] = useState("No");

  return (
    <Flex direction="column" w={{ base: "80%", md: "50%" }} m="auto" my={5}>
      <form ref={form}>
        {/* Grid for Name and Email */}
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
          {/* NAME */}
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="from_name"
              placeholder="Enter name"
              border="1px solid rgb(42, 35, 53)"
              _focus={{ border: " 1px solid #bf96fa" }}
              _hover={{ border: "1px solid rgb(42, 35, 53)" }}
            />
          </FormControl>

          {/* Email */}
          <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="to_email"
              placeholder="Enter email address"
              border="1px solid rgb(42, 35, 53)"
              _focus={{ border: "1px solid #bf96fa" }}
              _hover={{ border: "1px solid rgb(42, 35, 53)" }}
            />
          </FormControl>
        </Grid>
        <Spacer h="6" />

        {/* Project Name */}
        <FormControl id="project-name" isRequired>
          <FormLabel>Project Name</FormLabel>
          <Input
            type="text"
            name="project_name"
            placeholder="Project Name"
            border="1px solid rgb(42, 35, 53)"
            _focus={{ border: "1px solid #bf96fa" }}
            _hover={{ border: "1px solid rgb(42, 35, 53)" }}
          />
        </FormControl>
        <Spacer h="6" />

        {/* Grid for Website and Twitter */}
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
          <FormControl id="website" isRequired>
            <FormLabel>Website URL</FormLabel>
            <Input
              type="url"
              name="website"
              placeholder="Website URL"
              border="1px solid rgb(42, 35, 53)"
              _focus={{ border: "1px solid #bf96fa" }}
              _hover={{ border: "1px solid rgb(42, 35, 53)" }}
            />
          </FormControl>

          {/* Twitter */}
          <FormControl id="twitter" isRequired>
            <FormLabel>Twitter</FormLabel>
            <Input
              type="url"
              name="twitter"
              placeholder="Twitter"
              border="1px solid rgb(42, 35, 53)"
              _focus={{ border: "1px solid #bf96fa" }}
              _hover={{ border: "1px solid rgb(42, 35, 53)" }}
            />
          </FormControl>
        </Grid>
        <Spacer h="6" />

        {/* Grid for Telegram and Token Symbol */}
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
          {/* Telegram */}
          <FormControl id="telegram" isRequired>
            <FormLabel>Telegram</FormLabel>
            <Input
              type="url"
              name="telegram"
              placeholder="Telegram"
              border="1px solid rgb(42, 35, 53)"
              _focus={{ border: "1px solid #bf96fa" }}
              _hover={{ border: "1px solid rgb(42, 35, 53)" }}
            />
          </FormControl>

          {/* Token Symbol */}
          <FormControl id="token-symbol" isRequired>
            <FormLabel>Token Symbol</FormLabel>
            <Input
              type="text"
              name="token_symbol"
              placeholder="Token Symbol"
              border="1px solid rgb(42, 35, 53)"
              _focus={{ border: "1px solid #bf96fa" }}
              _hover={{ border: "1px solid rgb(42, 35, 53)" }}
            />
          </FormControl>
        </Grid>
        <Spacer h="6" />

        {/* Grid for Total Token Supply and Decimals */}
        <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
          {/* Total Token Supply */}
          <FormControl id="total-supply" isRequired>
            <FormLabel>Total Token Supply</FormLabel>
            <Input
              type="number"
              name="total_supply"
              placeholder="Total Token Supply"
              border="1px solid rgb(42, 35, 53)"
              _focus={{ border: "1px solid #bf96fa" }}
              _hover={{ border: "1px solid rgb(42, 35, 53)" }}
            />
          </FormControl>

          {/* Decimals */}
          <FormControl id="decimals" isRequired>
            <FormLabel>Decimals</FormLabel>
            <Input
              type="number"
              name="decimals"
              placeholder="Decimals"
              border="1px solid rgb(42, 35, 53)"
              _focus={{ border: "1px solid #bf96fa" }}
              _hover={{ border: "1px solid rgb(42, 35, 53)" }}
            />
          </FormControl>
        </Grid>
        <Spacer h="6" />

        {/* Token Distribution */}
        <FormControl id="distribution" isRequired>
          <FormLabel>
            How are tokens distributed (e.g., team allocation, community,
            marketing)?
          </FormLabel>
          <Textarea
            name="distribution"
            placeholder="Token distribution details"
            border="1px solid rgb(42, 35, 53)"
            _focus={{ border: "1px solid #bf96fa" }}
            _hover={{ border: "1px solid rgb(42, 35, 53)" }}
          />
        </FormControl>
        <Spacer h="6" />

        {/* DEX Listing */}
        <FormControl id="dex-listing">
          <FormLabel>
            Is your token listed on any decentralized exchanges (e.g., Raydium)?
            If so, please provide links.
          </FormLabel>
          <Textarea
            name="dex_listing"
            placeholder="DEX Listing details"
            border="1px solid rgb(42, 35, 53)"
            _focus={{ border: "1px solid #bf96fa" }}
            _hover={{ border: "1px solid rgb(42, 35, 53)" }}
          />
        </FormControl>
        <Spacer h="6" />

        {/* Whitepaper - Yes/No */}
        <FormControl id="whitepaper" isRequired>
          <FormLabel>Do you have a whitepaper?</FormLabel>
          <RadioGroup
            onChange={setHasWhitepaper}
            value={hasWhitepaper}
            name="whitepaper"
          >
            <Stack direction="row">
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <Spacer h="6" />

        {/* Whitepaper Link */}
        {hasWhitepaper === "Yes" && (
          <FormControl id="whitepaper-link" isRequired>
            <FormLabel>Whitepaper Link</FormLabel>
            <Input
              type="url"
              name="whitepaper_link"
              placeholder="Whitepaper Link"
              border="1px solid rgb(42, 35, 53)"
              _focus={{ border: "1px solid #bf96fa" }}
              _hover={{ border: "1px solid rgb(42, 35, 53)" }}
            />
          </FormControl>
        )}
        <Spacer h="6" />

        {/* Roadmap - Yes/No */}
        <FormControl id="roadmap" isRequired>
          <FormLabel>Do you have a roadmap?</FormLabel>
          <RadioGroup
            onChange={setHasRoadmap}
            value={hasRoadmap}
            name="roadmap"
          >
            <Stack direction="row">
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <Spacer h="6" />

        {/* Roadmap Link */}
        {hasRoadmap === "Yes" && (
          <FormControl id="roadmap-link" isRequired>
            <FormLabel>Roadmap Link</FormLabel>
            <Input
              type="url"
              name="roadmap_link"
              placeholder="Roadmap Link"
              border="1px solid rgb(42, 35, 53)"
              _focus={{ border: "1px solid #bf96fa" }}
              _hover={{ border: "1px solid rgb(42, 35, 53)" }}
            />
          </FormControl>
        )}
        <Spacer h="6" />

        {/* Smart Contract Audit */}
        <FormControl id="contract-audit" isRequired>
          <FormLabel>Has your smart contract been audited?</FormLabel>
          <RadioGroup
            onChange={setContractAudited}
            value={contractAudited}
            name="contract_audit"
          >
            <Stack direction="row">
              <Radio value="Yes">Yes</Radio>
              <Radio value="No">No</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <Spacer h="6" />

        {/* Security Measures */}
        <FormControl id="security-measures" isRequired>
          <FormLabel>
            What measures are in place to secure your project from potential
            risks (e.g., rug pulls, malicious actions)?
          </FormLabel>
          <Textarea
            name="security_measures"
            placeholder="Describe security measures"
            border="1px solid rgb(42, 35, 53)"
            _focus={{ border: "1px solid #bf96fa" }}
            _hover={{ border: "1px solid rgb(42, 35, 53)" }}
          />
        </FormControl>
        <Spacer h="6" />

        {/* Submit Button */}
        <Button
          type="submit"
          variant="solid"
          color="rgb(242, 240, 245)"
          border="1px solid rgb(140, 65, 245)"
          backgroundColor="rgb(59, 9, 128)"
          borderRadius="16px"
          boxShadow="rgba(111, 17, 242, 0.25) 0px 12px 16px 0px"
          opacity="1"
          fontSize="1.2rem"
          size={{ base: "md", md: "md", lg: "lg" }}
          w="full"
          _hover="none"
          _active="none"
        >
          SUBMIT
        </Button>
      </form>
    </Flex>
  );
};

export default ListingForm;
