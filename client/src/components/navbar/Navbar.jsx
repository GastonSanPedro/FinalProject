import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuGroup,
  MenuDivider,
  MenuItem,
  MenuList,
  IconButton,
  VStack,
} from '@chakra-ui/react';
import { HamburgerIcon, BellIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import Searchbar from './SearchBar';
import Home from '../../assets/home.svg';

//const Navbar = ({ socket })

const Navbar = () => {


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
  //     <span>A {senderName} le gustó tu posteo</span>
  //   )
  // }

  // const handleRead = () => {
  //   setNotifications([])
  //   setOpen
  // }
  //---------------------------------------


  return (
    <>
      <Box
        display="flex"
        dir="row"
        //justifyContent="flex-end"
        backgroundColor="gray.200"
      >
        {/* <Box>
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

        <Button
          aria-label="Options"
          variant="outline"
          ml={'45%'}
          w={20}
          alignContent={'center'}
        //   pos={'absolute'}
        //right={'10%'}
        >




          <Link to="/home" style={{ textDecoration: 'none' }}>
            <img
              src={Home}
              alt="home"
              style={{ width: '70%', marginLeft: '15%' }}
            />
          </Link>
        </Button>





        <Menu>
          <Searchbar />
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
            mr={2}
            pos={'absolute'}
            right={'0%'}
          />


          <MenuList>
            <MenuGroup title="Profile">
              <Link to="/profile">
                <MenuItem>My Account</MenuItem>
              </Link>
              <MenuItem>Payments </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Help">
              <MenuItem>Docs</MenuItem>
              <MenuItem>FAQ</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Box>
    </>
  );
};

export default Navbar;
