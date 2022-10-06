import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../redux/action";
import Searchbar from '../Searchbar/SearchBar';
import { Box, Flex, IconButton, Menu, MenuButton,Icon, MenuItem, HStack, MenuDivider, Image, useColorModeValue, MenuList, Avatar,Text,VStack } from "@chakra-ui/react";
import logo from '../../assets/logo.jpg';
import {
    FiMenu,
    FiBell,
    FiChevronDown,
  } from 'react-icons/fi';

/*--------------- BARRA LATERAL----------------------*/

export const MobileNav = ({ myUser, onOpen, ...rest }) => {
    const navigate = useNavigate()
    const google = (window.google = window.google ? window.google : {});
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
                      {myUser?.firstName
                        ? `${myUser.firstName} ${myUser.lastName}`
                        : 'Loading'}
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
                
                <MenuItem onClick={()=>{navigate(`/profile`)}}>Profile</MenuItem>
                <MenuItem onClick={()=>{navigate(`/admin`)}}>Admin panel</MenuItem>
                <MenuItem onClick={()=>{navigate(`/settings`)}}>Settings</MenuItem>
                <MenuItem onClick={()=>{navigate(`/payments`)}}>Payments</MenuItem>
                
                <MenuDivider />
                <MenuItem onClick={() => handleClickLogOut()}>Sign out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </HStack>
      </Flex>
    );
  };
  
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