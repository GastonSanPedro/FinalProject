import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Icon,
  Box,
  Button,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { FiUsers } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { FriendCard } from './FriendCard';
import { getUsers } from '../../redux/action';

export default function Friends() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [size, setSize] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleClick = () => {
    onOpen();
  };

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  let friends = users.slice(0, 15);

  return (
    <>
      <Flex
        onClick={() => handleClick()}
        key={'friends'}
        role="group"
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        w={200}
        cursor="pointer"
        _hover={{
          bg: '#8ea26f',
          color: 'white',
        }}
      >
        <Icon
          mr="4"
          fontSize="16"
          _groupHover={{
            color: 'white',
          }}
          as={FiUsers}
        />
        {'Friends'}
      </Flex>

      <Drawer onClose={onClose} isOpen={isOpen} size={'xs'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{`My friends`}</DrawerHeader>
          <DrawerBody>
            {friends[0] ? (
              friends.map((friend) => {
                return (
                  <Box key={friend._id}>
                    <FriendCard
                      id={friend._id}
                      firstName={friend.firstName}
                      lastName={friend.lastName}
                      email={friend.email}
                    />
                  </Box>
                );
              })
            ) : (
              <p>Maybe you can try being more sociable</p>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
