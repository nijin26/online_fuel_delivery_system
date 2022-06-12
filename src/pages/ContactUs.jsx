import React from "react";
import { Container, Paper, Text, TextInput, Textarea, Button, Group, SimpleGrid, createStyles } from "@mantine/core";
import { ContactIconsList } from "../components/ContactIconsList";

import { useStyles } from "../styles/ContactUs";

const ContactUs = () => {
  const { classes } = useStyles();

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

          <form className={classes.form} onSubmit={(event) => event.preventDefault()}>
            <Text size="lg" weight={700} className={classes.title}>
              Get in touch
            </Text>

            <div className={classes.fields}>
              <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
                <TextInput label="Your name" placeholder="Your name" />
                <TextInput label="Your email" placeholder="hello@fueldev" required />
              </SimpleGrid>

              <TextInput mt="md" label="Subject" placeholder="Subject" required />

              <Textarea mt="md" label="Your message" placeholder="Please include all relevant information" minRows={3} />

              <Group position="right" mt="md">
                <Button type="submit" className={classes.control}>
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
