import {
  Box,
  Button,
  Flex,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { mutate } from "swr";

export default function PostMenu({ content, id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = Cookies.get("token");

  const handleNewPost = () => {
    mutate("https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all");
  };
  const updatePost = async (value) => {
    try {
      const response = await axios.patch(
        `https://paace-f178cafcae7b.nevacloud.io/api/post/update/${id}`,
        value,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      handleNewPost();
      Swal.fire({
        title: "Update Success",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const deletePost = async () => {
    try {
      Swal.fire({
        text: "Are you sure you want to delete this post?",
        icon: "warning",
        iconColor: "red",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "No, cancel",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const response = await axios
              .delete(
                `https://paace-f178cafcae7b.nevacloud.io/api/post/delete/${id}`,
                {
                  headers: { Authorization: `Bearer ${token}` },
                }
              )
              .then(
                Swal.fire({
                  title: "post Deleted",
                  text: "post has been deleted successfully.",
                  icon: "success",
                })
              );
            handleNewPost();
          } catch (error) {}
        }
      });
    } catch (error) {}
  };

  return (
    <Menu>
      <MenuButton fontSize={"20px"}> ... </MenuButton>
      <MenuList>
        <MenuItem onClick={onOpen}>Edit</MenuItem>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Your Post</ModalHeader>
            <ModalCloseButton />
            <Formik
              initialValues={{
                description: content,
              }}
              onSubmit={(values) => {
                updatePost(values);
                onClose();
              }}
            >
              <Form>
                <ModalBody>
                  <Box>
                    <Flex></Flex>
                    <Field name="description" as={Input} />
                  </Box>
                </ModalBody>
                <ModalFooter gap={"10px"}>
                  <Button onClick={onClose} variant="ghost">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    bgColor={"gray.700"}
                    color={"white"}
                    _hover={{ bgColor: "gray.600" }}
                    mr={3}
                  >
                    Save
                  </Button>
                </ModalFooter>
              </Form>
            </Formik>
          </ModalContent>
        </Modal>
        <MenuItem onClick={deletePost}>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
}
