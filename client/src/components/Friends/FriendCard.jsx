import { Link, Flex, Avatar, Text  } from "@chakra-ui/react";


export const FriendCard = ({ image, link,firstName, lastName, email, fullName }) => {

    return (
      <Link
        href={'/user/' + email}
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
      >
        <Flex
          align="center"
          w={'100%'}
          p="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: '#8ea26f',
            color: 'white',
          }}
        >
        <Avatar
            size={'sm'}
            name={fullName}
            src={image}
            />
            <Text pl={2} fontSize={'1vw'} fontWeight={'bold'}> 
            {firstName} {lastName}
            </Text>      
          
        </Flex>
      </Link>
    );
  };