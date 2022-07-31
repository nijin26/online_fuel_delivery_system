import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  Burger: {
    color: theme.colorScheme === "dark" ? "white" : "black",
  },
  Paper: {
    minHeight: "100vh",
  },
  subContainer: {
    margin: "0 auto",
    width: "90%",
  },
}));
