import React from "react";
import { Container, Paper, Grid, Text } from "@mantine/core";
import { ArrowBarRight } from "tabler-icons-react";

import { Link } from "react-router-dom";
import { useStyles } from "../../styles/Auth";

import user from "../../images/user.png";
import vendor from "../../images/vendor.png";

const Auth = () => {
  const { classes } = useStyles();

  return (
    <Container size="md" my={30} mb={200}>
      <Grid gutter="sm">
        <Grid.Col sm={6} xs={12}>
          <Paper shadow="xs" p="md" className={classes.paper}>
            <img src={user} alt="" className={classes.image} />
            <Text align="center" size="xl" weight={700}>
              <Link to="/userauth" className={classes.link}>
                {" "}
                Customer Login
              </Link>
            </Text>
          </Paper>
        </Grid.Col>
        <Grid.Col sm={6} xs={12}>
          <Paper shadow="xs" p="md" className={classes.paper}>
            <img src={vendor} alt="" className={classes.image} />
            <Text align="center" size="xl" weight={700}>
              <Link to="/vendorauth" className={classes.link}>
                Vendor Login
              </Link>
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Auth;
