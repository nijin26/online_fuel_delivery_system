import React from "react";
import { Container, Title, Text, Button } from "@mantine/core";

import { useStyles } from "../styles/Home";

const Home = () => {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <Container size="md">
        <div className={classes.inner}>
          <div className={classes.content}>
            <Title className={classes.title}>
              A{" "}
              <Text component="span" inherit variant="gradient" gradient={{ from: "green", to: "lightgreen" }}>
                fully featured
              </Text>{" "}
              Online Fuel Delivery App
            </Title>

            <Text className={classes.description} mt={30}>
              Order fuel at any time, anywhere and get delivered on your location
            </Text>

            <Button variant="gradient" gradient={{ from: "darkgreen", to: "green" }} size="xl" className={classes.control} mt={40}>
              Get started
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Home;
