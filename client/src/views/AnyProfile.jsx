import React from "react";
import { Box } from "@chakra-ui/react";
import UserCard from "../components/UserCard/UserCard";
import SidebarWithHeader from '../components/Sidebar-Navbar/SideBar';
import port1 from '../assets/port1.png'
import TextPostContainer from '../components/TextPost/TextPostContainer';



export default function AnyProfile() {
    return (
        <>
            <SidebarWithHeader />
            <Box mt="20"
                ml="15%"
                h="210"
                width="85%"
                position={'absolute'}
                backgroundImage={port1}
                bgRepeat="no-repeat"
                // bgPosition="center"
                bgSize="cover"
            />
            <UserCard
                site="anyProfile"
            />
            <Box
                pos={'absolute'}
                top={'20%'}
                left={'0%'}
                textAlign={'center'}
                justifyContent={'center'}
                direction={'column'}
                width={'79vw'}
                height={'80vh'}
                mt={'20%'}
                ml={'18%'}
                mr={'7%'}
            >
                <TextPostContainer
                    site="anyProfile"
                />
            </Box>
        </>
    )
}