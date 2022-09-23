import { Box, Center, Stack } from "@chakra-ui/react"
import PaymentCard from "../components/PaymentCard/PaymentCard"
import SidebarWithHeader from "../components/Sidebar-Navbar/SideBar"

const Payments = () => {

 return(
    <>
    <SidebarWithHeader/>
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