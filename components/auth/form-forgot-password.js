import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";
import { useRouter } from "next/router";

export default function FormForgotPassword() {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const handleShow = () => {
    setShow(!show);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required!"),
  });

  const handleSubmit = async (value) => {
    try {
      const response = await Axios.post(
        `https://paace-f178cafcae7b.nevacloud.io/api/forgot-password`,
        value
      );
      router.push(`/reset-password/${response.data.data.token}`);
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
      <Box mb={"30px"} fontSize={"80px"} fontWeight={"bold"} color={"gray.700"}>
        <Flex>Forgot</Flex>
        <Flex>Password ?</Flex>
      </Box>
      <Flex mb={"10px"}>
        Enter the email adress assosiated with your account
      </Flex>
      <Box w={"100%"}>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          <Form>
            <Box mb={"30px"}>
              <Field as={Input} placeholder={"Enter your email"} name="email" />
              <ErrorMessage
                name="email"
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
              Submit
            </Button>
          </Form>
        </Formik>
        <Flex mt={"10px"} w={"100%"} justifyContent={"end"}>
          <Link href={"/login"} cursor={"pointer"}>
            Back to login
          </Link>
        </Flex>
      </Box>
    </Box>
  );
}
