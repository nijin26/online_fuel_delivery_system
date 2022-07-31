// Library Imports
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Burger, Drawer, Container, Paper, SimpleGrid, Text, NavLink } from "@mantine/core";
import { LayoutDashboard, News, Message } from "tabler-icons-react";

// Local File Imports
import { toggleNavs } from "../../app/userSlice";
import { useStyles } from "../../styles/Admin";
import { getDocs, collection, db } from "../../utils/firebaseConfig";

const Admin = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [counts, setCounts] = useState({ customers: 0, vendors: 0, deliverystaffs: 0 });
  const [selectedMenu, setSelectedMenu] = useState("");

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

  const menuItems = menuData.map((item, index) => <NavLink key={item.label} active={index === selectedMenu} label={item.label} icon={<item.icon size={16} stroke={1.5} color="white" />} onClick={() => setSelectedMenu(index)} />);

  return (
    <Container fluid px={"0"}>
      <Paper shadow="xs" radius="0" p={"sm"} className={classes.Paper}>
        <Burger opened={open} onClick={() => setOpen((o) => !o)} size={30} className={classes.Burger} />
        <div className={classes.subContainer}>
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
          </div>
        </div>
      </Paper>
      <Drawer size={"sm"} padding="sm" position="left" opened={open} onClose={() => setOpen((o) => !o)}>
        {menuItems}
      </Drawer>
    </Container>
  );
};

export default Admin;

const menuData = [
  { icon: LayoutDashboard, label: "Dashboard" },
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
