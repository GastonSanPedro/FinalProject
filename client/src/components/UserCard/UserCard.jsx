import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authUser, getMyUser, logOut } from '../../redux/action';
import { Link } from 'react-router-dom';
import { Box, Wrap, Image, Avatar, Center, VStack } from '@chakra-ui/react';

const UserCard = ({ site }) => {

  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const handleClick = () => {
  //   localStorage.removeItem('user');
  //   dispatch(logOut());
  //   navigate('/landing-page');
  // };

  const [User, setUser] = useState(
    useState(JSON.parse(localStorage.getItem('user')))
  );

  const myUser = useSelector((state) => state.myUser);
  const user = useSelector((state) => state.user);
  const neededEmail = User[0].email;
  // const logUser = JSON.parse(localStorage.getItem('user'));
  // const loggedUser = JSON.parse(logUser.User);
  // console.log(loggedUser);
  useEffect(() => {
    setTimeout(function () {
      dispatch(getMyUser(neededEmail));
    });
  }, [dispatch, neededEmail]);


  return (
    <Box ml="80%" mt="13%" h="430px" w="250px" position={'absolute'} bgColor="rgba(140, 161, 116, .9)" >
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
            {site === "anyProfile" ? `${user.firstName} ${user.lastName}`
              : `${myUser.firstName} ${myUser.lastName}`}
          </Box>
          <Box pt="20px" fontSize='xl'> Friends 563 </Box>
          <Box pt="5px" fontSize='xl'> Posts 25 </Box>
          <Box pt="5px" fontSize='xl'> Likes 1k </Box>
        </VStack>
      </Center>
    </Box>

  );
};

export default UserCard;
