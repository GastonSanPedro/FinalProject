import React from "react";
import UserSearchCard from "./UserSearchCard";
import { Stack, Button } from "@chakra-ui/react";

const UserSearchContainer = () => {
    return(
        <>
        <Stack direction='row' borderRadius='7px' display='flex' justifyContent='space-between' p={3} m={3} backgroundColor={"gray.300"}>
        <Stack direction='row'>
        <UserSearchCard />
        <UserSearchCard />
        <UserSearchCard />
        <UserSearchCard />
        <UserSearchCard />
        <UserSearchCard />
        <UserSearchCard />
        <UserSearchCard /> 
        </Stack>
        <Button h='150px' w={0} fontSize='sm'>⪢</Button>       
        </Stack>
        </>
    )
}

export default UserSearchContainer