import {
  Flex,
  Box,
  SlideFade,
  SimpleGrid,
  useDisclosure,
  Text,
  Button,
  Divider,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ImgPost from './ImgPost';
import { getUsers } from '../../redux/action';
import InfiniteScroll from 'react-infinite-scroll-component'

const ImgPostContainer = ({
  site,
  myUser,
  user,
  posts,
  friendsPost,
  singlePost,
  handleClickRef,
  reportedPosts,
  handleDelete,
}) => {

  //--------- Lógica InfiteScroll --------
  const [currentStart, setCurrentStart] = useState(0);
  const [currentEnd, setCurrentEnd] = useState(9);

  const handleClickMore = () => {
    setCurrentEnd(currentEnd + 9);
  };
  //------------------------------------

  const dispatch = useDispatch();
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const arrayUserPosts = (site) => {
    if (site === 'profile') {
      let renderPosts = myUser?.posts?.length > 9 ? myUser?.posts?.slice(currentStart, currentEnd) : myUser?.posts;
      return renderPosts;
    }
    if (site === 'anyProfile') {
      let renderPosts = user?.posts?.length > 9 ? user?.posts?.slice(currentStart, currentEnd) : user?.posts;
      return renderPosts;
    }
    if (site === 'search' || site === 'explore') {
      return posts;
    }
    if (site === 'feed') {
      return friendsPost;
    }
    if (site === 'admin') {
      return reportedPosts;
    }
  };

  return (
    <>
      <InfiniteScroll
        dataLength={arrayUserPosts(site)?.length || 9}
        hasMore={true}
        next={() => handleClickMore()}
        loader={<Divider w="20%" m={5} />}
      >
        <Flex
          pr={'2%'}
          pl={'2%'}
          textAlign={'center'}
          justifyContent={'center'}
          direction={'column'}
          borderRadius={2}
          mt={site === 'feed' ? '0vh' : '4vh'}
        >
          <SimpleGrid
              columns={{ base: 1, xl: 3 }}
              spacing={'10'}
              mt={2}
              mr={5}
            >
              {arrayUserPosts(site)?.length !== 0 ? (
                arrayUserPosts(site)?.map((post, index) => {
                  return (
                    <SlideFade in={onToggle} key={index} offsetY="20px">
                      <ImgPost
                        userName={
                          site === 'profile' || site === 'anyProfile' ? arrayUserPosts(site)?.userName
                            : post.author?.userName}
                        fullName={
                          site === 'profile' || site === 'anyProfile' ? arrayUserPosts(site)?.fullName
                            : post.author?.fullName}
                        avatar={
                          site === 'profile' || site === 'anyProfile' ? arrayUserPosts(site)?.image
                            : post?.author?.image}
                        image={post?.pics}
                        email={post?.author?.email}
                        description={post?.description}
                        date={post?.createdAt}
                        postId={post?._id}
                        reported={post?.reported}
                        loggedUser={myUser?._id}
                        loggedEmail={myUser?.email}
                        singlePost={singlePost}
                        site={site}
                        handleDelete={handleDelete}
                      />
                    </SlideFade>
                  );
                })
              ) : (
                <Box>
                  {site === 'profile' ? (
                    <Text w={'40vw'} ml={'15vw'}>
                      You haven't create any posts. Click here to create your
                      first one <Button onClick={handleClickRef}>Create</Button>
                    </Text>
                  ) : (
                    <Text>There are no posts yet</Text>
                  )}
                </Box>
              )}
            </SimpleGrid>
        </Flex>
      </InfiniteScroll>
    </>
  );
};

export default ImgPostContainer;