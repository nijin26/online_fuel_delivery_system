import React from "react";
import { useForm, useToggle, upperFirst } from "@mantine/hooks";
import { Container, TextInput, PasswordInput, Text, Paper, Group, Stack, Button, Divider, Checkbox, Anchor } from "@mantine/core";
import { GoogleButton } from "../../images/GoogleIcon";
import { Link } from "react-router-dom";

const Authentication = (props) => {
  const [type, toggle] = useToggle("login", ["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 6,
    },
  });

  return (
    <Container size="sm" mt={30}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="lg" weight={500}>
          Welcome to Online Fuel Delivery, {type} with
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(() => {})}>
          <Group direction="column" grow>
            {type === "register" && <TextInput label="Name" placeholder="Your name" value={form.values.name} onChange={(event) => form.setFieldValue("name", event.currentTarget.value)} />}

            <TextInput required label="Email" placeholder="hello@gmail.com" value={form.values.email} onChange={(event) => form.setFieldValue("email", event.currentTarget.value)} error={form.errors.email && "Invalid email"} />

            <PasswordInput
              required
              label="Password"
              placeholder="Your password"
              value={form.values.password}
              onChange={(event) => form.setFieldValue("password", event.currentTarget.value)}
              error={form.errors.password && "Password should include at least 6 characters"}
            />

            {type === "register" && <Checkbox label="I accept terms and conditions" checked={form.values.terms} onChange={(event) => form.setFieldValue("terms", event.currentTarget.checked)} />}
          </Group>

          <Group position="apart" mt="xl">
            <Stack spacing="xs">
              <Anchor component="button" type="button" color="gray" onClick={() => toggle()} size="xs">
                {type === "register" ? "Already have an account? Login" : "Don't have an account? Register"}
              </Anchor>
              {type === "login" && (
                <Link to="/forgotpassword">
                  <Anchor component="button" type="button" color="gray" size="xs">
                    Forgot Password ?
                  </Anchor>
                </Link>
              )}
            </Stack>

            <Button type="submit">{upperFirst(type)}</Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default Authentication;
