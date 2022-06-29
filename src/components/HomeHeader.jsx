import React, { useState } from "react";
import { Header, Container, Group, Burger, Transition, Paper } from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
// import { MantineLogo } from "../../shared/MantineLogo";
import { Link } from "react-router-dom";

import { useStyles } from "../styles/HomeHeader";

import ThemeToggle from "./ThemeToggle";

const HomeHeader = ({ links, isLoggedIn, handleLogout }) => {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => {
    if (isLoggedIn !== null && link.label === "Login") {
      return (
        <Link
          to="#"
          className={classes.link}
          onClick={() => {
            handleLogout();
            toggleOpened(false);
          }}
        >
          Logout
        </Link>
      );
    } else {
      return (
        <Link
          to={`${link.link}`}
          className={cx(classes.link, { [classes.linkActive]: active === link.link })}
          onClick={() => {
            setActive(link.link);
            toggleOpened(false);
          }}
        >
          {link.label}
        </Link>
      );
    }
  });

  return (
    <Header height={60} className={classes.root}>
      <Container className={classes.header}>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>
        <ThemeToggle />
        <Burger opened={opened} onClick={() => toggleOpened()} className={classes.burger} size="sm" />
        <Transition transition="pop-top-right" duration={200} mounted={opened}>
          {(styles) => (
            <Paper className={classes.dropdown} withBorder style={styles}>
              {items}
            </Paper>
          )}
        </Transition>
      </Container>
    </Header>
  );
};

export default HomeHeader;
