import '../index.css';
import { Box, IconButton } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import UserCard from '../components/UserCard/UserCard';
import SidebarWithHeader from '../components/Sidebar-Navbar/SideBar';
import port1 from '../assets/port1.png';
import ContainerPost from '../components/ContainerPost/ContainerPost';
import { getFollowers, getFriends, getMyUser } from '../redux/action';
import CoverModal from '../components/CoverModal/CoverModal';
import Carousel from '../components/CoverModal/Carousel';


const Profile = () => {
  const dispatch = useDispatch();
  
  const myUser = useSelector((state) => state.myUser);
  const singlePost = useSelector((state) => state.singlePost);
  const friends = useSelector((state) => state.friends);
  const myFollowers = useSelector((state) => state.followers);

  const [User, setUser] = useState(
    useState(JSON.parse(localStorage.getItem('user')))
    );

  const neededEmail = User[0].email;
  useEffect(() => {
    dispatch(getMyUser(neededEmail));
}, [dispatch, neededEmail]);

  useEffect(() => {
  if(friends.length === 0){
    dispatch(getFriends(myUser?._id))
    }
  if(myFollowers.length === 0){
    dispatch(getFollowers(myUser?._id));
  }
  }, [dispatch, singlePost]);
        
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
        ml="18%"
        minH={'28vh'}
        maxH={'28vh'}
        width="85%"
        position={'absolute'}
        backgroundImage={myUser.cover}
        bgRepeat="no-repeat"
        bgSize="cover"
        >
        <CoverModal myUser={myUser}/>
        </Box>
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
