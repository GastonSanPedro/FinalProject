import { Box, Center, Stack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import PaymentCard from "../components/PaymentCard/PaymentCard";
import SidebarWithHeader from "../components/Sidebar-Navbar/SideBar";
import { getFollowers } from "../redux/action";
import { useEffect } from "react";
import { useDispatch } from "react-redux";


const Payments = () => {
    const dispatch = useDispatch()
    const myUser= useSelector((state) => state.myUser)
    const friends = useSelector((state) => state.friends)
    const myFollowers = useSelector((state) => state.followers)

    useEffect(() => {
        dispatch(getFollowers(myUser._id));
      }, [dispatch, myUser]);

 return(
    <>
    <SidebarWithHeader myUser={myUser} friends={friends} myFollowers={myFollowers}/>
    <Box
    p={'8%'}
    pl={'20%'}>
    <Center
    display={'flex'}
    flexDir={'row'}
    alignItems={'center'}
    justifyContent={'space-evenly'}
    bg={'rgba(205, 235, 164, 0.2)'}>
    <PaymentCard
        price={'3'}
        days={'1'}
        num={'30'}/>
    <PaymentCard
        price={'6'}
        days={'3'}
        num={'40'}/>
    <PaymentCard
        price={'8'}
        days={'7'}
        num={'50'}/>
    </Center>
    </Box>
    
    </>
 )   
}

export default Payments