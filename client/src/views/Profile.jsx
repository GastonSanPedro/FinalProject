import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CreatePost from '../components/CreatePost/CreatePost';
import FriendsContainer from '../components/Friends/FriendsContainer';
import Navbar from '../components/navbar/Navbar';
import ProfileDetail from '../components/ProfileDetail/ProfileDetail';
import UserCard from '../components/UserCard/UserCard';
import UserPost from '../components/UserPosts/UserPost';
import '../index.css';
import { getUser, getPosts } from '../redux/actions';

const Profile = () => {
  const [User, setUser] = useState(
    useState(JSON.parse(localStorage.getItem('user')))
  );
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const posts = useSelector((state) => state.posts);
  const neededEmail = User[0].email;
  // const logUser = JSON.parse(localStorage.getItem('user'));
  // const loggedUser = JSON.parse(logUser.User);
  // console.log(loggedUser);
  useEffect(() => {
    dispatch(getUser(neededEmail));
    dispatch(getPosts(neededEmail));
  }, [dispatch, neededEmail]);
  // console.log(posts);
  return (
    <>
      <Navbar></Navbar>
      <Box display="flex" dir="column" pt={10} pr={10} pl={10}>
        <Box>
          <ProfileDetail user={user}/>
          <CreatePost user={user} />
          <UserPost posteos={posts} name={user.userName} email={user.email} />
        </Box>

        <Box
          display="-ms-flexbox"
          position={'absolute'}
          right={'0%'}
          dir="row"
          width={'20%'}
          pt={0}
          pr={0}
          pl={0}
        >
          <UserCard first={user.firstName} last={user.lastName} />
          <FriendsContainer />
        </Box>
      </Box>
    </>
  );
};

export default Profile;
