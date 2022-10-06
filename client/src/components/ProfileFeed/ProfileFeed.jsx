import { Box, Flex, Avatar, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const ProfileFeed = ({myUser, user}) => {
  const navigate = useNavigate()
  return(
    <>
      <Box
        ml={'5vh'}
        h={'50vh'}
        w={'65%'}
        display={'flex'}
        backgroundColor={'white'}
        mb={'50px'}
        >
        <Box
        ml={'2%'}
        bg={`logo.2`}
        w={7}
        h={'50vh'}
        />
         {/* <Flex
          onClick={()=>{navigate(`/user/${myUser._id}`)}}
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
            name={myUser.firstName}
            src={myUser.image}
            />
            <Text pl={2} fontSize={'1vw'} fontWeight={'bold'}> 
            {myUser.firstName} {myUser.lastName}
            </Text>      
          
        </Flex> */}

      </Box>
    </>

  )
}

export default ProfileFeed
