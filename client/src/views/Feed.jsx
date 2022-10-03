import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ContainerPost from '../components/ContainerPost/ContainerPost';
import SidebarWithHeader from '../components/Sidebar-Navbar/SideBar';
import { getFollowers, getFriends, getFriendsPosts, getPosts } from '../redux/action';

const Feed = () => {
  const myUser = useSelector((state) => state.myUser);
  const allPosts = useSelector((state) => state.posts);
  const singlePost = useSelector((state) => state.singlePost);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts())
    dispatch(getFriends(myUser?._id))
    dispatch(getFollowers(myUser?._id))
    dispatch(getFriendsPosts(myUser?._id));
  }, [dispatch, singlePost, myUser]);
  
  const friends = useSelector((state)=>state.friends)
  const myFollowers = useSelector((state)=> state.followers)
  const friendsPosts = useSelector((state) => state.friendsPosts)
  console.log({friendsPosts},'home')
  console.log({allPosts},'home')

  return (
    <>
      <SidebarWithHeader myUser={myUser} friends={friends} myFollowers={myFollowers}/>
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
          friendsPosts={friendsPosts}
          posts={allPosts}
          singlePost={singlePost}
          site={'feed'}
          word
        />
      </Box>
    </>
  );
};

export default Feed;
