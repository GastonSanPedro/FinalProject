import React, { ReactNode, useState, useEffect } from 'react';
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyUser } from '../../redux/action';
import { MobileNav } from './MovileNav';
import { SidebarContent } from './SidebarContent';


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
  const myUser = useSelector((state) => state.myUser);
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
        myUser={myUser}
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
      <MobileNav onOpen={onOpen} myUser={myUser} />
        <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
        </Box>
    </Box>
  );
}
