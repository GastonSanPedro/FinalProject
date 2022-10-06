import { Box, Flex, Image, CloseButton, useColorModeValue, Icon, Button  } from "@chakra-ui/react";
import Friends from "../Friends/FriendsDrawer";
import logo from '../../assets/logo.jpg';
import {
    FiHome,
    FiTrendingUp,
    FiCompass,
    FiStar,
  } from 'react-icons/fi';
import { useNavigate } from "react-router-dom";


const LinkItems = [
    { name: 'Home', icon: FiHome },
    { name: 'Trending', icon: FiTrendingUp },
    { name: 'Explore', icon: FiCompass },
  ];

export const SidebarContent = ({ myFollowers, friends, myUser, onClose, ...rest }) => {


    
    return (
      <Box
        transition="3s ease"
        bg={useColorModeValue('white', 'gray.900')}
        borderRight="1px"
        borderRightColor={useColorModeValue('gray.200', 'gray.700')}
        minW={'18%'}
        maxW={'18%'}
        w={{ base: 'full', md: 60 }}
        pos="fixed"
        h="full"
        {...rest}
      >
        <Flex h={'20'} alignItems="center" mx="8" justifyContent="space-between">
          <Box mt={14}>
            <Image src={logo} />
          </Box>
          <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
        </Flex>
        <Box mt={14}>
          {LinkItems.map((link) => (
            <NavItem
              textDecoration={'none'}
              link={link}
              key={link.name}
              icon={link.icon}
            >
              {link.name}
            </NavItem>
          ))}
        </Box>
  
    {/*-----------DrawerFriends---------------*/}
        <Box 
        pos={'fixed'} 
        top={'89%'}>
          <Friends 
          myUser={myUser} 
          friends={friends} 
          myFollowers={myFollowers} />
        </Box>
      </Box>
    );
  };
  
  const NavItem = ({ icon, link, children, ...rest }) => {
    const navigate = useNavigate()
    return (
      <Box
        bg={'none'}
        fontWeight={'normal'}
        onClick={()=>{navigate(`/${link.name}`)}}
        style={{ textDecoration: 'none' }}
        _focus={{ boxShadow: 'none' }}
        p={'1vh'}
      >
        <Flex
          align="center"
          p="3"
          mx="2"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: '#8ea26f',
            color: 'white',
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Box>
    );
  };