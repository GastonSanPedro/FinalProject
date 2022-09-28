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
  InputRightElement,
  InputGroup,
  useToast,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BiMessage } from 'react-icons/bi';
import { BsSun } from 'react-icons/bs';
import {
  getSinglePosts,
  cleanSinglePost,
  postComment,
} from '../../redux/action';
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
    left={'18%'}
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
  loggedUser,
  loggedEmail,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const [input, setInput] = useState({
    idUser: loggedUser,
    idPost: postId,
    description: '',
  });
  const dispatch = useDispatch();
  const toast = useToast();
  const handleClick = () => {
    setOverlay(<OverlayOne />);
    onOpen();
    dispatch(getSinglePosts(postId));
  };
  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    dispatch(postComment(input, postId));
    setInput({ idUser: loggedUser, idPost: postId, description: '' });
    toast({
      title: 'Sucess',
      description: 'Comment added successfully',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };
  //console.log(loggedUser, postId);
  // console.log(singlePost);
  return (
    <Center py={6}>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={'inside'}
      >
        {overlay}
        <ModalContent ml={'15vw'} mt={'20vh'} maxh={'84vh'}>
          <ModalHeader>{fullName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Image src={image} width={'100%'} />
            <Text textAlign={'center'}>{description}</Text>
            <Box bg={'gray.200'} mt={'2vh'} borderRadius={'4vh'}>
              <Text textAlign={'center'}>Comentarios</Text>
              <Box>
                {singlePost?.comments?.length > 0 ? (
                  singlePost?.comments?.map((comment) => {
                    const date = new Date(comment.createdAt);
                    const formatedDate =
                      date.toLocaleTimeString('es-ES').slice(0, -3) +
                      ' ' +
                      date.toLocaleDateString('es-ES');
                    return (
                      <Flex
                        bg={'gray.200'}
                        p={'1vh'}
                        display={'block'}
                        dir={'column'}
                        borderRadius={'2vw'}
                      >
                        <Box
                          width={'100%'}
                          height={'2.75vh'}
                          display={'flex'}
                          mb={'1vh'}
                        >
                          <Box width={'50%'} textAlign={'left'}>
                            <Link to={`/user/${loggedEmail}`}>
                              <Text color={'orange.300'}>
                                {comment.idUser.fullName}
                              </Text>
                            </Link>
                          </Box>
                          <Box width={'50%'} textAlign={'right'}>
                            <Text fontSize={'1.4vh'} pt={'0.7vh'}>
                              {formatedDate}
                            </Text>
                          </Box>
                        </Box>
                        <Flex width={'100%'} maxH={'auto'} minH={'4.75vh'}>
                          <Text pl={'1vw'}>{comment.description}</Text>
                        </Flex>
                      </Flex>
                    );
                  })
                ) : (
                  <Text>Aun no hay comentarios</Text>
                )}
              </Box>
            </Box>
            <InputGroup>
              <Input
                placeholder="Comment here"
                type="text"
                name="description"
                value={input.description}
                mt={'2vh'}
                onChange={(e) => {
                  handleChange(e);
                }}
              />
              <InputRightElement
                w={'6vw'}
                pointerEvents="painted"
                children={
                  <Button
                    bg={'orange.200'}
                    mt={'4vh'}
                    w={'100%'}
                    onClick={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    Send
                  </Button>
                }
              />
            </InputGroup>
          </ModalBody>
          <ModalFooter> </ModalFooter>
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
