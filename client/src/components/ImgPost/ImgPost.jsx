import {
  Box,
  Button,
  Text,
  Avatar,
  Image,
  Flex,
  IconButton,
  ModalOverlay,
  useDisclosure,
  MenuList,
  MenuItem,
  Menu,
  MenuButton,
  VStack,
  HStack,
  Badge,
} from '@chakra-ui/react';
import {
  getMyUser,
  getSinglePosts,
  postReaction,
  reportPost,
  getPosts,
  getUser,
  getFriendsPosts,
  getTrendingPosts,
} from '../../redux/action';
import { useState } from 'react';
import { BiMessage, BiShocked, BiHeart, BiHappyAlt } from 'react-icons/bi';
import { BsSun } from 'react-icons/bs';
import { FiMoreVertical } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
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

export default function ImgPost({
  image,
  fullName,
  description,
  date,
  avatar,
  userName,
  firstname,
  lastname,
  email,
  singlePost,
  postId,
  likes,
  loggedUser,
  loggedEmail,
  site,
  handleDelete,
  handleRestore,
  comments,
  authorId,
  rating,
  premium,
  firstName,
  lastName
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const [hide, setHide] = useState(false);
  const [Reaction, setReaction] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    setOverlay(<OverlayOne />);
    onOpen();
    dispatch(getSinglePosts(postId));
  };
  const handleReport = () => {
    dispatch(reportPost(postId));
  };
  const newDate = new Date(date);
  const formatedDate =
    newDate.toLocaleTimeString('es-ES').slice(0, -3) +
    ' ' +
    newDate.toLocaleDateString('es-ES');

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
      if (site === 'feed') {
        setTimeout(function () {
          dispatch(getFriendsPosts(loggedUser));
        }, 1000);
      }
      if (site === 'trending') {
        setTimeout(function () {
          dispatch(getTrendingPosts());
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
      if (site === 'feed') {
        setTimeout(function () {
          dispatch(getFriendsPosts(loggedUser));
        }, 1000);
      }
      if (site === 'trending') {
        setTimeout(function () {
          dispatch(getTrendingPosts());
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
      if (site === 'feed') {
        setTimeout(function () {
          dispatch(getFriendsPosts(loggedUser));
        }, 1000);
      }
      if (site === 'trending') {
        setTimeout(function () {
          dispatch(getTrendingPosts());
        }, 1000);
      }
    }
  };

  const handleNavigate = () => {
    if (authorId._id !== loggedUser) {
      navigate(`/user/${authorId._id}`);
    } else {
      navigate(`/profile`);
    }
  };
  const heartsReactions = likes.filter((r) => r.type === 'heart');
  const sunsReactions = likes.filter((r) => r.type === 'suns');
  const happyReactions = likes.filter((r) => r.type === 'happyLeaf');
  const confusedReactions = likes.filter((r) => r.type === 'confusedLeaf');

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
        rating={rating}
        date={formatedDate}
        avatar={avatar}
        email={email}
        site={site}
      />
      <Box
        position={'relative'}
        border="1px"
        borderColor="gray.200"
        bgColor="#f5f5f5"
        maxW={site === "admin" ? "23vw" : '25vw'}
        w={'25vw'}
        rounded={'sm'}
        p={6}
        h={'74vh'}
        overflow={'hidden'}
        boxShadow={premium ? '0px 1vh 2vw -1px #FBFF3A;' : null}
        
      // _hover={{
      //   bg: `logo.${randomNumber(1, 4)}`,
      // }}
      >
        <HStack position={'absolute'} top={4}>
          
            <Avatar
              cursor={'pointer'}
              onClick={() => handleNavigate()}
              size="md"
              src={avatar}
              name={fullName}
              alt={'Author'}
            />
          
          <VStack position={'absolute'} left={'50px'} top={'3px'} w={'200px'}>
            <Text as="b" left={"0px"} textAlign={"left"} position={'absolute'} w={"300px"}>
              {/* {site fullName} */}
              {firstName} {lastName}
            </Text>
            <Text fontSize="sm" left={0} position={'absolute'} pt={'12px'}>
              {userName}
            </Text>
            {premium ? (
              <Badge position={'absolute'} bg={'gold'} right={'-20%'}>
                PREMIUM
              </Badge>
            ) : null}
          </VStack>
        </HStack>
        <Image
          cursor="pointer"
          position={'absolute'}
          top={'55px'}
          src={image}
          border="1px"
          borderColor="gray.200"
          pos={'relative'}
          layout={'cover'}
          objectFit={'cover'}
          boxSize="40vh"
          width={'100%'}
          onClick={() => handleClick()}
        />
        <Box pt={3}>
          <Flex
            position={'absolute'}
            ml={'-2vw'}
            align={'flex-start'}
            justify={'right'}
            width={'17vw'}
            zIndex={5}
            top={'87%'}
          >
            <Box
              onMouseLeave={() => {
                setHide(false);
              }}
            >
              <Button
                size={'sm'}
                h={30}
                bg={'logo.2'}
                icon={<BsSun />}
                name="suns"
                mr={'0.3vw'}
                onClick={(e) => {
                  handleClickReaction(e, 'suns');
                }}
                onMouseEnter={() => {
                  setHide(true);
                }}
                _hover={{
                  bg: 'orange.200',
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
                  bg={'logo.2'}
                  mr={'0.3vw'}
                  name="happyLeaf"
                  _hover={{
                    bg: 'orange.200',
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
                  bg={'logo.2'}
                  name="heart"
                  mr={'0.3vw'}
                  // value={comment?.likes?.heart}
                  _hover={{
                    bg: 'orange.200',
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
                  bg={'logo.2'}
                  name="confusedLeaf"
                  // value={comment?.likes?.confusedLeaf}
                  icon={<BiShocked />}
                  _hover={{
                    bg: 'orange.200',
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
            ml={site ==="admin" ? '23%' : "18%"}
            top={'87.1%'}
            size={site ==="admin" ? "xs" :'sm'}
            bg={'logo.1'}
            h={30}
            onClick={() => {
              handleClick();
            }}
            _hover={{
              bg: 'logo.3',
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
              ml={'35.4%'}
              mb={'4vh'}
              top={'87.1%'}
              siz={'lg'}
              h={30}
              bg={'logo.1'}
              icon={<FiMoreVertical />}
              _hover={{
                bg: 'logo.3',
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

        <VStack>
          <Text width={'22vw'} h={'12vh'} color={'black'} pt={9} mt={'2vh'}>
            {/* {sentenceCase(description, true)} */}
            {/* {displayText} */}
            {description?.length > 60
              ? `${sentenceCase(description?.slice(0, 60))} ... `
              : sentenceCase(description)}
            {description?.length > 70 ? (
              <Button
                zIndex={5}
                position="relative"
                bg="none"
                onClick={() => handleClick()}
                color={'gray.500'}
              >
                Ver más
              </Button>
            ) : null}
          </Text>
        </VStack>
        <Text
          color={'gray.500'}
          position={'absolute'}
          bottom={'5px'}
          right={'10px'}
          w="150px"
        >
          {formatedDate}
        </Text>
      </Box>
      {site === 'admin' ? (
        <HStack>
          <Button onClick={() => handleDelete(postId)}>Delete</Button>
          <Button onClick={() => handleRestore(postId)}>Restore</Button>
        </HStack>
      ) : null}
    </>
  );
}
