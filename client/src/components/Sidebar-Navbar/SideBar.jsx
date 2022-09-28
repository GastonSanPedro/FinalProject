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
import logo from '../../assets/logo.jpg';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOut, getMyUser } from '../../redux/action';
import { Link as ReactLink } from 'react-router-dom';
import Searchbar from '../Searchbar/SearchBar';
import Friends from '../Friends/FriendsDrawer';
import PaymentDrawer from '../PaymentDrawer/PaymentDrawer';

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

  const neededEmail = User[0].email;

  useEffect(() => {
    setTimeout(function () {
      dispatch(getMyUser(neededEmail));
    }, 300);
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
/*--------------- BARRA LATERAL----------------------*/
const SidebarContent = ({ onClose, ...rest }) => {
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      minW={'18%'}
      maxW={'18%'}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h={'20'} alignItems="center" mx="8" justifyContent="space-between">
        <Box mt={14}>
          <Image src={logo} />
        </Box>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      <Box mt={14}>
        {LinkItems.map((link) => (
          <NavItem
            textDecoration={'none'}
            link={link}
            key={link.name}
            icon={link.icon}
          >
            {link.name}
          </NavItem>
        ))}
      </Box>
      <Box pos={'fixed'} top={'80%'}>
        <PaymentDrawer />
      </Box>
      <Box pos={'fixed'} top={'89%'}>
        <Friends />
      </Box>
    </Box>
  );
};

const NavItem = ({ icon, link, children, ...rest }) => {
  return (
    <Link
      href={`/${link.name}`}
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
  const myUser = useSelector((state) => state.myUser);
  console.log(myUser)
  const google = (window.google = window.google ? window.google : {});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClickLogOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('email');
    dispatch(logOut());
    google.accounts.id.disableAutoSelect();
    navigate('/landing-page');
  };

  return (
    <Flex
      //pos={'absolute'}
      minH={'12%'}
      maxH={'12%'}
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height={'11.5vh'}
      w={'86vw'}
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
        <MenuButton
          as={IconButton}
          justifyContent={'center'}
          alignContent={'center'}
          borderRadius={2}
          bg={'white'}
          p={2}
          icon={<FiBell />}
          _hover={{
            bg: 'logo.3',
            color: 'white',
          }}
          _active={{ bg: 'rgba(140, 161, 116, 0.5)' }}
        />
        <Icon
          viewBox="0 0 200 200"
          color="red.500"
          boxSize={3}
          position={'relative'}
          top={'-15%'}
          right={'1.2%'}
        >
          <path
            fill="currentColor"
            d="M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0"
          />
        </Icon>
        <MenuList>
          <MenuItem
            _hover={{
              bg: 'logo.3',
              color: 'white',
            }}
          >
            A Nacho le gusta tu post
          </MenuItem>
          <MenuItem
            _hover={{
              bg: 'logo.3',
              color: 'white',
            }}
          >
            A Ari le gusta tu post
          </MenuItem>
          <MenuItem
            color={'red'}
            _hover={{
              bg: 'logo.3',
              color: 'white',
            }}
          >
            Alirio lee el readme
          </MenuItem>
          <MenuItem
            _hover={{
              bg: 'logo.3',
              color: 'white',
            }}
          >
            Keki aceptó tu solicitud de amistad
          </MenuItem>
        </MenuList>
      </Menu>
      <Box
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
        mr={'2vw'}
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

        <Flex alignItems={'center'} mr={12} ml={5}>
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
                  <Text fontSize="sm">
                    {myUser?.firstName
                      ? myUser.firstName + ' ' + myUser.lastName
                      : 'Loading'}
                  </Text>
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
              <Link as={ReactLink} to="/payments">
                <MenuItem>Payments</MenuItem>
              </Link>
              <MenuDivider />
              <MenuItem onClick={() => handleClickLogOut()}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
