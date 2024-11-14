import cx from 'clsx';
import { Title, Text, Container, Button, Overlay } from '@mantine/core';
import classes from './partners.module.css';

export function HeroPartners() {
  return (
    <div className={classes.wrapper}>
      <Overlay color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>

        <Container size={840}>
        <Title className={classes.title}>
        Вместе с LocatorCost <br></br> готовьтесь открывать новые двери
        </Title>
        </Container>

        <div className={classes.controls}>
          <Button className={classes.control} variant="white" size="lg">
            Начало работы
          </Button>
        </div>
      </div>
    </div>
  );
}