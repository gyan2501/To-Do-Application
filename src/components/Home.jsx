import React from "react";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { Box } from "@chakra-ui/react";

const Home = () => {
  return (
    <Box
      w={{ lg: "50%", sm: "100%" }}
      m="auto"
      p={{ lg: "50px", base: "15px" }}
    >
      <TodoInput />
      <TodoList />
    </Box>
  );
};

export default Home;
