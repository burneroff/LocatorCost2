import { useForm } from "@mantine/form";
import { useToggle, upperFirst } from "@mantine/hooks";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Checkbox,
  Anchor,
  Stack,
  Alert,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { api } from "../../../axiosConfig";
import axios, { AxiosError } from "axios";

export default function AuthenticationForm(props: any) {
  const [type, toggle] = useToggle(["login", "register"]);
  const router = useRouter();
  const { linkType } = router.query;
  const { auth, setAuth } = useContext(AuthContext);
  const [isMounted, setIsMounted] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);

  useEffect(() => {
    if (linkType === "register") {
      toggle();
    }
    setIsMounted(true);
  }, [linkType, toggle]);

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },
    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  if (!isMounted) {
    return null; // Prevents rendering until after the component mounts on the client
  }

  return (
    <Paper radius="md" padding="xl" {...props}>
      <Text ta={"center"} size="lg">
        Добро пожаловать в{" "}
        <Text display={"inline"} c="#6600FF">
          LocatorCost
        </Text>
      </Text>
      {generalError && (
        <Alert title="Ошибка" color="red" withCloseButton onClose={() => setGeneralError(null)}>
          {generalError}
        </Alert>
      )}
      <form
        onSubmit={form.onSubmit(async () => {
          try {
            if (type === "login") {
              const response = await api.post("/auth/login", {
                email: form.values.email,
                password: form.values.password,
              });

              setAuth({
                role: "Клиент",
                email: response.data.email,
                fio: response.data.fio,
              });
            } else {
              const response = await api.post("/auth/registration", {
                email: form.values.email,
                fio: form.values.name,
                password: form.values.password,
              });
              setAuth({
                role: "Клиент",
                email: form.values.email,
                fio: form.values.name,
              });
            }

            router.push("/auction");
          } catch (error) {
            if (axios.isAxiosError(error)) {
              setGeneralError("Пользователя нет или неверные данные");
            }
          }
        })}
      >
        <Stack>
          {type === "register" && (
            <TextInput
              label="Имя"
              placeholder="Ваше имя"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
            />
          )}

          <TextInput
            required
            label="Почта"
            placeholder="hello@locatorcost.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            radius="md"
          />

          <PasswordInput
            required
            label="Пароль"
            placeholder="Ваш пароль"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Пароль должен быть длиннее 6 символов"
            }
            radius="md"
          />

          {type === "register" && (
            <Checkbox
              color="#6600FF"
              label="I accept terms and conditions"
              checked={form.values.terms}
              onChange={(event) =>
                form.setFieldValue("terms", event.currentTarget.checked)
              }
            />
          )}
        </Stack>

        <Group justify="space-between" style={{ marginTop: "10px" }}>
          <Anchor
            component="button"
            type="button"
            c="#6600FF"
            onClick={() => {
              setGeneralError(null); // Reset error when toggling
              toggle();
            }}
            size="xs"
          >
            {type === "register"
              ? "Уже есть аккаунт? Войти"
              : "Нет аккаунта? Зарегестрироваться"}
          </Anchor>
          <Button type="submit" radius="xl" color="#6600FF">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
