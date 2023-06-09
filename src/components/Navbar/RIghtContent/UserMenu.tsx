import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text, 
} from "@chakra-ui/react";
import { User, signOut } from "firebase/auth";
import React from "react";
import { FaRedditSquare } from "react-icons/fa";
import { VscAccount } from "react-icons/vsc";
import { IoSparkles } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { MdOutlineLogin } from "react-icons/md";
import { auth } from "@/src/firebase/clientApp";
import { useSetRecoilState } from "recoil";
import { authModalState } from "@/src/atoms/authModalAtom";

type UserMenuProps = {
  user?: User | null;
};

const UserMenu: React.FC<UserMenuProps> = ({ user }) => {
 const setAuthModalState = useSetRecoilState(authModalState)

  return (
    <Menu>
      <MenuButton
        cursor="pointer"
        padding="0px 6px"
        borderRadius={4}
        _hover={{
          outline: "1px solid",
          outlineColor: "gray.200",
        }}
      >
        {user ? (
          <Flex align="center">
            <Flex align="center">
              <>
                <Icon
                  fontSize={24}
                  mr={1}
                  color="gray.300"
                  as={FaRedditSquare}
                />
                <Flex
                  direction="column"
                  display={{ base: "none", lg: "flex" }}
                  fontSize="8pt"
                  align="flex-start"
                  mr={8}
                >
                    <Text fontWeight={700}>
                        { user?.displayName || user.email?.split("@")[0] }
                    </Text>
                <Flex>
                    <Icon as={IoSparkles} color="brand.100" mr={1} />
                    <Text color="gray.400">1 karma</Text>
                </Flex>
                </Flex>
              </>
              <ChevronDownIcon />
            </Flex>
          </Flex>
        ) : (
          <Icon fontSize={24} mr={1} color="gray.400" as={VscAccount} />
        )}
      </MenuButton>
      <MenuList>

        {
            user ? (
                <>
                 <MenuItem
          fontSize="10pt"
          fontWeight={700}
          _hover={{
            bg: "blue.500",
            color: "white",
          }}
        >
          <Flex align="center">
            <Icon fontSize={20} mr={2} as={CgProfile} />
            Profile
          </Flex>
        </MenuItem>
        
        <MenuItem
          fontSize="10pt"
          fontWeight={700}
          _hover={{
            bg: "blue.500",
            color: "white",
          }}
          onClick={ () => {
            signOut(auth);
          } }
        >
          <Flex align="center">
            <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
            Logout
          </Flex>
        </MenuItem>

                </>
            ) : (
                <>
                      <MenuItem
          fontSize="10pt"
          fontWeight={700}
          _hover={{
            bg: "blue.500",
            color: "white",
          }}
          onClick={ () => {
            setAuthModalState({
                view: 'login', 
                open: true
            })
          } }
        >
          <Flex align="center">
            <Icon fontSize={20} mr={2} as={MdOutlineLogin} />
            Login / Signup
          </Flex>
        </MenuItem>
                </>
            )
        }

             </MenuList>
    </Menu>
  );
};
export default UserMenu;
