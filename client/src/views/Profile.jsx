import '../index.css';
import { Box } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserCard from '../components/UserCard/UserCard';
import SidebarWithHeader from '../components/Sidebar-Navbar/SideBar';
import port1 from '../assets/port1.png';
import '../index.css';
import ContainerPost from '../components/ContainerPost/ContainerPost';
import { getFollowers, getFriends } from '../redux/action';


const Profile = () => {

  const dispatch = useDispatch()
  const myUser = useSelector((state) => state.myUser);
  const singlePost = useSelector((state) => state.singlePost);

  // useEffect(() => {
  //   dispatch(getFriends(myUser._id))
  //   dispatch(getFollowers(myUser._id));}, [dispatch, myUser, singlePost]);
  const friends = useSelector((state) => state.friends);
  const myFollowers = useSelector((state) => state.followers);




  return (
    <>
      <SidebarWithHeader myUser={myUser} friends={friends} myFollowers={myFollowers} />
      <Box
        className="ImageHeader"
        zIndex={2}
        mt={'10vh'}
        ml="15%"
        minH={'28vh'}
        maxH={'28vh'}
        width="85%"
        position={'absolute'}
        backgroundImage={port1}
        bgRepeat="no-repeat"
        bgSize="cover"
      />

      <UserCard site="profile" myUser={myUser} />
      <Box
        bg={'whitesmoke'}
        pos={'absolute'}
        top={'20%'}
        textAlign={'center'}
        justifyContent={'center'}
        direction={'column'}
        width={'81vw'}
        height={'80vh'}
        mt={'18%'}
        ml={'18%'}
      >
        <ContainerPost site="profile" myUser={myUser} singlePost={singlePost} />
      </Box>
    </>
  );
};

export default Profile;
