import {
  Box,
  SimpleGrid,
  Text,
  Button,
  Flex,
  SlideFade,
  useDisclosure,
  Divider,
} from '@chakra-ui/react';
import TextPost from './TextPost';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/action';
import InfiniteScroll from 'react-infinite-scroll-component'


export default function TextPostContainer({
  site,
  myUser,
  user,
  posts,
  friendsPost,
  singlePost,
  handleClickRef,
}) {

  //--------- Lógica InfiteScroll --------
  const [currentStart, setCurrentStart] = useState(0);
  const [currentEnd, setCurrentEnd] = useState(9);

  const handleClickMore = () => {
    setCurrentEnd(currentEnd + 9);
  };
  //------------------------------------

  const dispatch = useDispatch();
  const { isOpen, onToggle } = useDisclosure();
  const users = useSelector((state) => state.users);

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
          w={'100%'}
          textAlign={'center'}
          justifyContent={'center'}
          direction={'column'}
          borderRadius={2}
          mt={site === 'feed' ? '0vh' : '4vh'}
          bg={
            site === 'profile' || site === 'anyProfile' ? 'rgba(229, 191, 124, 0.2)'
              : null}
        >
          <SimpleGrid
            columns={
              site === 'profile' || site === 'anyProfile' ? { base: 1, xl: 2 }
                : { base: 1, xl: 3 }}
            spacing={'10'}
            mt={2}
            mr={5}
          >
            {arrayUserPosts(site)?.length !== 0 ? (
              arrayUserPosts(site).map((post, index) => {
                return (
                  <SlideFade in={onToggle} key={index} offsetY="20px">
                    <TextPost
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
                      background={
                        site === 'profile' || site === 'anyProfile' ? `logo.${Math.random(1, 2, 3)}`
                          : null}
                    />
                  </SlideFade>
                );
              })
            ) : (
              <Box>
                {site === 'profile' ? (
                  <Text w={'40vw'} ml={'15vw'}>
                    You haven't create any posts. Click here to create your first
                    one <Button onClick={handleClickRef}>Create</Button>
                  </Text>
                ) : (
                  <Text>There are no posts yet</Text>
                )}
              </Box>)
            }
          </SimpleGrid>
        </Flex>
      </InfiniteScroll>
    </>
  );
}

//--------- Lógica socket --------
// const [socket, setSocket] = useState(null)
// const [user,setUser] = useState("")

// useEffect(()=>{
//     setSocket(io("aca iria el localhost o LA ACTION DE REDUX"))
// },[])
// En el componente
//<Navbar  socket={socket} />
//<CreatePost socket={socket} user ={user} />
//--------------------------------
