import React from "react";
import { Avatar, Box, Stack, Text } from "@chakra-ui/react";
const userImg: string = 'https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105171/126078877-vector-design-of-avatar-and-dummy-symbol-set-of-avatar-and-image-stock-vector-illustration-.jpg?fj=1'


const Friend = () => {
    return(
        <>
        <Stack backgroundColor='gray.200' direction='row' w='90%' h='30px' p={1} pl={3} borderRadius='5px' >
        <Avatar
            size='xs'
            name='user'
            src={userImg}
            />
        <Text fontSize='sm' >Friend Name</Text>
        </Stack>
        </>
    )
}
export default Friend