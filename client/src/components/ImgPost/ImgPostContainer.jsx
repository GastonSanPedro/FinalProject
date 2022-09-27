import {
  Flex,
  Box,
  SlideFade,
  SimpleGrid,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import ImgPost from './ImgPost';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getUsers, getUser } from '../../redux/action';

const ImgPostContainer = ({ site, myUser, email, user, posts, friendsPost }) => {

    const dispatch = useDispatch();
    const { isOpen, onToggle } = useDisclosure();

    const users = useSelector((state) => state.users);


  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);



  const arrayUserPosts = (site) => {
    if (site === 'profile') {
      return myUser;
    }
    if (site === 'anyProfile') {
      return user;
    }
    if (site === 'search' ) {
      return posts;
    }
    if(site === 'feed'){
      return friendsPost
    }
  };

if(site === 'feed' || site === 'search') {

  return (
    
    <>
      <Flex
        pr={'2%'}
        pl={'2%'}
        textAlign={'center'}
        justifyContent={'center'}
        direction={'column'}
        borderRadius={2}
        mt={site === 'feed' ? '0vh' : '4vh'}
        bg={'rgba(229, 191, 124, 0.3)'}
      >
        {
          <SimpleGrid columns={{ base: 1, xl: 3 }} spacing={'10'} mt={2} mr={5}>
            {arrayUserPosts(site).length !== 0 ? (
              arrayUserPosts(site).map((post, index) => {
                return (
                  <SlideFade in={onToggle} key={index} offsetY="20px">
                      <ImgPost
                        userName={post.author?.userName}
                        fullName={post.author?.fullName}
                        image={post?.pics}
                        email={post?.author?.email}
                        avatar={post?.author?.image}
                        description={post?.description}
                        date={post?.createdAt}
                      />
                  </SlideFade>
                );
              })
            ) : (
              <Box>
                <Text>no hay posteos</Text>{' '}
              </Box>
            )}
          </SimpleGrid>
        }
      </Flex>
    </>
  );
} else if(site === 'profile' || site === 'anyProfile'){
  return (
    <>
      <Flex
        pr={'2%'}
        pl={'2%'}
        textAlign={'center'}
        justifyContent={'center'}
        direction={'column'}
        borderRadius={2}
        mt={site === 'feed' ? '0vh' : '4vh'}
        bg={'rgba(229, 191, 124, 0.3)'}
      >
        {
          <SimpleGrid columns={{ base: 1, xl: 3 }} spacing={'10'} mt={2} mr={5}>
            {arrayUserPosts(site)?.posts?.length !== 0 ? (
              arrayUserPosts(site)?.posts?.map((post, index) => {
                return (
                  <SlideFade in={onToggle} key={index} offsetY="20px">
                      <ImgPost
                        userName={arrayUserPosts(site)?.userName}
                        fullName={arrayUserPosts(site)?.fullName}
                        image={post.pics}
                        avatar={arrayUserPosts(site)?.image}
                        description={post.description}
                        date={post.createdAt}
                      />
                  </SlideFade>
                );
              })
            ) : (
              <Box>
                <Text>no hay posteos</Text>{' '}
              </Box>
            )}
          </SimpleGrid>
        }
      </Flex>
    </>
  );
}
};

export default ImgPostContainer;
