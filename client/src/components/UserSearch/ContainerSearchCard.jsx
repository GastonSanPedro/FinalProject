import SearchUserCard from './UserSearchCard';
import { useSelector } from 'react-redux';
import { Box, VStack, Text, Divider } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';


export default function ContainerSearchCard ({state, myUser, friends, myFollowers}) {

    const friendsId= friends.map(friend => friend.idFriend._id)
    const followersId = myFollowers.map(follower => follower._id)
    const searchUsers = useSelector((state)=> state.searchUser)
    const searchFriends = searchUsers.filter(user => friendsId?.includes(user._id))
    const searchFollowers = searchUsers.filter(user => followersId?.includes(user._id))
    const changeInfo = () => {
        if(state === 'users') return searchUsers
        if(state === 'following') return searchFriends
        if(state === 'followers') return searchFollowers
            }

     //--------- Lógica InfiteScroll --------
     const [currentStart, setCurrentStart] = useState(0);
     const [currentEnd, setCurrentEnd] = useState(9);
   
     const handleClickMore = () => {
       setCurrentEnd(currentEnd + 9);
     };
   
     let renderUsers = changeInfo()?.length > 9 ?changeInfo()?.slice(currentStart, currentEnd) : changeInfo();
    return( 
        <>
            <VStack
            padding={'3%'}
            bg={'whitesmoke'}
            spacing={2}
            minH={'77vh'}>
                <InfiniteScroll
                dataLength={renderUsers?.length || 9}
                hasMore={true}
                next={() => handleClickMore()}
                loader={<Divider w="10%" m={5} />}
                >
                {    
                    renderUsers.length != 0 ? (
                        renderUsers.map((user, index) => {
                    
                    return(
                    <Box m={5} key={index}>
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
                ) : (<Text> No users found </Text>)
               
             
        }
        </InfiniteScroll>
        </VStack>
        
        </>
    )
}