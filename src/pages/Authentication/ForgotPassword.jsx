import React from "react";
import { Paper, Title, Text, TextInput, Button, Container, Group, Anchor, Center, Box } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { ArrowLeft } from "tabler-icons-react";
import { Link } from "react-router-dom";

import { useStyles } from "../../styles/ForgotPassword";

import { auth, sendPasswordResetEmail } from "../../utils/firebaseConfig";

const ForgotPassword = () => {
  const { classes } = useStyles();

  const [email, setEmail] = React.useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
      .then(() => showNotification({ title: "Password reset mail sent Successfull !", message: "Please check your inbox !" }))
      .catch((error) => showNotification({ color: "red", title: "Error sending password reset mail", message: "Please try again" }));
  };

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} align="center">
        Forgot your password?
      </Title>
      <Text color="dimmed" size="sm" align="center">
        Enter your email to get a reset link
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput label="Your email" placeholder="hello@gmail.com" required value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
        <Group position="apart" mt="lg" className={classes.controls}>
          <Link to="/auth">
            <Anchor color="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <ArrowLeft size={12} />
                <Box ml={5}>Back to login page</Box>
              </Center>
            </Anchor>
          </Link>

          <Button type="submit" className={classes.control} onClick={submitHandler}>
            Reset password
          </Button>
        </Group>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
