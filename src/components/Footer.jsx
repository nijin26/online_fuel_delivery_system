import React from "react";
import { Anchor, Group, ActionIcon } from "@mantine/core";
import { BrandTwitter, BrandYoutube, BrandInstagram } from "tabler-icons-react";
// import { MantineLogo } from "../../shared/MantineLogo";

import { useStyles } from "../styles/Footer";

const Footer = ({ links }) => {
  const { classes } = useStyles();
  const items = links.map((link) => (
    <Anchor color="dimmed" key={link.label} href={link.link} sx={{ lineHeight: 1 }} onClick={(event) => event.preventDefault()} size="sm">
      {link.label}
    </Anchor>
  ));

  return (
    <div className={classes.footer}>
      <div className={classes.inner}>
        <Group className={classes.links}>{items}</Group>

        <Group spacing={0} position="right" noWrap>
          <ActionIcon size="lg">
            <BrandTwitter size={18} />
          </ActionIcon>
          <ActionIcon size="lg">
            <BrandYoutube size={18} />
          </ActionIcon>
          <ActionIcon size="lg">
            <BrandInstagram size={18} />
          </ActionIcon>
        </Group>
      </div>
    </div>
  );
};

export default Footer;
