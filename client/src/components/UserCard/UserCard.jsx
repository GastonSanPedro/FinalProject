import { Avatar, Button, Stack, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const userImg =
  'https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105171/126078877-vector-design-of-avatar-and-dummy-symbol-set-of-avatar-and-image-stock-vector-illustration-.jpg?fj=1';

const UserCard = () => {
  const [User, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.removeItem('user');
    navigate(`/landing-page`);
  };
  //console.log(User);
  return (
    <>
      <Stack
        m={3}
        ml={0}
        display="flex"
        flexDir="column"
        w="200px"
        h="245px"
        alignItems="center"
        justifyContent="center"
        backgroundColor="gray.200"
        borderRadius="7px"
      >
        <Avatar size="xl" name="user" src={userImg} />
        <Text as="b" fontSize="sm">
          {User.firstName + User.lastName}
        </Text>
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
