import { authModalState } from "@/src/atoms/authModalAtom";
import { Flex, ModalFooter, Text } from "@chakra-ui/react";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Login from "./Login";
import Signup from "./Signup";

type AuthInputsProps = {};

const AuthInputs: React.FC<AuthInputsProps> = () => {
  const modalState = useRecoilValue(authModalState);

  const setAuthModalState = useSetRecoilState(authModalState);

  return (
    <Flex direction="column" align="center" width="100%" mt={4}>
      {modalState.view === "login" && <Login />}
      {modalState.view === "signup" && <Signup />}


      {/* showing option to switch the form between login/signup */}
      <Flex fontSize="9pt" justify="center">
        {modalState.view === "signup" && <Text>Already a member?&nbsp;</Text>}
        {modalState.view === "signup" && (
          <Text
            color="blue.500"
            fontWeight="700"
            cursor="pointer"
            onClick={() => {
              setAuthModalState((prev) => ({
                ...prev,
                view: "login",
              }));
            }}
          >
            LOGIN
          </Text>
        )}

        {modalState.view === "login" && <Text>New Here?&nbsp;</Text>}
        {modalState.view === "login" && (
          <Text
            color="blue.500"
            fontWeight="700"
            cursor="pointer"
            onClick={() =>
              setAuthModalState((prev) => ({
                ...prev,
                view: "signup",
              }))
            }
          >
            SIGN UP
          </Text>
        )}
      </Flex>
    </Flex>
  );
};
export default AuthInputs;
