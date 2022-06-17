import React from "react";
import { Container, MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";

//components
import Home from "./pages/Home";
import HomeHeader from "./components/HomeHeader";
import UserAuth from "./pages/Authentication/UserAuth";
import VendorAuth from "./pages/Authentication/VendorAuth";
import AdminAuth from "./pages/Authentication/AdminAuth";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import ContactUs from "./pages/ContactUs";
import Footer from "./components/Footer";
import Admin from "./pages/Admin/Admin";
import InvalidURL from "./pages/InvalidURL";

function App() {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "dark",
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value) => setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  const myTheme = {
    colorScheme: colorScheme,
    primaryColor: "green",
  };

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={myTheme}>
        <Container fluid maxWidth={false} style={{ padding: 0 }}>
          <HomeHeader links={headerLinks} />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/adminauth" element={<AdminAuth />} />
            <Route exact path="/userauth" element={<UserAuth />} />
            <Route exact path="/vendorauth" element={<VendorAuth />} />
            <Route exact path="/forgotpassword" element={<ForgotPassword />} />
            <Route exact path="/contactus" element={<ContactUs />} />
            <Route exact path="/admin" element={<Admin />} />
            <Route exact path="*" element={<InvalidURL />} />
          </Routes>
          <Footer links={footerLinks} />
        </Container>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;

const headerLinks = [
  { label: "Home", link: "/" },
  { label: "Features", link: "/features" },
  { label: "About", link: "/about" },
  { label: "Contact Us", link: "/contactus" },
  { label: "User Login", link: "/userauth" },
  { label: "Vendor Login", link: "/vendorauth" },
];

const footerLinks = [
  {
    link: "#",
    label: "Contact",
  },
  {
    link: "#",
    label: "Privacy",
  },
  {
    link: "#",
    label: "Blog",
  },
  {
    link: "#",
    label: "Store",
  },
  {
    link: "#",
    label: "Careers",
  },
];
