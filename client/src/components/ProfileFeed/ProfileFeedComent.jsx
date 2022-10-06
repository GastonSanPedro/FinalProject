import { Box, Avatar, Text, Flex } from "@chakra-ui/react";

const ProfileFeedComent = ({firstName, lastName, description, avatar}) => {
    return(
        <>            
        <Flex
          h={'7vh'}
          alignItems={'center'}      
        >
        <Avatar
            size={'sm'}
            name={`${firstName} ${lastName}`}
            src={avatar}
            />
            <Text pl={2} fontSize={'1.4vw'} fontWeight={'bold'}> 
            {firstName} {lastName}
            </Text>
            <Text pl={2} fontSize={'sm'} fontWeight={'light'} fontStyle={'italic'} color={'gray.700'} > 
            "{description}" 
            </Text>       
          
        </Flex>
        </>
    )
}

export default ProfileFeedComent