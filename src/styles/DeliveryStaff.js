import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  container: {
    height: "50vh",
    "& > div": {
      fontSize: "32px",
    },
  },
}));
