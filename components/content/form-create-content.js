import { Box, Button, Flex, Input, Textarea } from "@chakra-ui/react";
import { MdOutlineGifBox, MdOutlineAttachFile } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { Field, Form, Formik } from "formik";
import { mutate } from "swr";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";

export default function FormCreateContent() {
  const token = Cookies.get("token");
  const createPost = async (value) => {
    try {
      const response = await axios.post(
        "https://paace-f178cafcae7b.nevacloud.io/api/post",
        value,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      Swal.fire({
        title: "Posting Success",
        icon: "success",
      });
      handleNewPost();
    } catch (error) {
      Swal.fire({
        title: "Failed to post ",
      });
    }
  };
  const handleNewPost = (newPost) => {
    mutate("https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all");
  };
  return (
    <Flex
      pt={"20px"}
      pb={"10px"}
      borderBottom={"1px solid"}
      borderColor={"gray.300"}
      w={"100%"}
    >
      <Box w={"100%"}>
        <Flex fontSize={"30px"} fontWeight={"bold"} color={"gray.700"}>
          Share your thoughts with the world
        </Flex>
        <Formik
          initialValues={{
            description: "",
          }}
          onSubmit={(values, { resetForm }) => {
            createPost(values);
            resetForm();
          }}
        >
          <Form>
            <Flex w={"100%"}>
              <Textarea
                as={Field}
                name="description"
                px={"0"}
                fontSize={"22px"}
                border={"none"}
                focusBorderColor="transparent"
                _placeholder={{ fontSize: "20px" }}
                placeholder="What's happening?"
              />
            </Flex>
            <Flex alignItems={"center"} justifyContent={"space-between"}>
              <Flex gap={"10px"}>
                <FaImage cursor={"pointer"} size={"25px"} />
                <MdOutlineGifBox cursor={"pointer"} size={"25px"} />
                <FaRegSmile cursor={"pointer"} size={"25px"} />
                <MdOutlineAttachFile cursor={"pointer"} size={"25px"} />
              </Flex>
              <Flex>
                <Button type="submit">Send</Button>
              </Flex>
            </Flex>
          </Form>
        </Formik>
      </Box>
    </Flex>
  );
}
