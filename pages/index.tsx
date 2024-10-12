import { Header } from "../components/Header/Header";
import { Hero } from "../components/Hero/Hero";
import classes from "./index.module.css";
import "@mantine/carousel/styles.css";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import { useContext } from "react";

export default function IndexPage() {
  const authContext = useContext(AuthContext);
  console.log("Auth data:", authContext);
  return (
    <AuthProvider>
      <Header></Header>
      <Hero></Hero>
    </AuthProvider>
  );
}
