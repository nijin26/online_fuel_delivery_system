import React from "react";
import { Container, Title, Text, Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Link } from "react-router-dom";

import { db, addDoc, collection } from "../utils/firebaseConfig";

import { useStyles } from "../styles/Home";

import { EmailBanner } from "../components/EmailBanner";

const Home = () => {
  const { classes } = useStyles();

  const newsLetterHandler = async (mail) => {
    try {
      if (/^\S+@\S+$/.test(mail)) {
        await addDoc(collection(db, "newsletter"), {
          mail,
        });
        showNotification({ title: "Thank You!", message: "You have successfully subscribed to our newsletter." });
      } else showNotification({ color: "red", title: "Enter a valid email address" });
    } catch (e) {
      showNotification({ color: "red", title: "Error in subscribing for newsletter", message: "Try Again." });
    }
  };

  return (
    <>
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

              <Link to="/auth">
                <Button variant="gradient" gradient={{ from: "darkgreen", to: "green" }} size="xl" className={classes.control} mt={40}>
                  Get started
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
      <Container mt={30}>
        <EmailBanner submitHandler={newsLetterHandler} />
      </Container>
    </>
  );
};

export default Home;
