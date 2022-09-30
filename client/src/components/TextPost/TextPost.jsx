import React, { useState } from 'react';
import {
  Avatar,
  chakra,
  Flex,
  useColorModeValue,
  IconButton,
  ModalOverlay,
  useDisclosure,
  Modal,
  ModalContent,
  Button,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Text,
  Box,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import { BiMessage } from 'react-icons/bi';
import { BsSun } from 'react-icons/bs';
import Quotes from '../../assets/comillas.svg';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  getSinglePosts,
  cleanSinglePost,
  postComment,
} from '../../redux/action';

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
//--------- Lógica socket.io --------
//const [liked, setLiked] = useState(false)
// const handleNotification = () =>{
//   setLiked(true)
//   socket.emit("sendNotification",{
//       senderId:user,
//       reciverId:"tomar el id"
//   })
//}
// En el comienzo dela funcion TextPost(props ,{socket, user})
//Logica del me gusta, o sea le da color al corazon/estrella y despacha el handle
//{liked ? (<StarIcon color="yellow" />
//) : (<StarIcon color="black" onClick={handleNotification}/>)}
//----------------------------------
export default function TextPost({
  fullName,
  description,
  image,
  background,
  userName,
  postId,
  singlePost,
  loggedUser,
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

  return (
    <>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior={'inside'}
      >
        {overlay}
        <ModalContent ml={'15vw'} mt={'20vh'} maxh={'84vh'}>
          <ModalHeader>{fullName}</ModalHeader>
          <ModalCloseButton
            onClick={(e) => {
              onClose();
              dispatch(cleanSinglePost());
            }}
          />
          <ModalBody>
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
                            <Link>
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
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
      <Flex
        maxW={'640px'}
        direction={{ base: 'column-reverse', md: 'row' }}
        width={'full'}
        p={8}
        justifyContent={'space-between'}
        position={'relative'}
        ml={'1vw'}
        bg={useColorModeValue('white', 'gray.800')}
        _after={{
          content: '""',
          position: 'absolute',
          height: '21px',
          width: '29px',
          left: '35px',
          top: '10px',
          backgroundSize: 'cover',
          backgroundImage: `${Quotes}`,
        }}
        _hover={{
          bg: `logo.${randomNumber(1, 4)}`,
        }}
      >
        <Flex
          direction={'column'}
          textAlign={'left'}
          justifyContent={'space-between'}
        >
          <chakra.p
            fontFamily={'Roboto'}
            fontWeight={'medium'}
            textAlign={'right'}
            fontSize={'15px'}
            pb={4}
          >
            {description}
          </chakra.p>
          <chakra.p
            fontFamily={'Roboto'}
            fontWeight={'bold'}
            fontSize={14}
            textAlign={'right'}
          >
            {fullName}
          </chakra.p>
        </Flex>
        <Flex
          flexDir={'column'}
          alignContent={'center'}
          justifyContent={'center'}
          minW={'35%'}
        >
          <Link to={`/user/${userName}`}>
            <Avatar
              size={'xl'}
              src={image}
              name={fullName}
              height={'100px'}
              width={'100px'}
              justifySelf={'center'}
              alignSelf={'center'}
              mt={'10%'}
              mb={'18%'}
              ml={'3%'}
            />
          </Link>
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
        </Flex>
      </Flex>
    </>
  );
}
