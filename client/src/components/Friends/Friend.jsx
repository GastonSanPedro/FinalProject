import React from "react";
import {Link}  from 'react-router-dom';
import { Avatar, Box, Stack, Text } from "@chakra-ui/react";
const userImg = 'https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105171/126078877-vector-design-of-avatar-and-dummy-symbol-set-of-avatar-and-image-stock-vector-illustration-.jpg?fj=1'



const Friend = ({ id, firstName, lastName,email }) => {

    return (
        <Box w="90%">
        <Link to={'/user/' + email} >
            <Stack backgroundColor='gray.200' direction='row' w='90%' h='30px' p={1} pl={3} borderRadius='5px' >
                <Avatar
                    size='xs'
                    name='user'
                    src={userImg}
                />
                <Text fontSize='sm' >{firstName} {lastName}</Text>
            </Stack>
        </Link>
        </Box>
    )
}
export default Friend