import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../redux/action";
import Searchbar from '../Searchbar/SearchBar';
import { Box, Flex, IconButton, Menu, MenuButton,Icon, MenuItem, HStack, MenuDivider, Image, Link, useColorModeValue, MenuList, Avatar,Text,VStack } from "@chakra-ui/react";
import { Link as ReactLink } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import {
    FiMenu,
    FiBell,
    FiChevronDown,
  } from 'react-icons/fi';

/*--------------- BARRA LATERAL----------------------*/

export const MobileNav = ({ myUser, onOpen, ...rest }) => {
   
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
        zIndex={0}
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
          {/*--------Campanita de notis-----------*/}
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
  
          <Flex alignItems={'center'} mr={12} ml={5} >
            <Menu>
              <MenuButton
                py={2}
                transition="all 0.3s"
                _focus={{ boxShadow: 'none' }}
              >
                <HStack>
                  <Avatar
                    size={'sm'}
                    src={myUser?.image}
                  />
                  <VStack
                    display={{ base: 'none', md: 'flex' }}
                    alignItems="flex-start"
                    spacing="1px"
                    ml="2"
                  >
                    <Text fontSize="sm">
                      {myUser?.fullName
                        ? myUser.fullName
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
                <Link as={ReactLink} to="/admin">
                  <MenuItem>Admin panel</MenuItem>
                </Link>
                <Link as={ReactLink} to="/settings">
                <MenuItem>Settings</MenuItem>
                </Link>
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
  