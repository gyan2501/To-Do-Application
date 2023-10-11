import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Button,
  Stack,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  Select,
  Text,
  Divider,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowsRotate } from "react-icons/fa6";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus, deleteTodo, editTodo } from "../redux/action";

const TodoList = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [editTitle, setEditTitle] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [filter, setFilter] = useState("All");

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setEditTitle(todo.title);
    onOpen();
  };

  const handleUpdate = () => {
    if (editTitle && editingTodo) {
      const updatedTodo = { ...editingTodo, title: editTitle };
      dispatch(editTodo(updatedTodo));
      onClose();
    }
  };
  const handleChangeStatus = (id) => {
    dispatch(changeStatus(id));
  };

  const NewTodos = todos.filter((el) => {
    if (filter === "All") {
      return true; // Show all todos
    } else if (filter === "Completed") {
      return el.status; // Show completed todos
    } else if (filter === "Pending") {
      return !el.status; // Show pending todos
    }
  });
  console.log("filtered", NewTodos);
  return (
    <Box mt={10}>
      <Flex justifyContent={"space-between"} mb={8}>
        <Heading as="h4" size="md">
          To-do List
        </Heading>
        <Box w={{ base: "30%" }}>
          <FormControl>
            <Select
              placeholder="Filter"
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </Select>
          </FormControl>
        </Box>
      </Flex>
      <Divider />
      <Box>
        {NewTodos.length > 0 ? (
          <TableContainer mt={3}>
            <Table variant="striped" colorScheme="blue">
              <Thead>
                <Tr>
                  <Th>Todo</Th>
                  <Th>Status</Th>
                  <Th>Action</Th>
                </Tr>
              </Thead>
              <Tbody>
                {NewTodos?.map((el) => (
                  <Tr key={el.id}>
                    <Td>{el.title}</Td>
                    <Td>{el.status ? "Completed" : "Pending"}</Td>
                    <Td>
                      <Flex>
                        <Popover placement="bottom" isLazy>
                          <PopoverTrigger>
                            <IconButton
                              aria-label="More server options"
                              icon={<BsThreeDotsVertical />}
                              variant="solid"
                              w="fit-content"
                            />
                          </PopoverTrigger>
                          <PopoverContent
                            w="fit-content"
                            _focus={{ boxShadow: "none" }}
                          >
                            <PopoverArrow />
                            <PopoverBody>
                              <Stack>
                                <Button
                                  w="194px"
                                  variant="ghost"
                                  rightIcon={<BiSolidEdit />}
                                  justifyContent="space-between"
                                  fontWeight="normal"
                                  fontSize="sm"
                                  colorScheme="green"
                                  onClick={() => handleEdit(el)}
                                >
                                  EDIT
                                </Button>

                                <Button
                                  w="194px"
                                  variant="ghost"
                                  rightIcon={<FaArrowsRotate />}
                                  justifyContent="space-between"
                                  fontWeight="normal"
                                  fontSize="sm"
                                  onClick={() => handleChangeStatus(el.id)}
                                >
                                  CHANGE STATUS
                                </Button>
                                <Button
                                  w="194px"
                                  variant="ghost"
                                  rightIcon={<AiFillDelete />}
                                  justifyContent="space-between"
                                  fontWeight="normal"
                                  colorScheme="red"
                                  fontSize="sm"
                                  onClick={() => handleDelete(el.id)}
                                >
                                  DELETE
                                </Button>
                              </Stack>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </Flex>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        ) : (
          <Heading as="h3" size="lg" textAlign={"center"} mt={20} color={"blue.400"}>
           No Todos Found! Plan Your Day By Adding Todos....
          </Heading>
        )}

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Update Todo</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Todo Title</FormLabel>
                <Input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                variant="outline"
                mr={3}
                colorScheme="red"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button colorScheme="blue" onClick={handleUpdate}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default TodoList;
