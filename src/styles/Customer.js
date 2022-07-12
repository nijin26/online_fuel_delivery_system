import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  container: {
    minHeight: "50vh",
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
  fuelquantity: {
    width: "60%",
    margin: "0 auto",
    [`@media (max-width: ${theme.breakpoints.xs}px)`]: {
      width: "90%",
    },
  },
}));
