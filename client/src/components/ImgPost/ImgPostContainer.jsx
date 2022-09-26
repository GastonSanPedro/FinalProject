import {
  Flex,
  Box,
  SlideFade,
  SimpleGrid,
  useDisclosure,
  Text,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import UserSearchContainer from '../UserSearch/UserSearchContainer';
import CreatePost from '../CreatePost/CreatePost';
import ImgPost from './ImgPost';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getUsers, getUser } from '../../redux/action';

const ImgPostContainer = ({ site, myUser, email, user }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUser(email));
  }, [dispatch]);

  const { isOpen, onToggle } = useDisclosure();
  const users = useSelector((state) => state.users);
  //const user = useSelector((state) => state.user);

  const arrayUserPosts = (site) => {
    if (site === 'profile') {
      return myUser;
    }
    if (site === 'anyProfile') {
      return user;
    }
    if (site === 'search' || site === 'feed') {
      return users;
    }
  };
  console.log(site);
  console.log(arrayUserPosts(site));
  console.log(arrayUserPosts(site).posts);

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
            {arrayUserPosts(site).posts.length !== 0 ? (
              arrayUserPosts(site).posts.map((post, index) => {
                return (
                  <SlideFade in={onToggle} offsetY="20px">
                    <Box key={index}>
                      <ImgPost
                        userName={arrayUserPosts(site)?.userName}
                        fullName={arrayUserPosts(site)?.fullName}
                        image={post.pics}
                        avatar={arrayUserPosts(site)?.image}
                        description={post.description}
                        date={post.createdAt}
                      />
                    </Box>
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
};

export default ImgPostContainer;
