import {
  Box,
  Text,
  Avatar,
  Image,
  Flex,
  IconButton,
  ModalOverlay,
  useDisclosure,
  Button,
  MenuList,
  MenuItem,
  Menu,
  MenuButton,
  VStack,
  HStack
} from '@chakra-ui/react';
import {
  getSinglePosts,
  reportPost,
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
  loggedUser,
  loggedEmail,
  site,
  handleDelete,
  authorId
}) {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const [hide, setHide] = useState(false);
  const [Reaction, setReaction] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate()
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
    navigate(`/user/${authorId}`)
  }


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
      />
      {/** Acá arranca la box del posteo */}
      <Box
        border="1px"
        borderColor='gray.200'
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
          borderColor='gray.200'
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
            ml={'-1vw'}
            align={'flex-start'}
            justify={'right'}
            width={'14vw'}
            zIndex={5}
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
                  onHover={() => { }}
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
                  onHover={() => { }}
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
            zIndex={5}
            position="absolute"
            ml={'4.7%'}
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
          <Menu>
            <MenuButton
              zIndex={5}
              as={IconButton}
              position="absolute"
              ml={'9%'}
              mb={'4vh'}
              siz={'lg'}
              h={30}
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
        </Box>



        <VStack>
          <Text width={'22vw'} h={'12vh'} color={"black"} pt={9}>
            {/* {sentenceCase(description, true)} */}
            {/* {displayText} */}
            {description?.length > 60 ?
              `${description?.slice(0, 60)} ... `
              : description}
            {description?.length > 70 ?
              <Button
                zIndex={5}
                position="relative"
                bg="none"
                onClick={() => handleClick()}
              >
                Ver más
              </Button> : null}
          </Text>
          <HStack pt="9%" pl="0%" position="absolute">
            {site === "profile" || site ==="anyProfile" ? null
            : <Avatar cursor= {"pointer"}  onClick={() => handleNavigate()} size='sm' src={avatar} name={fullName} alt={'Author'} 
             />}
            <Text >{userName}</Text>
            <Box ml="20px">
              <Text color={'gray.500'} mr="0%" w="150px">{formatedDate}</Text>
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
