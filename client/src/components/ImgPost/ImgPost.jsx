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
} from '@chakra-ui/react';
import {
  getMyUser,
  getSinglePosts,
  postReaction,
  reportPost,
  getPosts,
  getUser,
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
  likes,
  loggedUser,
  loggedEmail,
  site,
  handleDelete,
  comments,
  authorId,
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
          dispatch(getMyUser(loggedEmail));
        }, 1000);
      }
    } else if (userReaction && userReaction.type === value) {
      const filtered = likes.filter((r) => r.idUser !== loggedUser);
      dispatch(postReaction({ likes: filtered }, postId, null, loggedUser));
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
          dispatch(getMyUser(loggedEmail));
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
          dispatch(getMyUser(loggedEmail));
        }, 1000);
      }
    }

    //if(likes.find((r)=> r.id ))
  };

  // function sentenceCase(input, lowercaseBefore) {
  //   input = input === undefined || input === null ? '' : input;
  //   if (lowercaseBefore) {
  //     input = input.toLowerCase();
  //   }
  //   return input
  //     .toString()
  //     .replace(/(^|\. *)([a-z])/g, function (match, separator, char) {
  //       return separator + char.toUpperCase();
  //     });
  // }

  // if (sentenceCase(description, true).length >50 ){
  //   let displayText = sentenceCase(description, true).slice(0,50)
  //   return displayText
  // }

  // if(description.length > 50){
  //   var displayText = description.slice(0,50)
  //   return displayText
  // }
  const handleNavigate = () => {
    navigate(`/user/${authorId}`);
  };
  const heartsReactions = likes.filter((r) => r.type === 'heart');
  const sunsReactions = likes.filter((r) => r.type === 'suns');
  const happyReactions = likes.filter((r) => r.type === 'happyLeaf');
  const confusedReactions = likes.filter((r) => r.type === 'confusedLeaf');
  //console.log(heartsReactions);
  // console.log(singlePost);
  // if (singlePost.length === 0) {
  //   console.log('funco');
  //   dispatch(getMyUser(loggedEmail));
  // }
  return (
    <>
      {/* <Center py={6}> */}
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
        site={site}
      />
      {/** Acá arranca la box del posteo */}
      <Box
        border="1px"
        borderColor="gray.200"
        bgColor="#f5f5f5"
        maxW={'25vw'}
        w={'25vw'}
        rounded={'sm'}
        p={6}
        h={'68vh'}
        overflow={'hidden'}
        // _hover={{
        //   bg: `logo.${randomNumber(1, 4)}`,
        // }}
      >
        <Image
          src={image}
          border="1px"
          borderColor="gray.200"
          // h={'210px'}
          // pt={5}
          // pl={10}
          // mx={-6}
          // mb={6}
          pos={'relative'}
          layout={'cover'}
          objectFit={'cover'}
          boxSize="40vh"
          width={'100%'}
        />
        {/* </Box> */}
        <Box pt={3}>
          <Flex
            position={'absolute'}
            ml={'-2vw'}
            align={'flex-start'}
            justify={'right'}
            width={'17vw'}
            zIndex={5}
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
            ml={'5.7%'}
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
              ml={'10.4%'}
              mb={'4vh'}
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

        <VStack>
          <Text width={'22vw'} h={'12vh'} color={'black'} pt={9}>
            {/* {sentenceCase(description, true)} */}
            {/* {displayText} */}
            {description?.length > 60
              ? `${description?.slice(0, 60)} ... `
              : description}
            {description?.length > 70 ? (
              <Button
                zIndex={5}
                position="relative"
                bg="none"
                onClick={() => handleClick()}
              >
                Ver más
              </Button>
            ) : null}
          </Text>
          <HStack pt="9%" pr="7%" position="absolute">
            <Avatar
              onClick={() => handleNavigate()}
              size="sm"
              src={avatar}
              name={fullName}
              alt={'Author'}
            />
            <Text>{userName}</Text>
            <Box ml="20px">
              <Text color={'gray.500'} ml="60%" w="150px">
                {formatedDate}
              </Text>
            </Box>
          </HStack>
        </VStack>
        {/* <Stack>
            <Heading
              color={useColorModeValue('gray.700', 'white')}
              textTransform="uppercase"
              fontSize={'2xl'}
              fontFamily={'body'}
            >
              {userName}
            </Heading>
            <Text width={'35vh'} h={'12vh'} color={'gray.500'}>
              {sentenceCase(description, true)}
            </Text>
          </Stack> */}
        {/* <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
            <Link to={`/user/${email}`}>
              <Avatar src={avatar} name={fullName} alt={'Author'} />
            </Link>
            <Stack direction={'column'} spacing={0} fontSize={'sm'}>
              <Text fontWeight={600}>{fullName}</Text>
              <Text color={'gray.500'}>{formatedDate}</Text>
            </Stack>
          </Stack> */}
      </Box>
      {/* </Center> */}
      {site === 'admin' ? (
        <Button onClick={() => handleDelete(postId)}>Eliminar</Button>
      ) : null}
    </>
  );
}
