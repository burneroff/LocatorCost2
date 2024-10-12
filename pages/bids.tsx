import { Header } from "../components/Header/Header";
import "@mantine/carousel/styles.css";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import {
  Container,
  Grid,
  Image,
  rem,
  SimpleGrid,
  Skeleton,
  Title,
  Button,
  Collapse,
  Text,
  Alert,
} from "@mantine/core";
import { CarouselCard } from "../components/CarouselCard/CarouselCard";
import AuctionWithPagination from "../components/AuctionWithPagination/AuctionWithPagination";
import classes from "./bids.module.css";
import { api } from "../axiosConfig";
import { Carousel } from "@mantine/carousel";
import { useRouter } from "next/router";

export default function Bids(props: any) {
  const authContext = useContext(AuthContext);
  console.log("Auth data:", authContext);
  const PRIMARY_COL_HEIGHT = rem(800);
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [descriptionOpened, setDescriptionOpened] = useState(false); // Для контроля блока описания
  const router = useRouter();
  const { query } = router;
  const [price, setPrice] = useState(query.nowPrice);
  const [dateChange, setDateChange] = useState(query.dateForChangePrice);
  const [showAlert, setShowAlert] = useState(false);
  const images = [
    "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    "https://images.unsplash.com/photo-1605774337664-7a846e9cdf17?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    "https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
    "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
  ];
  const isAuctionActive = query.status === "Торги идут";

  const handleClick = () => {
    const fetchItems = async () => {
      try {
        const response = await api.post("/object/setPrice", {
          id: query.id,
          person: "Никита",
        });
        if (response.data.status) {
          setShowAlert(true);
        }
        setPrice(response.data.updatedPrice);
        setDateChange(response.data.dateForChangePrice);
        console.log("Response from server:", response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchItems();
  };

  const slides = images.map((image) => (
    <Carousel.Slide key={image}>
      <Image src={image} height={378} />
    </Carousel.Slide>
  ));

  return (
    <AuthProvider>
      <Header></Header>
      <Container my="md" size={1440} className={classes.main}>
        <Grid gutter="md" justify="center">
          <Grid.Col span={7}>
            <Title>{query.title}</Title>
            <Text>{query.address}</Text>
            <Carousel
              mt={20}
              withIndicators
              loop
              classNames={{
                root: classes.carousel,
                controls: classes.carouselControls,
                indicator: classes.carouselIndicator,
              }}
              w={600}
            >
              {slides}
            </Carousel>

            {/* Описание объекта */}
            <div>
              <Title mt="lg" mb="sm">
                Описание
              </Title>
              <Text lineClamp={3}>{query.adDescription}</Text>
              <Collapse in={descriptionOpened}>
                <Text>{query.adDescription}</Text>
              </Collapse>
              <Button
                variant="light"
                color="blue"
                mt="md"
                onClick={() => setDescriptionOpened((o) => !o)}
              >
                {descriptionOpened ? "Свернуть" : "Читать полностью"}
              </Button>
            </div>
            <Skeleton
              height={500}
              radius="md"
              animate={false}
              visible={loading}
            >
              <div>
                <Title mt="lg" mb="sm">
                  Параметры объекта
                </Title>
                <Text>Количество комнат: 3</Text>
                <Text>Раздельных комнат: 1</Text>
                <Text>Площадь общая: 86.3 м²</Text>
                <Text>Площадь жилая: 47.72 м²</Text>
                <Text>Площадь кухни: 12.02 м²</Text>
                <Text>Год постройки: 2025</Text>
                <Text>Этаж / этажность: 2 / 15</Text>
                <Text>Тип дома: Монолитный</Text>
                <Text>Планировка: Свободная планировка</Text>
                <Text>Балкон: 2 лоджии застекленные</Text>
                <Text>Ремонт: Строительная отделка</Text>
                <Text>Высота потолков: 2.8 м</Text>
                <Text>Санузел: 2 и более</Text>
                <Text>Собственность: Долевое строительство</Text>
                <Text>Условия продажи: Чистая продажа</Text>
              </div>
              <Button mt="lg" mb="sm">
                Контакты
              </Button>
            </Skeleton>
          </Grid.Col>

          {/* Параметры объекта */}
          <Grid.Col span={3}>
            <Skeleton
              height={400}
              radius="md"
              animate={false}
              visible={loading}
            >
              <SimpleGrid mt={80}>
                <Text>
                  Дата:{" "}
                  <span>
                    {typeof query.date === "string"
                      ? new Date(query.date).toLocaleString("ru-RU", {
                          year: "2-digit",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })
                      : "Дата не указана"}
                  </span>
                </Text>
                <Text>
                  Окончание торгов:{" "}
                  <span>
                    {typeof query.endTime === "string"
                      ? new Date(query.endTime).toLocaleString("ru-RU", {
                          year: "2-digit",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })
                      : "Дата не указана"}
                  </span>
                </Text>
                <Text>
                  Статус торгов: <span>{query.status}</span>
                </Text>
                <Text>
                  Изменение цены на шаг торгов в:{" "}
                  <span>
                    {typeof dateChange === "string"
                      ? new Date(dateChange).toLocaleString("ru-RU", {
                          year: "2-digit",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                          second: "2-digit",
                        })
                      : "Дата не указана"}
                  </span>
                </Text>
                <Text>
                  Текущая цена: <span>{price}</span>
                </Text>
                <Text>
                  Шаг торгов: <span>{query.step}</span>
                </Text>
                <Button
                  radius="md"
                  onClick={isAuctionActive ? handleClick : undefined}
                  disabled={!isAuctionActive}
                >
                  {isAuctionActive ? "Сделать ставку" : "Аукцион завершен"}
                </Button>
                {showAlert && (
                  <Alert
                    title="Ставка не принята"
                    color="red"
                    onClose={() => setShowAlert(false)}
                    style={{ marginTop: "1rem" }}
                  >
                    Ошибка при размещении ставки.
                  </Alert>
                )}
              </SimpleGrid>
            </Skeleton>
          </Grid.Col>
        </Grid>
      </Container>
    </AuthProvider>
  );
}
