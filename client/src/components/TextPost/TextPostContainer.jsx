import React from 'react';
import {
  Box,
  SimpleGrid,
  Text,
  Button,
  Center,
  Flex,
  SlideFade,
  useDisclosure,
} from '@chakra-ui/react';
import TextPost from './TextPost';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/action';

export default function TextPostContainer({ site, word, myUser, user, posts, friendsPost }) {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const { isOpen, onToggle } = useDisclosure();
  const users = useSelector((state) => state.users);

  const arrayUserPosts = (site) => {
    if (site === 'profile') {
      return myUser;
    }
    if (site === 'anyProfile') {
      return user;
    }
    if (site === 'search' || site === 'feed') {
      return posts;
    }
  };

  //--------- Lógica de ver mas --------

  // const [currentStart, setCurrentStart] = useState(0);
  // const [currentEnd, setCurrentEnd] = useState(8);

  // // const renderPosts = post.length > 8 ? post?.slice(currentStart, currentEnd) : post;

  const handleClickMore = () => {
    // setCurrentEnd(currentEnd + 8);
  };

  if(site === 'feed') {

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
              {friendsPost?.length !== 0 ? (
                friendsPost.map((post, index) => {
                  return (
                    <SlideFade in={onToggle} key={index} offsetY="20px">
                        <TextPost
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
    <Flex
      pr={'2%'}
      pl={'2%'}
      textAlign={'center'}
      justifyContent={'center'}
      direction={'column'}
      bg={'rgba(229, 191, 124, 0.2)'}
      borderRadius={2}
      mt={site === 'feed' ? '0vh' : '4vh'}
    >
      <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={'10'} mt={2} mr={5}>
        {arrayUserPosts(site)?.posts?.length !== 0 ? (
          arrayUserPosts(site)?.posts?.map((post, index) => {
            return (
              <SlideFade in={onToggle} offsetY="20px">
                <Box key={index}>
                  <TextPost
                    fullName={arrayUserPosts(site)?.fullName}
                    image={arrayUserPosts(site)?.image}
                    description={post.description}
                    userName={arrayUserPosts(site)?.userName}
                    background={`logo.${Math.random(1, 2, 3)}`}
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
      <Center>
        <Button
          onClick={() => handleClickMore()}
          h="50px"
          w="200px"
          mr="50"
          fontSize="sm"
          mt="50px"
          mb="50px"
        >
          Ver más
        </Button>
      </Center>
    </Flex>
  );
}
}
// }

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
