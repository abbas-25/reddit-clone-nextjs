import React, { useState } from "react";
import CreateCommunityModal from "../../Modal/Community/CreateCommunityModal";
import { Button, Flex, Icon, MenuItem } from "@chakra-ui/react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { GrAdd } from "react-icons/gr";

type CommunitiesProps = {};

const Communities: React.FC<CommunitiesProps> = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CreateCommunityModal open={open} handleClose={() => setOpen(false) }/>
      <MenuItem>
        <Flex
          align="center"
          fontSize="10pt"
          width="100%"
          _hover={{
            bg: "gray.200",
          }}
          onClick={ () => setOpen(true) }
        >
          <Icon fontSize={20} mr={2} as={GrAdd} />
          Communities
        </Flex>
      </MenuItem>
    </>
  );
};
export default Communities;
