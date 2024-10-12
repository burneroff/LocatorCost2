import { useEffect, useState } from "react";
import { Container, SimpleGrid, Pagination } from "@mantine/core";
import classes from "./auctionPagination.module.css";
import { api } from "../../axiosConfig";
import { CarouselCard } from "../CarouselCard/CarouselCard";

// Define the type for the items
interface Item {
  id: string;
  adTitle: string;
  address: string;
  date: string;
  adDescription: string;
  bids: {
    id: string;
    basicPrice: string;
    stepTime: string;
    dayTime: string;
    bonus: string;
    minimalPrice: string;
    step: string;
    nowPrice: string;
    endTime: string;
    status: string;
    dateForChangePrice: string;
    numberOfBets: string;
  }
  // Add other properties if necessary
}

export default function AuctionWithPagination() {
  const [items, setItems] = useState<Item[]>([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5; // Number of items to show per page

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await api.get("/object/getAll");
        console.log(response.data);
        setItems(response.data);
        console.log("Response from server:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchItems();
  }, []);

  // Calculate the starting and ending indices of the items to display on the current page
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Slice the items array to get the items for the current page
  const paginatedItems = items.slice(startIndex, endIndex);

  return (
    <Container size="1000px" mt={50} className={classes.wrapper}>
      <SimpleGrid cols={1}>
        {paginatedItems.map((item, index) => (
          <CarouselCard
            key={index}
            index={item.id}
            title={item.adTitle}
            address={item.address}
            date={item.date}
            adDescription={item.adDescription}
            basicPrice={item.bids.basicPrice}
            stepTime={item.bids.stepTime}
            dayTime={item.bids.dayTime}
            bonus={item.bids.bonus}
            minimalPrice={item.bids.minimalPrice}
            step={item.bids.step}
            nowPrice={item.bids.nowPrice}
            endTime={item.bids.endTime}
            status={item.bids.status}
            bidsId={item.bids.id}
            dateForChangePrice={item.bids.dateForChangePrice}
            numberOfBets={item.bids.numberOfBets}
          /> 
        ))}
      </SimpleGrid>
      <Pagination
        value={activePage}
        onChange={setActivePage}
        total={Math.ceil(items.length / itemsPerPage)}
        mt="10"
        mb={50}
      />
    </Container>
  );
}
