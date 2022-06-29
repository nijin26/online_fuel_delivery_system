import React, { useEffect } from "react";
import { useForm, useToggle, upperFirst } from "@mantine/hooks";
import { Container, TextInput, PasswordInput, Text, Paper, Group, Stack, Button, Divider, Checkbox, Anchor } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { GoogleButton } from "../../images/GoogleIcon";
import { Link } from "react-router-dom";

// Firebase
import { auth, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, sendEmailVerification } from "../../utils/firebaseConfig";
import { useDispatch } from "react-redux";
import { login } from "../../app/userSlice";

const Authentication = (props) => {
  const dispatch = useDispatch();

  const [type, toggle] = useToggle("login", ["login", "register"]);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      mobileno: "",
      password: "",
      terms: false,
    },

    validationRules: {
      email: (val) => /^\S+@\S+$/.test(val),
      password: (val) => val.length >= 6,
      mobileno: (val) => val.length == 10,
    },
  });

  const loginHandler = () => {
    signInWithEmailAndPassword(auth, form.values.email, form.values.password)
      .then((userAuth) => {
        dispatch(
          login({
            email: userAuth.user.email,
            uid: userAuth.user.uid,
            displayName: userAuth.user.displayName,
          })
        );
        showNotification({
          title: "Login Successfull !",
          message: `Hi ${userAuth.user.displayName}, welcome back to our app.`,
        });
      })
      .catch((err) => {
        showNotification({ color: "red", title: `Login Failed ! ${err.message}`, message: "Please try again" });
      });
  };

  const registerHandler = () => {
    createUserWithEmailAndPassword(auth, form.values.email, form.values.password)
      .then((userAuth) => {
        updateProfile(userAuth.user, {
          displayName: form.values.name,
        })
          .then(
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: form.values.name,
              })
            )
          )
          .then(
            sendEmailVerification(userAuth.user).then(
              showNotification({
                color: "blue",
                title: "Email Verification Sent !",
                message: "Please check your inbox and verify your email address.",
              })
            )
          );
      })
      .catch((err) => {
        showNotification({ color: "red", title: "Registration Failed !", message: "Please try again" });
        console.log(err);
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (type === "register") registerHandler();
    else loginHandler();
  };

  return (
    <Container size="sm" mt={30}>
      <Paper radius="md" p="xl" withBorder {...props}>
        <Text size="xl" align="center" weight={700} transform="uppercase">
          User {type === "register" ? "Registration" : "Login"}
        </Text>

        <Divider my="xl" />

        <Text size="lg" weight={500}>
          Welcome {type === "login" && "back"} to Online Fuel Delivery, {type} with
        </Text>
        <Group grow mb="md" mt="md">
          <GoogleButton radius="xl">Google</GoogleButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(submitHandler)}>
          <Group direction="column" grow>
            {type === "register" && <TextInput type="text" required label="Name" placeholder="Your name" value={form.values.name} onChange={(event) => form.setFieldValue("name", event.currentTarget.value)} />}

            <TextInput required type="email" label="Email" placeholder="hello@gmail.com" value={form.values.email} onChange={(event) => form.setFieldValue("email", event.currentTarget.value)} error={form.errors.email && "Invalid email"} />

            {type === "register" && (
              <TextInput
                required
                type="number"
                label="Mobile"
                placeholder="Your Mobile Number"
                value={form.values.mobileno}
                onChange={(event) => form.setFieldValue("mobileno", event.currentTarget.value)}
                error={form.errors.mobileno && "Mobile Number should contain 10 digits"}
              />
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

            <Button type="submit" onClick={submitHandler}>
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default Authentication;
