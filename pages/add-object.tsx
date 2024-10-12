import { Header } from "../components/Header/Header";
import "@mantine/carousel/styles.css";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import { useContext, useState } from "react";
import classes from "./addObject.module.css";
import {
  Card,
  Container,
  Flex,
  Group,
  Text,
  Title,
  Button,
  TextInput,
  NumberInput,
} from "@mantine/core";
import { IconCalendarMonth, IconKey } from "@tabler/icons-react";
import { Notification } from "@mantine/core"; // Импортируем уведомления
import { Flat } from "../components/SVG/Flat";
import { Room } from "../components/SVG/Room";
import { Key } from "../components/SVG/Key";
import { Calendar } from "../components/SVG/Calendar";
import { House } from "../components/SVG/House";
import { Commercy } from "../components/SVG/Commercy";
import { Place } from "../components/SVG/Place";
import { api } from "../axiosConfig";
import { randomId } from "@mantine/hooks";

export default function IndexPage() {
  const authContext = useContext(AuthContext);
  console.log("Auth data:", authContext);

  const [dealType, setDealType] = useState("Продать");
  const [propertyType, setPropertyType] = useState("Квартира");

  const [country, setCountry] = useState("Россия");
  const [region, setRegion] = useState("Московская");
  const [city, setCity] = useState("г. Москва");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [adTitle, setAdTitle] = useState("");
  const [adDescription, setAdDescription] = useState("");
  const [basicPrice, setBasicPrice] = useState("");
  const [stepTime, setStepTime] = useState("");
  const [dayTime, setDayTime] = useState("");
  const [minimalPrice, setMinimalPrice] = useState("");
  const [step, setStep] = useState("");
  const [bonus, setBonus] = useState("");

  const handleSelect = (setter: any, type: any) => {
    setter(type);
  };

  const cardStyles = (selectedType: any, type: any) => ({
    cursor: "pointer",
    backgroundColor: selectedType === type ? "#228be6" : "#f1f3f5",
    color: selectedType === type ? "white" : "black",
    borderColor: selectedType === type ? "#1971c2" : "#d5d7da",
  });

  const handleSubmit = async () => {
    const address = `${country} ${region} ${city} ${street} ${houseNumber}`;
    const payload = {
      locatorObjectData: {
        id: randomId(),
        type_ad: dealType,
        type_object: propertyType,
        address: address,
        date: new Date(),
        adTitle: adTitle,
        adDescription: adDescription,
      },
      bidsData: {
        date: new Date(),
        basicPrice: basicPrice,
        nowPrice: basicPrice,
        stepTime: stepTime,
        dayTime: dayTime,
        bonus: bonus,
        minimalPrice: minimalPrice,
        step: step,
        numberOfBets: 0,
      },
    };

    console.log("Submitting:", payload);
    try {
      const response = await api.post("/object/addObject", payload);
      console.log("Response from server:", response.data);
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const data = [
    {
      title: "Тип сделки",
      stateSelect: dealType,
      stateFunctionSelect: setDealType,
      variables: [
        {
          icon: Key,
          text: "Продать",
        },
        {
          icon: Calendar,
          text: "Снять",
        },
      ],
    },
    {
      title: "Тип недвижимости",
      stateSelect: propertyType,
      stateFunctionSelect: setPropertyType,
      variables: [
        {
          icon: Flat,
          text: "Квартира",
        },
        {
          icon: Room,
          text: "Комната",
        },
        {
          icon: House,
          text: "Дом",
        },
        {
          icon: Commercy,
          text: "Коммерческая",
        },
        {
          icon: Place,
          text: "Участок",
        },
      ],
    },
  ];

  return (
    <AuthProvider>
      <Header />
      <Container size="1440px">
        <Title size="32px" mt={50} style={{ marginBottom: 20 }}>
          Подать объявление
        </Title>
        {data.map((item, index) => {
          return (
            <Flex direction="column" key={index} ml="30" mt={20} maw="800px">
              <Text className={classes.text} key={index} style={{ marginBottom: 20 }}>
                {item.title}
              </Text>
              <Group>
                {item.variables.map((variant) => {
                  return (
                    <Card
                    key={index}
                      shadow="sm"
                      padding="lg"
                      radius="md"
                      miw={150}
                      style={cardStyles(item.stateSelect, variant.text)}
                      className={classes.card}
                      onClick={() =>
                        handleSelect(item.stateFunctionSelect, variant.text)
                      }
                    >
                      <variant.icon />
                      <Text>{variant.text}</Text>
                    </Card>
                  );
                })}
              </Group>
            </Flex>
          );
        })}
        <Flex direction="column" ml="30" mt={20} maw="800px">
          <Text className={classes.text} style={{ marginBottom: 20 }}>
            Адрес
          </Text>
          <TextInput
            label="Страна"
            value={country}
            onChange={(event) => setCountry(event.currentTarget.value)}
            readOnly
            mb={5}
          />
          <TextInput
            label="Область"
            value={region}
            onChange={(event) => setRegion(event.currentTarget.value)}
            readOnly
            mb={5}
          />
          <TextInput
            label="Город"
            value={city}
            onChange={(event) => setCity(event.currentTarget.value)}
            readOnly
            mb={5}
          />
          <TextInput
            label="Улица"
            placeholder="Введите улицу"
            value={street}
            onChange={(event) => setStreet(event.currentTarget.value)}
            mb={5}
          />
          <NumberInput
            label="Дом"
            placeholder="Введите номер дома"
            value={houseNumber}
            onChange={(value) => setHouseNumber(value?.toString() || "")}
            min={1}
            mb={5}
          />
          <Text className={classes.text} style={{ marginTop: 20 }}>
            Описание
          </Text>
          <TextInput
            label="Название объявления"
            value={adTitle}
            onChange={(event) => setAdTitle(event.currentTarget.value)}
            mb={5}
          />
          <TextInput
            label="Описание объявления"
            value={adDescription}
            onChange={(event) => setAdDescription(event.currentTarget.value)}
            mb={5}
          />
          <Text
            className={classes.text}
            style={{ marginBottom: 20, marginTop: 20 }}
          >
            Торги
          </Text>
          <NumberInput
            label="Стартовая цена"
            placeholder="Введите цену"
            value={basicPrice}
            onChange={(value) => setBasicPrice(value?.toString() || "")}
            min={1}
            mb={5}
          />
          <NumberInput
            label="Время на шаг (часы): "
            placeholder="Введите часы"
            value={stepTime}
            onChange={(value) => setStepTime(value?.toString() || "")}
            min={1}
            mb={5}
          />
          <NumberInput
            label="Длительность аукциона (дней): "
            placeholder="Введите кол-во дней"
            value={dayTime}
            onChange={(value) => setDayTime(value?.toString() || "")}
            min={1}
            mb={5}
          />
          <NumberInput
            label="Минимальная цена"
            placeholder="Введите цену"
            value={minimalPrice}
            onChange={(value) => setMinimalPrice(value?.toString() || "")}
            min={1}
            mb={5}
          />
          <NumberInput
            label="Шаг торгов"
            placeholder="Введите шаг"
            value={step}
            onChange={(value) => setStep(value?.toString() || "")}
            min={1}
            mb={5}
          />
          <NumberInput
            label="Скидка первому участнику (в случае победы):"
            placeholder="Введите скидку"
            value={bonus}
            onChange={(value) => setBonus(value?.toString() || "")}
            min={1}
            mb={5}
          />
          <Button onClick={handleSubmit} mt={20} mb={50}>
            Отправить
          </Button>
        </Flex>
      </Container>
    </AuthProvider>
  );
}
