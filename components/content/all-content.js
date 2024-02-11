import { Avatar, Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Axios from "axios";
import Cookies from "js-cookie";
import PostMenu from "../menu/post-menu";
import LikeCommentPost from "./like-coment-post";
import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";

export default function AllContent() {
  const token = Cookies.get("token");
  const route = useRouter();

  const fetcher = async () => {
    try {
      const response = await Axios.get("/api/content", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const { data, error } = useSWR(
    "https://paace-f178cafcae7b.nevacloud.io/api/posts?type=all",
    fetcher,
    {
      revalidateOnMount: true,
      revalidateOnFocus: true,
    }
  );

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

  useEffect(() => {}, [data]);

  return (
    <Box mt={"30px"} pr={"20%"}>
      {data?.map((item, index) => {
        return (
          <Flex
            key={index}
            borderBottom={"1px solid"}
            borderColor={"gray.300"}
            gap={"20px"}
            alignItems={"start"}
          >
            <Flex pt={"15px"}>
              <Avatar size={"md"} name={item.user.name} />
            </Flex>
            <Box w={"100%"}>
              <Box>
                <Flex>
                  <Box mt={"10px"}>
                    <Link href={`/post/${item.id}`}>
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
                          <Flex
                            fontSize={"12px"}
                            gap={"5px"}
                            color={"gray.500"}
                          >
                            <Flex
                              bgColor={"gray.200"}
                              px={"5px"}
                              borderRadius={"10px"}
                            >
                              {item.user.email}
                            </Flex>
                            <Flex>
                              - {getTime(item.updated_at).toString()}{" "}
                            </Flex>
                          </Flex>
                        </Flex>
                      </Flex>
                      <Flex>{item.description}</Flex>
                    </Link>
                    <Box>
                      <LikeCommentPost
                        getTime={getTime}
                        id={item.id}
                        item={item}
                      />
                    </Box>
                  </Box>
                </Flex>
              </Box>
            </Box>
            {item?.is_own_post ? (
              <PostMenu content={item.description} id={item.id} />
            ) : null}
          </Flex>
        );
      })}
    </Box>
  );
}
