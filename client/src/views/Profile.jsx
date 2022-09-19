import { Box, Wrap } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreatePost from '../components/CreatePost/CreatePost';
import FriendsContainer from '../components/Friends/FriendsContainer';
import Navbar from '../components/navbar/Navbar';
import PostSearch from '../components/PostSearch/PostSearch';
import ProfileDetail from '../components/ProfileDetail/ProfileDetail';
import UserCard from '../components/UserCard/UserCard';

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
  // const logUser = JSON.parse(localStorage.getItem('user'));
  // const loggedUser = JSON.parse(logUser.User);
  // console.log(loggedUser);
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getMyUser(neededEmail));
    dispatch(getPosts(neededEmail));
  }, [dispatch, neededEmail]);
  // console.log(posts);
  return (
    <>
      <Navbar></Navbar>
      <Box display="flex" dir="row">
        <Box m={3}>
          <ProfileDetail />
          <CreatePost user={user} />
          <Wrap
            justify={'center'}
            spacing={30}
            w="980px"
            borderRadius="7px"
            p={8}
            m={3}
            backgroundColor={'gray.300'}
          >
            <PostSearch
              fullName={user?.fullName}
              image={user?.image}
              posteos={user?.post}
            />
          </Wrap>
        </Box>

        <Box>
          <UserCard />
          {allUsers.length > 1 ? (
            <FriendsContainer allUsers={allUsers} />
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default Profile;
