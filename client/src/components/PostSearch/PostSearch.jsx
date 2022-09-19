import React from 'react'
import { Box, Avatar, Text, Stack } from '@chakra-ui/react'

const PostSearch = ({fullName, image, posteo}) => {
    return (
        <>
            <Box ml={10} mt={5} p={7} w="35%" display={'flex'} backgroundColor={'#ECEAEA'} borderRadius={5}>
                <Box ml={2} w="70%" >
                    {posteo}
                </Box>
                <Stack w="15%" ml={8} >
                    <Avatar mt="5%" ml={3} size='lg' name='usuario' src={image?image:"https://avatarfiles.alphacoders.com/128/thumb-128984.png"} />
                    <Text w="80" pt={0} color="#4f772d" fontWeight="bold" >{fullName}</Text >
                </Stack>
            </Box>
        </>
    )
}

export default PostSearch