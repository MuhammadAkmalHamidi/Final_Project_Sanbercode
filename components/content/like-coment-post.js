import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import { MdOutlineGifBox, MdOutlineAttachFile } from "react-icons/md";
import { FaRegSmile } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { Field, Form, Formik } from "formik";
import { mutate } from "swr";
import Axios from "axios";
import Cookies from "js-cookie";
import axios from "axios";
import AllLikes from "./modal-all-likes";

export default function LikeCommentPost({ setReload, reload, id, item, getTime }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const token = Cookies.get("token");
  const handleNewPost = () => {
    mutate("https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all");
    mutate(`https://paace-f178cafcae7b.nevacloud.io/api/post/${id}`);
    mutate(`https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${id}`);
  };

  const likePost = async () => {
    try {
      const response = await Axios.post(
        `https://paace-f178cafcae7b.nevacloud.io/api/likes/post/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      handleNewPost()
      setReload(!reload)
    } catch (error) {
    }
  };

  const unLikePost = async () => {
    try {
      const response = await Axios.post(`https://paace-f178cafcae7b.nevacloud.io/api/unlikes/post/${id}`,{},{
        headers: {Authorization: `Bearer ${token}`}
      })
      handleNewPost()
      setReload(!reload)
    } catch (error) {
      console.log(error);
    }
  }

  const handleComment = async (values) => {
    try {
      const response = await axios.post(
        `https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${id}`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      handleNewPost()
      onClose()
      setReload(!reload)
    } catch (error) {
    }
  };

  return (
    <Flex py={"10px"} zIndex={"10"} alignItems={"center"} gap={"200px"}>
      <Flex gap={"3px"} alignItems={"center"}>
        <Flex>
          {item?.is_like_post ? (
            <IoMdHeart onClick={() => {
              unLikePost(item.id)
            }} cursor={"pointer"} size={"25px"} color="red" />
          ) : (
            <IoMdHeartEmpty
              onClick={() => likePost(item.id)}
              color="gray"
              cursor={"pointer"}
              size="25px"
            />
          )}
        </Flex>
        <Flex>
          <AllLikes post_id={item.id} totalLikes={item?.likes_count}/>
          </Flex>
      </Flex>
      <Flex gap={"3px"} alignItems={"center"}>
        <Flex>
          <FaRegComment
            onClick={onOpen}
            color="gray"
            cursor={"pointer"}
            size={"22px"}
          />
        </Flex>
        <Flex>{item?.replies_count}</Flex>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <Box>
              <Flex gap={"5px"} alignItems={"center"}>
                <Flex color={"gray.700"} alignItems={"center"} gap={"5px"}>
                  <Flex fontWeight={"bold"}>{item?.user?.name}</Flex>
                  <Flex color={"gray.500"} fontSize={"12px"}>
                    {item?.is_own_post ? "(You)" : null}
                  </Flex>
                </Flex>
                <Flex fontSize={"12px"} gap={"5px"} color={"gray.500"}>
                  <Flex bgColor={"gray.200"} px={"5px"} borderRadius={"10px"}>
                    {item?.user?.email}
                  </Flex>
                  <Flex>- {getTime(item?.updated_at).toString()} </Flex>
                </Flex>
              </Flex>
              <Flex>{item?.description}</Flex>
            </Box>
            <Formik
              initialValues={{
                description: "",
              }}
              onSubmit={(values, { resetForm }) => {
                handleComment(values);
                resetForm();
              }}
            >
              {({ isValid }) => (
                <Form>
                  <Box>
                    <Textarea
                      name={"description"}
                      mt={"20px"}
                      placeholder={"Post Your Reply"}
                      fontSize={"20px"}
                      px={"0"}
                      as={Field}
                      border={"none"}
                      focusBorderColor="transparent"
                      required={true}
                    />
                    <Flex justifyContent={"space-between"}>
                      <Flex gap={"10px"} color={"gray.800"}>
                        <FaImage cursor={"pointer"} size={"25px"} />
                        <MdOutlineGifBox cursor={"pointer"} size={"25px"} />
                        <FaRegSmile cursor={"pointer"} size={"25px"} />
                        <MdOutlineAttachFile cursor={"pointer"} size={"25px"} />
                      </Flex>
                      <Button disabled={!isValid} type="submit">Send</Button>
                    </Flex>
                  </Box>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  );
}
