import React, { ReactNode, useState, useEffect } from 'react';
import {
  Box,
  useColorModeValue,
  Drawer,
  DrawerContent,
  useDisclosure,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowers, getMyUser, getFriends } from '../../redux/action';
import { MobileNav } from './MovileNav';
import { SidebarContent } from './SidebarContent';

export default function SidebarWithHeader({
  friends,
  children,
  myUser,
  myFollowers,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [User, setUser] = useState(
    useState(JSON.parse(localStorage.getItem('user')))
  );
  const neededEmail = User[0].email;
  const neededId = User[0]._id;

  useEffect(() => {
    if (myUser._id === undefined) {
      dispatch(getMyUser(neededEmail));
      dispatch(getFollowers(neededId));
      dispatch(getFriends(neededId));
    }
  }, [dispatch, neededEmail]);
  console.log(User);
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
        friends={friends}
        myFollowers={myFollowers}
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
