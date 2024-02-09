import FormForgotPassword from "@/components/auth/form-forgot-password";
import FormLogin from "@/components/auth/form-login";
import FormRegister from "@/components/auth/form-register";
import { Flex } from "@chakra-ui/react";

export default function Register() {
    return(
        <Flex w={"100%"}>
            <Flex w={"75%"}  display={{base:"none", lg:"flex"}}>
                <Flex w={"100%"} h={"100vh"} bgImage={`/3275434.jpg`} backgroundSize={"cover"}></Flex>
            </Flex>
            <Flex pt={"5%"} w={{base:"100%", lg:"50%"}}>
                <FormForgotPassword />
            </Flex>
        </Flex>
        )
}