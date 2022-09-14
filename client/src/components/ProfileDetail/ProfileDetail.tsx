import React from 'react'
import {Box, Avatar} from '@chakra-ui/react'

const ProfileDetail = () => {
  return (
    <>
        <Box ml={10} mt={5} p={7} w="70%" display={'flex'} backgroundColor={'#ECEAEA'}>
            <Avatar size='xl' name='usuario' src='https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105171/126078877-vector-design-of-avatar-and-dummy-symbol-set-of-avatar-and-image-stock-vector-illustration-.jpg?fj=1'/>
            <Box ml={8} w="90%">
                Y aca voy a seguir copiando texto como loco.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quod, ullam numquam animi quaerat voluptatum pariatur modi repudiandae voluptates tempore fugit laudantium voluptatibus ut praesentium delectus cupiditate magnam nemo quos accusantium.
            </Box>

        </Box>
    </>
  )
}

export default ProfileDetail