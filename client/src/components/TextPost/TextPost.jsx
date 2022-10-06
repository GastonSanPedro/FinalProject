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
  Button,
  Text,
} from '@chakra-ui/react';
import { BiMessage, BiShocked, BiHeart, BiHappyAlt } from 'react-icons/bi';
import { FiMoreVertical } from 'react-icons/fi';
import { BsSun } from 'react-icons/bs';
import Quotes from '../../assets/comillas.svg';
import { useDispatch } from 'react-redux';
import {
  getSinglePosts,
  reportPost,
  postComment,
  getPosts,
  getUser,
  postReaction,
} from '../../redux/action';
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
function sentenceCase(input, lowercaseBefore) {
  input = input === undefined || input === null ? '' : input;
  if (lowercaseBefore) {
    input = input.toLowerCase();
  }
  return input
    .toString()
    .replace(/(^|\. *)([a-z])/g, function (match, separator, char) {
      return separator + char.toUpperCase();
    });
}
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
  likes,
  rating,
  site,
  authorId,
  comments,
  handleDelete,
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
  const heartsReactions = likes.filter((r) => r.type === 'heart');
  const sunsReactions = likes.filter((r) => r.type === 'suns');
  const happyReactions = likes.filter((r) => r.type === 'happyLeaf');
  const confusedReactions = likes.filter((r) => r.type === 'confusedLeaf');
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
  const handleClickReaction = (e, value) => {
    const userReaction = likes?.find((r) => r.idUser === loggedUser);
    //console.log(userReaction);
    if (userReaction === undefined) {
      const newReaction = [...likes, { idUser: loggedUser, type: value }];
      console.log(newReaction);
      dispatch(
        postReaction(
          { likes: newReaction, rating: rating + 1 },
          postId,
          null,
          loggedUser
        )
      );
      if (site === 'explore' || site === 'search') {
        setTimeout(function () {
          dispatch(getPosts());
        }, 1000);
      }
      if (site === 'anyProfile') {
        setTimeout(function () {
          dispatch(getUser(authorId));
        }, 1000);
      }
      if (site === 'profile') {
        setTimeout(function () {
          dispatch(getPosts());
        }, 1000);
      }
    } else if (userReaction && userReaction.type === value) {
      const filtered = likes.filter((r) => r.idUser !== loggedUser);
      dispatch(
        postReaction(
          { likes: filtered, rating: rating - 1 },
          postId,
          null,
          loggedUser
        )
      );
      if (site === 'explore' || site === 'search') {
        setTimeout(function () {
          dispatch(getPosts());
        }, 1000);
      }
      if (site === 'anyProfile') {
        setTimeout(function () {
          dispatch(getUser(authorId));
        }, 1000);
      }
      if (site === 'profile') {
        setTimeout(function () {
          dispatch(getPosts());
        }, 1000);
      }
    } else {
      const filtered = likes.filter((r) => r.idUser !== loggedUser);
      const newReaction = [...filtered, { idUser: loggedUser, type: value }];
      console.log(newReaction);
      dispatch(postReaction({ likes: newReaction }, postId, null, loggedUser));
      if (site === 'explore' || site === 'search') {
        setTimeout(function () {
          dispatch(getPosts());
        }, 1000);
      }
      if (site === 'anyProfile') {
        setTimeout(function () {
          dispatch(getUser(authorId));
        }, 1000);
      }
      if (site === 'profile') {
        setTimeout(function () {
          dispatch(getPosts());
        }, 1000);
      }
    }
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
        rating={rating}
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
        width={site === 'profile' || site === 'anyProfile' ? '34vw' : '34vw'}
        h={'30vh'}
        border="1px"
        borderColor="gray.200"
        p={5}
        justifyContent={'space-between'}
        position={'relative'}
        ml={'1vw'}
        bgColor="#f5f5f5"
        boxShadow={premium ? '0px 1vh 2vw -1px #FBFF3A;' : null}
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
            <Badge position={'absolute'} bg={'gold'} right={'13%'} top={'5%'}>
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
            {sentenceCase(description.slice(0, 100) + '...')}
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
        <Box pt={3}>
          <Flex
            position={'absolute'}
            ml={'-30vw'}
            align={'flex-start'}
            justify={'center'}
            width={'17vw'}
            zIndex={5}
            top={'80%'}
          >
            <Box
              onMouseLeave={() => {
                setHide(false);
              }}
            >
              <Button
                size={'sm'}
                h={30}
                bg={'yellow.300'}
                icon={<BsSun />}
                name="suns"
                mr={'0.3vw'}
                // value={
                //   comment.likes?.length === 0 ? 0 : Number(comment.likes[0]?.suns)
                // }
                onClick={(e) => {
                  handleClickReaction(e, 'suns');
                }}
                onMouseEnter={() => {
                  setHide(true);
                }}
                _hover={{
                  bg: 'yellow.200',
                }}
                _active={{
                  bg: 'white',
                  color: 'logo.3',
                }}
              >
                <BsSun />
                <Text ml={'0.5vw'}>{sunsReactions.length}</Text>
              </Button>
              <Box transition={' display 8s'} display={'inline'} width={'12vw'}>
                <Button
                  size={'sm'}
                  h={30}
                  bg={'green.500'}
                  mr={'0.3vw'}
                  name="happyLeaf"
                  // value={comment.likes?.happyLeaf}
                  _hover={{
                    bg: 'logo.3',
                  }}
                  _active={{
                    bg: 'white',
                    color: 'logo.3',
                  }}
                  onClick={(e) => {
                    handleClickReaction(e, 'happyLeaf');
                  }}
                >
                  <BiHappyAlt />
                  <Text ml={'0.5vw'}>{happyReactions.length}</Text>
                </Button>
                <Button
                  size={'sm'}
                  h={30}
                  bg={'red.400'}
                  name="heart"
                  mr={'0.3vw'}
                  // value={comment?.likes?.heart}
                  _hover={{
                    bg: 'red.300',
                  }}
                  _active={{
                    bg: 'white',
                    color: 'logo.3',
                  }}
                  onClick={(e) => {
                    handleClickReaction(e, 'heart');
                  }}
                >
                  <BiHeart></BiHeart>
                  <Text ml={'0.5vw'}>{heartsReactions.length}</Text>
                </Button>
                <Button
                  size={'sm'}
                  h={30}
                  bg={'blue.400'}
                  name="confusedLeaf"
                  // value={comment?.likes?.confusedLeaf}
                  icon={<BiShocked />}
                  _hover={{
                    bg: 'blue.300',
                  }}
                  _active={{
                    bg: 'white',
                    color: 'logo.3',
                  }}
                  onClick={(e) => {
                    handleClickReaction(e, 'confusedLeaf');
                  }}
                >
                  <BiShocked />
                  <Text ml={'0.5vw'}>{confusedReactions.length}</Text>
                </Button>
              </Box>
            </Box>
          </Flex>
          <Button
            zIndex={5}
            position="absolute"
            ml={'-37%'}
            top={'80.1%'}
            size={'sm'}
            bg={'gray.300'}
            h={30}
            onClick={() => {
              handleClick();
            }}
            _hover={{
              bg: 'gray.200',
            }}
            _active={{
              bg: 'white',
              color: 'logo.3',
            }}
          >
            <BiMessage />
            <Text ml={'0.5vw'}>{comments.length}</Text>
          </Button>
          <Menu>
            <MenuButton
              zIndex={5}
              as={IconButton}
              position="absolute"
              ml={'-24%'}
              mb={'4vh'}
              top={'80.1%'}
              siz={'lg'}
              h={30}
              bg={'gray.200'}
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
        </Box>
      </Flex>
      {site === 'admin' ? (
        <Button onClick={() => handleDelete(postId)}>Eliminar</Button>
      ) : null}
    </>
  );
}
