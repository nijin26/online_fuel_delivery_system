import React from "react";
import { useForm } from "@mantine/form";
import { Container, TextInput, PasswordInput, Text, Paper, Group, Stack, Button, Divider, Anchor } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Link, useNavigate } from "react-router-dom";

import { auth, signInWithEmailAndPassword, getDocs, collection, db } from "../../utils/firebaseConfig";
import { useDispatch } from "react-redux";
import { login, logout } from "../../app/userSlice";

const Authentication = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const loginHandler = (e) => {
    signInWithEmailAndPassword(auth, form.values.email, form.values.password)
      .then(async (userAuth) => {
        let docID;
        const querySnapshot = await getDocs(collection(db, "admins"));
        querySnapshot.forEach((doc) => {
          if (doc.id === userAuth.user.uid) {
            docID = doc.id;
            return;
          }
        });
        if (docID !== userAuth.user.uid) {
          auth.signOut();
          dispatch(logout());
          showNotification({ color: "red", title: "You are not an authorized Admin" });
        } else {
          dispatch(
            login({
              email: userAuth.user.email,
              uid: userAuth.user.uid,
              userType: "admin",
            })
          );
          showNotification({
            title: "Login Successfull !",
            message: `Hello, welcome back to your app.`,
          });
          form.reset();
          navigate("/admin");
        }
      })
      .catch((err) => {
        showNotification({ color: "red", title: `Login Failed ! ${err.message}`, message: "Please try again" });
      });
  };

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
        <form onSubmit={form.onSubmit(loginHandler)}>
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
