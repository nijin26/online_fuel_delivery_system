// Library Imports
import React, { useState, useEffect } from "react";
import { Burger, Drawer, Container, Paper, SimpleGrid, Text } from "@mantine/core";
import { useDispatch } from "react-redux";

// Local File Imports
import { toggleNavs } from "../../app/userSlice";
import { useStyles } from "../../styles/Admin";

const Admin = () => {
  const { classes } = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(toggleNavs(false));
  }, []);

  return (
    <Container fluid px={"0"}>
      <Paper shadow="xs" radius="0" p={"sm"} className={classes.Paper}>
        <Burger opened={open} onClick={() => setOpen((o) => !o)} size={30} className={classes.Burger} />
        <div className={classes.subContainer}>
          <SimpleGrid
            cols={3}
            spacing="lg"
            breakpoints={[
              { maxWidth: 980, cols: 3, spacing: "md" },
              { maxWidth: 600, cols: 1, spacing: "sm" },
            ]}
          >
            <StatsCard />
            <StatsCard />
            <StatsCard />
          </SimpleGrid>
        </div>
      </Paper>
      <Drawer size={"sm"} padding="sm" position="left" opened={open} onClose={() => setOpen((o) => !o)}>
        <h1>I am a drawer</h1>
      </Drawer>
    </Container>
  );
};

export default Admin;

const StatsCard = () => {
  const { classes } = useStyles();

  return (
    <Paper shadow={"xl"} className={classes.statsCard} p={"sm"}>
      <Text size="xl" weight={700} className={classes.count}>
        20
      </Text>
      <Text color="black">Total Number Of Customers</Text>
    </Paper>
  );
};
