import {
  Box,
  Button,
  Flex,
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
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function AllLikes({ totalLikes, post_id }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [data, setData] = useState([]);
  const token = Cookies.get("token");
  const getAllLikes = async () => {
    try {
      const response = await axios.get(
        `https://paace-f178cafcae7b.nevacloud.io/api/likes/post/${post_id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Flex
        cursor={"pointer"}
        onClick={() => {
          onOpen();
          getAllLikes();
        }}
      >
        {totalLikes}
      </Flex>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader display={"Flex"} justifyContent={"center"}>
            Likes
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box overflowY={"auto"} maxH={"200px"}>
              {data?.map((item, index) => {
                return (
                  <Flex alignItems={"end"} gap={"5px"} py={"10px"} borderBottom={"1px solid"} borderColor={"gray.300"}>
                    <Flex color={"gray.700"} fontSize={"20px"} fontWeight={"bold"}> {item?.user?.name} </Flex>
                    <Flex fontSize={"15px"}>- {item?.user?.email} </Flex>
                  </Flex>
                );
              })}
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
