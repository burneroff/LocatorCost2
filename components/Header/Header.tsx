import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  Image,
  Container,
  ActionIcon,
  Tooltip,
} from "@mantine/core";
import Link from "next/link";
import classes from "./header.module.css";
import {
  IconChevronDown,
  IconCirclePlus,
  IconHeart,
  IconUserCircle,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

const mockdata = [
  {
    icon: IconCirclePlus,
    title: "Партнерам",
    description: "Информация описывающая условия взаимодействия",
    href: "/partners",
  },
  // Add other items here...
];

export function Header() {
  const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
  const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
  const authContext = useContext(AuthContext); // Get the context
  const auth = authContext?.auth; // Access auth if it exists, otherwise null

  const links = mockdata.map((item) => (
    <Link href={item.href} key={item.title} passHref>
      <UnstyledButton className={classes.subLink}>
        <Group wrap="nowrap" align="flex-start">
          <ThemeIcon size={34} variant="default" radius="md">
            <item.icon style={{ width: rem(22), height: rem(22) }} />
          </ThemeIcon>
          <div>
            <Text size="sm" fw={500}>
              {item.title}
            </Text>
            <Text size="xs" c="dimmed">
              {item.description}
            </Text>
          </div>
        </Group>
      </UnstyledButton>
    </Link>
  ));

  return (
    <Container size="1440px">
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          <Image src={"img/logo.png"} w={"auto"} h={40} alt="Logo" />
          <Group h="100%" gap={0} visibleFrom="sm">
            <Link href="/auction" className={classes.link} passHref>
              Продажа
            </Link>
            <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
              <HoverCard.Target>
                <a className={classes.link}>
                  <Center inline>
                    <Box component="span" mr={5}>
                      О нас
                    </Box>
                    <IconChevronDown style={{ width: rem(16), height: rem(16) }} />
                  </Center>
                </a>
              </HoverCard.Target>

              <HoverCard.Dropdown style={{ overflow: "hidden" }}>
                <SimpleGrid cols={2} spacing={0}>
                  {links}
                </SimpleGrid>
              </HoverCard.Dropdown>
            </HoverCard>
            <Link href="/rent" className={classes.link} passHref>
              Аренда
            </Link>
            <Link href="/contacts" className={classes.link} passHref>
              Контакты
            </Link>
          </Group>

          <Group visibleFrom="sm">
            <Tooltip label="Избранное" withArrow>
              <ActionIcon variant="transparent" aria-label="Избранное">
                <IconHeart style={{ width: "70%", height: "70%" }} stroke={1.5} color={"gray"} />
              </ActionIcon>
            </Tooltip>
            <Link href="/add-object" className={classes.link} passHref>
              <Button
                variant="filled"
                color="#6600FF"
                leftSection={<IconCirclePlus size={20} />}
              >
                Добавить объект
              </Button>
            </Link>
            {auth ? (
              <Link href="/profile" passHref>
                <Button variant="light" color="#6600FF" leftSection={<IconUserCircle size={20} />}>
                  Профиль
                </Button>
              </Link>
            ) : (
              <Link href="/authentication" passHref>
                <Button variant="light" color="#6600FF">
                  Войти
                </Button>
              </Link>
            )}
          </Group>

          <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
        </Group>
      </header>

      <Drawer
        opened={drawerOpened}
        onClose={closeDrawer}
        size="100%"
        padding="md"
        title="Меню"
        hiddenFrom="sm"
        zIndex={1000000}
      >
        <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
          <Divider my="sm" />
          <Link className={classes.link} href="/sale" passHref>
            Продажа
          </Link>
          <UnstyledButton className={classes.link} onClick={toggleLinks}>
            <Center inline>
              <Box component="span" mr={5}>
                О нас
              </Box>
              <IconChevronDown style={{ width: rem(16), height: rem(16) }} color={"#6600FF"} />
            </Center>
          </UnstyledButton>
          <Collapse in={linksOpened}>{links}</Collapse>
          <Link href="/rent" className={classes.link} passHref>
            Аренда
          </Link>
          <Link href="/contacts" passHref className={classes.link}>
            Контакты
          </Link>
          <Link href="/favorites" className={classes.link} passHref>
            Избранное
          </Link>

          <Divider my="sm" />
          <Group justify="center" grow pb="xl" px="md">
            <Button
              variant="filled"
              color="#6600FF"
              leftSection={<IconCirclePlus size={20} />}
            >
              Добавить объект
            </Button>
            {auth ? (
              <Link href="/profile" passHref>
                <Button variant="light" color="#6600FF" leftSection={<IconUserCircle size={20} />}>
                  Профиль
                </Button>
              </Link>
            ) : (
              <Link href="/authentication" passHref>
                <Button variant="light" color="#6600FF">
                  Войти
                </Button>
              </Link>
            )}
          </Group>
        </ScrollArea>
      </Drawer>
    </Container>
  );
}
