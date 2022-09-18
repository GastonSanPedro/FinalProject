import React, { useState } from 'react';
import { Box, Avatar } from '@chakra-ui/react';

const ProfileDetail = () => {
  const [User, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <>
      <Box
        ml={10}
        mt={5}
        p={7}
        w="70%"
        display={'flex'}
        backgroundColor={'#ECEAEA'}
      >
        <Avatar
          size="xl"
          name="usuario"
          src="https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105171/126078877-vector-design-of-avatar-and-dummy-symbol-set-of-avatar-and-image-stock-vector-illustration-.jpg?fj=1"
        />
        <Box ml={8} w="90%">
          <h4>Username:</h4>
          <p>{User.userName}</p>
        </Box>
      </Box>
    </>
  );
};

export default ProfileDetail;
