import React from 'react';
import { Box } from '@chakra-ui/react';
import SidebarWithHeader from '../components/Sidebar-Navbar/SideBar';
import ContainerPost from '../components/ContainerPost/ContainerPost';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getPosts } from '../redux/action';


const Feed = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  const myUser = useSelector((state) => state.myUser)
  const allPosts = useSelector((state) => state.posts)

    console.log({allPosts})
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
        width={'81vw'}
        height={'80vh'}
        mt={'5.5%'}
        ml={'18%'}

      >
      <ContainerPost 
        myUser={myUser}
        posts={allPosts}
        site={'feed'}
        word/>
      </Box>
    </>

);
};

export default Feed;