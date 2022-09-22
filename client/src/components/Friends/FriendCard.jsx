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
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: '#8ea26f',
            color: 'white',
          }}
        >
        <Avatar
            size={'xs'}
            name="user"
            src={image? image : userImg}
            />
            <Text fontSize={'1vw'}> 
            {firstName[0].toUpperCase()+ firstName.substring(1)} {lastName[0].toUpperCase()+ lastName.substring(1)}
            </Text>      
          
        </Flex>
      </Link>
    );
  };