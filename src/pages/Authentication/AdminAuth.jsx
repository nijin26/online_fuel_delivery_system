import React from "react";
import { useForm } from "@mantine/hooks";
import { Container, TextInput, PasswordInput, Text, Paper, Group, Stack, Button, Divider, Anchor } from "@mantine/core";
import { GoogleButton } from "../../images/GoogleIcon";
import { Link } from "react-router-dom";

const Authentication = (props) => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 6,
    },
  });

  return (
    <Container size="sm" mt={30}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="xl" align="center" weight={700} transform="uppercase">
          Admin Authentication
        </Text>

        <Divider my="xl" />

        <Text size="lg" weight={500}>
          Welcome back to Your Online Fuel Delivery App, Login with
        </Text>
        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(() => {})}>
          <Group direction="column" grow>
            <TextInput required label="Email" placeholder="hello@gmail.com" value={form.values.email} onChange={(event) => form.setFieldValue("email", event.currentTarget.value)} error={form.errors.email && "Invalid email"} />
            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
              error={form.errors.password && "Password should include at least 6 characters"}
            />
          </Group>

          <Group position="apart" mt="xl">
            <Stack spacing="xs">
              <Link to="/forgotpassword">
                <Anchor component="button" type="button" color="gray" size="xs">
                  Forgot Password ?
                </Anchor>
              </Link>
            </Stack>

            <Button type="submit">Login</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default Authentication;
