import React, { useState } from 'react';
import {
  Avatar,
  chakra,
  Flex,
  useColorModeValue,
  IconButton,
  ModalOverlay,
  useDisclosure,
  MenuList,
  MenuButton,
  Menu,
  MenuItem,
  useToast,
  Box,
  Badge,
} from '@chakra-ui/react';
import { BiMessage, BiShocked, BiHeart, BiHappyAlt } from 'react-icons/bi';
import { FiMoreVertical } from 'react-icons/fi';
import { BsSun } from 'react-icons/bs';
import Quotes from '../../assets/comillas.svg';
import { useDispatch } from 'react-redux';
import { getSinglePosts, reportPost, postComment } from '../../redux/action';
import { PostModal } from '../PostModal/PostModal';
import { useNavigate } from 'react-router-dom';

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
  loggedEmail,
  date,
  avatar,
  premium,
  email,
  site,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const [hide, setHide] = useState(false);
  const [Reaction, setReaction] = useState({});
  const [input, setInput] = useState({
    idUser: loggedUser,
    idPost: postId,
    description: '',
  });
  console.log(premium);
  const newDate = new Date(date);
  const formatedDate =
    newDate.toLocaleTimeString('es-ES').slice(0, -3) +
    ' ' +
    newDate.toLocaleDateString('es-ES');
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const handleClick = () => {
    setOverlay(<OverlayOne />);
    dispatch(getSinglePosts(postId));
    onOpen();
  };
  const handleReport = () => {
    dispatch(reportPost(postId));
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
      <PostModal
        singlePost={singlePost}
        fullName={fullName}
        description={description}
        image={image}
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
        loggedUser={loggedUser}
        loggedEmail={loggedEmail}
        postId={postId}
        date={formatedDate}
        avatar={avatar}
        email={email}
      />
      <Flex
        maxW={'640px'}
        direction={{ base: 'column-reverse', md: 'row' }}
        width={site === 'profile' || site === 'anyProfile' ? '34vw' : '24vw'}
        h={'30vh'}
        p={5}
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
          width={site === 'profile' ? '25vw' : '20vw'}
          height={'18vh'}
          mt={'2vh'}
          overflow={'hidden'}
          pl={'1vw'}
        >
          {premium === true ? (
            <Badge w={'4.5vw'} color={'white'} bg={'yellow.300'}>
              Premium
            </Badge>
          ) : null}
          <chakra.p
            fontFamily={'Roboto'}
            fontWeight={'medium'}
            textAlign={'left'}
            fontSize={'15px'}
            pb={4}
          >
            {description}
          </chakra.p>
          <chakra.p
            fontFamily={'Roboto'}
            fontWeight={'bold'}
            fontSize={14}
            textAlign={'left'}
          >
            {fullName}
          </chakra.p>
        </Flex>
        <Flex
          flexDir={'column'}
          alignContent={'center'}
          justifyContent={'center'}
          height={'20vh'}
          minW={'35%'}
        >
          <Avatar
            onClick={() => {
              navigate(`/user/${userName}`);
            }}
            size={'xl'}
            src={image}
            name={fullName}
            height={'100px'}
            width={'100px'}
            justifySelf={'center'}
            alignSelf={'center'}
            mt={'8%'}
            mb={'18%'}
            ml={'3%'}
          />
        </Flex>
        <Flex
          align={'flex-end'}
          justify={'center'}
          h={'4vh'}
          position={'absolute'}
          bottom={'3'}
          right={'28%'}
        >
          <Box
            onMouseLeave={() => {
              setHide(false);
            }}
          >
            <IconButton
              size={'lg'}
              h={30}
              bg={'none'}
              icon={<BsSun />}
              //   name="suns"
              // value={
              //   comment.likes?.length === 0 ? 0 : Number(comment.likes[0]?.suns)
              // }
              onClick={(e) => {
                setReaction({
                  ...Reaction,
                  suns: Number(e.target.value) + 1,
                });
              }}
              onMouseEnter={() => {
                setHide(true);
              }}
              _hover={{
                bg: 'white',
              }}
              _active={{
                bg: 'white',
                color: 'logo.3',
              }}
            />
            <Box
              transition={' display 8s'}
              display={!hide ? 'none' : 'inline'}
              width={!hide ? '4vw' : '12vw'}
            >
              <IconButton
                size={'lg'}
                h={30}
                bg={'none'}
                name="happyLeaf"
                // value={comment.likes?.happyLeaf}
                icon={<BiHappyAlt />}
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
                name="heart"
                // value={comment?.likes?.heart}
                icon={<BiHeart />}
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
                name="confusedLeaf"
                // value={comment?.likes?.confusedLeaf}
                icon={<BiShocked />}
                _hover={{
                  bg: 'white',
                }}
                _active={{
                  bg: 'white',
                  color: 'logo.3',
                }}
              />
            </Box>
          </Box>
        </Flex>
        <IconButton
          position={'absolute'}
          size={'lg'}
          bg={'none'}
          h={'4vh'}
          icon={<BiMessage />}
          right={site === 'profile' ? '10%' : '14%'}
          bottom={'3'}
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
        <Menu>
          <MenuButton
            as={IconButton}
            position="absolute"
            right={'2%'}
            bottom={'3'}
            siz={'lg'}
            h={'4vh'}
            bg={'none'}
            icon={<FiMoreVertical />}
            _hover={{
              bg: 'white',
            }}
            _active={{
              bg: 'white',
              color: 'logo.3',
            }}
          />
          <MenuList>
            <MenuItem onClick={() => handleReport()}>Report post</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </>
  );
}
