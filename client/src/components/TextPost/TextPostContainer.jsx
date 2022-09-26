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
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getUsers, getUser } from '../../redux/action';
import CreatePost from '../CreatePost/CreatePost';
import UserSearchContainer from '../UserSearch/UserSearchContainer';


export default function TextPostContainer({ site, word, email, myUser }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
    dispatch(getUser(email));
  }, [dispatch]);

  const {isOpen, onToggle } = useDisclosure();
  const users = useSelector((state) => state.users);
  const user = useSelector((state) => state.user);
  
  const arrayUserPosts = (site) =>{
    if(site === "profile"){
      return myUser
    }
    if(site === "anyProfile"){
      return user
    }
    if(site === "search" || site === 'feed'){
      return users
    }
  }
  console.log(site)
  console.log(arrayUserPosts(site))
  console.log(arrayUserPosts(site).posts)


  //--------- Lógica de ver mas --------

  // const [currentStart, setCurrentStart] = useState(0);
  // const [currentEnd, setCurrentEnd] = useState(8);

  // // const renderPosts = post.length > 8 ? post?.slice(currentStart, currentEnd) : post;
  
  const handleClickMore = () => {
    // setCurrentEnd(currentEnd + 8);
  };


  // if (site === 'anyProfile') {
  //   return (
  //     <Flex
  //       bg={'rgba(229, 191, 124, 0.3)'}
  //       pr={'2%'}
  //       pl={'2%'}
  //       textAlign={'center'}
  //       justifyContent={'center'}
  //       direction={'column'}
  //       borderRadius={2}
  //       mt={site === 'feed' ? '0vh' : '4vh'}
  //     >
  //       <SimpleGrid
  //         columns={{ base: 1, xl: 2 }}
  //         spacing={'10'}
  //         mt={'40vh'}
  //         mr={5}
  //       >
  //         {post ? (
  //           renderPosts.map((user, index) => {
              
  //             if (user?.fullName && user?.post) {
  //               return (
  //                 <SlideFade in={onToggle} offsetY="20px">
  //                   <Box key={index}>
  //                     <TextPost
  //                       fullName={user?.fullName}
  //                       image={user?.image}
  //                       description={user?.post}
  //                       background={`logo.${Math.random(1, 2, 3)}`}
  //                       id={index}
  //                       userName={user?.userName}
  //                     />
  //                   </Box>
  //                 </SlideFade>
  //               );
  //             }
  //           })
  //         ) : (
  //           <Box>
  //             <Text>no hay posteos</Text>{' '}
  //           </Box>
  //         )}
  //       </SimpleGrid>
  //       <Center>
  //         <Button
  //           onClick={() => handleClickMore()}
  //           h="50px"
  //           w="200px"
  //           mr="50"
  //           fontSize="sm"
  //           mt="50px"
  //           mb="50px"
  //         >
  //           Ver más
  //         </Button>
  //       </Center>
  //     </Flex>
  //   );
  // } else if (site === 'search' || site === 'feed') {
  //   return (
  //     <Flex
  //       pr={'2%'}
  //       pt={'2%'}
  //       pl={'2%'}
  //       textAlign={'center'}
  //       justifyContent={'center'}
  //       direction={'column'}
  //       borderRadius={2}
  //       mt={site === 'feed' ? '0vh' : '4vh'}
  //       bg={'rgba(229, 191, 124, 0.3)'}
  //     >
  //       <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={'10'} mt={2} mr={5}>
  //         {post ? (
  //           renderPosts.map((user, index) => {
  //             if (user?.fullName && user?.post) {
  //               return (
  //                 <SlideFade in={onToggle} offsetY="20px">
  //                   <Box key={index}>
  //                     <TextPost
  //                       fullName={user?.fullName}
  //                       image={user?.image}
  //                       description={user?.post}
  //                       background={`logo.${Math.random(1, 2, 3)}`}
  //                       id={index}
  //                       userName={user.userName}
  //                     />
  //                   </Box>
  //                 </SlideFade>
  //               );
  //             }
  //           })
  //         ) : (
  //           <Box>
  //             <Text>no hay posteos</Text>{' '}
  //           </Box>
  //         )}
  //       </SimpleGrid>
  //       <Center>
  //         <Button
  //           onClick={() => handleClickMore()}
  //           h="50px"
  //           w="200px"
  //           mr="50"
  //           fontSize="sm"
  //           mt="50px"
  //           mb="50px"
  //         >
  //           Ver más
  //         </Button>
  //       </Center>
  //     </Flex>
  //   );
  // } else {
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
          {arrayUserPosts(site).posts.length !== 0? 
          (
            arrayUserPosts(site).posts.map((post, index) => {
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
          ): 
          (
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