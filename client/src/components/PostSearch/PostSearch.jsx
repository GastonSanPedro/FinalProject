import React from 'react'
import { Box, Avatar, Text, Stack, Center, HStack, VStack } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useEffect } from 'react';

const PostSearch = ({ fullName, image, posteos, socket, user }) => {

    const [liked, setLiked] = useState(false)
    
    const handleNotification = () =>{
        setLiked(true)
        socket.emit("sendNotification",{
            senderId:user,
            reciverId:"tomar el id"
        })
    }

    return (
        <>
            <Box
                ml={7}
                width='40%'
                display={'flex'}
                alignItems='center'
                justifyContent='space-between'
                backgroundColor='gray.200'
                borderRadius={7}>
                <VStack>
                    <HStack>

                        <Stack alignItems='center'>
                            <Avatar mt="5%" ml={3} size='lg' name='usuario' src={image ? image : "https://avatarfiles.alphacoders.com/128/thumb-128984.png"} />
                            <Center p={3}><Text fontWeight="bold" >{fullName}</Text ></Center>
                        </Stack>
                        <Box m={2} p={2} backgroundColor='white' borderRadius={7}>
                            <Text fontWeight='light' >{posteos}</Text>
                        </Box>
                    </HStack>
                    {liked ? (<StarIcon color="yellow" />
                    ) : (<StarIcon color="black" onClick={handleNotification}/>)}
                </VStack>


            </Box>
        </>
    )
}

export default PostSearch