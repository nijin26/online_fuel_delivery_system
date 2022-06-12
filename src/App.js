import React from "react";
import { Container, MantineProvider } from "@mantine/core";
import { Routes, Route } from "react-router-dom";

//components
import Home from "./pages/Home";
import HomeHeader from "./components/HomeHeader";
import Authentication from "./pages/Authentication/Authentication";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import ContactUs from "./pages/ContactUs";
import Footer from "./components/Footer";

const myTheme = {
  colorScheme: "dark",
  primaryColor: "green",
};

function App() {
  return (
    <MantineProvider theme={myTheme}>
      <Container fluid maxWidth={false} style={{ padding: 0 }}>
        <HomeHeader links={headerLinks} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/auth" element={<Authentication />} />
          <Route exact path="/forgotpassword" element={<ForgotPassword />} />
          <Route exact path="/contactus" element={<ContactUs />} />
        </Routes>
        <Footer links={footerLinks} />
      </Container>
    </MantineProvider>
  );
}

export default App;

const headerLinks = [
  { label: "Home", link: "/" },
  { label: "Features", link: "/features" },
  { label: "About", link: "/about" },
  { label: "Contact Us", link: "/contactus" },
  { label: "Login", link: "/auth" },
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
