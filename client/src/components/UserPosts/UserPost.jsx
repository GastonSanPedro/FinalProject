import React, { useEffect } from 'react';
import { Box, Avatar, Flex, Wrap, WrapItem } from '@chakra-ui/react';
import { getPosts } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';

const UserPost = () => {
  const dispatch = useDispatch();
  const allPosts = useSelector((state) => state.posts);
  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);
  console.log(allPosts[0]);
  return (
    <>
      <Box ml={10} mt={5} p={7} w="70%" backgroundColor={'#ECEAEA'}>
        <Box w="100" ml={0} display={'flex'} h="10">
          <Avatar
            size="sm"
            mr={2}
            name="usuario"
            src="https://previews.123rf.com/images/pandavector/pandavector1901/pandavector190105171/126078877-vector-design-of-avatar-and-dummy-symbol-set-of-avatar-and-image-stock-vector-illustration-.jpg?fj=1"
          />
          <h1>Nombre de Usuario</h1>
        </Box>
        <Flex ml={0} mt={0} p={7} w="100%" direction={['column', 'row']}>
          <Wrap w="100%" align="stretch" spacing={7}>
            {allPosts.map((post) => {
              return (
                <WrapItem w="30%" key={post._id}>
                  <Box w="100%" h="auto" p={2} backgroundColor={'#D9D9D9'}>
                    <img src={post.pics} alt="Imagend el Post" />
                    <Box w="100%" h="auto" mt={2} p={2}>
                      <p>{post.description}</p>
                    </Box>
                  </Box>
                </WrapItem>
              );
            })}
          </Wrap>
        </Flex>
      </Box>
    </>
  );
};

export default UserPost;