import React from 'react'
import { Box, Avatar, Text, Stack } from '@chakra-ui/react'


//Solo me falta ajustar los tamaños con la descipcion, o sea que si viene con mucho texto que sea gande
//despues otro chico onda twett y otro mediado, pero eso lo voy a hacer con lo que me entre y le 
//hago un .lenght, antes de retornar la función

//Variable que me entran, me falta la foto de perfil, y ver como pongo los ids
//userName: string, description: string

//Esto sería masomenos la lógica que quiero hacer con el cmponente
// if (description.lenght > 1000 ){
//     idBox.h = tanto 
// }

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