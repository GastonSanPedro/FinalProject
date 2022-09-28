import React, { useState } from 'react';
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Image,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalFooter,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Button,
  Input,
  ModalCloseButton,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BiMessage } from 'react-icons/bi';
import { BsSun } from 'react-icons/bs';
import { getSinglePosts, cleanSinglePost } from '../../redux/action';
import { useDispatch, useSelector } from 'react-redux';

function randomNumber(min, max) {
  let a = Math.random() * (max - min) + min;
  return Math.floor(a);
}
const OverlayOne = () => (
  <ModalOverlay
    bg="blackAlpha.300"
    backdropFilter="blur(10px) hue-rotate(90deg)"
    w={'83.5vw'}
    h={'90vh'}
    position={'fixed'}
    mt={'10.5vh'}
    left={'17%'}
  />
);

export default function ImgPost({
  image,
  fullName,
  description,
  date,
  avatar,
  userName,
  email,
  singlePost,
  postId,
}) {
  const [Input, setInput] = useState({
    idUser: '',
    title: '',
    description: '',
  });
  const dispatch = useDispatch();
  const handleClick = () => {
    setOverlay(<OverlayOne />);
    onOpen();
    dispatch(getSinglePosts(postId));
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);
  return (
    <Center py={6}>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent ml={'15vw'}>
          <ModalHeader>{fullName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={image} width={'100%'} />
            <Text textAlign={'center'}>{description}</Text>
            <Box bg={'orange.300'} mt={'2vh'}>
              <Text>Comentarios</Text>
              <Box>
                {singlePost?.comments?.length > 0 ? (
                  singlePost?.comments.map((comment) => {
                    return (
                      <Box>
                        <Text>{comment.fullName}</Text>
                        <Text>{comment.description}</Text>
                        <Text>{comment.title}</Text>
                      </Box>
                    );
                  })
                ) : (
                  <Text>Aun no hay comentarios</Text>
                )}
              </Box>
            </Box>
            <Input placeholder="Comment here"></Input>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={(e) => {
                onClose();
                dispatch(cleanSinglePost());
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Box
        maxW={'445px'}
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        rounded={'sm'}
        p={6}
        overflow={'hidden'}
        _hover={{
          bg: `logo.${randomNumber(1, 4)}`,
        }}
      >
        <Box h={'210px'} mt={-6} mx={-6} mb={6} pos={'relative'}>
          <Image
            src={image}
            layout={'cover'}
            boxSize="30vh"
            width={'100%'}
            objectFit={'cover'}
          />
        </Box>
        <Stack>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            textTransform="uppercase"
            fontSize={'2xl'}
            fontFamily={'body'}
          >
            {userName}
          </Heading>
          <Text color={'gray.500'}>{description}</Text>
        </Stack>
        <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
          <Link to={`/user/${email}`}>
            <Avatar src={avatar} name={fullName} alt={'Author'} />
          </Link>
          <Stack direction={'column'} spacing={0} fontSize={'sm'}>
            <Text fontWeight={600}>{fullName}</Text>
            <Text color={'gray.500'}>{date}</Text>
          </Stack>
        </Stack>
        <Flex align={'flex-end'} justify={'center'}>
          <IconButton
            size={'lg'}
            bg={'none'}
            h={30}
            icon={<BiMessage />}
            onClick={() => {
              handleClick();
            }}
            _hover={{
              bg: 'white',
            }}
            _active={{
              bg: 'white',
              color: 'logo.3',
            }}
          />
          <IconButton
            size={'lg'}
            h={30}
            bg={'none'}
            icon={<BsSun />}
            _hover={{
              bg: 'white',
            }}
            _active={{
              bg: 'white',
              color: 'logo.3',
            }}
          />
        </Flex>
      </Box>
    </Center>
  );
}
