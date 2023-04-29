import { Button, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/clientApp";
import getFirebaseProcessedError from "@/src/firebase/errors";

type OAuthButtonsProps = {};

const OAuthButtons: React.FC<OAuthButtonsProps> = () => {
  const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

  return (
    <Flex direction="column" width="100%" mb={4}>
      <Button variant="oauth" mb={2} isLoading={loading} onClick={() => signInWithGoogle()}>
        <Image
          src="/images/googlelogo.png"
          height="20px"
          alt="google-login"
          mr={4}
        />
        Continue with Google
      </Button>

      <Button variant="oauth">Some other Provider</Button>

      {error && (
        <Text color="red" fontSize="10pt" mt={2}>
          {getFirebaseProcessedError(error.message)}
        </Text>
      )}
    </Flex>
  );
};
export default OAuthButtons;
