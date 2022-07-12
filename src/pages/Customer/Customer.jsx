import React from "react";
import { Container, Paper, Text, Group } from "@mantine/core";

import { useStyles } from "../../styles/Customer";

const Customer = () => {
  const { classes } = useStyles();
  const [fuel, setFuel] = React.useState("petrol");

  return (
    <Container size={"md"}>
      <Paper className={classes.container} radius="lg" p="xl" my="xl">
        <Text size="xl" weight={600} align="center" transform="uppercase">
          Order Fuel
        </Text>
        <Group position="center" spacing="xl" my={"lg"} className={classes.group}>
          <div onClick={() => setFuel("petrol")} className={fuel === "petrol" && classes.active}>
            Petrol
          </div>
          <div onClick={() => setFuel("diesel")} className={fuel === "diesel" && classes.active}>
            Diesel
          </div>
        </Group>
        <Group></Group>
      </Paper>
    </Container>
  );
};

export default Customer;
