import Layout from "@/layout";
import {
  Box,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  TabIndicator,
} from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

export default function Notifications() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const token = Cookies.get("token");

  const getAllNotif = async () => {
    try {
      const response = await axios.get(
        `https://paace-f178cafcae7b.nevacloud.io/api/notifications`,
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
    getAllNotif();
  }, []);
  return (
    <>
      <Layout metaTitle={"Notification"}>
        <Box w={"100%"} pt={"20px"} px={"25%"}>
          <Flex gap={"20px"} alignItems={"center"}>
            <IoIosArrowRoundBack
              cursor={"pointer"}
              onClick={() => router.push("/")}
              size={"40px"}
            />
            <Flex fontSize={"30px"} fontWeight={"bold"}>
              Notification
            </Flex>
          </Flex>
          <Tabs variant={"unstyled"}>
            <TabList
              borderBottom={"1px solid"}
              borderColor={"gray.300"}
              gap={"250px"}
            >
              <Tab fontWeight={"bold"} color={"gray.700"}>
                All
              </Tab>
              <Tab fontWeight={"bold"} color={"gray.700"}>
                Verified
              </Tab>
              <Tab fontWeight={"bold"} color={"gray.700"}>
                Designations
              </Tab>
            </TabList>
            <TabIndicator
              mt="-1.5px"
              height="2px"
              bg="gray.700"
              borderRadius="1px"
            />

            <TabPanels>
              <TabPanel>
                {data ? (
                  <>
                    {data.map((item, index) => {
                      return (
                        <Box
                          key={index}
                          borderBottom={"1px solid"}
                          borderColor={"gray.200"}
                          py={"25px"}
                        >
                          <Flex
                            alignItems={"end"}
                            justifyContent={"space-between"}
                            gap={"30px"}
                          >
                            {item.remark !== "like" ? (
                              <Flex>
                                <Flex fontSize={"20px"} gap={"5px"}>
                                  <Flex fontWeight={"bold"}>
                                    {item.user.name}
                                  </Flex>
                                  left a replay on your post
                                </Flex>
                              </Flex>
                            ) : (
                              <Flex fontSize={"20px"} gap={"5px"}>
                                <Flex fontWeight={"bold"}>
                                  {item.user.name}
                                </Flex>
                                reacted to post status with a like
                              </Flex>
                            )}
                            <Flex color={"gray.500"} fontSize={"13px"}>
                              {" "}
                              {getTime(item.created_at)}{" "}
                            </Flex>
                          </Flex>
                        </Box>
                      );
                    })}
                  </>
                ) : (
                  "No new updates to notify you about."
                )}
              </TabPanel>
              <TabPanel>
                <p>No new updates to notify you about.</p>
              </TabPanel>
              <TabPanel>
                <p>No new updates to notify you about.</p>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Layout>
    </>
  );
}
