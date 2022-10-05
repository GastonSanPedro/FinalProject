import {Center, Box, Flex ,Avatar, Stack, Button, Text, Heading, HStack} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom';

export default function SearchUserCard ({fullName, image, firstName, lastName, email, friends, posts, bio, userName}) {
  const navigate = useNavigate()
  function randomNumber(min, max) {
    let a = Math.random() * (max - min) + min;
    return Math.floor(a);
  }
    return(
        <>
        
        <Stack
        bg={'white'}
        display={'flex'}
        flexDir={'row'}
        align={'center'}
        minW={700}
        h={100}
        borderRadius={2}>

        <Box
          bg={`logo.${randomNumber(1,4)}`}
          h={100}
          w={10}
          mr={'2%'}/>
          <Avatar
            size={'lg'}
            src={image}
            name={fullName}
            alt={'Author'}
            css={{
            border: '4px solid white',
              }}/>
          <Box
            w={'20%'}
            p={2}
            mr={'2%'}>
            <Heading
              fontSize={'md'}
              textAlign={'left'}
              >
               {firstName}
                <br/>{lastName}
            </Heading>
            <Text fontSize={'xs'} color={'gray.700'}>{userName}</Text>
          </Box>
          <Box
          w={'25%'}>
          </Box>
          <Stack display={'flex'} flexDir={'row'} w={'15%'}>
            <Flex flexDir={'column'}>
              <Text fontSize={'sm'} color={'gray.500'}>Following</Text>
              <Text fontSize={'sm'} fontWeight={600} mr={2}>{friends.length}</Text>
            </Flex>
          </Stack>
          <Stack display={'flex'} flexDir={'row'} w={'15%'}>
            <Flex flexDir={'column'} >
                <Text fontSize={'sm'} color={'gray.500'}>Posts</Text>
                <Text fontSize={'sm'} fontWeight={600} mr={2}>{posts.length}</Text>
              </Flex>
            </Stack>

            <Box
            display={'flex'}
            flexDir={'column'}
            left={'1%'}
            w={'30%'}
             >         
                <Button
                onClick={()=>{navigate(`/user/${email}`)}}
                size={'sm'}
                w={'80%'}
                mt={2}
                bg={'logo.3'}
                color={'white'}
                rounded={'md'}
                _hover={{
                  transform: 'translateY(-2px)',
                  boxShadow: 'lg',
                }}
                  >
                  Profile
                </Button>

            </Box>
        </Stack>

      
        </>
    )
}