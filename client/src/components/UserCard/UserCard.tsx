import React from "react";
import { Link } from "react-router-dom";
import { Stack, Avatar, Text, Button } from "@chakra-ui/react";

const userImg: string = 'https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105171/126078877-vector-design-of-avatar-and-dummy-symbol-set-of-avatar-and-image-stock-vector-illustration-.jpg?fj=1'

const UserCard = () => {
    return(
        <>
        <Stack m={3} ml={0} display='flex' flexDir='column' w='200px' h='245px' alignItems='center' justifyContent='center' backgroundColor='gray.200' borderRadius='7px' >
            <Avatar
            size='xl'
            name='user'
            src={userImg}
            />
            <Link to='/profile'><Text as='b' fontSize='sm'>User Name</Text></Link>
            <Button size='sm'>Log Out</Button>

        </Stack>
        </>
    )
}

export default UserCard