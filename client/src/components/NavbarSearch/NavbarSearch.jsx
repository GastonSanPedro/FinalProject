import {
    Box,
    Flex,
    Button,
    Stack,
  } from '@chakra-ui/react';
import { RiFileTextLine, RiUserSearchLine, RiUserFollowLine } from 'react-icons/ri'
import { AiOutlinePicture } from 'react-icons/ai';



  export default function NavbarSerch({state, setState}) {


    const NAV_ITEMS = [
      {
        label: 'Users',
        icon: <RiUserSearchLine/>,
        onClick: () => {
          setState('users')}
      },
      {
          label: 'Friends',
          icon: <RiUserFollowLine/>,
          onClick: () => {
            setState('friends')
          }
        },
      {
        label: 'Images',
        icon: <AiOutlinePicture/>,
        onClick: () => {
          setState('images')}
      },
      {
        label: 'Text',
        icon: <RiFileTextLine/>,
        onClick: () => {
          setState('text')}
      }
   
    ];
    
    return (
      <Box>
        <Flex
          bg={'white'}
          color={'gray.600'}
          minH={'50px'}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={'gray.200'}
          align={'center'}>
          <Flex 
          flex={{ base: 1 }} 
          justify={{ base: 'center', md: 'start' }}>  
            <Flex 
            display={{ base: 'none', md: 'flex' }} 
            ml={10}>

              <Stack 
              direction={'row'} 
              spacing={4} 
              alignContent={'center'}>
                {NAV_ITEMS.map((navItem) => (
                  <Box 
                  key={navItem.label}>
                    <Button
                     onClick={() => navItem.onClick()}
                     leftIcon={navItem.icon}
                     p={3}
                     fontSize={'md'}
                     fontWeight={'normal'}
                     color={'gray.400'}
                     bg={'none'}
                     _hover={{
                       textDecoration: 'none',
                       color: 'gray.800',
                     }}
                     _active={{
                      bg: 'none',
                      textDecoration: 'none',
                      color: 'gray.800'
                     }}
                     _focus={{
                      bg: 'none',
                      textDecoration: 'none',
                      color: 'gray.800'
                     }}>
                     {navItem.label}
                    </Button>
                  </Box>
                  ))}
              </Stack>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    );
  }
  
  
  
