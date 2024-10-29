import { useContext } from "react";
import { Container, Card, Group, Text, Avatar, Title, Badge, Center } from "@mantine/core";
import { AuthContext } from "../context/AuthContext";

export default function Profile() {
  const authContext = useContext(AuthContext);
  const auth = authContext?.auth;

  return (
    <Container size="sm" py="xl">
      <Card shadow="md" padding="lg" radius="md" withBorder>
        <Center mb="lg">
          <Avatar size={80} radius="xl" color="blue" style={{ fontSize: "2.5rem" }}>
            {auth?.fio ? auth.fio.charAt(0) : "U"}
          </Avatar>
        </Center>
        <Title order={2} mt="sm">
          {auth?.fio || "Неизвестный пользователь"}
        </Title>
        <Text c="dimmed" size="sm">
          {auth?.email || "Нет электронной почты"}
        </Text>

        <Group align="center" mt="lg">
          <Badge color="grape" size="lg" radius="sm" variant="filled">
            {auth?.role || "Нет роли"}
          </Badge>
        </Group>
      </Card>
    </Container>
  );
}
