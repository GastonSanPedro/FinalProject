import { Box, Center, Stack } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import PaymentCard from '../components/PaymentCard/PaymentCard';
import SidebarWithHeader from '../components/Sidebar-Navbar/SideBar';
import { getFollowers } from '../redux/action';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { SuccessPaymentInfo } from '../components/PaymentCard/SuccessPaymentInfo';

export const PaymentSucess = () => {
  const dispatch = useDispatch();
  const myUser = useSelector((state) => state.myUser);
  const friends = useSelector((state) => state.friends);
  const myFollowers = useSelector((state) => state.followers);
  const payment = useSelector((state) => state.payment);
  const [Bill, setBill] = useState(JSON.parse(localStorage.getItem('bill')));

  //   useEffect(() => {
  //     dispatch(getFollowers(myUser._id));
  //   }, [dispatch, myUser]);
  console.log(myUser?.posts);
  return (
    <>
      <SidebarWithHeader
        myUser={myUser}
        friends={friends}
        myFollowers={myFollowers}
      />
      <SuccessPaymentInfo myPosts={myUser?.posts} />
    </>
  );
};
