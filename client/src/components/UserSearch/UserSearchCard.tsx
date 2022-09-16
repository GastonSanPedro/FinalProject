import React from "react";
import { Box, Avatar, Text, Center, Stack } from "@chakra-ui/react";

const userImg: string = 'https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105171/126078877-vector-design-of-avatar-and-dummy-symbol-set-of-avatar-and-image-stock-vector-illustration-.jpg?fj=1'


const UserSearchCard = () =>{
    return(
        <>
        <Stack padding='9px' display='flex' flexDir='column' w='100px' h='150px' alignItems='center' justifyContent='center' backgroundColor='gray.200' borderRadius='7px' >
            <Avatar
            size='lg'
            name='user'
            src={userImg}
            />
            <Text as='b' fontSize='xs'>User Name</Text>

        </Stack>
        </>
    )
}

export default UserSearchCard