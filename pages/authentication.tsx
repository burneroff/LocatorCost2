import { Paper, Container } from "@mantine/core";
import AuthenticationForm from "../components/AutorizationComponent/AuthFormComp/AuthenticationForm";
import classes from "./AuthPageStyle.module.css";
const formStyles = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  minHeight: "40vh", // Занимаем всю доступную высоту
};

export default function AuthenticationPage() {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Container size={"lg"}>
          <AuthenticationForm style={formStyles}></AuthenticationForm>
        </Container>
      </Paper>
    </div>
  );
}
