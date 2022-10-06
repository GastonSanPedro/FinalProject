import { useSelector } from 'react-redux';
import SidebarWithHeader from '../components/Sidebar-Navbar/SideBar';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SuccessPaymentInfo } from '../components/PaymentCard/SuccessPaymentInfo';

const PaymentSucess = () => {
  const dispatch = useDispatch();
  const myUser = useSelector((state) => state.myUser);
  const friends = useSelector((state) => state.friends);
  const myFollowers = useSelector((state) => state.followers);
  const payment = useSelector((state) => state.payment);
  const [Bill, setBill] = useState(JSON.parse(localStorage.getItem('bill')));
  const posts = useSelector((state) => state.posts);

  //   (() => {
  //     dispatch(getFollowers(myUser._id));
  //   }, [dispatch, myUser]);

  return (
    <>
      <SidebarWithHeader
        myUser={myUser}
        friends={friends}
        myFollowers={myFollowers}
      />
      <SuccessPaymentInfo myPosts={posts} />
    </>
  );
};

export default PaymentSucess;
