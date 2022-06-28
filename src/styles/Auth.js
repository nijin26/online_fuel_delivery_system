import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    marginTop: "15px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.xl,
    fontWeight: 500,

    "&:hover": {
      backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },

  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    width: "50%",
  },
}));
