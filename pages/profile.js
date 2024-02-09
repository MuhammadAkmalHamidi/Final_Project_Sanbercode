import Layout from "@/layout";
import { Box, Flex } from "@chakra-ui/react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";


export default function Profile() {
  const route = useRouter()
  const token = Cookies.get('token')
  const [data, setData] = useState({})
  const joinDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const localeString = date.toLocaleDateString('en-EN', options);
    return localeString
  }

  const getDataUser = async () => {
    try {
      const response = await axios.get(`https://paace-f178cafcae7b.nevacloud.io/api/user/me`,{
        headers: {Authorization: `Bearer ${token}`}
      })
      setData(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getDataUser()
  },[])
  return (
    <>
      <Layout metaTitle={"Profile"}>
        <Box pl={"25%"} pt={"20px"} w={"full"} pr={"25%"}>
          <Flex alignItems={"center"} gap={"20px"}>
              <IoIosArrowRoundBack cursor={"pointer"} onClick={() => route.push('/')} size={"40px"} />
            <Flex fontWeight={"bold"} fontSize={"30px"}>
              Profile
            </Flex>
          </Flex>
          <Flex borderRadius={"10px"} w={"100%"} h={"300px"} bg={"gray.200"}>

          </Flex>
          <Box>
            <Flex fontSize={"30px"} fontWeight={"bold"} color={"gray.700"}>  
              {data.name}
            </Flex>
            <Flex color={"gray.500"}>
              {data.email}
            </Flex>
          </Box>
          <Flex fontWeight={"bold"} color={"gray.600"} mt={"20px"}>
            Join at {joinDate(new Date(data?.created_at))}
          </Flex>
          <Flex borderBottom={"2px solid"} borderColor={"gray.100"} pb={"10px"} gap={"20px"}>
            <Flex gap={"5px"}>
              <Flex fontWeight={"bold"} color={"gray.600"}>0</Flex>
              <Flex color={"gray.500"}>Followers</Flex>
            </Flex>
            <Flex gap={"5px"}>
              <Flex fontWeight={"bold"} color={"gray.600"}>0</Flex>
              <Flex color={"gray.500"}>Following</Flex>
            </Flex>
          </Flex>
        </Box>
      </Layout>
    </>
  );
}
