import React, { useState, useEffect } from "react";
import { Container, Paper, Text, Group, Button, NumberInput, SimpleGrid, Badge, Stack } from "@mantine/core";
// import { GoogleMap, LoadScript } from "@react-google-maps/api";
import Map from "../../components/Map";

import { useStyles } from "../../styles/Customer";

const Customer = () => {
  const { classes } = useStyles();
  const [fuel, setFuel] = useState("petrol");
  const [quantity, setQuantity] = useState(3);
  const [selectedQuantity, setSelectedQuantity] = useState(3);
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [childClicked, setChildClicked] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const quantityList = [3, 5, 8, 10];

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
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.754795644414!2d76.69351641460398!3d8.994696192002317!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06090686f77575%3A0x46abecda8aa0155d!2sThangal%20Kunju%20Musaliar%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1657652641806!5m2!1sen!2sin"
            height={250}
            style={{ border: 0 }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          <Button>Order Now</Button>
        </Stack>
      </Paper>
    </Container>
  );
};

export default Customer;

// <Map setChildClicked={setChildClicked} coords={coords} setBounds={setBounds} setCoords={setCoords} />
