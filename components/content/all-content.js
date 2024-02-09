import { Avatar, Box, Flex } from "@chakra-ui/react";
import Axios from "axios";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import PostMenu from "../menu/post-menu";
import LikeCommentPost from "./like-coment-post";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function AllContent() {
  const token = Cookies.get("token");
  const route = useRouter();

  const likePost = async (id) => {
    try {
      const response = await Axios.post(
        `https://paace-f178cafcae7b.nevacloud.io/api/likes/post/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {}
  };
  const fetcher = async (url) => {
    try {
      const response = await Axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      throw new Error("Failed to fetch data");
    }
  };
  const { data, error } = useSWR(
    "https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all",
    fetcher,
    { revalidateOnMount: true, revalidateOnFocus: true }
  );

  const getAllPost = async () => {
    try {
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
    getAllPost();
  }, []);
  return (
    <Box mt={"30px"} pr={"20%"}>
      {data?.map((item, index) => {
        return (
          <Flex
            key={index}
            pt={"15px"}
            borderBottom={"1px solid"}
            borderColor={"gray.300"}
            gap={"20px"}
          >
            <Flex pt={"5px"}>
              <Avatar size={"md"} name={item.user.name} />
            </Flex>
            <Box w={"100%"}>
              <Box>
                <Box>
                  <Flex w={"100%"} justifyContent={"space-between"}>
                    <Flex gap={"5px"} alignItems={"center"}>
                      <Flex
                        color={"gray.700"}
                        alignItems={"center"}
                        gap={"5px"}
                      >
                        <Flex fontWeight={"bold"}>{item.user.name}</Flex>
                        <Flex color={"gray.500"} fontSize={"12px"}>
                          {item?.is_own_post ? "(You)" : null}
                        </Flex>
                      </Flex>
                      <Flex fontSize={"12px"} gap={"5px"} color={"gray.500"}>
                        <Flex
                          bgColor={"gray.200"}
                          px={"5px"}
                          borderRadius={"10px"}
                        >
                          {item.user.email}
                        </Flex>
                        <Flex>- {getTime(item.updated_at).toString()} </Flex>
                      </Flex>
                    </Flex>
                    {item?.is_own_post ? (
                      <PostMenu content={item.description} id={item.id} />
                    ) : null}
                  </Flex>
                </Box>
              </Box>
              <Box>
                <Flex
                  cursor={"pointer"}
                  onClick={() => route.push(`/post/${item.id}`)}
                >
                  {" "}
                  {item.description}{" "}
                </Flex>
                <LikeCommentPost getTime={getTime} id={item.id} item={item} />
              </Box>
            </Box>
          </Flex>
        );
      })}
    </Box>
  );
}
