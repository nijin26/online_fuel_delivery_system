import React from "react";
import { Container, Paper, Text, Group } from "@mantine/core";

import { useStyles } from "../../styles/Customer";

const Customer = () => {
  const { classes } = useStyles();

  return (
    <Container size={"md"}>
      <Paper className={classes.container} radius="lg" p="xl" my="xl">
        <Text size="xl" weight={600} align="center" transform="uppercase">
          Order Fuel
        </Text>
        <Group position="center" spacing="xl" my={"lg"}>
          <div>Diesel</div>
          <div>Petrol</div>
        </Group>
      </Paper>
    </Container>
  );
};

export default Customer;
