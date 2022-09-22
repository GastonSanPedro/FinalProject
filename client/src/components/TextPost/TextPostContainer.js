import React from 'react';
import {
  Box,
  SimpleGrid,
  Text,
  Button,
  Center,
  Flex
} from '@chakra-ui/react';
import TextPost from './TextPost';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getUsers } from '../../redux/actions';
import CreatePost from '../CreatePost/CreatePost';

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

export default function TextPostContainer({ site }) {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const allUsers = useSelector((state) => state.users);
  const posteosUser = users?.map((user) => {
    return {
      fullName: user.fullName,
      image: user.image,
      posteos: user.posteos.map((posteo) => posteo.description),
    };
  });

  const post = posteosUser.map((user) => {
    if (user.posteos.some((post) => post.includes(' '))) {
      return {
        fullName: user.fullName,
        image: user.image,
        post: user.posteos.find((post) => post.includes(' ')),
      };
    }
  });
  // console.log(post)

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  //--------- Lógica de ver mas --------

  const [currentStart, setCurrentStart] = useState(0);
  const [currentEnd, setCurrentEnd] = useState(8);
  // const [button1, setButton1] = useState(true)
  // const [button2, setButton2] = useState(false)

  const renderPosts =
    post.length > 8 ? post?.slice(currentStart, currentEnd) : post;

  const handleClickMore = () => {
    setCurrentEnd(currentEnd + 8);
  };

  return (
    <Flex textAlign={'center'} justifyContent={'center'} direction={'column'}>
      <CreatePost site={site} />
      <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={'10'} mt={2}>
        {post ? (
          renderPosts.map((user) => {
            if (user?.fullName && user?.post) {
              return (
                <TextPost
                  fullName={user?.fullName}
                  image={user?.image}
                  description={user?.post}
                  background={`logo.${Math.random(1, 2, 3)}`}
                />
              );
            }
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
          mt= "50px"
          mb= "50px"
        >
          Ver más
        </Button>
      </Center>
    </Flex>
  );
}
