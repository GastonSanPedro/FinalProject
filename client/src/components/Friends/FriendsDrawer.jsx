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
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { FiUsers } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { FriendCard } from './FriendCard';
import { getFriends } from '../../redux/action';

export default function Friends({myUser}) {
  
  const dispatch = useDispatch();
  const [size, setSize] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = () => {
    onOpen();
  };
  useEffect(() => {
    dispatch(getFriends(myUser?._id));
  }, [dispatch]);

  const friends = useSelector(state=> state.friends)
   console.log({friends})
   console.log(myUser)
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
              <Accordion defaultIndex={[0]} allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex='1' textAlign='left'>
                        Following
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    FOLLOWING 1
                    FOLLOWING 2
                    FOLLOWING 3
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box flex='1' textAlign='left'>
                      Followers
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                      FOLLOWER 1
                      FOLLOWER 2
                      FOLLOWER 3
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            {/* {myUser?.friends?.length > 0 ? (
              myUser?.friends?.map((friend, index) => {
                return (
                  <Box key={index}>
                    <FriendCard
                      id={friend.friend[0]._id}
                      firstName={friend.friend[0].firstName}
                      lastName={friend.friend[0].lastName}
                      email={friend.friend[0].email}
                    />
                  </Box>
                );
              })
            ) : (
              <p>Maybe you can try being more sociable</p>
            )} */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
