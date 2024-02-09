import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { IoIosSearch } from "react-icons/io";

export default function Trends() {
  return (
    <Box
      py={"5px"}
      px={"20px"}
    //   bgColor={"gray.200"}
      h={"100vh"}
      position={"fixed"}
      right={0}
      w={"20%"}
    >
      <Flex
        bg={"gray.700"}
        alignItems={"center"}
        borderRadius={"50px"}
        px={"20px"}
        py={"5px"}
      >
        <IoIosSearch size={"25px"} color="white" />
        <Input
          focusBorderColor="transparent"
          h={"30px"}
          _placeholder={{ color: "gray.300" }}
          color={"gray.200"}
          border={"none"}
          placeholder="Look for"
        />
      </Flex>
      <Box
        mt={"20px"}
        p={"10px"}
        bg={"gray.700"}
        borderRadius={"20px"}
        color={"gray.200"}
      >
        <Flex fontSize={"20px"} fontWeight={"bold"}>
          Premium Subscription
        </Flex>
        <Flex fontSize={"14px"} mt={"10px"}>
          Subscribe to access new features and, if eligible, receive a revenue
          share of ad revenue.
        </Flex>
        <Button
          mt={"10px"}
          borderRadius={"40px"}
          bg={"gray.200"}
          color={"gray.700"}
          _hover={{ bg: "gray.300" }}
          transition={"0.2s"}
        >
          Subscription
        </Button>
      </Box>
      <Box
        mt={"20px"}
        borderRadius={"20px"}
        bg={"gray.700"}
        color={"gray.200"}
      >
        <Flex p={"10px"} fontSize={"25px"} fontWeight={"bold"}>
          Trends for you
        </Flex>
        <Box cursor={"pointer"} _hover={{bg:"gray.600"}} p={"10px"} fontSize={"14px"} mt={"5px"}>
          <Flex color={"gray.400"}>Trending in indonesia</Flex>
          <Flex fontWeight={"bold"}>#World</Flex>
          <Flex color={"gray.400"}>43.9k posts</Flex>
        </Box>
        <Box cursor={"pointer"} _hover={{bg:"gray.600"}} p={"10px"} fontSize={"14px"} mt={"5px"}>
          <Flex color={"gray.400"}>Trending in indonesia</Flex>
          <Flex fontWeight={"bold"}>#Animal</Flex>
          <Flex color={"gray.400"}>41.2k posts</Flex>
        </Box>
        <Box cursor={"pointer"} _hover={{bg:"gray.600"}} p={"10px"} fontSize={"14px"} mt={"5px"}>
          <Flex color={"gray.400"}>Trending in indonesia</Flex>
          <Flex fontWeight={"bold"}>#Nature</Flex>
          <Flex color={"gray.400"}>39.3k posts</Flex>
        </Box>
        <Box cursor={"pointer"} _hover={{bg:"gray.600"}} p={"10px"} fontSize={"14px"} mt={"5px"}>
          <Flex color={"gray.400"}>Trending in indonesia</Flex>
          <Flex fontWeight={"bold"}>#Moon</Flex>
          <Flex color={"gray.400"}>37.8k posts</Flex>
        </Box>
        <Box cursor={"pointer"} _hover={{bg:"gray.600", borderBottomRadius:"20px"}} p={"10px"} fontSize={"14px"} mt={"5px"}>
          <Flex color={"gray.400"}>Trending in indonesia</Flex>
          <Flex fontWeight={"bold"}>#Food</Flex>
          <Flex color={"gray.400"}>37.6k posts</Flex>
        </Box>
      </Box>
    </Box>
  );
}
