import { Box, Text, Flex, Button, Image, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setPremium } from '../../redux/action';

export const SuccessPaymentInfo = ({ myPosts }) => {
  const [Bill, setBill] = useState(JSON.parse(localStorage.getItem('bill')));
  const [Details, setDetails] = useState({});
  const [current, setCurrent] = useState();
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  console.log();
  const handleClick = (event, id) => {
    if (current === id) {
      setCurrent(undefined);
      setDetails(undefined);
    } else if (current === undefined) {
      const detailPost = myPosts?.find((post) => post._id === id);
      setDetails(detailPost);
      setCurrent(id);
    } else {
      setCurrent(undefined);
      setDetails(undefined);
      const detailPost = myPosts?.find((post) => post._id === id);
      setDetails(detailPost);
      setCurrent(id);
    }
  };
  console.log(Bill);
  useEffect(() => {
    const items = Bill?.items?.map((item) => {
      //console.log(myPosts?.find((obj) => obj._id === item.title));
      const match = myPosts?.findIndex((obj) => obj._id === item.title);
      return {
        id: item.title,
        rating: myPosts[match]?.rating,
        value: item.unit_price,
      };
    });
    console.log(items);
    dispatch(setPremium(items));
  }, [Bill]);

  return (
    <>
      <Box
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
                h={Details?._id === item.title ? '16vh' : '8vh'}
                width={'90%'}
                display={'inline-flex'}
                alignItems={'center'}
                mb={'2%'}
                bg={'gray.200'}
                p={2}
              >
                <Text
                  mt={'1vh'}
                  width={'40vw'}
                  alignSelf={'center'}
                  display={current !== item.title ? 'flex' : 'none'}
                >
                  Id: {item.title}
                </Text>
                <Button
                  position={'absolute'}
                  right={'16%'}
                  alignSelf={'center'}
                  size={'sm'}
                  bg={'orange.200'}
                  onClick={(e) => handleClick(e, item.title)}
                >
                  See Detail
                </Button>
                <Box
                  display={current === item.title ? 'flex' : 'none'}
                  alignSelf={'center'}
                  w={'60vw'}
                  mr={'20vw'}
                  left={'0%'}
                >
                  <Image
                    src={
                      Details?.pics
                        ? Details?.pics
                        : 'https://res.cloudinary.com/duilsmrmx/image/upload/v1664933936/leafme/tbjmhzzcfuejoonaofb9.png'
                    }
                    h={'10vh'}
                  />
                  <Box>
                    <Text
                      mt={'1vh'}
                      width={'40vw'}
                      ml={'2vw'}
                      alignSelf={'center'}
                    >
                      Id: {Details?._id}
                    </Text>
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
          right={'12%'}
          mt={'2vh'}
          onClick={(e) => {
            navigate('/profile');
            localStorage.removeItem('bill');
            setBill('');
            toast({
              title: 'Success',
              description: 'Your post are premium now!',
              status: 'success',
              duration: 2000,
              isClosable: true,
            });
          }}
        >
          Finish
        </Button>
      </Box>
    </>
  );
};
