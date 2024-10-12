import { Overlay, Container, Title, Button, Text } from "@mantine/core";
import classes from "./hero.module.css";
import Link from "next/link";

export function Hero() {
  return (
    <div className={classes.hero}>
      <Overlay
        gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 90%)"
        opacity={1}
        zIndex={0}
      />
      <Container className={classes.container} size={"1440px"} h={700}>
        <Title className={classes.title}>ПРОДАВАЙ ДОРОГО ПОКУПАЙ ДЁШЕВО</Title>
        <Link href="/auction" className={classes.link} passHref>
          <Button size="xl" variant="filled" color="#6600FF">
            Торги
          </Button>
        </Link>
      </Container>
    </div>
  );
}
