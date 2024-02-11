import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useState } from "react";
import * as Yup from "yup";
import Axios from "axios";
import Swal from "sweetalert2";
import Link from "next/link";
import { useRouter } from "next/router";

export default function FormResetPassword() {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const router = useRouter();
  const {token} = router.query

  const handleShow1 = () => {
    setShow1(!show1);
  };
  const handleShow2 = () => {
    setShow2(!show2);
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string().required("New password is required!"),
    confirmPassword: Yup.string().required("Confirm password is required!").oneOf([Yup.ref("password"), null], "password not match")
  });

  const handleSubmit = async (value) => {
    try {
      const response = await Axios.post(
        `https://paace-f178cafcae7b.nevacloud.io/api/update-password`,
        {password: value.password},{
            headers: {Authorization: `Bearer ${token}`}
        }
      );
      router.push(`/login`);
      Swal.fire({
        title: "Let's login with new password",
        icon:"success"
      })
    } catch (error) {
        console.log(error);
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
      <Box mb={"30px"} fontSize={"50px"} fontWeight={"bold"} color={"gray.700"}>
        <Flex>Reset Your Password</Flex>
      </Box>
      <Box w={"100%"}>
        <Formik
          initialValues={{
            password: "",
            confirmPassword: ""
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          <Form>
            <Box mb={"30px"}>
              <Flex>New Password</Flex>
              <Flex alignItems={"center"} gap={"5px"}>
                <Field
                  as={Input}
                  type={show1? "text" : "password"}
                  placeholder={"Enter your email"}
                  name="password"
                />
                {show1? <IoEye size={"25px"} cursor={"pointer"} onClick={handleShow1} /> : <IoEyeOff size={"25px"} cursor={"pointer"} onClick={handleShow1} />}
              </Flex>
              <ErrorMessage
                name="password"
                component={"div"}
                style={{ color: "red" }}
              />
            </Box>
            <Box mb={"30px"}>
                <Flex>Confirm Password</Flex>
            <Flex alignItems={"center"} gap={"5px"}>
                <Field
                  as={Input}
                  type={show2? "text" : "password"}
                  placeholder={"Enter your email"}
                  name="confirmPassword"
                />
                {show2? <IoEye size={"25px"} cursor={"pointer"} onClick={handleShow2} /> : <IoEyeOff size={"25px"} cursor={"pointer"} onClick={handleShow2} />}
              </Flex>
              <ErrorMessage
                name="confirmPassword"
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
        <Flex mt={"10px"} w={"100%"} justifyContent={"end"}></Flex>
      </Box>
    </Box>
  );
}
