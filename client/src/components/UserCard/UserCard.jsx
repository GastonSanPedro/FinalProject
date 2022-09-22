import { Avatar, Button, Stack, Text, VStack } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authUser, getMyUser, logOut } from '../../redux/action';
import { Link } from 'react-router-dom';
const userImg =
  'https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105171/126078877-vector-design-of-avatar-and-dummy-symbol-set-of-avatar-and-image-stock-vector-illustration-.jpg?fj=1';

const UserCard = () => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClick = () => {
    localStorage.removeItem('user');
    dispatch(logOut());
    navigate('/landing-page');
  };

  const [User, setUser] = useState(
    useState(JSON.parse(localStorage.getItem('user')))
  );

  const myUser = useSelector((state) => state.myUser);
  const neededEmail = User[0].email;
  // const logUser = JSON.parse(localStorage.getItem('user'));
  // const loggedUser = JSON.parse(logUser.User);
  // console.log(loggedUser);
  useEffect(() => {
    dispatch(getMyUser(neededEmail));
  }, [dispatch, neededEmail]);
  // console.log(posts);

  return (
    <>
      <Stack
        m={3}
        ml={0}
        display="flex"
        flexDir="column"
        w="15vw"
        h="27vh"
        alignItems="center"
        justifyContent="center"
        backgroundColor="gray.300"
        borderRadius="7px"
      >
        <Link to={'/profile'}>
          <VStack>
            <Avatar size="xl" name="user" src={userImg} />
            <Text as="b" fontSize="sm">
              {myUser.firstName + ' ' + myUser.lastName}
            </Text>
          </VStack>
        </Link>
        <Button
          size="sm"
          onClick={() => {
            handleClick();
          }}
        >
          Log Out
        </Button>
      </Stack>
    </>
  );
};

export default UserCard;
