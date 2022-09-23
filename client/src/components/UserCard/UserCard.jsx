import { Box, Avatar, Center, VStack } from '@chakra-ui/react';

const UserCard = ({ site, fullName }) => {
  // const handleClick = () => {
  //   localStorage.removeItem('user');
  //   dispatch(logOut());
  //   navigate('/landing-page');
  // };

  return (
    <Box
      ml="80%"
      mt="13%"
      h="53vh"
      w="17.5vw"
      position={'absolute'}
      bgColor="rgba(140, 161, 116, 1.5)"
    >
      <Center>
        <VStack>
          <Avatar
            size="2xl"
            mt="5%"
            src={
              'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
            }
          ></Avatar>
          <Box
            pt="3vh"
            fontWeight="semibold"
            fontSize="2xl"
            fontFamily={'Roboto'}
            textAlign="left"
          >
            {fullName ? fullName : 'Loading'}
          </Box>
          <Box pt="2vh" fontSize="xl">
            {' '}
            Friends 563{' '}
          </Box>
          <Box pt="0.5vh" fontSize="xl">
            {' '}
            Posts 25{' '}
          </Box>
          <Box pt="0.5vh" fontSize="xl">
            {' '}
            Likes 1k{' '}
          </Box>
        </VStack>
      </Center>
    </Box>
  );
};

export default UserCard;
