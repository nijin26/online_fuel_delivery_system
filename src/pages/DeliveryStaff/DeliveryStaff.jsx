import React from "react";
import { Container, Paper, Text, Group } from "@mantine/core";

import { useStyles } from "../../styles/DeliveryStaff";

const DeliveryStaff = () => {
  const { classes } = useStyles();

  return (
    <Container size={"md"}>
      <Paper className={classes.container} radius="lg" p="xl" my="xl">
        <Text size="xl" weight={600} align="center" transform="uppercase">
          Delivery Staff
        </Text>
        <Group position="center" spacing="xl" my={"lg"}></Group>
      </Paper>
    </Container>
  );
};

export default DeliveryStaff;
