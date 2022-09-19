import React from 'react'
import { Box, Avatar, Text, Stack } from '@chakra-ui/react'

const UserSinglePost = () => {
    return (
        <>
            <Box ml={10} mt={5} p={7} w="35%" display={'flex'} backgroundColor={'#ECEAEA'} borderRadius={5}>
                <Box ml={2} w="70%" >
                    Las plantas suculentas del latín succulentus, que significa: "jugoso" o "sustancioso" o crasas son aquellas en las que algún órgano está especializado en el almacenamiento de agua en cantidades mayores que las plantas sin esta adaptación
                    algún órgano está especializado en el almacenamiento de agua en cantidades mayores que las plantas sin esta adaptación
                    algún órgano está especializado en el almacenamiento de agua en cantidades mayores que las plantas sin esta adaptación
                    algún órgano está especializado en el almacenamiento de agua en cantidades mayores que las plantas sin esta adaptación
                </Box>
                <Stack w="15%" ml={8} >
                    <Avatar mt="5%" ml={3} size='xl' name='usuario' src="https://avatarfiles.alphacoders.com/128/thumb-128984.png" />
                    <Text w="80" pt={0} color="#4f772d" fontWeight="bold" >Pepito Gonzalez</Text >
                </Stack>
            </Box>
        </>
    )
}

export default UserSinglePost