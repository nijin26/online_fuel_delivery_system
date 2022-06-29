import React, { useEffect } from "react";
import { Container, MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { Routes, Route } from "react-router-dom";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./app/userSlice";
import { auth, onAuthStateChanged } from "./utils/firebaseConfig";

//components
import Home from "./pages/Home";
import HomeHeader from "./components/HomeHeader";
import Auth from "./pages/Authentication/Auth";
import UserAuth from "./pages/Authentication/UserAuth";
import VendorAuth from "./pages/Authentication/VendorAuth";
import AdminAuth from "./pages/Authentication/AdminAuth";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import ContactUs from "./pages/ContactUs";
import Footer from "./components/Footer";
import Admin from "./pages/Admin/Admin";
import InvalidURL from "./pages/InvalidURL";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

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

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // user is logged in, send the user's details to redux, store the current user in the state
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={myTheme}>
        <NotificationsProvider position="top-right" autoClose={4000}>
          <Container fluid maxWidth={false} style={{ padding: 0 }}>
            <HomeHeader links={headerLinks} />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route exact path="/auth" element={<Auth />} />
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
        </NotificationsProvider>
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
