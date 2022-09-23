import React from 'react';
import { Box, SimpleGrid, Text, Button, Center, Flex } from '@chakra-ui/react';
import TextPost from './TextPost';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts, getUsers } from '../../redux/action';
import CreatePost from '../CreatePost/CreatePost';
import UserSearchContainer from '../UserSearch/UserSearchContainer';
import { bottom } from '@popperjs/core';
import ImgPost from '../ImgPost/ImgPost';

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

export default function TextPostContainer({site, word}) {

  const dispatch = useDispatch();
  const [textImg, setTextImg] = useState('Img')
  const users = useSelector((state) => state.users);
  const posteosUser = users?.map((user) => {
    return {
      fullName: user.fullName,
      image: user.image,
      posteos: user.posteos.map((posteo) => posteo.description),
    };
  });

  const post = posteosUser.map((user) => {
    if (user.posteos.some((post) => post.includes(site==='search'?word:' '))) {
      return {
        fullName: user.fullName,
        image: user.image,
        post: user.posteos.find((post) => post.includes(site==='search'?word:' ')),
      };
    }
  });

  const postImg = []

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  //--------- Lógica de ver mas --------

  const [currentStart, setCurrentStart] = useState(0);
  const [currentEnd, setCurrentEnd] = useState(8);
  

  const renderPosts = post.length > 8 ? post?.slice(currentStart, currentEnd) : post;

  const handleClickMore = () => {
    setCurrentEnd(currentEnd + 8);
  };

  return (
    <>
    <Flex 
    pr={'2%'}
    pl={'2%'}
    textAlign={'center'} 
    justifyContent={'center'} 
    direction={'column'} 
    bg={'rgba(229, 191, 124, 0.3)'}
    borderRadius={2}
    >
      {
        site === 'search' ? <UserSearchContainer word={word}/> : <CreatePost site={site} />
      }

  { (<SimpleGrid columns={{ base: 1, xl: 2 }} spacing={'10'} mt={2} mr={5}>
        {post ?
            renderPosts.map((user, index) => {
                if (user?.fullName && user?.post) {
                    return (
                        <Box
                            key={index}>
                            <TextPost
                                fullName={user?.fullName}
                                image={user?.image}
                                description={user?.post}
                                background={`logo.${Math.random(1, 2, 3)}`}
                                id={index}
                            />
                        </Box>
                    )
                }
            })
        : <Box><Text>no hay posteos</Text></Box>}
        </SimpleGrid> 
    )
}
       
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
    </>
  );
}
