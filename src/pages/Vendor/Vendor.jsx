import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import { Button, Burger, Drawer, Container, Paper, SimpleGrid, Text, NavLink, useMantineColorScheme, SegmentedControl, Group, Center, Box } from "@mantine/core";
import { Moon, SunHigh, Logout, CurrencyRupee, Message, TruckDelivery, LayoutDashboard } from "tabler-icons-react";

import { toggleNavs, logout } from "../../app/userSlice";
import { auth, getDocs, collection, db } from "../../utils/firebaseConfig";
import { useStyles } from "../../styles/Vendor";

const Vendor = () => {
  const [open, setOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(0);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { classes } = useStyles();

  useEffect(() => {
    dispatch(toggleNavs(false));
  }, []);

  const handleLogout = () => {
    showNotification({ title: "You have Logout Successfully" });
    auth.signOut();
    dispatch(logout());
    dispatch(toggleNavs(true));
    navigate("/auth", { replace: true });
  };

  const menuItems = menuData.map((item, index) => {
    return <NavLink my={"lg"} key={item.label} active={index === selectedMenu} label={item.label} icon={<item.icon size={28} stroke={2} fill={colorScheme === "dark" ? "white" : "black"} />} onClick={() => setSelectedMenu(index)} />;
  });

  return (
    <Container fluid px="0">
      <Paper shadow="xs" radius="0" p={"sm"} className={classes.Paper}>
        <Burger opened={open} onClick={() => setOpen((o) => !o)} size={30} className={classes.Burger} />
        <div className={classes.subContainer}>
          <h1>Vendor Page</h1>
        </div>
      </Paper>
      <Drawer size={"sm"} padding="sm" position="left" opened={open} onClose={() => setOpen((o) => !o)}>
        {menuItems}
        <Group position="center" my="xl">
          <SegmentedControl
            value={colorScheme}
            onChange={(value) => toggleColorScheme(value)}
            data={[
              {
                value: "light",
                label: (
                  <Center>
                    <SunHigh size={32} strokeWidth={2} fill={colorScheme === "dark" ? "white" : "black"} />
                    <Box ml={10}>Light</Box>
                  </Center>
                ),
              },
              {
                value: "dark",
                label: (
                  <Center>
                    <Moon size={32} stroke={2} fill={colorScheme === "dark" ? "white" : "black"} />
                    <Box ml={10}>Dark</Box>
                  </Center>
                ),
              },
            ]}
          />
        </Group>
        <Button onClick={handleLogout} fullWidth variant="outline" leftIcon={<Logout size={14} />}>
          Logout
        </Button>
      </Drawer>
    </Container>
  );
};

export default Vendor;

const menuData = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: TruckDelivery, label: "Orders" },
  { icon: CurrencyRupee, label: "Payment History" },
  { icon: Message, label: "Feedbacks" },
];
