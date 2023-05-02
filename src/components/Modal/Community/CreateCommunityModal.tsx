import {
  Text,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Button,
  ModalFooter,
  Box,
  CheckboxGroup,
  Input,
  Checkbox,
  Stack,
  Icon,
} from "@chakra-ui/react";
import { BsFillEyeFill, BsFillPersonFill } from "react-icons/bs";
import { HiLockClosed } from "react-icons/hi";

import React, { useState } from "react";
import { auth, firestore } from "@/src/firebase/clientApp";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";

type CreateCommunityModalProps = {
  open: boolean;
  handleClose: () => void;
};

const CreateCommunityModal: React.FC<CreateCommunityModalProps> = ({
  open,
  handleClose,
}) => {
  const [user] = useAuthState(auth);
  const [communityName, setCommunityName] = useState("");
  const [error, setError] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [communityType, setCommunityType] = useState("public");
  const [loading, setLoading] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;

    setCommunityName(event.target.value);

    setCharsRemaining(21 - event.target.value.length);
  };

  const onCommunityTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCommunityType(event.target.name);
  };

  const handleCreateCommunity = async () => {
    if (error) setError("");
    // validate community name
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;

    if (communityName.length < 3 || format.test(communityName)) {
      setError(
        "Community names must be between 3 and 21 characters, and can only contain letters, numbers or underscores"
      );
      return;
    }

    setLoading(true);

    try {
      const communityDocRef = doc(firestore, "communities", communityName);

      await runTransaction(firestore, async (transaction) => {
        // check if name is not taken
        const communityDoc = await transaction.get(communityDocRef);
        if (communityDoc.exists()) {
          throw new Error(`Sorry, r/${communityName} is taken! Try another.`);
        }

        // name is valid + unique
        // Create community in firestore
        transaction.set(communityDocRef, {
          createdId: user?.uid,
          createdAt: serverTimestamp(),
          numberOfMembers: 1,
          privacyType: communityType,
        });

        // create communitySnippet on user
        transaction.set(
          doc(firestore, `users/${user?.uid}/communitySnippets`, communityName),
          {
            communityId: communityName,
            isModerator: true,
          }
        );
      });
    } catch (error: any) {
      console.log("handleCreateCommunity error", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={open}
      onClose={handleClose}
      size="lg"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader
          display="flex"
          flexDirection="column"
          fontSize={15}
          padding={3}
        >
          Create a community
        </ModalHeader>
        <Box pl={3} pr={3}>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" padding="10px 0px">
            <Text fontWeight={600} fontSize={15}>
              Name
            </Text>
            <Text fontSize={11} color="gray.500">
              Community names including capitalization cannot be changed
            </Text>

            <Text
              position="relative"
              top="28px"
              left="10px"
              width="20px"
              color="gray.400"
            >
              /r
            </Text>
            <Input
              position="relative"
              value={communityName}
              size="sm"
              pl="22px"
              onChange={handleChange}
            />

            <Text
              color={charsRemaining === 0 ? "red" : "gray.500"}
              fontSize="9pt"
            >
              {charsRemaining} Characters remaining
            </Text>

            {error && (
              <Text fontSize="9pt" color="red" pt={1}>
                {error}
              </Text>
            )}

            <Box mt={4} mb={4}>
              <Text fontWeight={600} fontSize={15}>
                Create Community
              </Text>
            </Box>

            <Stack spacing={2}>
              <Checkbox
                name="public"
                isChecked={communityType === "public"}
                onChange={onCommunityTypeChange}
              >
                <Flex align="center">
                  <Icon as={BsFillPersonFill} color="gray.500" mr={2} />
                  <Text mr={1} fontSize="10pt">
                    Public
                  </Text>
                  <Text fontSize="8pt" color="gray.500">
                    Anyone can view, post & comment to this community
                  </Text>
                </Flex>
              </Checkbox>
              <Checkbox
                name="restricted"
                isChecked={communityType === "restricted"}
                onChange={onCommunityTypeChange}
              >
                <Flex align="center">
                  <Icon as={BsFillEyeFill} color="gray.500" mr={2} />
                  <Text mr={1} fontSize="10pt">
                    Restricted
                  </Text>
                  <Text fontSize="8pt" color="gray.500">
                    Anyone can view this community, only members can post
                  </Text>
                </Flex>
              </Checkbox>
              <Checkbox
                name="private"
                isChecked={communityType === "private"}
                onChange={onCommunityTypeChange}
              >
                <Flex align="center">
                  <Icon as={HiLockClosed} color="gray.500" mr={2} />
                  <Text mr={1} fontSize="10pt">
                    Private
                  </Text>
                  <Text fontSize="8pt" color="gray.500">
                    Only approved users can view, post or comment
                  </Text>
                </Flex>
              </Checkbox>
            </Stack>
          </ModalBody>
        </Box>

        <ModalFooter bg="gray.100" borderRadius="0px 0px 10px 10px">
          <Button
            variant="outline"
            height="30px"
            colorScheme="blue"
            mr={3}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            height="30px"
            onClick={handleCreateCommunity}
            isLoading={loading}
          >
            Create Community
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default CreateCommunityModal;
