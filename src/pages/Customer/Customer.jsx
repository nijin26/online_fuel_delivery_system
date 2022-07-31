import React, { useState, useEffect } from "react";
import { Table } from "@mantine/core";
import { upperFirst } from "@mantine/hooks";
import { Center, Select, SegmentedControl, Box, Burger, Drawer, useMantineColorScheme, NavLink, Container, Paper, Text, Group, Button, NumberInput, SimpleGrid, Badge, Stack } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import { useSelector, useDispatch } from "react-redux";
import { Logout, LayoutDashboard, TruckDelivery, SunHigh, Moon, CurrencyRupee, Message } from "tabler-icons-react";
import Map from "../../components/Map";
import { auth, db, collection, addDoc, getDocs } from "../../utils/firebaseConfig";

import { selectUser, toggleNavs, logout } from "../../app/userSlice";

import { useStyles } from "../../styles/Customer";

const Customer = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const [fuel, setFuel] = useState("petrol");
  const [value, setValue] = useState("");

  const [quantity, setQuantity] = useState(3);
  const [open, setOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [myOrder, setMyOrders] = useState([]);
  const [vendors, setVendors] = useState([]);

  const [selectedQuantity, setSelectedQuantity] = useState(3);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "vendors"));
      const vendorsDetails = [];
      snapshot.forEach((doc) => {
        vendorsDetails.push({ value: `${doc.data().uid}`, label: doc.data().fuelStationsName });
      });
      setVendors(vendorsDetails);
    };
    fetchData();
  }, []);

  useEffect(() => {
    dispatch(toggleNavs(false));
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

  let rows = myOrder?.map(({ fuel, quantity, userId, totalAmount, fuelStationName, orderPlacedAt }) => {
    if (userId === user.uid) {
      return (
        <tr key={userId}>
          <td>{new Intl.DateTimeFormat("en-IN", { year: "numeric", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).format(orderPlacedAt)}</td>
          <td>{fuelStationName}</td>
          <td>{quantity} L</td>
          <td>{upperFirst(fuel)}</td>
          <td>Rs. {totalAmount}</td>
        </tr>
      );
    }
  });

  useEffect(() => {
    let fuelPrice;
    let deliveryCharge;
    if (fuel === "petrol") {
      fuelPrice = 107.21;
    } else {
      fuelPrice = 96.05;
    }

    if (quantity > 3) {
      deliveryCharge = 20;
    } else {
      deliveryCharge = 40;
    }
    const total = quantity * fuelPrice + deliveryCharge;
    setTotalAmount(total);
  }, [quantity, fuel]);

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(({ cords }) => {
  //     setCoords({ lat: cords.latitude, lng: cords.longitude });
  //   });
  // }, []);

  // const onLoad = (autoC) => setAutocomplete(autoC);

  // const onPlaceChanged = () => {
  //   const lat = autocomplete.getPlace().geometry.location.lat();
  //   const lng = autocomplete.getPlace().geometry.location.lng();

  //   setCoords({ lat, lng });
  // };

  const orderHandler = async () => {
    let fuelStationName;
    vendors?.map((vendor) => {
      if (vendor.value === value) {
        fuelStationName = vendor.label;
      }
    });
    const data = {
      orderPlacedAt: Date.now(),
      orderPlacedBy: user.displayName,
      userId: user.uid,
      quantity,
      fuel,
      totalAmount,
      fuelStationSelected: value,
      fuelStationName,
    };
    console.log(data);
    try {
      await addDoc(collection(db, "orders"), data);
      showNotification({ color: "green", title: "Order place Successfull !", message: `Payement of Rs. ${totalAmount} is Successfull !` });
      setSelectedMenu(1);
    } catch (e) {
      showNotification({ color: "red", title: "Error! Placing order !", message: `Payement of Rs. ${totalAmount} is Declined. Try Again` });
      console.error("Error Placing Order: ", e);
    }
  };

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

  const quantityList = [3, 5, 8, 10];

  return (
    <Container fluid m={"0"} p="0">
      <Paper className={classes.container} radius="xs" p="xl">
        <Burger opened={open} onClick={() => setOpen((o) => !o)} size={30} className={classes.Burger} />
        {selectedMenu === 0 && (
          <div>
            <Text size="xl" weight={600} align="center" transform="uppercase">
              Order Fuel
            </Text>
            <Group position="center" spacing="xl" my={"lg"} className={classes.group}>
              <div onClick={() => setFuel("petrol")} className={fuel === "petrol" && classes.active}>
                <Text size="xl" weight={600} align="center" transform="uppercase">
                  Petrol
                </Text>
              </div>
              <div onClick={() => setFuel("diesel")} className={fuel === "diesel" && classes.active}>
                <Text size="xl" weight={600} align="center" transform="uppercase">
                  Diesel
                </Text>
              </div>
            </Group>

            <Stack className={classes.fuelquantity}>
              <NumberInput value={quantity} onChange={(val) => setQuantity(val)} placeholder="Enter the required quantity of fuel." label="Fuel Quantity" description="You can order from 3 to 10 Litres" required min={3} max={10} precision={2} />
              <SimpleGrid cols={4} style={{ marginTop: "20px 0" }}>
                {quantityList.map((quantity) => (
                  <Badge
                    color={selectedQuantity === quantity ? "green" : "gray"}
                    size="xl"
                    radius="md"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      setSelectedQuantity(quantity);
                      setQuantity(quantity);
                    }}
                  >
                    {quantity}L
                  </Badge>
                ))}
                <Center>
                  <Select width={"90%"} label="Select Nearby Fuel Stations" placeholder="Pick a Fuel Station" value={value} onChange={setValue} searchable required data={vendors} />
                </Center>
              </SimpleGrid>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.754795644414!2d76.69351641460398!3d8.994696192002317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06090686f77575%3A0x46abecda8aa0155d!2sThangal%20Kunju%20Musaliar%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1657652641806!5m2!1sen!2sin"
                height={250}
                style={{ border: 0 }}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
              <Stack>
                <Text size={"lg"} weight="500" align="center">
                  Payment Amount: ({quantity} x {fuel === "petrol" ? "107.21" : "96.05"}) + {quantity > 3 ? 20 : 40} (Delivery Charge)
                </Text>
                <Text transform="uppercase" size={"xl"} align="center">
                  Total: ₹ {totalAmount}
                </Text>
              </Stack>
              <Button onClick={orderHandler}>Order Now</Button>
            </Stack>
          </div>
        )}

        {selectedMenu === 1 && (
          <Table horizontalSpacing="sm" verticalSpacing="sm" fontSize="md" highlightOnHover>
            <thead>
              <tr>
                <th>Order Placed At</th>
                <th>Selected Fuel Station</th>
                <th>Quantity</th>
                <th>Fuel Type</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        )}

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
      </Paper>
    </Container>
  );
};

export default Customer;

// <Map setChildClicked={setChildClicked} coords={coords} setBounds={setBounds} setCoords={setCoords} />

const menuData = [
  { icon: LayoutDashboard, label: "Order Fuel" },
  { icon: TruckDelivery, label: "My Orders" },
  { icon: CurrencyRupee, label: "Payment History" },
  { icon: Message, label: "Feedbacks" },
];
