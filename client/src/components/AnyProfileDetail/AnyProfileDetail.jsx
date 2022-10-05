import React, { useState } from 'react';
import { Box, Avatar, Heading, HStack } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../../redux/action';
import AnyUserPosts from '../AnyUserPosts/AnyUserPosts';

const AnyProfileDetail = () => {
  const dispatch = useDispatch();

  let { email } = useParams();

  let anyUser = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser(email));
    // return () => {
    //   getUser(email);
    // };
  }, [dispatch]);

  return (
    <>
      {anyUser ? (
        <>
          <Box
            ml={10}
            mt={5}
            p={7}
            w="70%"
            display={'flex'}
            backgroundColor={'#ECEAEA'}
            borderRadius="5"
          >
            <Avatar size="xl" name="usuario" src={anyUser.image} />
            <Box ml={8} w="90%">
              <Heading color="#606c38" mb="5">
                {anyUser.firstName} {anyUser.lastName}
              </Heading>
              <HStack>
                <Heading as="h4" size="sm">
                  Email: {anyUser.email}
                </Heading>
                <Heading as="h4" size="sm" pl="100">
                  User name: {anyUser.userName}
                </Heading>
              </HStack>
              {anyUser.bio !== '' && (
                <Heading as="h4" size="sm" pl="100">
                  Bio: {anyUser.bio}
                </Heading>
              )}
            </Box>
          </Box>
          {/* <h1>{anyUser.posteos[1].description}</h1> */}
          {anyUser.posteos && anyUser.posteos ? (
            <AnyUserPosts posts={anyUser.posteos} />
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default AnyProfileDetail;
