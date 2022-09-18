import React from 'react';
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuGroup,
  MenuDivider,
  MenuItem,
  MenuList,
  IconButton,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import Searchbar from './SearchBar';
import Home from '../../assets/home.svg';

const Navbar = () => {
  return (
    <>
      <Box
        display="flex"
        dir="row"
        //justifyContent="flex-end"
        backgroundColor="gray.200"
      >
        <Button
          aria-label="Options"
          variant="outline"
          ml={'45%'}
          w={20}
          alignContent={'center'}
          //   pos={'absolute'}
          //right={'10%'}
        >
          <Link to="/home" style={{ textDecoration: 'none' }}>
            <img
              src={Home}
              alt="home"
              style={{ width: '70%', marginLeft: '15%' }}
            />
          </Link>
        </Button>
        <Menu>
          <Searchbar />
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
            variant="outline"
            mr={2}
            pos={'absolute'}
            right={'0%'}
          />
          <MenuList>
            <MenuGroup title="Profile">
              <Link to="/profile">
                <MenuItem>My Account</MenuItem>
              </Link>
              <MenuItem>Payments </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup title="Help">
              <MenuItem>Docs</MenuItem>
              <MenuItem>FAQ</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </Box>
    </>
  );
};

export default Navbar;
