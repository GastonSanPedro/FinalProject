import { Box, Avatar, Center, Stack, Text, HStack, Button } from '@chakra-ui/react';
import { IoExitOutline } from 'react-icons/io5'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logOut } from '../../redux/action';
import {  useNavigate } from 'react-router-dom';

const UserCard = ({ site, myUser, user}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleClickLogout = () => {
    localStorage.removeItem('user');
    dispatch(logOut());
    navigate('/landing-page');
  };
  const handleClickFollow = () => {
      // dispatch(addFriend(myUserId, idProfile))
      alert('ok')
  }

  return (
    <Box
      className='BackGroundImage'
      display={'flex'}
      flexDir={'column'}
      ml="80%"
      mt="19%"
      h="45vh"
      w="17.5vw"
      p='1%'
      position={'absolute'}
      bg={'rgba(140, 161, 116, 0.6)'}
      justifyContent={'center'}
    >
      <Center>
        <Stack>
          <Avatar
            size="3xl"
            showBorder='true'
            border={'7px solid white'}
            mt="-55%"
            mb={'10%'}
            src={
              'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
            }
          ></Avatar>
          <Stack
            display={'flex'}
            alignContent={'center'}
            justifyContent={'center'}
            >
          <Text
            pt="3vh"
            fontWeight="bold"
            fontSize="3xl"
            textAlign={'center'}
          >
            {myUser.fullName}
          </Text>
          <HStack
            justify={'space-evenly'}>
          <Box
            align={'center'}>
          <Text fontSize="lg" fontWeight={'semibold'}>Friends</Text>
          <Text fontSize='md'>{myUser.friends?.length}</Text>
          </Box>
          <Box
           align={'center'}>
          <Text fontSize="lg" fontWeight={'semibold'}>Posts</Text>
          <Text fontSize='md'>{myUser.posts?.length}</Text>
          </Box>
          </HStack>
          </Stack>
        </Stack>  
      </Center>
      {
        site === 'profile' ?
        (
          <Button
            zIndex={20}
            rightIcon={<IoExitOutline/>}
            mt={'4%'}
            bg={'none'}
            borderRadius={2}
            _hover={{
              color: 'black',
              bg: 'white'
            }}
            onClick={()=>{handleClickLogout()}}>LOG OUT</Button>
        ):(
          <Button
            zIndex={20}
            leftIcon={<AiOutlineUserAdd/>}
            mt={'4%'}
            bg={'none'}
            borderRadius={2}
            _hover={{
              color: 'black',
              bg: 'white'
            }}
            onClick={()=>handleClickFollow()}>FOLLOW</Button>
        )
      }
    </Box>
  );
};

export default UserCard;