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
      mobileno: "",
      name: "",
      fuelStationsName: "",
      city: "",
      state: "",
      password: "",
      terms: false,
    },

    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 6,
      mobileno: (val) => val.length == 10,
    },
  });

  return (
    <Container size="sm" mt={30}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="xl" align="center" weight={700} transform="uppercase">
          Fuel Station/Vendor {type === "register" ? "Registration" : "Login"}
        </Text>

        <Divider my="xl" />

        <Text size="lg" weight={500}>
          Welcome {type === "login" && "back"} to Online Fuel Delivery, {type} with
        </Text>
        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(() => {})}>
          <Group direction="column" grow>
            <TextInput required label="Email" placeholder="hello@gmail.com" value={form.values.email} onChange={(event) => form.setFieldValue("email", event.currentTarget.value)} error={form.errors.email && "Invalid email"} />
            {type === "register" && (
              <>
                <TextInput required label="Name" placeholder="Owner's Name" value={form.values.name} onChange={(event) => form.setFieldValue("name", event.currentTarget.value)} />
                <TextInput required label="Fuel Station's Name" placeholder="Fuel Station's Name" value={form.values.fuelStationsName} onChange={(event) => form.setFieldValue("fuelStationsName", event.currentTarget.value)} />
                <TextInput required label="City" placeholder="City" value={form.values.city} onChange={(event) => form.setFieldValue("city", event.currentTarget.value)} />
                <TextInput required label="State" placeholder="State" value={form.values.state} onChange={(event) => form.setFieldValue("state", event.currentTarget.value)} />
                <TextInput
                  required
                  label="Mobile"
                  placeholder="Your Mobile Number"
                  value={form.values.name}
                  onChange={(event) => form.setFieldValue("mobileno", event.currentTarget.value)}
                  error={form.errors.mobileno && "Mobile Number should include 10 digits"}
                />
              </>
            )}

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
