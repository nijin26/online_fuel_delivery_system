import React from "react";
import { Container, Paper, Grid, Text } from "@mantine/core";

import { Link } from "react-router-dom";
import { useStyles } from "../../styles/Auth";

import customer from "../../images/customer.png";
import vendor from "../../images/vendor.png";
import deliverystaff from "../../images/deliverystaff.png";

const Auth = () => {
  const { classes } = useStyles();

  return (
    <Container size="md" my={30} mb={200}>
      <Grid gutter="sm">
        <Grid.Col sm={4} xs={12}>
          <Paper shadow="xs" p="md" className={classes.paper}>
            <img src={customer} alt="" className={classes.image} />
            <Text align="center" size="xl" weight={700}>
              <Link to="/userauth" className={classes.link}>
                {" "}
                Customer Login
              </Link>
            </Text>
          </Paper>
        </Grid.Col>
        <Grid.Col sm={4} xs={12}>
          <Paper shadow="xs" p="md" className={classes.paper}>
            <img src={vendor} alt="" className={classes.image} />
            <Text align="center" size="xl" weight={700}>
              <Link to="/vendorauth" className={classes.link}>
                Vendor Login
              </Link>
            </Text>
          </Paper>
        </Grid.Col>
        <Grid.Col sm={4} xs={12}>
          <Paper shadow="xs" p="md" className={classes.paper}>
            <img src={deliverystaff} alt="" className={classes.image} />
            <Text align="center" size="xl" weight={700}>
              <Link to="/deliverystaffauth" className={classes.link}>
                Delivery Staff Login
              </Link>
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default Auth;
