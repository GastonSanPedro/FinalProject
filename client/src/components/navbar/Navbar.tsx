import React from "react";
import { Box, Button, Menu, MenuButton, MenuGroup, MenuDivider, MenuItem, MenuList, IconButton } from "@chakra-ui/react";
import {HamburgerIcon} from "@chakra-ui/icons"
import { Link } from "react-router-dom";
import Searchbar from "./SearchBar";

const Navbar = () =>{
    return(
        <>
        <Box display='flex' dir='row' justifyContent='flex-end' backgroundColor='gray.200'>
            <Menu >
            <Searchbar/>
                <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    icon={<HamburgerIcon />}
                    variant='outline'
                    mr={2}
                />
                <MenuList>
                    <MenuGroup title='Profile'>
                        <Link to='/profile'><MenuItem>My Account</MenuItem></Link>
                        <MenuItem>Payments </MenuItem>
                    </MenuGroup>
                <MenuDivider />
                    <MenuGroup title='Help'>
                        <MenuItem>Docs</MenuItem>
                        <MenuItem>FAQ</MenuItem>
                    </MenuGroup>
                </MenuList>
            </Menu>

        </Box>
        </>
    )
}

export default Navbar