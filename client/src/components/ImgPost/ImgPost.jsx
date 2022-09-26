import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function randomNumber(min, max) {
  let a = Math.random() * (max - min) + min;
  return Math.floor(a);
}

export default function ImgPost({
  image,
  fullName,
  description,
  date,
  avatar,
  userName,
  email
}) {

  return (
    <Center py={6}>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        rounded={'sm'}
        p={6}
        overflow={'hidden'}
        _hover={{
          bg: `logo.${randomNumber(1, 4)}`,
        }}
      >
        <Box h={'210px'} mt={-6} mx={-6} mb={6} pos={'relative'}>
          <Image
            src={image}
            layout={'cover'}
            boxSize="30vh"
            width={'100%'}
            objectFit={'cover'}
          />
        </Box>
        <Stack>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            textTransform="uppercase"
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            {userName}
          </Heading>
          <Text color={'gray.500'}>{description}</Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Link to={`/user/${email}`}>
            <Avatar src={avatar} name={fullName} alt={'Author'} />
          </Link>
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{fullName}</Text>
            <Text color={'gray.500'}>{date}</Text>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
