import { auth } from "@/src/firebase/clientApp";
import getFirebaseProcessedError from "@/src/firebase/errors";
import { Button, Input, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";

type SignupProps = {};

const Signup: React.FC<SignupProps> = () => {
  const [signupForm, setSignupForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // update form state
    setSignupForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    userError,
  ] = useCreateUserWithEmailAndPassword(auth);
  

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // to avoid reloading page
    event.preventDefault();

    if(error) setError('')
    // if(userError) setError('')
    
    if(signupForm.password !== signupForm.confirmPassword) {
        setError("Passwords do not match.");
        return;
    }

    createUserWithEmailAndPassword(signupForm.email, signupForm.password);
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        required
        name="email"
        type="email"
        placeholder="Email"
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{
          color: "gray.500",
        }}
        mb={2}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />

      <Input
        required
        name="password"
        type="password"
        placeholder="Password"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{
          color: "gray.500",
        }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />

      <Input
        required
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        mb={2}
        onChange={onChange}
        fontSize="10pt"
        _placeholder={{
          color: "gray.500",
        }}
        _hover={{
          bg: "white",
          border: "1px solid",
          borderColor: "blue.500",
        }}
        bg="gray.50"
      />

     {error && <Text textAlign="center" color="red" fontSize="10pt">{error}</Text>}
     {userError && <Text textAlign="center" color="red" fontSize="10pt">{getFirebaseProcessedError(userError.code)}</Text>}

      <Button width="100%" height="36px" mt={2} mb={2} type="submit" isLoading={loading}>
        Sign Up
      </Button>
    </form>
  );
};

export default Signup;
