import React from 'react';
import PostSearch from '../components/PostSearch/PostSearch';
import Navbar from '../components/navbar/Navbar';
import CreatePost from '../components/CreatePost/CreatePost';
import { HStack, VStack, Wrap, Box, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';
import SidebarWithHeader from '../components/Sidebar-Navbar/SideBar';

import TextPostContainer from '../components/TextPost/TextPostContainer';

const Feed = () => {
  return (
    <>
      <SidebarWithHeader />
      <Box
        pos={'absolute'}
        top={'20%'}
        left={'0%'}
        textAlign={'center'}
        justifyContent={'center'}
        direction={'column'}
        width={'79vw'}
        height={'80vh'}
        mt={'7%'}
        ml={'18%'}
        mr={'7%'}
      >
        <TextPostContainer />
      </Box>
    </>

    // <>
    // <Navbar />
    //   <Box display={'flex'} dir={'row'} >
    //     <Box m={3}>
    //       <CreatePost />
    //         <Wrap justify={'center'} spacing={30} w='980px' borderRadius='7px' p={8} m={3} backgroundColor={"gray.300"}>
    //           {/* <Box mr="300"><Button >Ver más</Button></Box> */}
    //
    //           <HStack>
    //             <Button onClick={() => handleClickMore()} h='50px' w="200px" mr="50" fontSize='sm'>Ver más</Button>
    //           </HStack>
    //         </Wrap>
    //     </Box>
    //     <Box>
    //       <UserCard />
    //         {allUsers.length > 1 ?
    //           <FriendsContainer
    //             allUsers={allUsers}
    //                 /> : null}
    //     </Box>
    //     </Box>

    // </>
  );
};

export default Feed;
