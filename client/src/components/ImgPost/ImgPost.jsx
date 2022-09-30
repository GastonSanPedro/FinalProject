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
  ModalOverlay,
  useDisclosure,
  Button,
  Input,
  ModalCloseButton,
  InputRightElement,
  InputGroup,
  useToast,
  MenuList,
  MenuItem,
  Menu,
  MenuButton,
} from '@chakra-ui/react';
import {
  getSinglePosts,
  postComment,
  reportPost,
  deletePost,
} from '../../redux/action';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiMessage } from 'react-icons/bi';
import { BsSun } from 'react-icons/bs';
import { FiMoreVertical } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { PostModal } from '../PostModal/PostModal';

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
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const [hide, setHide] = useState(false);
  const [Reaction, setReaction] = useState({});
  const dispatch = useDispatch();
  const handleClick = () => {
    setOverlay(<OverlayOne />);
    onOpen();
    dispatch(getSinglePosts(postId));
  };

  const handleReport = () => {
    dispatch(reportPost(postId));
  };

  return (
    <>
      <Center py={6}>
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
          date={date}
          avatar={avatar}
          email={email}
        />
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
            <Menu>
              <MenuButton
                as={IconButton}
                position="absolute"
                ml="20%"
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
          </Flex>
        </Box>
      </Center>
      {site === 'admin' ? (
        <Button onClick={() => handleDelete(postId)}>Eliminar</Button>
      ) : null}
    </>
  );
}
