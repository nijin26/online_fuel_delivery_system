import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  container: {
    height: "50vh",
  },
  group: {
    "& > div": {
      padding: "10px 5px",
      fontSize: "32px",
      width: "30%",
      border: "1px solid white",
      textAlign: "center",
      cursor: "pointer",
    },
  },
  active: {
    backgroundColor: "#87D1FC ",
    color: "black",
    borderColor: "blue",
  },
}));
