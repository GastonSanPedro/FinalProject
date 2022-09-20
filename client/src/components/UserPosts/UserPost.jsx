import { Avatar, Box, Stack, Text, Wrap, Center } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getUser } from '../../redux/actions';

const UserPost = ({ posteos, name, email }) => {
  return (
    <>
      <Wrap
        justify={'center'}
        spacing={30}
        w="90%"
        borderRadius="7px"
        pt={4}
        mb={3}
        backgroundColor={'gray.300'}
      >
        {posteos?.map((post) => {
          return (
            <Box
              ml={7}
              width="40%"
              display={'flex'}
              alignItems="center"
              justifyContent="space-between"
              backgroundColor="gray.200"
              borderRadius={7}
            >
              <Stack alignItems="center" pt={2}>
                <Avatar
                  mt="5%"
                  ml={3}
                  size="lg"
                  name="usuario"
                  src={
                    'https://avatarfiles.alphacoders.com/128/thumb-128984.png'
                  }
                />
                <Center p={3} pt={1}>
                  <Text fontWeight="bold" textAlign="center">
                    {name}
                  </Text>
                </Center>
              </Stack>
              <Box
                m={2}
                p={2}
                w="100%"
                h="90%"
                backgroundColor="white"
                borderRadius={7}
              >
                <Text fontWeight="light">{post.description}</Text>
              </Box>
            </Box>
          );
        })}
      </Wrap>
    </>
  );
};

export default UserPost;
