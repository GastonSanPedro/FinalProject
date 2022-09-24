import {
    Heading,
    Avatar,
    Box,
    Center,
    Flex,
    Text,
    Stack,
    Button,
  } from '@chakra-ui/react';
  import { Link } from 'react-router-dom';
  const userImg = 'https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105171/126078877-vector-design-of-avatar-and-dummy-symbol-set-of-avatar-and-image-stock-vector-illustration-.jpg?fj=1'

  function randomNumber(min, max) { 
    let a = Math.random() * (max - min) + min;
  	return Math.floor(a)
} 
  
  export default function SearchUserCard({firstName, lastName, image, email}) {
    return (
      <Center >
        <Box
          maxH={250}
          h={'100%'}
          minW={160}
          w={'full'}
          bg={'white'}
          overflow={'hidden'}>
          <Box
            h={20}
            w={'full'}
            bg={`logo.${randomNumber(1,4)}`}
          />
          <Flex justify={'center'} mt={'-40%'} >
            <Avatar
              size={'lg'}
              mt={'18%'}
              src={image?image:userImg}
              alt={'Author'}
              css={{
                border: '2px solid white',
              }}
            />
          </Flex>
  
          <Box p={3}>
            <Stack spacing={0} align={'center'} mb={2}>
              <Heading fontSize={'lg'} fontWeight={500} fontFamily={'body'}>
                {firstName[0].toUpperCase()+ firstName.substring(1)}
                <br/>{lastName[0].toUpperCase()+ lastName.substring(1)}
              </Heading>
            </Stack>
  
            <Stack direction={'row'} justify={'center'} spacing={6}>
              <Flex spacing={0} align={'center'} dir={'column'}>
                <Text fontSize={'sm'} fontWeight={600} mr={2} >23k</Text>
                <Text fontSize={'sm'} color={'gray.500'}>
                  Friends
                </Text>
              </Flex>
            </Stack>
              <Link to={`/user/${email}`}>
            <Button
              size={'sm'}
              w={'full'}
              mt={2}
              bg={'logo.3'}
              color={'white'}
              rounded={'md'}
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'lg',
              }}>
              Go to profile
            </Button>
            </Link>
          </Box>
        </Box>
      </Center>
    );
  }