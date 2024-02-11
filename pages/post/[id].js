import { Avatar, Box, Button, Flex, Input, Textarea } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import AllComment from "@/components/content/all-comment";
import LikeCommentPost from "@/components/content/like-coment-post";
import Layout from "@/layout";
import axios from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import useSWR from "swr"

export default function DetailPage() {
  const route = useRouter();
  const token = Cookies.get("token");
  const { id } = route.query;
  const [data, setData] = useState({});
  const [reload, setReload] = useState(false);

  const getPostById = async () => {
    try {
      const response = await axios.get(
        `/api/detailContent`,
        {
          headers: { Authorization: `Bearer ${token}` },
          params: {id: id}
        }
      );
      setData(response.data.data);
    } catch (error) {}
  };

  const handleComment = async (values) => {
    try {
      const response = await axios.post(
        `https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${id}`,
        values,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReload(!reload);
      onClose();
    } catch (error) {}
  };

  const getTime = (updatedAt) => {
    const currentTime = new Date();
    const updatedAtTime = new Date(updatedAt);
    const timeDifference = Math.abs(currentTime - updatedAtTime);

    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.floor(
      (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutesDifference = Math.floor(
      (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
    );

    let result = "";
    if (daysDifference > 0) {
      result += daysDifference + " days ";
    }
    if (hoursDifference > 0) {
      result += hoursDifference + " hours ";
    }
    if (minutesDifference > 0) {
      result += minutesDifference + " minutes ";
    }
    return result;
  };

  useEffect(() => {
    getPostById();
  }, [reload, id]);
  return (
    <>
      <Layout>
        <Box pl={"23%"} pr={"30%"} pt={"20px"} w={"100%"} >
          <Flex alignItems={"center"} gap={"20px"}>
            <Link href={"/"}>
              <IoIosArrowRoundBack size={"40px"} />
            </Link>
            <Flex fontWeight={"bold"} fontSize={"30px"}>
              Post
            </Flex>
          </Flex>
          <Flex gap={"10px"} w={"100%"}>
            <Avatar name={data?.user?.name} mt={"35px"} />
            <Box mt={"30px"} w={"100%"}>
              <Box alignItems={"center"}>
                <Flex color={"gray.700"} alignItems={"center"} gap={"5px"}>
                  <Flex fontWeight={"bold"} fontSize={"20px"}>
                    {data?.user?.name}
                  </Flex>
                  <Flex color={"gray.500"} fontSize={"15px"}>
                    {data?.is_own_post ? "(You)" : null}
                  </Flex>
                </Flex>
                <Flex fontSize={"12px"} gap={"5px"} color={"gray.500"}>
                  <Flex bgColor={"gray.200"} px={"5px"} borderRadius={"10px"}>
                    {data?.user?.email}
                  </Flex>
                </Flex>
              </Box>
              <Flex mt={"15px"} fontSize={"30px"}>
                {data?.description}
              </Flex>
              <Flex fontSize={"13px"} mt={"15px"} color={"gray.400"}>
                {getTime(data.updated_at).toString()}
              </Flex>
              <Flex
                alignItems={"center"}
                mt={"10px"}
                borderY={"1px solid"}
                borderColor={"gray.300"}
                w={"full"}
              >
                <LikeCommentPost
                  setReload={setReload}
                  reload={reload}
                  item={data}
                  id={id}
                  getTime={getTime}
                />
              </Flex>
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
                    <Flex py={"15px"}>
                      <Input
                        required
                        fontSize={"20px"}
                        border={"none"}
                        focusBorderColor="transparent"
                        placeholder="Post Your Replay"
                        as={Field}
                        p={"0px"}
                        name="description"
                      />
                      <Button
                        type="submit"
                        bgColor={"gray.700"}
                        color={"white"}
                        _hover={{ bgColor: "gray.600" }}
                        disabled={!isValid}
                      >
                        Send
                      </Button>
                    </Flex>
                  </Form>
                )}
              </Formik>
              <Flex mt={"20px"}>
                <AllComment setReload={setReload} reload={reload} id={id} />
              </Flex>
            </Box>
          </Flex>
        </Box>
      </Layout>
    </>
  );
}
