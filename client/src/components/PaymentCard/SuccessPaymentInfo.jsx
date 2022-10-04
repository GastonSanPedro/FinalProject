import { Box, Text, Flex, Button, Image, useToast } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPremium } from '../../redux/action';

export const SuccessPaymentInfo = ({ myPosts }) => {
  //console.log(myPosts);
  const [Bill, setBill] = useState(JSON.parse(localStorage.getItem('bill')));
  const [Details, setDetails] = useState({});
  const [current, setCurrent] = useState();
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();

  const handleClick = (event, id) => {
    if (current === id) {
      setCurrent(undefined);
      setDetails(undefined);
    } else if (current === undefined) {
      const detailPost = myPosts?.find((post) => post._id === id);
      console.log(myPosts);
      setDetails(detailPost);
      setCurrent(id);
    } else {
      setCurrent(undefined);
      setDetails(undefined);
      const detailPost = myPosts?.find((post) => post._id === id);
      //console.log(detailPost);
      setDetails(detailPost);
      setCurrent(id);
    }
  };
  const handleSubmit = () => {
    const items = Bill?.items?.map((item) => {
      return {
        id: item.title,
      };
    });
    //console.log(items);
    dispatch(setPremium(items));
    toast({
      title: 'Sucess',
      description: 'Your post are premium now!',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    localStorage.removeItem('bill');
    setBill('');
    navigate('/Home');
  };
  return (
    <>
      <Box
        border={'1px solid black'}
        w={'81.8vw'}
        h={'88.4vh'}
        position={'absolute'}
        left={'18%'}
        mt={'11.5vh'}
        p={'2vw'}
        mb={'2vh'}
      >
        <Text fontSize={'2vw'} mb={'2vh'}>
          Your Premium posts:
        </Text>
        <Flex w={'78vw'} h={'60vh'} p={'2vw'} direction={'column'}>
          {Bill?.items?.map((item) => {
            const postId = item?.title;
            const date = new Date(Details?.createdAt);
            const formatedDate =
              date.toLocaleTimeString('es-ES').slice(0, -3) +
              ' ' +
              date.toLocaleDateString('es-ES');
            return (
              <Box
                w={'75vw'}
                h={Details?._id === item.title ? '16vh' : '5vh'}
                display={'flex'}
                alignItems={'left'}
                mb={'2vh'}
                bg={'gray.100'}
              >
                <Text width={'50vw'} h={'4vh'} position={'absolute'}>
                  Id: {item.title}
                </Text>
                <Button
                  position={'absolute'}
                  right={'4%'}
                  mt={'0.5vh'}
                  size={'sm'}
                  bg={'orange.200'}
                  onClick={(e) => handleClick(e, item.title)}
                >
                  See Detail
                </Button>
                <Box
                  display={current === item.title ? 'flex' : 'none'}
                  position={'relative'}
                  marginTop={'5vh'}
                  w={'60vw'}
                  mr={'20vw'}
                  left={'0%'}
                >
                  <Image src={Details?.pics} h={'10vh'} />
                  <Box>
                    <Text ml={'2vw'}>Description: {Details?.description}</Text>
                    <Text ml={'2vw'}>Date: {formatedDate}</Text>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Flex>
        <Button
          position={'absolute'}
          bg={'orange.200'}
          size={'lg'}
          right={'2%'}
          mt={'2vh'}
          onClick={(e) => {
            handleSubmit();
          }}
        >
          Finish
        </Button>
      </Box>
    </>
  );
};
