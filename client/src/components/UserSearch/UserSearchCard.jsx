import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Text, Stack, Box } from "@chakra-ui/react";

const userImg = 'https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105171/126078877-vector-design-of-avatar-and-dummy-symbol-set-of-avatar-and-image-stock-vector-illustration-.jpg?fj=1'


const UserSearchCard = ({firstName, lastName, image, email}) =>{
    return(
        <>
        <Link to={`/user/${email}`}>
        <Stack display='flex' flexDir='column' w='100px' h='150px' alignItems='center' justifyContent='center' backgroundColor='gray.200' borderRadius='7px' >
            <Box>
            <Avatar
            size='lg'
            name='user'
            src={image?image:userImg}
            />
            </Box>
            <Box textAlign='center'>
                <Text as='b' fontSize='xs'>{firstName} {lastName}</Text>
            </Box>
        </Stack>
        </Link>
        </>
    )
}

export default UserSearchCard