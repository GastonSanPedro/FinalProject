import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from '../components/UserCard/UserCard';
import SidebarWithHeader from '../components/Sidebar-Navbar/SideBar';
import port1 from '../assets/port1.png';
import '../index.css';
import { getMyUser, getPosts, getUsers } from '../redux/action';
import ContainerPost from '../components/ContainerPost/ContainerPost';

const Profile = () => {
  const myUser = useSelector((state) => state.myUser);
  // const [myOwnUser, setMyOwnUser]= useState(myUser)

  useEffect(() => {}, [myUser]);

  return (
    <>
      <SidebarWithHeader />
      <Box
        className="ImageHeader"
        mt={'10vh'}
        ml="15%"
        minH={'28vh'}
        maxH={'28vh'}
        width="85%"
        position={'absolute'}
        backgroundImage={port1}
        bgRepeat="no-repeat"
        // bgPosition="center"
        bgSize="cover"
      />
      <UserCard site="profile" myUser={myUser} />
      <Box
        pos={'absolute'}
        top={'20%'}
        left={'0%'}
        textAlign={'center'}
        justifyContent={'center'}
        direction={'column'}
        width={'79vw'}
        height={'80vh'}
        mt={'20%'}
        ml={'18%'}
        mr={'7%'}
      >
        <ContainerPost site="profile" myUser={myUser} />
      </Box>
    </>
  );
};

export default Profile;
