import { Box, Wrap, Image, Avatar, Center, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreatePost from '../components/CreatePost/CreatePost';
import FriendsContainer from '../components/Friends/FriendsContainer';
import Navbar from '../components/navbar/Navbar';
import ProfileDetail from '../components/ProfileDetail/ProfileDetail';
import UserCard from '../components/UserCard/UserCard';
import UserPost from '../components/UserPosts/UserPost';
import SidebarWithHeader from '../components/Sidebar-Navbar/SideBar';
import portada1 from '../assets/portada1.jpg'
import portada2 from '../assets/portada2.jpg'
import portada3 from '../assets/portada3.png'
import port1 from '../assets/port1.png'
import TextPostContainer from '../components/TextPost/TextPostContainer';



import '../index.css';
import { getMyUser, getPosts, getUsers } from '../redux/actions';

const Profile = () => {
  const [User, setUser] = useState(
    useState(JSON.parse(localStorage.getItem('user')))
  );
  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.users);
  const user = useSelector((state) => state.myUser);
  const posts = useSelector((state) => state.posts);
  const neededEmail = User[0].email;
  console.log(neededEmail);
  // const logUser = JSON.parse(localStorage.getItem('user'));
  // const loggedUser = JSON.parse(logUser.User);
  // console.log(loggedUser);
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getMyUser(neededEmail));
    dispatch(getPosts(neededEmail));
  }, [dispatch, neededEmail]);

  const changeHandler = (email) => {
    dispatch(getMyUser(email));
  };
  // console.log(posts);

  return (
    <>
      <SidebarWithHeader />
      <Box mt="20"
        ml="15%"
        h="210"
        width="85%"
        position={'absolute'}
        backgroundImage={port1}
        bgRepeat="no-repeat"
        // bgPosition="center"
        bgSize="cover"
      />

      <Box ml="80%" mt="13%" h="420px" w="250px" position={'absolute'} bgColor="rgba(140, 161, 116, .9)"  >
        <Center>
          <VStack>
            <Avatar
              size='2xl'
              mt="5%"
              src={
                'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
              } ></Avatar>
            <Box
              pt="30px"
              fontWeight='semibold'
              fontSize='2xl'
              textAlign='left'
            >
              Ariadna Ruvini
            </Box>
            <Box
              pt="20px"
              fontSize='xl'
            >
              Friends 563
            </Box>

            <Box
              pt="5px"
              fontSize='xl'
            >
              Posts 25
            </Box>
            <Box
              pt="5px"
              fontSize='xl'
            >
              Likes 1k
            </Box>
          </VStack>
        </Center>
      </Box>


      {/* <Box display="flex" dir="row">
        <Box m={10} width={'60%'} position={'absolute'} left={'5%'} backgroundImage={port}>
          <ProfileDetail
            firstname={user?.firstName}
            lastname={user?.lastName}
            bioUser={user?.bio}
            userEmail={user?.email}
            changeHandler={changeHandler}
          />
          <CreatePost posteos={user?.posteos} email={user?.email} />
          <Wrap
            justify={'center'}
            spacing={30}
            w="100%"
            borderRadius="7px"
            p={4}
            m={3}
            backgroundColor={'gray.300'}
            position={'absolute'}
            left={'0%'}
          >
            <UserPost posteos={posts} name={user?.fullName} />
          </Wrap>
        </Box>

        <Box position={'absolute'} right={'3%'}>
          <UserCard />
          {allUsers.length > 1 ? (
            <FriendsContainer allUsers={allUsers} />
          ) : null}
        </Box>
     </Box> */}
    </>
  );
};

export default Profile;
