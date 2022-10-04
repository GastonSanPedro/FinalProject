import { Flex, Avatar, Text  } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


export const FriendCard = ({ image, firstName, lastName, email, fullName, id }) => {
  
    const navigate = useNavigate()

    return (

        <Flex
          onClick={()=>{navigate(`/user/${id}`)}}
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

    );
  };