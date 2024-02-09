import { Box, Button, Flex } from "@chakra-ui/react";
import { HiHome } from "react-icons/hi";
import { FaBell } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { FaBook } from "react-icons/fa6";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Sidebar() {
  const router = useRouter();
  const handleLogOut = () => {
    Cookies.remove("token");
    router.push("/login");
  };
  return (
    <Box borderRight={'1px solid'} borderColor={"gray.200"} h={"100vh"} position={"fixed"} w={"20%"}>
      <Flex
        as={Link}
        href={"/"}
        p={"20px"}
        fontSize={"30px"}
        fontWeight={"extrabold"}
        color={"gray.700"}
        mb={"50px"}
      >
        Sanber Daily
      </Flex>
      <Box>
        <Flex
          onClick={() => router.push('/')}
          mb={"10px"}
          p={"20px"}
          px={"30px"}
          justifyContent={"start"}
          transition={"0.2s"}
          cursor={"pointer"}
          _hover={{ bgColor: "gray.100" }}
          fontSize={"20px"}
          alignItems={"center"}
          gap={"10px"}
        >
          <HiHome size={"30px"} />
          <Flex >Home</Flex>
        </Flex>
        <Flex
          mb={"10px"}
          p={"20px"}
          px={"30px"}
          justifyContent={"start"}
          transition={"0.2s"}
          cursor={"pointer"}
          _hover={{ bgColor: "gray.100" }}
          fontSize={"20px"}
          alignItems={"center"}
          gap={"10px"}
        >
          <FaBook size={"30px"} />
          <Flex>Your Daily</Flex>
        </Flex>
        <Flex
          onClick={() => router.push('/notifications')}
          mb={"10px"}
          p={"20px"}
          px={"30px"}
          justifyContent={"start"}
          transition={"0.2s"}
          cursor={"pointer"}
          _hover={{ bgColor: "gray.100" }}
          fontSize={"20px"}
          alignItems={"center"}
          gap={"10px"}
        >
          <FaBell size={"30px"} />
          <Flex>Notifications</Flex>
        </Flex>
        <Flex
          mb={"10px"}
          p={"20px"}
          px={"30px"}
          justifyContent={"start"}
          transition={"0.2s"}
          cursor={"pointer"}
          _hover={{ bgColor: "gray.100" }}
          fontSize={"20px"}
          alignItems={"center"}
          gap={"10px"}
          onClick={() => router.push('/profile')}
        >
          <IoPerson size={"30px"} />
          <Flex>Profile</Flex>
        </Flex>
      </Box>
      <Flex h={"30vh"} align={"end"} justifyContent={"center"} mt={"50px"}>
        <Button px={"50px"} py={"20px"} bottom={0} bg={"gray.700"} onClick={handleLogOut} transition={"0.2s"} borderRadius={"20px"} color={"gray.200"} _hover={{ bgColor: "gray.600" }}>
          Log Out
        </Button>
      </Flex>
    </Box>
  );
}
