import { Avatar, Box, Textarea, Input, Button } from '@chakra-ui/react'
import React from 'react'

const CreatePost = () => {
  return (
    <>
        <Box ml={10} mt={5} p={7} w="70%" display={'flex'} backgroundColor={'#ECEAEA'}>
            <Avatar size='xl' name='usuario' src='https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105171/126078877-vector-design-of-avatar-and-dummy-symbol-set-of-avatar-and-image-stock-vector-illustration-.jpg?fj=1'/>
            <Box ml={8} w="90%">
                <Input placeholder='Titulo del post' size={'sm'} w={'60%'}/>
                <Textarea placeholder='En que estas pensando' size='md' mt={2}/>
                <Box textAlign={'right'}>
                <Button colorScheme={'green'} mt={2}>Publicar</Button>
                </Box>
            </Box>
            

        </Box>
    </>
  )
}

export default CreatePost