import React, { useState } from "react";
import { Container, Paper, Text, TextInput, Textarea, Button, Group, SimpleGrid, createStyles } from "@mantine/core";
import { ContactIconsList } from "../components/ContactIconsList";

import { useStyles } from "../styles/ContactUs";

import { db } from "../utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const { classes } = useStyles();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "contacts"), {
        name,
        email,
        subject,
        message,
      });
      clearState();
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
      clearState();
    }
  };

  const clearState = () => {
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <Container mt={30}>
      <Paper shadow="md" radius="lg">
        <div className={classes.wrapper}>
          <div className={classes.contacts}>
            <Text size="lg" weight={700} className={classes.title} sx={{ color: "#fff" }}>
              Contact information
            </Text>

            <ContactIconsList variant="white" />
          </div>

          <form className={classes.form} onSubmit={submitHandler}>
            <Text size="lg" weight={700} className={classes.title}>
              Get in touch
            </Text>

            <div className={classes.fields}>
              <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
                <TextInput label="Your name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} />
                <TextInput label="Your email" placeholder="hello@fueldev" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </SimpleGrid>

              <TextInput mt="md" label="Subject" placeholder="Subject" required value={subject} onChange={(e) => setSubject(e.target.value)} />

              <Textarea mt="md" label="Your message" placeholder="Please include all relevant information" minRows={3} value={message} onChange={(e) => setMessage(e.target.value)} />

              <Group position="right" mt="md">
                <Button type="submit" className={classes.control} onClick={submitHandler}>
                  Send message
                </Button>
              </Group>
            </div>
          </form>
        </div>
      </Paper>
    </Container>
  );
};

export default ContactUs;
