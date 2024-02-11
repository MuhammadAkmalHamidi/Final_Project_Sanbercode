import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useState } from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";

export default function FormRegister() {
  const [show, setShow] = useState(false);
  const navigate = useRouter();
  const handleShow = () => {
    setShow(!show);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required!"),
    name: Yup.string().required("Name is required!"),
    password: Yup.string().required("password is required!"),
  });

  const handleSubmit = async (value) => {
    try {
      const response = await Axios.post("/api/register", value);
      console.log(response);
      Swal.fire({
        title: response?.data?.massage || "Register Success",
        icon: "success",
      });
      // navigate.push(" /login");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: error?.response?.data.message || "Something wrong",
        icon: "warning",
        iconColor: "red",
      });
    }
  };
  return (
    <Box p="20px" w={"100%"}>
      <Flex
        mb={"100px"}
        fontSize={"xxx-large"}
        fontWeight={"bold"}
        color={"gray.700"}
      >
        Registration
      </Flex>
      <Box px={"30px"} w={"100%"}>
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          <Form>
            <Box mb={"10px"}>
              <Flex fontSize={"20px"} mb={"10px"}>
                Name
              </Flex>
              <Field as={Input} name="name" />
              <ErrorMessage
                name="name"
                component={"div"}
                style={{ color: "red" }}
              />
            </Box>
            <Box mb={"10px"}>
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
              Create account
            </Button>
          </Form>
        </Formik>
        <Flex justifyContent={"end"} mt={"10px"}>
          <Link href={"/login"} cursor={"pointer"}>
            have an account?
          </Link>
        </Flex>
      </Box>
    </Box>
  );
}
