import React from "react";
import UserSearchCard from "./UserSearchCard";
import { Stack, Button } from "@chakra-ui/react";

const UserSearchContainer = () => {
    return(
        <>
        <Stack direction='row' w='65%' borderRadius='7px' p={3} m={3} backgroundColor={"gray.300"}>
        <UserSearchCard />
        <UserSearchCard />
        <UserSearchCard />
        <UserSearchCard />
        <UserSearchCard />
        <UserSearchCard />
        <UserSearchCard />
        <UserSearchCard /> 
        <Button h='150px' w={0} fontSize='sm'>⪢</Button>       
        </Stack>
        </>
    )
}

export default UserSearchContainer