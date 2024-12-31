import { Flex } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import Wheel from "./Screens/Wheel";
import ProfileScreen from "./Screens/ProfileScreen";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ContactScreen from "./Screens/ContactScreen";
import RoadMap from "./Screens/RoadMap";
import Tokenomics from "./Screens/Tokenomics";
import AutoBurn from "./Screens/AutoBurn";
import FaqScreen from "./Screens/FaqScreen";
import StakingScreen from "./Screens/StakingScreen";
import RewardsScreen from "./Screens/RewardsScreen";
import RulesScreen from "./Screens/RulesScreen";
import ListingScreen from "./Screens/ListingScreen";
import ScrollToTop from "./Components/ScrollToTop";
import UtilityScreen from "./Screens/UtilityScreen";
import ListingFormScreem from "./Screens/ListingFormScreem";
import HowToPlayScreen from "./Screens/HowToPlayScreen";
import ErrorScreen from "./Screens/ErrorScreen";

const AppContent = () => {
  const location = useLocation();

  // Define routes where the header should not be displayed
  const hideHeaderRoutes = ["/wheel"];

  // Define routes where pt=32 should not be applied
  const noPaddingRoutes = ["/wheel"];

  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Flex
        direction="column"
        as="main"
        pt={noPaddingRoutes.includes(location.pathname) ? 0 : 32} // Dynamic padding
      >
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/wheel" element={<Wheel />} />
          <Route path="/contact" element={<ContactScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/roadmap" element={<RoadMap />} />
          <Route path="/tokenomics" element={<Tokenomics />} />
          <Route path="/auto-burn" element={<AutoBurn />} />
          <Route path="/faqs" element={<FaqScreen />} />
          <Route path="/staking" element={<StakingScreen />} />
          <Route path="/rewards" element={<RewardsScreen />} />
          <Route path="/rules" element={<RulesScreen />} />
          <Route path="/listing" element={<ListingScreen />} />
          <Route path="/utility" element={<UtilityScreen />} />
          <Route path="/listing-form" element={<ListingFormScreem />} />
          <Route path="/how-to-play" element={<HowToPlayScreen />} />
          <Route path="*" element={<ErrorScreen />} />
        </Routes>
        <ScrollToTop />
      </Flex>
      <Footer />
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
