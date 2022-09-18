import React, { useState } from "react";
import UserSearchCard from "./UserSearchCard";
import { Stack, Button, Text, Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const UserSearchContainer = () => {

    const searchUsers = useSelector((state)=> state.searchUser)
    const first8 = searchUsers.length > 8 ? searchUsers?.slice(0,8) : searchUsers
    


    return(
        <>
        <Stack direction='row' borderRadius='7px' display='flex' justifyContent='space-between' p={3} m={3} backgroundColor={"gray.300"}>
        <Stack direction='row'>
        { searchUsers.length 
            ? first8.map(user =>{
                <UserSearchCard
                    firstName={user.firstName}
                    lastName={user.lastName}
                    img={user.image}/>
                })
            :<Box h={10}><Text>No user match</Text></Box>}
        </Stack>
        {
            searchUsers.length ? <Button h='150px' w={0} fontSize='sm'>⪢</Button> : null
        }
              
        </Stack>
        </>
    )
}

export default UserSearchContainer