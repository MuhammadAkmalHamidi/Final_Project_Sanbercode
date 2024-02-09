import FormLogin from "@/components/auth/form-login";
import { Flex } from "@chakra-ui/react";

export default function Login() {
    return(
        <Flex w={"100%"}>
            <Flex w={"75%"}  display={{base:"none", lg:"flex"}}>
                <Flex w={"100%"} h={"100vh"} bgImage={"url(https://source.unsplash.com/random?chat)"} backgroundSize={"cover"}></Flex>
            </Flex>
            <Flex w={{base:"100%", lg:"50%"}}>
                <FormLogin />
            </Flex>
        </Flex>
        )
}