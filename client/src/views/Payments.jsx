import {
  Box,
  Center,
  Button,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import PaymentCard from '../components/PaymentCard/PaymentCard';
import SidebarWithHeader from '../components/Sidebar-Navbar/SideBar';
import { PaymentModal } from '../components/PaymentCard/PaymentModal';
import { useState } from 'react';

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
const Payments = () => {
  const myUser = useSelector((state) => state.myUser);
  const friends = useSelector((state) => state.friends);
  const myFollowers = useSelector((state) => state.followers);
  const payment = useSelector((state) => state.payment);
  const [Bill, setBill] = useState(JSON.parse(localStorage.getItem('bill')));
  const [overlay, setOverlay] = useState(<OverlayOne />);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleClick = () => {
    setOverlay(<OverlayOne />);
    onOpen();
  };
  return (
    <>
      <SidebarWithHeader
        myUser={myUser}
        friends={friends}
        myFollowers={myFollowers}
      />
      <PaymentModal
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
        myPosts={myUser?.posts}
        loggedId={myUser?._id}
        payment={payment}
        Bill={Bill}
      />
      <Box p={'8%'} pl={'20%'}>
        <Center
          display={'flex'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-evenly'}
          bg={'rgba(205, 235, 164, 0.2)'}
        >
          <PaymentCard
            price={'3'}
            days={'1'}
            num={'30'}
            myUser={myUser}
            payment={payment}
            Bill={Bill}
          />
          <PaymentCard
            price={'6'}
            days={'3'}
            num={'40'}
            myUser={myUser}
            payment={payment}
          />
          <PaymentCard
            price={'8'}
            days={'7'}
            num={'50'}
            myUser={myUser}
            payment={payment}
          />
        </Center>
        <Button
          mt={10}
          w={'60%'}
          ml={'20%'}
          bg={'logo.2'}
          color={'white'}
          rounded={'sm'}
          onClick={(e) => handleClick()}
          _hover={{
            bg: '#ffae34',
            color: 'white',
          }}
          _active={{
            bg: 'rgba(140, 161, 116, 0.7)',
          }}
        >
          Start your campaign
        </Button>
      </Box>
    </>
  );
};

export default Payments;
