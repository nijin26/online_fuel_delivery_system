import React from "react";
import { Container, Paper, Text, TextInput, Textarea, Button, Group, SimpleGrid } from "@mantine/core";
import { ContactIconsList } from "../components/ContactIconsList";
import { showNotification } from "@mantine/notifications";
import { Messages, MessagesOff } from "tabler-icons-react";
import { useForm } from "@mantine/form";

import { useStyles } from "../styles/ContactUs";

// Firebase
import { db } from "../utils/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

const ContactUs = () => {
  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      subject: (val) => val.length > 2,
      message: (val) => val.length > 2,
    },
  });

  const { classes } = useStyles();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (form.validate()) {
        await addDoc(collection(db, "contacts"), {
          ...form.values,
        });
        form.reset();
        showNotification({
          title: "Your message sent successfuly",
          message: "Thank you for writing to us. We got your request and within 2 business days, we will get in touch. ",
          autoClose: 6000,
          color: "green",
          icon: <Messages size={54} strokeWidth={1.5} color={"white"} />,
        });
      }
    } catch (e) {
      showNotification({
        title: "There is an error in sending your message",
        message: "Please try again.",
        autoClose: 6000,
        color: "red",
        icon: <MessagesOff size={54} strokeWidth={1.5} color={"#bf4940"} />,
      });
    }
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
                <TextInput label="Your name" placeholder="Your name" value={form.values.name} onChange={(e) => form.setFieldValue("name", e.currentTarget.value)} />

                <TextInput label="Your email" placeholder="hello@fueldev" required value={form.values.email} onChange={(e) => form.setFieldValue("email", e.target.value)} error={form.errors.email && "Invalid email"} />
              </SimpleGrid>

              <TextInput mt="md" label="Subject" placeholder="Subject" required value={form.values.subject} onChange={(e) => form.setFieldValue("subject", e.target.value)} error={form.errors.subject && "You must enter a Subject"} />

              <Textarea
                mt="md"
                required
                label="Your message"
                placeholder="Please include all relevant information"
                minRows={3}
                value={form.values.message}
                onChange={(e) => form.setFieldValue("message", e.target.value)}
                error={form.errors.message && "You must add some message."}
              />

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
