import React, { useState, useEffect } from "react";
import { Container, Paper, Text, Group, NumberInput, SimpleGrid, Badge, Stack } from "@mantine/core";
// import { GoogleMap, LoadScript } from "@react-google-maps/api";

import { useStyles } from "../../styles/Customer";

const Customer = () => {
  const { classes } = useStyles();
  const [fuel, setFuel] = useState("petrol");
  const [quantity, setQuantity] = useState(3);
  const [selectedQuantity, setSelectedQuantity] = useState(3);
  const [center, setCenter] = useState({ lat: 8.4998965, lng: 76.8541261 });

  const quantityList = [3, 5, 8, 10];

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });

  //     // console.log("Latitude is :",position.coords.latitude );
  //     // console.log("Longitude is :", position.coords.longitude);
  //   });
  // }, []);

  return (
    <Container size={"md"}>
      <Paper className={classes.container} radius="lg" p="xl" my="xl">
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
          </SimpleGrid>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Customer;
