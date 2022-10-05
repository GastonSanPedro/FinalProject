import React, { useState } from 'react';
import {
  Box,
  Center,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Button,
  useColorModeValue,
  useDisclosure,
  ModalOverlay,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { PaymentModal } from './PaymentModal';

const OverlayOne = () => (
  <ModalOverlay
    bg="blackAlpha.300"
    backdropFilter="blur(10px) hue-rotate(90deg)"
    w={'83.5vw'}
    h={'90vh'}
    position={'fixed'}
    mt={'10.5vh'}
    left={'18%'}
  />
);

export default function PaymentCard({
  num,
  days,
  price,
  myUser,
  payment,
  Bill,
}) {
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = () => {
    setOverlay(<OverlayOne />);
    onOpen();
  };
  return (
    <Center py={6}>
      <PaymentModal
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        myPosts={myUser?.posts}
        loggedId={myUser?._id}
        payment={payment}
        Bill={Bill}
      />
      <Box
        maxW={'330px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.800')}
        rounded={'sm'}
        overflow={'hidden'}
      >
        <Stack
          textAlign={'center'}
          p={6}
          color={useColorModeValue('gray.800', 'white')}
          align={'center'}
        >
          <Text
            fontSize={'sm'}
            fontWeight={500}
            bg={useColorModeValue('green.50', 'green.900')}
            p={2}
            px={3}
            color={'green.500'}
            rounded={'full'}
          >
            Post Add
          </Text>
          <Stack direction={'row'} align={'center'} justify={'center'}>
            <Text fontSize={'xl'}>usd$</Text>
            <Text fontSize={'6xl'} fontWeight={800}>
              {`${price}`}
            </Text>
            <Text color={'gray.500'}>/final</Text>
          </Stack>
        </Stack>

        <Box bg={'rgba(205, 235, 164, 0.6)'} px={6} py={10}>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={CheckIcon} color="logo.3" />
              {`${days} day of extra scope`}
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color="logo.3" />
              Special stadistics
            </ListItem>
            <ListItem>
              <ListIcon as={CheckIcon} color="logo.3" />
              {`${num}% extra chances of geting in the trending posts`}
            </ListItem>
          </List>
          {/* <Button
            mt={10}
            w={'full'}
            bg={'logo.3'}
            color={'white'}
            rounded={'sm'}
            onClick={(e) => handleClick()}
            _hover={{
              bg: 'rgba(140, 161, 116, 0.7)',
              color: 'white',
            }}
            _active={{
              bg: 'rgba(140, 161, 116, 0.7)',
            }}
          >
            Start your campaign
          </Button> */}
        </Box>
      </Box>
    </Center>
  );
}
