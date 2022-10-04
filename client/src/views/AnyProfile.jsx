import React, { useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import UserCard from '../components/UserCard/UserCard';
import SidebarWithHeader from '../components/Sidebar-Navbar/SideBar';
import port1 from '../assets/port1.png';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, addFriend, deleteFriend  } from '../redux/action';
import { useParams } from 'react-router-dom';
import ContainerPost from '../components/ContainerPost/ContainerPost';

export default function AnyProfile() {
  const dispatch = useDispatch();
  let { email } = useParams();
  const user = useSelector((state) => state.user);
  const myUser = useSelector((state)=> state.myUser)
  const friends = useSelector((state)=> state.friends)
  const myFollowers = useSelector((state) => state.followers)
  const handleClickFollow = () => {
    dispatch(addFriend(myUser._id, user._id));
  };

  const handleClickUnfollow = () => {
    dispatch(deleteFriend(myUser?._id, user?._id))
  }
  useEffect(() => {
      dispatch(getUser(email));
      ;
  }, [dispatch, email]);

  return (
    <>
      <SidebarWithHeader
        myUser={myUser}
        friends={friends}
        myFollowers={myFollowers}
      />
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
      <UserCard site="anyProfile" user={user} myUser={myUser} friends={friends} handleClickFollow={handleClickFollow} handleClickUnfollow={handleClickUnfollow} />
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
        <ContainerPost
          site="anyProfile"
          user={user}
          myUser={myUser}
          email={email}
        />
      </Box>
    </>
  );
}
