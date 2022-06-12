import React, { useState } from "react";
import { Header, Container, Group, Burger } from "@mantine/core";
import { useBooleanToggle } from "@mantine/hooks";
// import { MantineLogo } from "../../shared/MantineLogo";
import { Link } from "react-router-dom";

import { useStyles } from "../styles/HomeHeader";

const HomeHeader = ({ links }) => {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <Link
      to={`${link.link}`}
      className={cx(classes.link, { [classes.linkActive]: active === link.link })}
      onClick={() => {
        setActive(link.link);
      }}
    >
      {link.label}
    </Link>
  ));

  return (
    <Header height={60}>
      <Container className={classes.header}>
        <Group spacing={5} className={classes.links}>
          {items}
        </Group>

        <Burger opened={opened} onClick={() => toggleOpened()} className={classes.burger} size="sm" />
      </Container>
    </Header>
  );
};

export default HomeHeader;
