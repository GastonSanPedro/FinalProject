import { Link, Flex, Icon, Avatar, Text  } from "@chakra-ui/react";

const userImg =
  'https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105171/126078877-vector-design-of-avatar-and-dummy-symbol-set-of-avatar-and-image-stock-vector-illustration-.jpg?fj=1';


export const FriendCard = ({ image, link,firstName, lastName, email }) => {
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
            name="user"
            src={image? image : userImg}
            />
            <Text pl={2} fontSize={'1vw'} fontWeight={'bold'}> 
            {firstName[0].toUpperCase()+ firstName.substring(1)} {lastName[0].toUpperCase()+ lastName.substring(1)}
            </Text>      
          
        </Flex>
      </Link>
    );
  };