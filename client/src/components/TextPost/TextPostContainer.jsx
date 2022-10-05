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
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function TextPostContainer({
  site,
  myUser,
  posts,
  singlePost,
  handleClickRef,
}) {
  //--------- Lógica InfiteScroll --------
  const [currentStart, setCurrentStart] = useState(0);
  const [currentEnd, setCurrentEnd] = useState(9);

  const handleClickMore = () => {
    setCurrentEnd(currentEnd + 9);
  };

  let renderPosts =
    posts?.length > 9 ? posts?.slice(currentStart, currentEnd) : posts;
  //------------------------------------

  // const dispatch = useDispatch();
  const { isOpen, onToggle } = useDisclosure();

  // useEffect(() => {
  //   dispatch(getUsers());
  // }, [dispatch]);

  return (
    <>
      <InfiniteScroll
        dataLength={renderPosts?.length || 9}
        hasMore={true}
        next={() => handleClickMore()}
        loader={<Divider w="20%" m={5} />}
      >
        <Flex
          pr={'2%'}
          pl={'0%'}
          w={'100%'}
          textAlign={'center'}
          justifyContent={'center'}
          direction={'column'}
          borderRadius={2}
          mt={site === 'feed' ? '0vh' : '4vh'}
          bg={
            site === 'profile' || site === 'anyProfile'
              ? 'rgba(229, 191, 124, 0.2)'
              : null
          }
        >
          <SimpleGrid
            columns={
              site === 'profile' || site === 'anyProfile'
                ? { base: 1, xl: 2 }
                : { base: 1, xl: 3 }
            }
            spacing={'10'}
            mt={2}
            mr={5}
          >
            {renderPosts?.length !== 0 ? (
              renderPosts?.map((post, index) => {
                if (post.author !== null) {
                  return (
                    <SlideFade in={onToggle} key={index} offsetY="20px">
                      <TextPost
                        userName={
                          site === 'profile' || site === 'anyProfile'
                            ? renderPosts?.userName
                            : post.author?.userName
                        }
                        fullName={
                          site === 'profile' || site === 'anyProfile'
                            ? renderPosts?.fullName
                            : post.author?.fullName
                        }
                        avatar={
                          site === 'profile' || site === 'anyProfile'
                            ? renderPosts?.image
                            : post?.author?.image
                        }
                        image={post?.pics}
                        email={post?.author?.email}
                        description={post?.description}
                        date={post?.createdAt}
                        postId={post?._id}
                        reported={post?.reported}
                        loggedUser={myUser?._id}
                        loggedEmail={myUser?.email}
                        premium={post?.premium}
                        singlePost={singlePost}
                        site={site}
                        background={
                          site === 'profile' || site === 'anyProfile'
                            ? `logo.${Math.random(1, 2, 3)}`
                            : null
                        }
                      />
                    </SlideFade>
                  );
                }
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
