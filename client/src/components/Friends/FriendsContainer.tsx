import React from "react";
import { Stack } from "@chakra-ui/react";
import Friend from "./Friend";

const FriendsContainer = () => {
    return(
        <>
        <Stack w='200px' minH='200px' backgroundColor='gray.300'  borderRadius='7px' alignItems='center' pt={2} pb={2}>
            <Friend/>
            <Friend/>
            <Friend/>
            <Friend/>
            <Friend/>
            <Friend/>
            <Friend/>        
        </Stack>
        </>
    )
}

export default FriendsContainer