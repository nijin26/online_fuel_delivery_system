import React from "react";
import { Text, Title, TextInput, Button, Image } from "@mantine/core";
import EmailBannerImage from "../images/EmailBannerImage.svg";

import { useStyles } from "../styles/EmailBanner";

export function EmailBanner({ submitHandler }) {
  const [email, setEmail] = React.useState("");
  const { classes } = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>Wait a minute...</Title>
        <Text weight={500} size="lg" mb={5} className={classes.subTitle}>
          Subscribe to our newsletter!
        </Text>
        <Text size="sm" color="dimmed">
          You will never miss important product updates, latest news and community QA sessions. Our newsletter is once a week, every Sunday.
        </Text>

        <div className={classes.controls}>
          <TextInput type="email" value={email} onChange={(e) => setEmail(e.currentTarget.value)} placeholder="Your email" classNames={{ input: classes.input, root: classes.inputWrapper }} />
          <Button
            className={classes.control}
            onClick={() => {
              submitHandler(email);
              setEmail("");
            }}
          >
            Subscribe
          </Button>
        </div>
      </div>
      <Image src={EmailBannerImage} className={classes.image} />
    </div>
  );
}
