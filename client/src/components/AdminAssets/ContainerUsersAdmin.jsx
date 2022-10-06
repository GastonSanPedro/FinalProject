import { Box, VStack, Text, Divider } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import UserCardAdmin from './UserCardAdmin';

export default function ContainerUsersAdmin ({users, HandleBlock, block}) {

    // const users =useSelector((state)=>state.users)

    // const friendsId= friends.map(friend => friend.idFriend._id)
    // const followersId = myFollowers.map(follower => follower._id)
    // const searchUsers = useSelector((state)=> state.searchUser)
    // const searchFriends = searchUsers.filter(user => friendsId?.includes(user._id))
    // const searchFollowers = searchUsers.filter(user => followersId?.includes(user._id))

     //--------- Lógica InfiteScroll --------
     const [currentStart, setCurrentStart] = useState(0);
     const [currentEnd, setCurrentEnd] = useState(9);
   
     const handleClickMore = () => {
       setCurrentEnd(currentEnd + 9);
     };
     let renderUsers = users?.length > 9 ? users?.slice(currentStart, currentEnd) : users;
     //---------------------------------------

    return( 
        <>
            <VStack
            padding={'3%'}
            // bg={'whitesmoke'}
            spacing={2}
            minH={'77vh'}>
                <InfiniteScroll
                dataLength={renderUsers?.length || 9}
                hasMore={true}
                next={() => handleClickMore()}
                loader={<Divider w="10%" m={5} />}
                >
                {    
                    renderUsers?.length != 0 ? (
                        renderUsers?.map((user, index) => {
                    
                    return(
                    <Box m={5} key={index}>
                    <UserCardAdmin
                    HandleBlock={HandleBlock}
                    firstName={user?.firstName}
                    lastName={user?.lastName}
                    userName={user?.userName}
                    image={user?.image}
                    email={user?.email}
                    posts={user?.posts}
                    userId={user?._id}
                    block={block}
                    />
                    </Box>
                )} )
                ) : (<Text> No users found </Text>)
               
             
        }
        </InfiniteScroll>
        </VStack>
        
        </>
    )
}