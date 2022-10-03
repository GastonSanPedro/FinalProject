import { Box, Center, Stack } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import PaymentCard from '../components/PaymentCard/PaymentCard';
import SidebarWithHeader from '../components/Sidebar-Navbar/SideBar';

const Payments = () => {
  const dispatch = useDispatch();
  const myUser = useSelector((state) => state.myUser);
  // useEffect(() => {
  //   dispatch()

  // }, [third])
  //console.log(myUser?.posts);

  return (
    <>
      <SidebarWithHeader />
      <Box p={'8%'} pl={'20%'}>
        <Center
          display={'flex'}
          flexDir={'row'}
          alignItems={'center'}
          justifyContent={'space-evenly'}
          bg={'rgba(205, 235, 164, 0.2)'}
        >
          <PaymentCard myUser={myUser} price={'3'} days={'1'} num={'30'} />
          <PaymentCard myUser={myUser} price={'6'} days={'3'} num={'40'} />
          <PaymentCard myUser={myUser} price={'8'} days={'7'} num={'50'} />
        </Center>
      </Box>
    </>
  );
};

export default Payments;
