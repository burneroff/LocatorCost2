import { Header } from "../components/Header/Header";
import "@mantine/carousel/styles.css";
import {AuthContext, AuthProvider} from "../context/AuthContext";
import { useContext } from "react";
import { Container, SimpleGrid } from "@mantine/core";
import { CarouselCard } from "../components/CarouselCard/CarouselCard";
import AuctionWithPagination from "../components/AuctionWithPagination/AuctionWithPagination";

export default function IndexPage() {
  const authContext = useContext(AuthContext);
  console.log("Auth data:", authContext )
  return (
    <AuthProvider>
      <Header></Header>
      <AuctionWithPagination></AuctionWithPagination>
    </AuthProvider>
  );
}
