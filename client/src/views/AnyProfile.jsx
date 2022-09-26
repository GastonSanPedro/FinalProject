import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import UserCard from '../components/UserCard/UserCard';
import SidebarWithHeader from '../components/Sidebar-Navbar/SideBar';
import port1 from '../assets/port1.png';
import TextPostContainer from '../components/TextPost/TextPostContainer';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/action';
import { useParams } from 'react-router-dom';
import ContainerPost from '../components/ContainerPost/ContainerPost';

export default function AnyProfile() {
  const dispatch = useDispatch();
  let { email } = useParams();
  useEffect(() => {
      dispatch(getUser(email));
  }, [dispatch, email]);
  const user = useSelector((state) => state.user);
  const myUser = useSelector((state)=> state.myUser)

  return (
    <>
      <SidebarWithHeader />
      <Box
        mt="20"
        ml="15%"
        h="28vh"
        width="85%"
        position={'absolute'}
        backgroundImage={port1}
        bgRepeat="no-repeat"
        // bgPosition="center"
        bgSize="cover"
      />
      <UserCard site="anyProfile" user={user}  myUser={myUser}/>
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
        <ContainerPost site="anyProfile" user={user} myUser={myUser} />
      </Box>
    </>
  );
}
