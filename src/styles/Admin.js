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
  statsCard: {
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.violet[4] : theme.colors.violet[2],
  },
  count: {
    fontSize: "70px",
    color: theme.colors.dark[6],
  },
}));
