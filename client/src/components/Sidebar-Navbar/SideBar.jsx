import React, { ReactNode, useState, useEffect } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Image,
  Button,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import logo from '../../assets/logo.jpg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, getMyUser } from '../../redux/actions';
import { Link as ReactLink } from 'react-router-dom';
import Searchbar from '../navbar/SearchBar';

const LinkItems = [
  { name: 'Home', icon: FiHome },
  { name: 'Trending', icon: FiTrendingUp },
  { name: 'Explore', icon: FiCompass },
  { name: 'Favourites', icon: FiStar },
  { name: 'Settings', icon: FiSettings },
];

export default function SidebarWithHeader({ children }) {
  //----------Lógica notificaciones-------
  // const [notifications, setNotifications] = useState([])
  // const [open, setOpen] = useState(false)

  // useEffect(() => {
  //   socket.on("getNotification", data => {
  //     setNotifications((prev) => [...prev, data])
  //   })
  // }, [socket])

  // const displayNotification = ({ senderName }) => {
  //   return (
  //     <MenuItem>A {senderName} le gustó tu posteo</MenuItem>
  //   )
  // }

  // const handleRead = () => {
  //   setNotifications([])
  //   setOpen
  // }
  //En la parte del comienzo de la barra ({ children, socket })
  //---------------------------------------

  const { isOpen, onOpen, onClose } = useDisclosure();
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [User, setUser] = useState(
    useState(JSON.parse(localStorage.getItem('user')))
  );

  const myUser = useSelector((state) => state.myUser);
  const neededEmail = User[0].email;

  useEffect(() => {
    dispatch(getMyUser(neededEmail));
  }, [dispatch, neededEmail]);

  return (
    <Box
      pos={'fixed'}
      zIndex={'10'}
      maxW={'15%'}
      minH="100vh"
      bg={useColorModeValue('gray.100', 'gray.900')}
    >
      <SidebarContent
        onClose={() => onClose}
        display={{ base: 'none', md: 'block' }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Box mt={14}>
          <Image src={logo} />
        </Box>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Box mt={14}>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        ))}
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, children, ...rest }) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: '#8ea26f',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClickLogOut = () => {
    localStorage.removeItem('user');
    dispatch(logOut());
    navigate('/landing-page');
  };

  return (
    <Flex
      //pos={'absolute'}
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      w={'84vw'}
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}
    >
      <Searchbar />
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Menu>
        <MenuButton as={Button} p={0} pr={2.5} rightIcon={<FiBell />} />
        <Icon
          viewBox="0 0 200 200"
          color="red.500"
          boxSize={3}
          position="relative"
          left={'-4'}
          top={'-3'}
        >
          <path
            fill="currentColor"
            d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
          />
        </Icon>
        <MenuList>
          <MenuItem>A Nacho le gusta tu post</MenuItem>
          <MenuItem>A Ari le gusta tu post</MenuItem>
          <MenuItem>Alirio quiere ser tu amigo</MenuItem>
          <MenuItem>Keki aceptó tu solicitud de amistad</MenuItem>
        </MenuList>
      </Menu>
      <Box
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        <Image src={logo} />
      </Box>

      <HStack spacing={{ base: '0', md: '6' }}>
        {/*   Lógica socket.io
        <Box>
          <BellIcon onClick={() => setOpen(!open)} />
          {notifications.length > 0 &&
            <Box mr="3">
              {notifications.length}
            </Box>
          }
          {open && (
            <VStack>
              {notifications.map(n => (displayNotification(n)))}
              <Button onClick={handleRead} ></Button>
            </VStack>)}
        </Box> */}

        <Flex alignItems={'center'} mr={10} ml={5}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}
            >
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">Ariadna Ruvini</Text>
                  <Text fontSize="xs" color="gray.600">
                    Admin
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}
            >
              <Link as={ReactLink} to="/profile">
                <MenuItem>Profile</MenuItem>
              </Link>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Payments</MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => handleClickLogOut()}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
