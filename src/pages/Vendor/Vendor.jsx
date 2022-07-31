import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { upperFirst } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import { Table, Button, Burger, Drawer, Container, Paper, SimpleGrid, Text, NavLink, useMantineColorScheme, SegmentedControl, Group, Center, Box } from "@mantine/core";
import { Moon, SunHigh, Logout, CurrencyRupee, Message, TruckDelivery, LayoutDashboard } from "tabler-icons-react";

import { selectUser, toggleNavs, logout } from "../../app/userSlice";
import { auth, db, collection, addDoc, getDocs } from "../../utils/firebaseConfig";
import { useStyles } from "../../styles/Vendor";

const Vendor = () => {
  const user = useSelector(selectUser);

  const [open, setOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(0);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [myOrder, setMyOrders] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { classes } = useStyles();

  useEffect(() => {
    dispatch(toggleNavs(false));
  }, []);

  useEffect(() => {
    console.log("Useeffect is calling");
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "orders"));
      const orderDetails = [];
      snapshot.forEach((doc) => {
        orderDetails.push(doc.data());
      });
      setMyOrders(orderDetails);
    };
    fetchData();
  }, [selectedMenu]);

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

  let rows = myOrder?.map(({ fuel, quantity, userId, totalAmount, orderPlacedAt, fuelStationName, fuelStationSelected, orderPlacedBy }) => {
    if (user.uid === fuelStationSelected) {
      return (
        <tr key={orderPlacedAt}>
          <td>{new Intl.DateTimeFormat("en-IN", { year: "numeric", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(orderPlacedAt)}</td>
          <td>{orderPlacedBy}</td>
          <td>{fuelStationName}</td>
          <td>{quantity} L</td>
          <td>{upperFirst(fuel)}</td>
          <td>Rs. {totalAmount}</td>
        </tr>
      );
    }
  });

  return (
    <Container fluid px="0">
      <Paper shadow="xs" radius="0" p={"sm"} className={classes.Paper}>
        <Burger opened={open} onClick={() => setOpen((o) => !o)} size={30} className={classes.Burger} />
        <div className={classes.subContainer}>
          {selectedMenu === 0 && (
            <div>
              <Text size={"xl"} align="center" weight={700} my={"xl"}>
                List Of Orders
              </Text>{" "}
              <Table horizontalSpacing="sm" verticalSpacing="sm" fontSize="md" highlightOnHover>
                <thead>
                  <tr>
                    <th>Order Placed At</th>
                    <th>Order Placed By</th>
                    <th>Fuel Station</th>
                    <th>Quantity</th>
                    <th>Fuel Type</th>
                    <th>Total Amount</th>
                  </tr>
                </thead>
                <tbody>{rows}</tbody>
              </Table>
            </div>
          )}
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
  { icon: TruckDelivery, label: "Orders" },
  { icon: CurrencyRupee, label: "Payment History" },
  { icon: Message, label: "Feedbacks" },
];
