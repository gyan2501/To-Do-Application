import { Box, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../redux/action";
import { v4 as uuidv4 } from "uuid";
const TodoInput = () => {
  const [title, setTitle] = useState("");
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    let todoObj = {
      id: uuidv4(),
      title: title,
      status: false,
    };

    // Dispatch the ADD_TODO action to add new todo
    dispatch(addTodo(todoObj));

    // Reset input field
    setTitle("");
  };

  return (
    <Box>
      <Input
        placeholder="Enter Todo Title"
        size="md"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <Flex justifyContent={"end"}>
        <Button mt={"12px"} colorScheme="blue" onClick={handleAddTodo}>
          Add Todo
        </Button>
      </Flex>
    </Box>
  );
};

export default TodoInput;
