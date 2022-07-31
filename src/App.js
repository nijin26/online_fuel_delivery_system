import React, { useEffect } from "react";
import { Container, MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { NotificationsProvider, showNotification } from "@mantine/notifications";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useHotkeys, useLocalStorage } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser, showNav } from "./app/userSlice";
import { auth, onAuthStateChanged } from "./utils/firebaseConfig";

//components
import Home from "./pages/Home";
import HomeHeader from "./components/HomeHeader";
import Auth from "./pages/Authentication/Auth";
import UserAuth from "./pages/Authentication/UserAuth";
import VendorAuth from "./pages/Authentication/VendorAuth";
import AdminAuth from "./pages/Authentication/AdminAuth";
import DeliveryStaffAuth from "./pages/Authentication/DeliveryStaffAuth";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import ContactUs from "./pages/ContactUs";
import AboutUs from "./pages/AboutUs";
import Footer from "./components/Footer";
import Admin from "./pages/Admin/Admin";
import Customer from "./pages/Customer/Customer";
import DeliveryStaff from "./pages/DeliveryStaff/DeliveryStaff";
import Vendor from "./pages/Vendor/Vendor";
import InvalidURL from "./pages/InvalidURL";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  const user = useSelector(selectUser);
  const showNavigation = useSelector(showNav);
  const navigate = useNavigate();
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
    const views = localStorage.getItem("views");
    localStorage.setItem("views", parseInt(views) + 1);
  }, []);

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

  const handleLogout = () => {
    showNotification({ title: "You have Logout Successfully" });
    auth.signOut();
    dispatch(logout());
    navigate("/auth", { replace: true });
  };

  // useEffect(() => {
  //   const fetchViews = async () => {
  //     let data;
  //     const docref = ref(rtdb, "totalviews/");
  //     onValue(docref, async (snapshot) => {
  //       data = await snapshot.val()?.count;
  //     });
  //     setTotalViews(data);
  //     console.log(data);
  //   };
  //   fetchViews();
  //   console.log("fetchViews is called");
  // }, []);

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={myTheme}>
        <NotificationsProvider position="top-right" autoClose={4000}>
          <Container fluid style={{ padding: 0 }}>
            {showNavigation && <HomeHeader links={headerLinks} handleLogout={handleLogout} isLoggedIn={user} />}
            <Routes>
              <Route element={<PrivateRoute />}>
                <Route path="/admin" element={<Admin />} />
                <Route path="/customer" element={<Customer />} />
                <Route path="/vendor" element={<Vendor />} />
                <Route path="/deliverystaff" element={<DeliveryStaff />} />
              </Route>

              <Route exact path="/" element={<Home />} />
              <Route exact path="/auth" element={<Auth />} />
              <Route exact path="/adminauth" element={<AdminAuth />} />
              <Route exact path="/userauth" element={<UserAuth />} />
              <Route exact path="/vendorauth" element={<VendorAuth />} />
              <Route exact path="/deliverystaffauth" element={<DeliveryStaffAuth />} />
              <Route exact path="/forgotpassword" element={<ForgotPassword />} />
              <Route exact path="/contactus" element={<ContactUs />} />
              <Route exact path="/about" element={<AboutUs />} />
              <Route exact path="/admin" element={<Admin />} />
              <Route exact path="*" element={<InvalidURL />} />
            </Routes>
            {showNavigation && <Footer links={footerLinks} />}
          </Container>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}

export default App;

const headerLinks = [
  { label: "Home", link: "/" },
  // { label: "Features", link: "/features" },
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
