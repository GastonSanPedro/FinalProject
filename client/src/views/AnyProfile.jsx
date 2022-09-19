import React from "react";
import { Box } from "@chakra-ui/react";
import FriendsContainer from "../components/Friends/FriendsContainer";
import Navbar from '../components/navbar/Navbar';
import AnyProfileDetail from "../components/AnyProfileDetail/AnyProfileDetail";
import UserCard from "../components/UserCard/UserCard";



export default function AnyProfile() {
    return (
        <>
            <Navbar />
            <Box display='flex' dir='column' pt={10} pr={10} pl={10}  >
                <Box w="100%">
                    <AnyProfileDetail />
                </Box>
                <Box display='-ms-flexbox' position={"absolute"} right={"0%"} dir='row' width={"20%"} pt={0} pr={0} pl={0}  >
                    <UserCard />
                    <FriendsContainer />

                </Box>
            </Box>

        </>
    )
}