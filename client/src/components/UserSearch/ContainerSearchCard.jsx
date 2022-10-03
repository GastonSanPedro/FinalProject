import SearchUserCard from './UserSearchCard';
import { useSelector } from 'react-redux';
import { Box, VStack, Text } from '@chakra-ui/react';

export default function ContainerSearchCard ({state, myUser}) {
    
    const friends = useSelector((state) => state.friends)
    const searchUsers = useSelector((state)=> state.searchUser)
    const searchFriends = searchUsers.filter(user => friends?.includes(user._id))
    const changeInfo = () => {
        if(state === 'users') return searchUsers
        if(state === 'friends') return searchFriends
            }
    return( 
        <>
        <VStack
        padding={'3%'}
        bg={'whitesmoke'}
        spacing={2}>
        { 
            changeInfo().length != 0 ? (
                changeInfo().map((user, index) => {
                    
                    return(
                    <Box key={index}>
                    <SearchUserCard
                    firstName={user.firstName}
                    lastName={user.lastName}
                    userName={user.userName}
                    avatar={user.image}
                    friends={user.friends}
                    email={user.email}
                    posts={user.posts}
                    bio={user.bio}/>
                    </Box>
                )} )
                ) : (<Text> No hay usuarios con ese nombre </Text>)
                
             
        }
        </VStack>
        </>
    )
}
