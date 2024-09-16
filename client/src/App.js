import { Flex } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import Wheel from "./Screens/Wheel";
import ProfileScreen from "./Screens/ProfileScreen";

const App = () => {
  return (
    <BrowserRouter>
      <Flex direction="column" as="main">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/wheel" element={<Wheel />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Routes>
      </Flex>
    </BrowserRouter>
  );
};

export default App;
