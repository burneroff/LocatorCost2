import {
  Image,
  Card,
  Text,
  Group,
  Button,
  rem,
  SimpleGrid,
  Flex,
  Grid,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import classes from "./CarouselCard.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
const images = [
  "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
];

export function CarouselCard(props: any) {
  const slides = images.map((image) => (
    <Carousel.Slide key={image}>
      <Image src={image} height={220} />
    </Carousel.Slide>
  ));
  const router = useRouter();
  const isAuctionActive = props.status === "Торги идут";
  const handleClick = () => {
    router.push({
      pathname: "/bids",
      query: {
        id: props.bidsId,
        title: props.title,
        address: props.address,
        adDescription: props.adDescription,
        basicPrice: props.basicPrice,
        date: props.date,
        stepTime: props.stepTime,
        dayTime: props.dayTime,
        bonus: props.bonus,
        minimalPrice: props.minimalPrice,
        nowPrice: props.nowPrice,
        step: props.step,
        endTime: props.endTime,
        status: props.status,
        dateForChangePrice: props.dateForChangePrice,
        // добавьте любые другие параметры, которые вам нужны
      },
    });
  };

  return (
    <Card radius="md" withBorder>
      <Grid>
        <Grid.Col span={4}>
          <Carousel
            mt={20}
            withIndicators
            loop
            classNames={{
              root: classes.carousel,
              controls: classes.carouselControls,
              indicator: classes.carouselIndicator,
            }}
          >
            {slides}
          </Carousel>
        </Grid.Col>
        <Grid.Col span={6}>
          <SimpleGrid cols={1} mt="lg">
            <Flex direction={"column"}>
              <Text fw={500} fz="lg">
                {props.title}
              </Text>
              <Text fz="md" c="dimmed" mt="sm">
                {props.address}
              </Text>
            </Flex>
            <Text fz="sm" c="dimmed" mt="sm">
              {props.adDescription}
            </Text>
            <Text fz="xl" span fw={500} className={classes.price}>
              {props.nowPrice + " Р"}
            </Text>
            <Button
                  radius="md"
                  onClick={handleClick}
                  color={isAuctionActive ? "blue" : "red"}
                >
                  {isAuctionActive ? "Сделать ставку" : "Аукцион завершен"}
                </Button>
          </SimpleGrid>
        </Grid.Col>
        <Grid.Col span={2}>
          <SimpleGrid cols={1} verticalSpacing="1px" mt={20}>
            <Text fz="sm" c="dimmed" mt="sm">
              {new Date(props.date).toLocaleDateString("ru")}
            </Text>
            <Text fz="sm" c="dimmed" mt="sm">
              № лота: {props.bidsId}
            </Text>
            <Text fz="sm" c="dimmed" mt="sm">
              Просмотров: 0
            </Text>
            <Text fz="sm" c="dimmed" mt="sm">
              Ставок: {props.numberOfBets}
            </Text>
            <Text fz="sm" c={isAuctionActive ? "green" : "red"} mt="sm">
             {props.status}
            </Text>
          </SimpleGrid>
        </Grid.Col>
      </Grid>
    </Card>
  );
}
