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
  const myUser = useSelector((state)=> state.myUser)
  // const [myOwnUser, setMyOwnUser]= useState(myUser)

  useEffect(()=>{
  },[myUser])
  
  return (
    <>
      <SidebarWithHeader />
      <Box
        className='ImageHeader'
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

// const [User, /*setUser*/] = useState(
//   useState(JSON.parse(localStorage.getItem('user')))
// );
// const dispatch = useDispatch();
// const user = useSelector((state) => state.myUser);
// // const allUsers = useSelector((state) => state.users);
// // const posts = useSelector((state) => state.posts);
// const neededEmail = User[0].email;
//   console.log({user})
//   console.log({User})
// // const logUser = JSON.parse(localStorage.getItem('user'));
// // const loggedUser = JSON.parse(logUser.User);
// // console.log(loggedUser);
// useEffect(() => {
//   setTimeout(function () {
//     dispatch(getUsers());
//     // dispatch(getMyUser(neededEmail));
//     dispatch(getPosts(neededEmail));
//   });
// }, [dispatch, neededEmail]);

// const changeHandler = (email) => {
//   dispatch(getMyUser(email));
// };
// console.log(posts);
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
{/* <Box ml="80%" mt="13%" h="420px" w="250px" position={'absolute'} bgColor="rgba(140, 161, 116, .9)"  >
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
        </Box> */}