import axios from "axios";
import Cookies from "js-cookie";
import { Avatar, Box, Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegComment } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

export default function AllComment({id, setReload, reload}) {
  const [data, setData] = useState([]);
  const route = useRouter();
  const token = Cookies.get("token");
  const deleteComment = async (id) => {
    try {
      Swal.fire({
        text: "Are you sure you want to delete this replay?",
        showCancelButton: true,
        confirmButtonColor:"red",
        confirmButtonText: "Yes, delete it",
        cancelButtonText: "cancel",
        reverseButtons: true,
      }).then(async (result) => {
        if (result.isConfirmed) {
          try {
            const resposne = await axios.delete(`https://paace-f178cafcae7b.nevacloud.io/api/replies/delete/${id}`,{
              headers: {Authorization: `Bearer ${token}`}
            })
              .then(
                Swal.fire({
                  title: "replay has been deleted successfully.",
                  icon: "success",
                })
              )
              setReload(!reload)
          } catch (error) {
          }
        }
      });      
    } catch (error) {
    }
  }

  const getAllComment = async () => {
    try {
      
      const response = await axios.get(
        `https://paace-f178cafcae7b.nevacloud.io/api/replies/post/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(response.data.data);
    } catch (error) {
      console.log(error);
    }
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
    getAllComment();
  },[id, reload]);
  return (
    <Box w={"full"}>
      {data[0] ? (
        <>
          {data?.map((item, index) => {
            return (
              <Flex
                py={"10px"}
                key={index}
                borderBottom={"1px solid"}
                borderColor={"gray.300"}
                gap={"5px"}
              >
                <Avatar name={item?.user?.name} size={"sm"} mt={"7px"} />
                <Box w={"100%"}>
                  <Flex w={"100%"} justifyContent={"space-between"}>
                    <Flex
                      w={"100%"}
                      gap={"5px"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <Flex>
                        <Flex
                          color={"gray.700"}
                          alignItems={"center"}
                          gap={"5px"}
                        >
                          <Flex fontWeight={"bold"}>{item.user.name}</Flex>
                          <Flex color={"gray.500"} fontSize={"12px"}>
                            {item?.is_own_reply ? "(You)" : null}
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
                      {item.is_own_reply ? (
                        <Flex>
                          <FaTrashAlt onClick={() => deleteComment(item.id)} cursor={"pointer"} />
                        </Flex>
                      ) : null}
                    </Flex>
                    {item?.is_own_post ? (
                      <PostMenu content={item.description} id={item?.id} />
                    ) : null}
                  </Flex>
                  <Flex fontSize={"18px"} py={"5px"}>
                    {" "}
                    {item.description}{" "}
                  </Flex>
                  <Flex
                    px={"10px"}
                    gap={"200px"}
                    color={"gray.600"}
                    alignItems={"center"}
                  >
                    <IoMdHeartEmpty size={"20px"} cursor={"pointer"} />
                    <FaRegComment size={"20px"} cursor={"pointer"} />
                  </Flex>
                </Box>
              </Flex>
            );
          })}
        </>
      ) : (
        <Flex pt={"20px"} borderTop={"1px solid"} borderColor={"gray.300"} fontWeight={'thin'} fontSize={"30px"} color={"gray.300"}>No reply in this post yet</Flex>
      )}
    </Box>
  );
}
