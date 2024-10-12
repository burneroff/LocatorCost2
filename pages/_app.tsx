import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import Head from "next/head";
import { Button, createTheme, MantineProvider } from "@mantine/core";
import { theme } from "../theme";
import classes from "./app.module.css";
import { Carousel } from "@mantine/carousel";
export default function App({ Component, pageProps }: any) {
  const theme = createTheme({
    components: {
      Button: Button.extend({ classNames: classes }),
      Carousel: Carousel.extend({classNames: classes})
    },
  });

  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>LocatorCost</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
      </Head>
      <Component {...pageProps} />
    </MantineProvider>
  );
}
