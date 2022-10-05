import { Box, Flex, Wrap, WrapItem, Heading } from '@chakra-ui/react';

const AnyUserPosts = ({ posts }) => {

  return (
    <>
      {posts.length > 1 ?
        <Box ml={10} mt={5} p={7} w="70%" backgroundColor={'#ECEAEA'}>
            <Heading as="h3" size='md' color="#606c38">Posteos recientes:</Heading>
          <Flex ml={0} mt={0} p={7} w="100%" direction={['column', 'row']}>
            <Wrap w="100%" align="stretch" spacing={7}>
              {posts && posts.map((e) => {
                return (
                  <WrapItem w="30%" key={e.ID}>
                    <Box w="100%" h="auto" p={2} backgroundColor={'#D9D9D9'}>
                      {/* <img src={post.pics} alt="Imagend el Post" /> */}
                      <Box w="100%" h="auto" mt={2} p={2}>
                        <p>{e.description}</p>
                      </Box>
                    </Box>
                  </WrapItem>
                );
              })}
            </Wrap>
          </Flex>
        </Box>
        : null}
    </>
  );
};

export default AnyUserPosts;