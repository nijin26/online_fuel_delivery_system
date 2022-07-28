// Library Imports
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { RingProgress, Burger, Drawer, Container, Paper, SimpleGrid, Text, NavLink, useMantineColorScheme, SegmentedControl, Group, Center, Box } from "@mantine/core";
import { LayoutDashboard, News, Message, SunHigh, Moon, ArrowUpRight, TruckDelivery, GasStation, Users } from "tabler-icons-react";

// Local File Imports
import { toggleNavs } from "../../app/userSlice";
import { useStyles } from "../../styles/Admin";
import { getDocs, collection, db } from "../../utils/firebaseConfig";

// Component Imports
import CustomerList from "./CustomerList";
import Contacts from "./Contacts";
import Newsletter from "./Newsletter";

const Admin = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dispatch = useDispatch();
  const { classes } = useStyles();
  const [open, setOpen] = useState(false);
  const [counts, setCounts] = useState({ customers: 0, vendors: 0, deliverystaffs: 0 });
  const [selectedMenu, setSelectedMenu] = useState(0);

  useEffect(async () => {
    dispatch(toggleNavs(false));
    const customersSnapshot = await getDocs(collection(db, "customers"));
    const vendorsSnapshot = await getDocs(collection(db, "vendors"));
    const deliveryStaffSnapshot = await getDocs(collection(db, "deliverystaff"));
    setCounts({
      customers: customersSnapshot.size,
      vendors: vendorsSnapshot.size,
      deliverystaffs: deliveryStaffSnapshot.size,
    });
  }, []);

  // useEffect(() => {
  // async function fetchViews() {
  //   const docref = ref(rtdb, "totalviews/");
  //   let data;
  //   onValue(docref, async (snapshot) => {
  //     data = snapshot.val().count;
  //   });
  //   console.log(data);
  //   return data;
  // }
  // const count = await fetchViews();
  // console.log("fetchViews is called", count);
  // }, []);

  console.log(localStorage.getItem("views"));

  const menuItems = menuData.map((item, index) => {
    return <NavLink my={"lg"} key={item.label} active={index === selectedMenu} label={item.label} icon={<item.icon size={28} stroke={2} fill={colorScheme === "dark" ? "white" : "black"} />} onClick={() => setSelectedMenu(index)} />;
  });

  const data = [
    { label: "Total Website Visits", progress: 40, color: "green", stats: localStorage.getItem("views") },
    { label: "Total Users", progress: 50, color: "blue", stats: counts.customers + counts.deliverystaffs + counts.vendors },
    { label: "Total Orders", progress: 30, color: "pink", stats: 10 },
  ];

  const stats = data.map((stat) => {
    return (
      <Paper withBorder radius="md" p="xs" key={stat.label}>
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: stat.progress, color: stat.color }]}
            label={
              <Center>
                <ArrowUpRight size={32} stroke={0.2} fill={colorScheme === "dark" ? "white" : "black"} />
              </Center>
            }
          />

          <div>
            <Text color="dimmed" size="xs" transform="uppercase" weight={700}>
              {stat.label}
            </Text>
            <Text weight={700} size="xl">
              {stat.stats}
            </Text>
          </div>
        </Group>
      </Paper>
    );
  });

  return (
    <Container fluid px={"0"}>
      <Paper shadow="xs" radius="0" p={"sm"} className={classes.Paper}>
        <Burger opened={open} onClick={() => setOpen((o) => !o)} size={30} className={classes.Burger} />
        <div className={classes.subContainer}>
          {selectedMenu === 0 && (
            <div id="dashboard">
              <SimpleGrid
                cols={3}
                spacing="lg"
                breakpoints={[
                  { maxWidth: 980, cols: 3, spacing: "md" },
                  { maxWidth: 600, cols: 1, spacing: "sm" },
                ]}
              >
                <StatsCard count={counts.customers} type="Customers" />
                <StatsCard count={counts.vendors} type="Vendors" />
                <StatsCard count={counts.deliverystaffs} type="Delivery Staffs" />
              </SimpleGrid>
              <SimpleGrid cols={3} breakpoints={[{ maxWidth: "sm", cols: 1 }]} my="xl">
                {stats}
              </SimpleGrid>
            </div>
          )}
          {selectedMenu === 1 && <CustomerList />}
          {selectedMenu === 4 && <Contacts />}
          {selectedMenu === 5 && <Newsletter />}
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
      </Drawer>
    </Container>
  );
};

export default Admin;

const menuData = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: Users, label: "Customers" },
  { icon: GasStation, label: "Vendors" },
  { icon: TruckDelivery, label: "Delivery Staffs" },
  { icon: News, label: "Newsletter Subscribers" },
  { icon: Message, label: "Contacts" },
];

const StatsCard = ({ count, type }) => {
  const { classes } = useStyles();

  return (
    <Paper shadow={"xl"} className={classes.statsCard} p={"sm"}>
      <Text size="xl" weight={700} className={classes.count}>
        {count}
      </Text>
      <Text color="black">Total Number Of {type}</Text>
    </Paper>
  );
};
