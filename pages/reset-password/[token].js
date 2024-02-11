import FormResetPassword from "@/components/auth/form-reset-password";
import { Flex } from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function ResetPassword(){
    const route = useRouter()
    const {token} = route.query
    return(
        <Flex w={"100%"}>
            <Flex w={"75%"}  display={{base:"none", lg:"flex"}}>
                <Flex w={"100%"} h={"100vh"} bgImage={`url(https://source.unsplash.com/random?snow-mountain)`} backgroundSize={"cover"}></Flex>
            </Flex>
            <Flex pt={"10%"} w={{base:"100%", lg:"50%"}}>
                <FormResetPassword />
            </Flex>
        </Flex>
    )
}