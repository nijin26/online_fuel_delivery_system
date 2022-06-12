import React from "react";
import { Paper, Title, Text, TextInput, Button, Container, Group, Anchor, Center, Box } from "@mantine/core";
import { ArrowLeft } from "tabler-icons-react";
import { Link } from "react-router-dom";

import { useStyles } from "../../styles/ForgotPassword";

const ForgotPassword = () => {
  const { classes } = useStyles();

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} align="center">
        Forgot your password?
      </Title>
      <Text color="dimmed" size="sm" align="center">
        Enter your email to get a reset link
      </Text>

      <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
        <TextInput label="Your email" placeholder="hello@gmail.com" required />
        <Group position="apart" mt="lg" className={classes.controls}>
          <Link to="/auth">
            <Anchor color="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <ArrowLeft size={12} />
                <Box ml={5}>Back to login page</Box>
              </Center>
            </Anchor>
          </Link>

          <Button className={classes.control}>Reset password</Button>
        </Group>
      </Paper>
    </Container>
  );
};

export default ForgotPassword;
