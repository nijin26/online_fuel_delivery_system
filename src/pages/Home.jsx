import React, { useEffect } from "react";
import { Container, Title, Text, Button } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Link } from "react-router-dom";

import { db, addDoc, collection, rtdb } from "../utils/firebaseConfig";
import { onValue, ref, update } from "firebase/database";

import { useStyles } from "../styles/Home";

import { EmailBanner } from "../components/EmailBanner";

const Home = ({ totalViews }) => {
  const { classes } = useStyles();

  const newsLetterHandler = async (email) => {
    try {
      if (/^\S+@\S+$/.test(email)) {
        await addDoc(collection(db, "newsletter"), {
          email,
          time: Date.now(),
        });
        showNotification({ title: "Thank You!", message: "You have successfully subscribed to our newsletter." });
      } else showNotification({ color: "red", title: "Enter a valid email address" });
    } catch (e) {
      showNotification({ color: "red", title: "Error in subscribing for newsletter", message: "Try Again." });
    }
  };

  // useEffect(() => {
  //   const updateViews = async () => {
  //     await update(ref(rtdb, "totalviews"), {
  //       count: totalViews && totalViews + 1,
  //     });
  //     console.log("Update Views is called");
  //   };
  //   updateViews();
  // }, [totalViews]);

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
