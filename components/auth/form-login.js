import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

export default function FormLogin() {
  const [show, setShow] = useState(false);
  const route = useRouter()

  const handleShow = () => {
    setShow(!show);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required!"),
    password: Yup.string().required("password is required!"),
  });

  
  const handleSubmit = async (value) => {
    try {
      const response = await Axios.post(
        `https://paace-f178cafcae7b.nevacloud.io/api/login`,
        value
        );
        Cookies.set('token',response.data.data.token, { expires: new Date(response.data.data.expires_at)})
        Swal.fire({
        title: "Welcome to Sanber Daily",
        icon: "success",
      });
      route.push('/')
      
    } catch (error) {
      Swal.fire({
        title: "Something wrong!",
        text: "Please ensure your account is correct",
        icon: "warning",
        iconColor: "red",
      });
    }
  };

  const handleFireBase = () => {
    Swal.fire({
      title: "Oops...",
      text: "this feature isn't available yet",
    });
  };

  return (
    <Box p="20px" w={"100%"}>
      <Flex
        mb={"100px"}
        fontSize={"xxx-large"}
        fontWeight={"bold"}
        color={"gray.700"}
      >
        Sanber Daily
      </Flex>
      <Box px={"30px"} w={"100%"}>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          <Form>
            <Box mb={"30px"}>
              <Flex fontSize={"20px"} mb={"10px"}>
                Email
              </Flex>
              <Field as={Input} name="email" />
              <ErrorMessage
                name="email"
                component={"div"}
                style={{ color: "red" }}
              />
            </Box>
            <Box mb={"20px"}>
              <Flex fontSize={"20px"} mb={"10px"}>
                Password
              </Flex>
              <Flex alignItems={"center"} gap={"5px"}>
                <Field
                  type={show ? "text" : "password"}
                  as={Input}
                  name="password"
                />
                <IoEye
                  onClick={handleShow}
                  cursor={"pointer"}
                  size={"25px"}
                  style={{ display: show ? "block" : "none" }}
                />
                <IoEyeOff
                  onClick={handleShow}
                  cursor={"pointer"}
                  size={"25px"}
                  style={{ display: !show ? "block" : "none" }}
                />
              </Flex>
              <ErrorMessage
                name="password"
                component={"div"}
                style={{ color: "red" }}
              />
            </Box>
            <Button
              w={"100%"}
              color={"white"}
              bgColor={"gray.700"}
              _hover={{ bgColor: "gray.600" }}
              mb={"10px"}
              type="submit"
            >
              Login
            </Button>
            <Flex
              alignItems={"center"}
              gap={"10px"}
              w={"100%"}
              bgColor={"gray.100"}
              p={"7px"}
              _hover={{ bgColor: "gray.200" }}
              cursor={"pointer"}
              transition={"0.2s"}
              justifyContent={"center"}
              borderRadius={"5px"}
              onClick={handleFireBase}
            >
              <FcGoogle size={"25px"} />
            </Flex>
          </Form>
        </Formik>
        <Flex justifyContent={"space-between"} mt={"10px"}>
          <Link href={"/reset-password"} cursor={"pointer"}>
            Forgot password
          </Link>
          <Link href={"/register"} cursor={"pointer"}>
            Don't have account?
          </Link>
        </Flex>
      </Box>
    </Box>
  );
}
