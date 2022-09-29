import { Box } from "@chakra-ui/react"
import SidebarWithHeader from "../components/Sidebar-Navbar/SideBar"
import UserSettings from "../components/UserSettings/UserSettings"
import UserPics from "../components/UserSettings/UserPics"
import { useSelector } from "react-redux"
import NavbarSerch from "../components/NavbarSearch/NavbarSearch"
import { useState } from "react"
import {  RiUserSettingsLine,RiFileTextLine, RiHistoryLine } from 'react-icons/ri'
import { AiOutlinePicture } from "react-icons/ai"
import {IoStatsChartOutline} from 'react-icons/io5'



const Settings = () =>{
   
   const myUser =  useSelector(state => state.myUser)
   const [state, setState ] = useState('users')
   const NAV_ITEMS = [
      {
         label: 'User',
         icon: <RiUserSettingsLine/>,
         onClick: () => {
           setState('users')}
       },
       {
           label: 'Posts',
           icon: <IoStatsChartOutline/>,
           onClick: () => {
             setState('posts')
           }
         },
       {
         label: 'Payments',
         icon: <RiHistoryLine/>,
         onClick: () => {
           setState('images')}
       }  
    ];
 return(
    <>
    <SidebarWithHeader/>
    
    <Box
      pos={'absolute'}
      left={'0%'}
      textAlign={'center'}
      justifyContent={'center'}
      direction={'column'}
      width={'full'}
      height={'86vh'}
      mt={'5.4%'}
      ml={'16%'}
      bg={'whitesmoke'}>
   <NavbarSerch NAV_ITEMS={NAV_ITEMS}/> 
   <Box display={'flex'} flexDir={'row'}>
      <UserPics myUser={myUser} />
      <UserSettings myUser={myUser}/>
    </Box>
    </Box>
    </>
 )   
}

export default Settings