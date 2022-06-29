import React from "react";
import { Container, Text, SimpleGrid, Paper, Avatar, Button } from "@mantine/core";

import { useStyles } from "../styles/AboutUs";

const AboutUs = () => {
  const { classes } = useStyles();

  const Members = [{ name: "Nazeera Nazarudheen" }, { name: "Nijin Nazar" }, { name: "Leo Laurel" }, { name: "Navya Asok" }];

  return (
    <Container size={"lg"}>
      <Text size="xl" weight={"bolder"} align="center" transform="uppercase" className={classes.heading} my={"lg"}>
        Our Team
      </Text>
      <SimpleGrid
        cols={4}
        spacing="lg"
        my={"lg"}
        breakpoints={[
          { maxWidth: 980, cols: 3, spacing: "md" },
          { maxWidth: 755, cols: 2, spacing: "sm" },
          { maxWidth: 600, cols: 1, spacing: "sm" },
        ]}
      >
        {Members.map((mem) => (
          <MemberCard key={mem.name} name={mem.name} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default AboutUs;

const MemberCard = ({ name, avatar, email }) => {
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Avatar src={avatar} size={120} radius={120} mx="auto" />
      <Text align="center" size="lg" weight={500} mt="md">
        {name}
      </Text>
      <Text align="center" color="dimmed" size="sm">
        {email}
      </Text>

      <Button variant="default" mt="md" fullWidth>
        Contact
      </Button>
    </Paper>
  );
};
