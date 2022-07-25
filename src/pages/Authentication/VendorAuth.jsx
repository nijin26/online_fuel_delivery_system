import React from "react";
import { useToggle, upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import { Container, TextInput, PasswordInput, Text, Paper, Group, Stack, Button, Divider, Checkbox, Anchor } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { GoogleButton } from "../../images/GoogleIcon";
import { Link, useNavigate } from "react-router-dom";

// Firebase
import { getDocs, collection, auth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, sendEmailVerification, setDoc, doc, db } from "../../utils/firebaseConfig";
import { useDispatch } from "react-redux";
import { login, logout } from "../../app/userSlice";

const Authentication = (props) => {
  const provider = new GoogleAuthProvider();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => console.log("I am in Vendor Page"), []);

  const [type, toggle] = useToggle(["login", "register"]);
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
      mobileno: (val) => val.length === 10,
    },
  });

  const submitHandler = (e) => {
    e.preventDefault();
    if (type === "register" && form.validate()) registerHandler();
    else if (type === "login") loginHandler();
  };

  const loginHandler = () => {
    signInWithEmailAndPassword(auth, form.values.email, form.values.password)
      .then(async (userAuth) => {
        let docID;
        const querySnapshot = await getDocs(collection(db, "vendors"));
        querySnapshot.forEach((doc) => {
          if (doc.data().uid === userAuth.user.uid) {
            docID = doc.data().uid;
            return;
          }
        });
        if (docID !== userAuth.user.uid) {
          auth.signOut();
          dispatch(logout());
          showNotification({ color: "red", title: "You are not an authorized Vendor" });
        } else {
          dispatch(
            login({
              email: userAuth.user.email,
              uid: userAuth.user.uid,
              displayName: userAuth.user.displayName,
              phoneNumber: userAuth.user.phoneNumber,
              userType: "vendor",
              fuelStationsName: form.values.fuelStationsName,
              city: form.values.city,
              state: form.values.state,
            })
          );
          showNotification({
            title: "Login Successfull !",
            message: `Hi ${userAuth.user.displayName}, welcome back to our app.`,
          });
          form.reset();
          navigate("/vendor");
        }
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
          phoneNumber: form.values.mobileno,
        })
          .then(() => {
            const vendorData = {
              email: form.values.email,
              uid: userAuth.user.uid,
              displayName: form.values.name,
              phoneNumber: form.values.mobileno,
              userType: "vendor",
              fuelStationsName: form.values.fuelStationsName,
              city: form.values.city,
              state: form.values.state,
            };
            addVendorToDB(userAuth.user.uid, vendorData);
            dispatch(login(vendorData));
          })
          .then(
            sendEmailVerification(userAuth.user).then(
              showNotification({
                color: "blue",
                title: "Email Verification Sent !",
                message: "Please check your inbox and verify your email address.",
              })
            )
          );
        toggle();
      })
      .catch((err) => {
        showNotification({ color: "red", title: `Registration Failed ! ${err.message}`, message: "Please try again" });
      });
  };

  const googleHandler = async () => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        dispatch(
          login({
            email: user.email,
            uid: user.uid,
            displayName: user.displayName,
            phoneNumber: user.phoneNumber,
            userType: "vendor",
          })
        );
        showNotification({
          title: "Google Authentication Successfull !",
          message: `Hi ${user.displayName}, welcome back to our app.`,
        });
        navigate("/vendor");
      })
      .catch((error) => {
        // const credential = GoogleAuthProvider.credentialFromError(error);
        showNotification({ color: "red", title: `Google Authentication Failed ! ${error.message}`, message: "Please try again" });
      });
  };

  const addVendorToDB = async (docId, data) => {
    try {
      await setDoc(doc(db, "vendors", docId), data);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

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
          <GoogleButton radius="xl" onClick={googleHandler}>
            Google
          </GoogleButton>
        </Group>

        <Divider label="Or continue with email" labelPosition="center" my="lg" />

        <form onSubmit={form.onSubmit(submitHandler)}>
          <Stack>
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
                  value={form.values.mobileno}
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
          </Stack>

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

            <Button type="submit" onClick={submitHandler} disabled={type === "register" && !form.values.terms}>
              {upperFirst(type)}
            </Button>
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default Authentication;
