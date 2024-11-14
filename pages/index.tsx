import { Header } from "../components/Header/Header";
import { Hero } from "../components/Hero/Hero";
import classes from "./index.module.css";
import "@mantine/carousel/styles.css";
import { AuthContext, AuthProvider } from "../context/AuthContext";
import { useContext } from "react";
import { PartnersFeatures } from "../components/Partners/Features/ParntersFeatures";

export default function IndexPage() {
  const authContext = useContext(AuthContext);
  console.log("Auth data:", authContext);
  return (
    <>
      <Header></Header>
      <Hero></Hero>
    
    </>
  );
}
